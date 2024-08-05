import { useEffect, useState } from "react";

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
import { useNavigate } from "react-router-dom";
import {
  serverCommunicationUtil,
  sessionChecker,
} from "../../../common/util/serverCommunicationUtil";
import MDTypography from "../../../components/MDTypography";
import DrivenTable from "../../../components/DrivenTable";
import DrivenAlert from "../../../components/DrivenAlert";
import Modal from "./components/Modal";
import { getSessionStorage } from "../../../common/common";

function UserInfoListByMemeber() {
  const [alertColor, setAlertColor] = useState("info");
  const [alertText, setAlertText] = useState("");
  const [useAlert, setUseAlert] = useState(false);

  const [rows, setRows] = useState([]);
  const [columns, setCoulumns] = useState([]);
  const [showPage, setShowPage] = useState(false);
  const [open, setOpen] = useState(false);

  const navigate = useNavigate();

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const deleteHandler = (idx) => {
    serverCommunicationUtil("main", "axioPost", "/user/deleteMemberUser", {
      idx: idx,
    })
      .then((result) => {
        getList();
        setAlertColor("success");
        setAlertText("삭제가 완료되었습니다.");
        setUseAlert(true);
        setTimeout(() => {
          setUseAlert(false);
        }, 1500);
      })
      .catch((error) => {
        console.log("Error occurred while fetching the user list: ", error);
      });
  };

  const getList = () => {
    serverCommunicationUtil("main", "axioGet", "/user/list", {
      listType: "user",
    })
      .then((result) => {
        setRows(result.rows);

        var columnsData = [];
        for (var i = 0; i < result.keyList.length; i++) {
          var key = result.keyList[i];
          columnsData.push({ name: key, width: "17%", type: "text" });
        }

        setCoulumns(columnsData);
      })
      .catch((error) => {
        console.log("");
      });
  };

  useEffect(() => {
    getList();
  }, []);

  useEffect(() => {
    sessionChecker()
      .then((checkerResult) => {
        if (checkerResult === "success") {
          setShowPage(true);
        } else {
          navigate("/" + getSessionStorage("companyId") + "/login");
        }
      })
      .catch((error) => navigate("/" + getSessionStorage("companyId") + "/login"));
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
            entries={["10", "25", "50", "100"]}
          />
        </Card>
      </MDBox>
      <Footer />
      <Modal
        open={open}
        handleClose={handleClose}
        setAlertColor={setAlertColor}
        setAlertText={setAlertText}
        setUseAlert={setUseAlert}
        getList={getList}
      />
    </DashboardLayout>
  );
}

export default UserInfoListByMemeber;
