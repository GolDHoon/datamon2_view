import DrivenAlert from "../../../components/DrivenAlert";
import DashboardNavbar from "../../common/Navbars/DashboardNavbar";
import React, { useEffect, useState } from "react";
import DashboardLayout from "../../common/LayoutContainers/DashboardLayout";
import {
  serverCommunicationUtil,
  sessionChecker,
} from "../../../common/util/serverCommunicationUtil";
import { getSessionStorage } from "../../../common/common";
import { useNavigate } from "react-router-dom";
import MDBox from "../../../components/MDBox";
import MDTypography from "../../../components/MDTypography";
import Card from "@mui/material/Card";
import DrivenTable from "../../../components/DrivenTable";

function OutboundTotalList() {
  const [showPage, setShowPage] = useState(false);
  const [alertColor, setAlertColor] = useState("info");
  const [alertText, setAlertText] = useState("");
  const [useAlert, setUseAlert] = useState(false);

  const [rows, setRows] = useState([]);
  const [columns, setColumns] = useState([]);

  const navigate = useNavigate();

  const getList = () => {
    serverCommunicationUtil("main", "axioPost", "/call/outbound/listByUser/total", {})
      .then((result) => {
        setRows(result);

        var columnsData = [];
        for (var i = 0; i < Object.keys(result[0]).length; i++) {
          var key = Object.keys(result[0])[i];
          columnsData.push({ name: key, width: "13%", type: "text" });
        }
        setColumns(columnsData);
      })
      .catch((error) => {
        console.log("Error occurred while fetching the user list: ", error);
      });
  };

  useEffect(() => {
    sessionChecker()
      .then((checkerResult) => {
        if (checkerResult === "success") {
          setShowPage(true);
          getList();
        } else {
          navigate("/" + getSessionStorage("companyId") + "/login");
        }
      })
      .catch((error) => navigate("/" + getSessionStorage("companyId") + "/login"));
  }, []);

  if (!showPage) {
    return null; // 혹은 로딩 스피너 등을 반환.
  }

  return (
    <DashboardLayout>
      {useAlert && <DrivenAlert alertColor={alertColor} alertText={alertText} />}
      <DashboardNavbar />
      <MDBox my={3}>
        <MDBox my={3}>
          <MDBox display="flex" justifyContent="space-between">
            <MDBox height="100%" mt={0.5} lineHeight={1} p={2}>
              <MDTypography variant="h4" fontWeight="medium">
                Outbound 전체 목록
              </MDTypography>
              <MDTypography variant="body2" color="text" fontWeight="regular">
                Outbound 목록
              </MDTypography>
            </MDBox>
            <MDBox display="block" style={{ textAlign: "center" }} p={2}></MDBox>
          </MDBox>
        </MDBox>
        <Card>
          <DrivenTable
            rows={rows}
            columns={columns}
            useDel={false}
            useModify={false}
            useSearch={true}
            useSort={true}
            usePaging={true}
            entries={["10", "25", "50", "100"]}
          />
        </Card>
      </MDBox>
    </DashboardLayout>
  );
}

export default OutboundTotalList;
