import { useEffect, useState } from "react";
import ReactDOM from "react-dom";

// @mui material components
import Card from "@mui/material/Card";
import Icon from "@mui/material/Icon";

// Material Dashboard 2 PRO React components
import MDBox from "components/MDBox";
import MDButton from "components/MDButton";

// Material Dashboard 2 PRO React examples
import Footer from "layouts/common/Footer";
import DashboardLayout from "layouts/common/LayoutContainers/DashboardLayout";
import DashboardNavbar from "layouts/common/Navbars/DashboardNavbar";
import DataTable from "layouts/user/userListByMaster/DataTable";
import dataTableData from "layouts/user/userListByMaster/data/dataTableData";
import {
  serverCommunicationUtil,
  sessionChecker,
} from "../../../common/util/serverCommunicationUtil";
import MDTypography from "../../../components/MDTypography";

import { Modal } from "@mui/material";
import Grid from "@mui/material/Grid";
import { Form, Formik } from "formik";

import UserInfo from "./components/UserInfo";

import form from "./schemas/form";
import initialValues from "./schemas/initialValues";
import validations from "./schemas/validations";
import DrivenTable from "../../../components/DrivenTable";
import MDAlert from "../../../components/MDAlert";
import DrivenAlert from "../../../components/DrivenAlert";

function UserInfoListByMaster() {
  const [alertColor, setAlertColor] = useState("info");
  const [alertText, setAlertText] = useState("");
  const [useAlert, setUseAlert] = useState(false);
  const [rows, setRows] = useState([]);
  const [keyList, setKeyList] = useState([]);
  const [columns, setCoulumns] = useState([]);
  const [showPage, setShowPage] = useState(false);
  const [open, setOpen] = useState(false);
  const [valueMap, setValueMap] = useState({
    idValue: "",
    pwValue: "",
    companyValue: "",
    corporateNumberValue: "",
    nameValue: "",
    addressValue: "",
    itemValue: "",
    statusValue: "",
    emailValue: "",
  });
  const { formId, formField } = form;
  let alertRender = null;

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const handleSubmit = (values, actions) => {};
  const saveHandler = () => {
    serverCommunicationUtil("main", "axioPost", "/user/createCompanyUser", {
      userId: valueMap.idValue,
      pw: valueMap.pwValue,
      name: valueMap.companyValue,
      ceo: valueMap.nameValue,
      corporateNumber: valueMap.corporateNumberValue,
      corporateAddress: valueMap.addressValue,
      corporateMail: valueMap.emailValue,
      businessStatus: valueMap.statusValue,
      businessItem: valueMap.itemValue,
    })
      .then((result) => {
        getList();
        handleClose();
        setAlertColor("success");
        setAlertText("생성이 완료되었습니다.");
        setUseAlert(true);
        setTimeout(() => {
          setUseAlert(false);
        }, 3000);
      })
      .catch((error) => {
        console.log("Error occurred while fetching the user list: ", error);
      });
  };

  const deleteHandler = (idx) => {
    serverCommunicationUtil("main", "axioPost", "/user/deleteCompanyUser", {
      idx: idx,
    })
      .then((result) => {
        getList();
        setAlertColor("success");
        setAlertText("삭제가 완료되었습니다.");
        setUseAlert(true);
        setTimeout(() => {
          setUseAlert(false);
        }, 3000);
      })
      .catch((error) => {
        console.log("Error occurred while fetching the user list: ", error);
      });
  };

  const getList = () => {
    serverCommunicationUtil("main", "axioGet", "/user/list", {
      listType: "company",
    })
      .then((result) => {
        setRows(result.rows);

        var columnsData = [];
        for (var i = 0; i < result.keyList.length; i++) {
          var key = result.keyList[i];
          columnsData.push({ name: key, width: "10%" });
        }

        setCoulumns(columnsData);

        setKeyList(result.keyList);
      })
      .catch((error) => {
        console.log("Error occurred while fetching the user list: ", error);
      });
  };

  useEffect(() => {
    getList();
  }, []);

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
    boxShadow: 24,
    p: 4,
  };

  return (
    <DashboardLayout sx={{ display: "relative" }}>
      {useAlert && <DrivenAlert alertColor={alertColor} alertText={alertText} />}
      <DashboardNavbar />
      <MDBox my={3}>
        <MDBox display="flex" justifyContent="space-between">
          <MDBox height="100%" mt={0.5} lineHeight={1} p={2}>
            <MDTypography variant="h4" fontWeight="medium">
              유저 정보 리스트
            </MDTypography>
            <MDTypography variant="body2" color="text" fontWeight="regular">
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
          <DrivenTable
            rows={rows}
            columns={columns}
            useDel={true}
            handleDel={deleteHandler}
            useModify={false}
            useSearch={true}
            useSort={true}
            usePaging={true}
          />
          {/*<DataTable table={dataTableData(rows, keyList)} entriesPerPage={true} canSearch />*/}
        </Card>
      </MDBox>
      <Footer />
      <div style={{ margin: "25%" }}>
        <Modal
          open={open}
          aria-labelledby="modal-modal-title"
          aria-describedby="modal-modal-description"
        >
          <Card sx={style} id="popup">
            <Grid container justifyContent="center" alignItems="center">
              <Grid width="100%">
                <Formik
                  initialValues={initialValues}
                  validationSchema={validations[0]}
                  onSubmit={handleSubmit}
                >
                  {({ values, errors, touched, isSubmitting }) => (
                    <Form id={formId} autoComplete="off">
                      <MDBox>
                        <UserInfo
                          formData={{ values, touched, formField, errors }}
                          valueMap={valueMap}
                          setValueMap={setValueMap}
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
                          <MDButton color="dark" onClick={handleClose}>
                            취소
                          </MDButton>
                        </MDBox>
                      </MDBox>
                    </Form>
                  )}
                </Formik>
              </Grid>
            </Grid>
          </Card>
        </Modal>
      </div>
    </DashboardLayout>
  );
}

export default UserInfoListByMaster;