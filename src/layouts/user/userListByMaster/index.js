import { useEffect, useState } from "react";

// @mui material components
import Card from "@mui/material/Card";
import Icon from "@mui/material/Icon";

// Material Dashboard 2 PRO React components
import MDBox from "components/MDBox";
import MDButton from "components/MDButton";

// Material Dashboard 2 PRO React examples
import DashboardLayout from "layouts/common/LayoutContainers/DashboardLayout";
import DashboardNavbar from "layouts/common/Navbars/DashboardNavbar";
import Footer from "layouts/common/Footer";
import DataTable from "layouts/user/userListByMaster/DataTable";
import dataTableData from "layouts/user/userListByMaster/data/dataTableData";
import {
  serverCommunicationUtil,
  sessionChecker,
} from "../../../common/util/serverCommunicationUtil";
import { useNavigate } from "react-router-dom";
import Checkbox from "@mui/material/Checkbox";
import MDTypography from "../../../components/MDTypography";

import { Modal } from "@mui/material";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import { Form, Formik } from "formik";

import UserInfo from "./components/UserInfo";

import form from "./schemas/form";
import initialValues from "./schemas/initialValues";
import validations from "./schemas/validations";

function UserInfoListByMaster() {
  const [rows, setRows] = useState([]);
  const [keyList, setKeyList] = useState([]);
  const [showPage, setShowPage] = useState(false);
  const [open, setOpen] = useState(false);
  const { formId, formField } = form;

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const handleSubmit = (values, actions) => {};

  serverCommunicationUtil("main", "axioGet", "/user/list", {
    listType: "company",
  })
    .then((result) => {
      setRows(result.rows);
      setKeyList(result.keyList);
    })
    .catch((error) => {
      console.log("Error occurred while fetching the user list: ", error);
    });

  useEffect(() => {
    sessionChecker().then((checkerResult) => {
      if (checkerResult === "success") {
        setShowPage(true);
      }
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
    "border-radius": "15px",
    boxShadow: 24,
    p: 4,
  };

  return (
    <DashboardLayout>
      <DashboardNavbar />
      <MDBox my={3}>
        <MDBox display="flex" justifyContent="space-between">
          <MDBox height="100%" mt={0.5} lineHeight={1} p={2}>
            <MDTypography variant="h2" fontWeight="medium">
              유저 정보 리스트
            </MDTypography>
            <MDTypography variant="h4" color="text" fontWeight="regular">
              유저 정보 리스트 소개 표시 유저 정보 리스트 소개 표시
            </MDTypography>
          </MDBox>
          <MDBox display="block" style={{ textAlign: "center" }} p={2}>
            <MDButton
              variant="gradient"
              color="info"
              style={{ whiteSpace: "nowrap", marginTop: "20%" }}
              size="large"
              onClick={handleOpen}
            >
              <Icon>add</Icon>
              &nbsp;신규 생성
            </MDButton>
          </MDBox>
        </MDBox>
        <Card>
          {<DataTable table={dataTableData(rows, keyList)} entriesPerPage={true} canSearch />}
        </Card>
      </MDBox>
      <Footer />
      <div style={{ margin: "25%" }}>
        <Modal
          open={open}
          aria-labelledby="modal-modal-title"
          aria-describedby="modal-modal-description"
        >
          <Box sx={style} id="popup">
            <Grid container justifyContent="center" alignItems="center">
              <Grid width="100%">
                <Formik
                  initialValues={initialValues}
                  validationSchema={validations}
                  onSubmit={handleSubmit}
                >
                  {({ values, errors, touched, isSubmitting }) => (
                    <Form id={formId} autoComplete="off">
                      <MDBox>
                        <UserInfo formData={{ values, touched, formField, errors }} />
                        <MDBox mt={2} width="100%" display="flex" justifyContent="flex-end">
                          <MDButton variant="gradient" color="info" style={{ margin: "0 2% 0 0" }}>
                            완료
                          </MDButton>
                          <MDButton MDButton color="black" onClick={handleClose}>
                            취소
                          </MDButton>
                        </MDBox>
                      </MDBox>
                    </Form>
                  )}
                </Formik>
              </Grid>
            </Grid>
          </Box>
        </Modal>
      </div>
    </DashboardLayout>
  );
}

export default UserInfoListByMaster;
