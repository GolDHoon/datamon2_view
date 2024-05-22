import React, { useState, useEffect } from "react";

// Material Dashboard 2 PRO React components
import MDBox from "components/MDBox";
import MDInput from "components/MDInput";
import MDButton from "components/MDButton";
import MDAlert from "components/MDAlert";

// Authentication layout components

// Image
import bgImage from "assets/images/illustrations/illustration-reset.jpg";
import { serverCommunicationUtil } from "../../common/util/serverCommunicationUtil";

import { useNavigate } from "react-router-dom";
import LoginLayout from "./components";
import { Helmet } from "react-helmet";
import Cookies from "draft-js/lib/EditorState";

function Login() {
  const navigate = useNavigate();

  const [id, setUserId] = useState("");
  const handleSetId = (e) => setUserId(e.target.value);
  const [pw, setPw] = useState("");
  const handleSetPw = (e) => setPw(e.target.value);

  useEffect(() => {
    serverCommunicationUtil("main", "axioPost", "/sessionCheck", {})
      .then((result) => {
        if (result === "fail-time" || result === "fail-token") {
          console.log("");
        } else if (result === "error") {
          console.log("");
        } else {
          navigate("/");
        }
      })
      .catch((error) => {
        console.log("");
      });
  }, []);

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
    };
    serverCommunicationUtil("main", "axioPost", "/login", data)
      .then((result) => {
        if (result === "fail-password") {
          alert("패스워드가 불일치합니다.");
        } else if (result === "fail-userId") {
          alert("해당ID가 없습니다.");
        } else if (result === "error") {
          alert("서버 장애.");
        } else {
          debugger;
          Cookies.set("JSESSIONID", result);
          console.log(result);
          navigate("/");
        }
      })
      .catch((error) => {
        debugger;
        alert("서버 장애.");
      });
  };
  return (
    <LoginLayout
      title="로그인"
      description="Enter your ID and password to sign in"
      illustration={bgImage}
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
          <MDInput
            type="password"
            label="Password"
            fullWidth
            value={pw}
            onChange={handleSetPw}
            required
          />
        </MDBox>
        <MDBox mt={4} mb={1}>
          <MDButton variant="gradient" color="info" size="large" fullWidth onClick={loginHandler}>
            sign in
          </MDButton>
        </MDBox>
      </MDBox>
    </LoginLayout>
  );
}

export default Login;
