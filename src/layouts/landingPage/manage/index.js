import { useEffect, useState } from "react";

// @mui material components
import { Modal } from "@mui/material";
import Card from "@mui/material/Card";
import Grid from "@mui/material/Grid";
import Icon from "@mui/material/Icon";

// Material Dashboard 2 PRO React components
import MDBox from "../../../components/MDBox";
import MDButton from "../../../components/MDButton";

// Material Dashboard 2 PRO React examples
import {
  serverCommunicationUtil,
  sessionChecker,
} from "../../../common/util/serverCommunicationUtil";
import MDTypography from "../../../components/MDTypography";
import Footer from "../../common/Footer";
import DashboardLayout from "../../common/LayoutContainers/DashboardLayout";
import DashboardNavbar from "../../common/Navbars/DashboardNavbar";
import DataTable from "../../landingPage/manage/DataTable";
import dataTableData from "../../landingPage/manage/data/dataTableData";

import BlackInfo from "../../landingPage/manage/components/BlackInfo";

function LandingPageManagement() {
  const [rows, setRows] = useState([]);
  const [keyList, setKeyList] = useState([]);
  const [showPage, setShowPage] = useState(false);

  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  useEffect(() => {
    sessionChecker().then((checkerResult) => {
      if (checkerResult === "success") {
        setShowPage(true);
      }
    });

    serverCommunicationUtil("main", "axioGet", "/landingPageManage/list", {})
      .then((result) => {
        setRows(result.rows);
        setKeyList(result.keyList);
      })
      .catch((error) => {
        console.log("");
      });
  }, []);

  if (!showPage) {
    return null; // 혹은 로딩 스피너 등을 반환.
  }

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
    <DashboardLayout>
      <DashboardNavbar />
      {/* 차단 IP ------------------------------------------*/}
      <MDBox display="block" style={{ textAlign: "center" }} p={2}>
        <MDButton
          variant="gradient"
          color="info"
          style={{ whiteSpace: "nowrap", marginTop: "20%" }}
          size="large"
          onClick={handleOpen}
        >
          &nbsp;차단 IP
        </MDButton>
      </MDBox>
      <Modal
        open={open}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Card sx={style} id="popup" style={{ height: "fit-content" }}>
          <Grid container justifyContent="center" alignItems="center">
            <Grid width="100%">
              <MDBox>
                <BlackInfo />
                <MDBox mt={2} width="100%" display="flex" justifyContent="flex-end">
                  <MDButton
                    variant="gradient"
                    color="info"
                    style={{ margin: "0 2% 0 0" }}
                    // onClick={saveHandler}
                  >
                    완료
                  </MDButton>
                  <MDButton color="dark" onClick={handleClose}>
                    취소
                  </MDButton>
                </MDBox>
              </MDBox>
            </Grid>
          </Grid>
        </Card>
      </Modal>
      {/* 차단 IP ------------------------------------------ */}
      <MDBox my={3}>
        <MDBox display="flex" justifyContent="space-between">
          <MDBox height="100%" mt={0.5} lineHeight={1} p={2}>
            <MDTypography variant="h4" fontWeight="medium">
              랜딩페이지 관리
            </MDTypography>
            <MDTypography variant="body2" color="text" fontWeight="regular">
              랜딩페이지 목록 및 랜딩페이지 관리화면입니다.
            </MDTypography>
          </MDBox>
          <MDBox display="block" style={{ textAlign: "center" }} p={2}>
            <MDButton
              variant="gradient"
              color="info"
              style={{ whiteSpace: "nowrap", marginTop: "20%" }}
              size="large"
            >
              <Icon>add</Icon>
              &nbsp;신규 생성
            </MDButton>
          </MDBox>
        </MDBox>
        <Card>{<DataTable table={dataTableData(rows, keyList)} />}</Card>
      </MDBox>
      <Footer />
    </DashboardLayout>
  );
}

export default LandingPageManagement;
