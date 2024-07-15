import { useEffect, useState } from "react";

// Material Dashboard 2 PRO React examples
import DashboardLayout from "layouts/common/LayoutContainers/DashboardLayout";
import DashboardNavbar from "layouts/common/Navbars/DashboardNavbar";
import { serverCommunicationUtil, sessionChecker } from "../../common/util/serverCommunicationUtil";
import Card from "@mui/material/Card";
import MDBox from "../../components/MDBox";
import MDTypography from "../../components/MDTypography";
import MDButton from "../../components/MDButton";
import MDInput from "../../components/MDInput";
import Grid from "@mui/material/Grid";
import DrivenAlert from "../../components/DrivenAlert";

function MyPage() {
  const [showPage, setShowPage] = useState(false);
  const [modifyMode, setModifyMode] = useState(false);
  const [passwordSetMode, setPasswordSetMode] = useState(false);
  const [companyName, setCompanyName] = useState("");
  const [id, setId] = useState("");
  const [mail, setMail] = useState("");
  const [name, setName] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [role, setRole] = useState("");
  const [userKind, setUserKind] = useState("");
  const [modifyDate, setModifyDate] = useState("");
  const [businessItem, setBusinessItem] = useState("");
  const [businessStatus, setBusinessStatus] = useState("");
  const [ceo, setCeo] = useState("");
  const [corporateAddress, setCorporateAddress] = useState("");
  const [corporateMail, setCorporateMail] = useState("");
  const [corporateNumber, setCorporateNumber] = useState("");
  const [useAlert, setUseAlert] = useState(false);
  const [alertColor, setAlertColor] = useState("info");
  const [alertText, setAlertText] = useState("");
  const [password, setPassword] = useState("");

  const passwordSetHandle = () => {
    serverCommunicationUtil("main", "axioPost", "/myPage/setPassword", {
      password: password,
    })
      .then((result) => {
        getValue();
        setPasswordSetMode(!passwordSetMode);
        setAlertColor("success");
        setAlertText("비밀번호가 변경되었습니다.");
        setUseAlert(true);
        setTimeout(() => {
          setUseAlert(false);
        }, 1500);
      })
      .catch((error) => {
        console.log("Error occurred while fetching the user list: ", error);
      });
  };

  const getValue = () => {
    serverCommunicationUtil("main", "axioGet", "/myPage/info", {})
      .then((result) => {
        setId(result.id);
        setModifyDate(result.modifyDate);
        setUserKind(result.userKind);

        if (result.userKind === "member") {
          setCompanyName(result.companyName);
          setMail(result.mail);
          setName(result.name);
          setPhoneNumber(result.phoneNumber);
          setRole(result.role);
        } else if (result.userKind === "company") {
          setBusinessItem(result.businessItem);
          setBusinessStatus(result.businessStatus);
          setCeo(result.ceo);
          setCompanyName(result.companyName);
          setCorporateAddress(result.corporateAddress);
          setCorporateMail(result.corporateMail);
          setCorporateNumber(result.corporateNumber);
        }
      })
      .catch((error) => {
        console.log("Error occurred while fetching the user list: ", error);
      });
  };

  useEffect(() => {
    sessionChecker().then((checkerResult) => {
      if (checkerResult === "success") {
        setShowPage(true);
      }
    });
    getValue();
  }, []);

  if (!showPage) {
    return null;
  }

  return (
    <DashboardLayout>
      {useAlert && <DrivenAlert alertColor={alertColor} alertText={alertText} />}
      <DashboardNavbar />
      <MDBox m={3}>
        <Card>
          <MDBox>
            <MDBox p={3}>
              <MDTypography variant="h4" fontWeight="medium">
                내 정보
              </MDTypography>
              <MDTypography variant="body2" color="text" fontWeight="regular">
                마지막 수정일 : {modifyDate}
              </MDTypography>
            </MDBox>
          </MDBox>
        </Card>
      </MDBox>
      <MDBox m={3}>
        <Card>
          <MDBox p={3}>
            <MDBox>
              <MDBox display={"flex"} justifyContent="space-between">
                <MDTypography variant="h5" fontWeight="medium" p={2}>
                  계정정보
                </MDTypography>
                <MDBox>
                  {!passwordSetMode && (
                    <MDButton
                      color={"info"}
                      size={"medium"}
                      variant={"gradient"}
                      onClick={() => {
                        setPasswordSetMode(!passwordSetMode);
                      }}
                    >
                      비밀번호 변경
                    </MDButton>
                  )}
                  {passwordSetMode && (
                    <MDButton
                      color={"success"}
                      size={"medium"}
                      variant={"gradient"}
                      onClick={() => {
                        passwordSetHandle();
                      }}
                    >
                      저장
                    </MDButton>
                  )}
                </MDBox>
              </MDBox>
              <Grid container>
                <Grid item p={2} xs={6}>
                  <MDInput
                    type="text"
                    variant="standard"
                    placeholder={"ID"}
                    label={"ID"}
                    value={id}
                    disabled={true}
                    fullWidth
                  />
                </Grid>
                <Grid item p={2} xs={6}>
                  {passwordSetMode && (
                    <MDInput
                      type="password"
                      variant="standard"
                      label={"Password"}
                      value={password}
                      onChange={(event) => {
                        setPassword(event.target.value);
                      }}
                      fullWidth
                    />
                  )}
                </Grid>
              </Grid>
            </MDBox>
          </MDBox>
        </Card>
      </MDBox>

      <MDBox m={3}>
        <Card>
          <MDBox p={3}>
            <MDBox>
              <MDBox display={"flex"} justifyContent="space-between">
                <MDTypography variant="h5" fontWeight="medium" p={2}>
                  기본정보
                </MDTypography>
                <MDBox>
                  {!modifyMode && (
                    <MDButton color={"info"} size={"medium"} variant={"gradient"}>
                      수정
                    </MDButton>
                  )}
                </MDBox>
              </MDBox>
              {userKind === "company" && (
                <Grid container>
                  <Grid item p={2} xs={6}>
                    <MDInput
                      type="text"
                      variant="standard"
                      label={"대표자명"}
                      value={ceo}
                      disabled={!modifyMode}
                      fullWidth
                    />
                  </Grid>
                  <Grid item p={2} xs={6}>
                    <MDInput
                      type="text"
                      variant="standard"
                      label={"상호"}
                      value={companyName}
                      disabled={!modifyMode}
                      fullWidth
                    />
                  </Grid>
                  <Grid item p={2} xs={6}>
                    <MDInput
                      type="text"
                      variant="standard"
                      label={"사업자등록번호"}
                      value={corporateNumber}
                      disabled={!modifyMode}
                      fullWidth
                    />
                  </Grid>
                  <Grid item p={2} xs={6}>
                    <MDInput
                      type="text"
                      variant="standard"
                      label={"소재지"}
                      value={corporateAddress}
                      disabled={!modifyMode}
                      fullWidth
                    />
                  </Grid>
                  <Grid item p={2} xs={6}>
                    <MDInput
                      type="text"
                      variant="standard"
                      label={"이메일"}
                      value={corporateMail}
                      disabled={!modifyMode}
                      fullWidth
                    />
                  </Grid>
                  <Grid item p={2} xs={6}>
                    <MDInput
                      type="text"
                      variant="standard"
                      label={"업태"}
                      value={businessStatus}
                      disabled={!modifyMode}
                      fullWidth
                    />
                  </Grid>
                  <Grid item p={2} xs={6}>
                    <MDInput
                      type="text"
                      variant="standard"
                      label={"품목"}
                      value={businessItem}
                      disabled={!modifyMode}
                      fullWidth
                    />
                  </Grid>
                </Grid>
              )}
              {userKind === "member" && (
                <Grid container>
                  <Grid item p={2} xs={6}>
                    <MDInput
                      type="text"
                      variant="standard"
                      label={"담당자명"}
                      value={name}
                      disabled={!modifyMode}
                      fullWidth
                    />
                  </Grid>
                  <Grid item p={2} xs={6}>
                    <MDInput
                      type="text"
                      variant="standard"
                      label={"회사명"}
                      value={companyName}
                      disabled={true}
                      fullWidth
                    />
                  </Grid>
                  <Grid item p={2} xs={6}>
                    <MDInput
                      type="text"
                      variant="standard"
                      label={"연락처"}
                      value={phoneNumber}
                      disabled={!modifyMode}
                      fullWidth
                    />
                  </Grid>
                  <Grid item p={2} xs={6}>
                    <MDInput
                      type="text"
                      variant="standard"
                      label={"이메일"}
                      value={mail}
                      disabled={!modifyMode}
                      fullWidth
                    />
                  </Grid>
                  <Grid item p={2} xs={6}>
                    <MDInput
                      type="text"
                      variant="standard"
                      label={"소속"}
                      value={role}
                      disabled={!modifyMode}
                      fullWidth
                    />
                  </Grid>
                </Grid>
              )}
            </MDBox>
          </MDBox>
        </Card>
      </MDBox>
    </DashboardLayout>
  );
}

export default MyPage;
