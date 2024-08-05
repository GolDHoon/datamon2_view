import DashboardLayout from "../../common/LayoutContainers/DashboardLayout";
import { useEffect, useState } from "react";
import DrivenAlert from "../../../components/DrivenAlert";
import DashboardNavbar from "../../common/Navbars/DashboardNavbar";
import MDBox from "../../../components/MDBox";
import {
  serverCommunicationUtil,
  sessionChecker,
} from "../../../common/util/serverCommunicationUtil";
import { getSessionStorage } from "../../../common/common";
import { useNavigate } from "react-router-dom";
import MDTypography from "../../../components/MDTypography";
import Card from "@mui/material/Card";
import CategoriesList from "./components/CustDBList";
import EmployeeList from "./components/EmployeeList";

function OutBoundDistribution() {
  const [alertColor, setAlertColor] = useState("info");
  const [alertText, setAlertText] = useState("");
  const [useAlert, setUseAlert] = useState(false);
  const [showPage, setShowPage] = useState(false);

  const [custDbList, setCustDbList] = useState([]);
  const [selectCode, setSelectCode] = useState();
  const [custList, setCustList] = useState([]);
  const [employeeList, setEmployeeList] = useState([]);

  const navigate = useNavigate();

  const getCustDbList = () => {
    serverCommunicationUtil("main", "axioGet", "/call/custDbList", {})
      .then((result) => {
        var tempCustDbList = [];

        for (var i = 0; i < result.length; i++) {
          var tempCustDb = {};
          tempCustDb.name = result[i].dbName;
          tempCustDb.code = result[i].code;
          if (result[i].code.includes("LPGE")) {
            tempCustDb.icon = "html";
            tempCustDb.color = "dark";
          }
          tempCustDbList.push(tempCustDb);
        }
        setCustDbList(tempCustDbList);
      })
      .catch((error) => {
        console.log("");
      });
  };

  const getCustList = () => {
    serverCommunicationUtil("main", "axioPost", "/call/custList", {
      cdbtCode: selectCode,
    })
      .then((result) => {
        console.log(result);
      })
      .catch((error) => {
        console.log("");
      });
  };

  const getEmployeeList = () => {
    serverCommunicationUtil("main", "axioGet", "/call/employeeList", {})
      .then((result) => {
        var tempEmployeeList = [];

        for (var i = 0; i < result.length; i++) {
          var tempEmployee = {};
          tempEmployee.idx = result[i].userId;
          tempEmployee.name = result[i].name;
          tempEmployee.role = result[i].role;
          tempEmployee.useYn = result[i].useYn;
          tempEmployee.assignedCustomer = [];

          tempEmployeeList.push(tempEmployee);
        }
        setEmployeeList(tempEmployeeList);
      })
      .catch((error) => {
        console.log("");
      });
  };

  useEffect(() => {
    getCustList();
  }, [selectCode]);

  useEffect(() => {
    getCustDbList();
    getEmployeeList();
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

  return (
    <DashboardLayout>
      {useAlert && <DrivenAlert alertColor={alertColor} alertText={alertText} />}
      <DashboardNavbar />
      <MDBox my={3}>
        <MDBox display="flex" justifyContent="space-between">
          <MDBox height="100%" mt={0.5} lineHeight={1} p={2}>
            <MDTypography variant="h4" fontWeight="medium">
              Outbound 분배
            </MDTypography>
            <MDTypography variant="body2" color="text" fontWeight="regular">
              수집된 고객 DB에서 각 직원들에게 OutBound를 분배
            </MDTypography>
          </MDBox>
        </MDBox>
        <MDBox display="flex" justifyContent="space-between">
          <MDBox sx={{ width: "100%" }}>
            <CategoriesList
              custDBs={custDbList}
              title="고객 DB 목록"
              clickFunction={setSelectCode}
            />
          </MDBox>
          <Card sx={{ width: "100%", marginX: "1%" }}>
            {selectCode ? (
              <MDTypography variant="body2" color="text" fontWeight="regular">
                고객 DB를 선택해 주세요
              </MDTypography>
            ) : (
              <MDTypography variant="body2" color="text" fontWeight="regular">
                고객 DB를 선택해 주세요
              </MDTypography>
            )}
          </Card>
          <MDBox sx={{ width: "100%" }}>
            <EmployeeList title={"직원 목록"} employees={employeeList} />
          </MDBox>
        </MDBox>
      </MDBox>
    </DashboardLayout>
  );
}

export default OutBoundDistribution;
