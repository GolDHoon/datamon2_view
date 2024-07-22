import { useEffect, useState } from "react";

// Material Dashboard 2 PRO React components
import MDBox from "components/MDBox";
import MDButton from "components/MDButton";
import MDInput from "components/MDInput";

// Authentication layout components
import { serverCommunicationUtil } from "../../common/util/serverCommunicationUtil";
// Authentication layout components
import IllustrationLayout from "layouts/login/components/IllustrationLayout";
import { Helmet } from "react-helmet";
import { useNavigate, useParams } from "react-router-dom";
import { getSessionStorage, setSessionStorage } from "../../common/common";

function Login() {
  const navigate = useNavigate();
  let { companyId } = useParams();
  const [id, setUserId] = useState("");
  const handleSetId = (e) => setUserId(e.target.value);
  const [pw, setPw] = useState("");
  const handleSetPw = (e) => setPw(e.target.value);
  const [companyName, setCompanyName] = useState("");

  const loginHandler = () => {
    if (!id) {
      alert("ID를 입력해주세요.");
      return;
    }
    if (!pw) {
      alert("Password를 입력해주세요.");
      return;
    }
    let data = {
      userId: id,
      password: pw,
      companyId: companyId,
    };
    serverCommunicationUtil("main", "axioPost", "/login", data)
      .then((result) => {
        if (result === "login-fail:password") {
          alert("패스워드가 불일치합니다.");
        } else if (result === "login-fail:companyId") {
          alert("로그인 URL 정보가 틀립니다.");
        } else if (result === "login-fail:userId") {
          alert("해당ID가 없습니다.");
        } else if (result === "server-fail") {
          alert("서버 장애.");
        } else {
          setSessionStorage("companyId", companyId);
          navigate("/");
        }
      })
      .catch((error) => {
        alert("서버 장애.");
      });
  };

  useEffect(() => {
    if (companyId === "null") {
      navigate("/master/login");
    }

    serverCommunicationUtil("main", "axioGet", "/getCompanyName", { companyId: companyId })
      .then((result) => {
        if (result === "companyName-fail:companyId") {
          alert("url 정보가 잘못되었습니다.");
          navigate("/master/login");
        } else {
          setCompanyName(result);
        }
      })
      .catch((error) => {
        alert("서버 장애.");
      });
  }, []);

  return (
    <MDBox>
      <IllustrationLayout
        title="로그인"
        companyName={companyName}
        description="데이터몬에 오신것을 환영합니다."
      >
        <Helmet>
          <title>DataMon2 - Login</title>
          <meta name="description" content="DataMon2 Login" />
          <meta name="Keywords" content="login" />
        </Helmet>
        <MDBox component="form" role="form">
          <MDBox mb={2}>
            <MDInput type="text" label="ID" fullWidth value={id} onChange={handleSetId} required />
          </MDBox>
          <MDBox mb={2}>
            <MDBox mb={2}>
              <MDInput
                type="password"
                label="Password"
                fullWidth
                value={pw}
                onChange={handleSetPw}
                onKeyPress={(event) => {
                  if (event.key === "Enter") {
                    loginHandler();
                    event.preventDefault();
                  }
                }}
                required
              />
            </MDBox>
          </MDBox>
          <MDBox mt={4} mb={1}>
            <MDButton variant="gradient" color="info" size="large" fullWidth onClick={loginHandler}>
              로그인
            </MDButton>
          </MDBox>
        </MDBox>
      </IllustrationLayout>
    </MDBox>
  );
}

export default Login;
