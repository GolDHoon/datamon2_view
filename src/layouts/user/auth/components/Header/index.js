import { useState } from "react";

// @mui material components
import Card from "@mui/material/Card";
import Grid from "@mui/material/Grid";

// Material Dashboard 2 PRO React components
import MDBox from "components/MDBox";
import MDTypography from "components/MDTypography";

// Images
import MDButton from "../../../../../components/MDButton";
import Icon from "@mui/material/Icon";
import { Modal } from "@mui/material";
import MemberInvite from "../MemberInvite";
import { serverCommunicationUtil } from "../../../../../common/util/serverCommunicationUtil";
import PropTypes from "prop-types";
import DrivenAlert from "../../../../../components/DrivenAlert";

function Header({ selectedCdbt, reLoadHandler }) {
  const [alertColor, setAlertColor] = useState("info");
  const [alertText, setAlertText] = useState("");
  const [useAlert, setUseAlert] = useState(false);
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const [visible, setVisible] = useState(true);
  const handleSetVisible = () => setVisible(!visible);
  const [saveUserList, setSaveUserList] = useState([]);

  const saveHandler = () => {
    serverCommunicationUtil("main", "axioPost", "/userAuth/createUserCdbtMappingByCopanyAndCdbt", {
      cdbtLowCode: selectedCdbt,
      idxs: saveUserList,
    })
      .then((result) => {
        setSaveUserList([]);
        handleClose();
        reLoadHandler();
        setAlertColor("success");
        setAlertText("생성이 완료되었습니다.");
        setUseAlert(true);
        setTimeout(() => {
          setUseAlert(false);
        }, 1500);
      })
      .catch((error) => {
        console.log("");
      });
    console.log(saveUserList);
  };

  const style = {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: "50%",
    bgcolor: "background.paper",
    boxShadow: 24,
    p: 4,
  };

  return (
    <Card>
      {useAlert && <DrivenAlert alertColor={alertColor} alertText={alertText} />}
      <MDBox display="flex" justifyContent="space-between">
        <MDBox p={4}>
          <MDTypography variant="h2" fontWeight="medium" style={{ marginBottom: 8 }}>
            멤버 목록
          </MDTypography>
          <MDTypography variant="h4" color="text" fontWeight="regular">
            {selectedCdbt === "" ? "왼쪽의 고객 DB를 선택해주세요." : "고객DB의 유저 리스트"}
          </MDTypography>
        </MDBox>
        <MDBox p={2}>
          {selectedCdbt && (
            <MDButton
              variant="gradient"
              color="info"
              style={{ whiteSpace: "nowrap", marginTop: "50%" }}
              size="large"
              onClick={handleOpen}
            >
              <Icon>add</Icon>
              &nbsp;맴버 초대
            </MDButton>
          )}
          <Modal
            open={open}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
          >
            <Card sx={style} id="popup" style={{ height: "fit-content" }}>
              <Grid container justifyContent="center" alignItems="center">
                <Grid width="100%">
                  <MDBox>
                    <MemberInvite
                      selectedCdbt={selectedCdbt}
                      saveUserList={saveUserList}
                      setSaveUserList={setSaveUserList}
                    />
                    <MDBox mt={2} width="100%" display="flex" justifyContent="flex-end">
                      <MDButton
                        variant="gradient"
                        color="info"
                        style={{ margin: "0 2% 0 0" }}
                        onClick={saveHandler}
                      >
                        완료
                      </MDButton>
                      <MDButton
                        color="dark"
                        onClick={() => {
                          setSaveUserList([]);
                          handleClose();
                        }}
                      >
                        취소
                      </MDButton>
                    </MDBox>
                  </MDBox>
                </Grid>
              </Grid>
            </Card>
          </Modal>
        </MDBox>
      </MDBox>
    </Card>
  );
}
Header.propTypes = {
  selectedCdbt: PropTypes.string,
  reLoadHandler: PropTypes.func,
};

export default Header;
