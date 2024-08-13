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
import CustsList from "./components/CustList";
import MDButton from "../../../components/MDButton";
import Icon from "@mui/material/Icon";
import CustClickModal from "./components/CustClickModal";
import CustSelectModal from "./components/CustSelectModal";

function OutBoundDistribution() {
  const [alertColor, setAlertColor] = useState("info");
  const [alertText, setAlertText] = useState("");
  const [useAlert, setUseAlert] = useState(false);
  const [showPage, setShowPage] = useState(false);
  const [custClickModalOpen, setCustClickModalOpen] = useState(false);
  const [custSelectModalOpen, setCustSelectModalOpen] = useState(false);

  const [custDbList, setCustDbList] = useState([]);
  const [selectCode, setSelectCode] = useState();
  const [custList, setCustList] = useState({});
  const [employeeList, setEmployeeList] = useState([]);
  const [selectCustIdx, setSelectCustIdx] = useState();
  const [selectCustIdxs, setSelectCustIdxs] = useState([]);

  const navigate = useNavigate();

  const handleCustClickModalOpen = () => setCustClickModalOpen(true);
  const handleCustClickModalClose = () => {
    setCustClickModalOpen(false);
    setSelectCustIdx(null);
  };
  const handleCustSelectModalOpen = () => setCustSelectModalOpen(true);
  const handleCustSelectModalClose = () => {
    setCustSelectModalOpen(false);
    setSelectCustIdx(null);
    setSelectCustIdxs([]);
  };

  const getCustDbList = () => {
    serverCommunicationUtil("main", "axioGet", "/call/custDbList", {})
      .then((result) => {
        setSelectCode(null);
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

  const getCustList = (code) => {
    serverCommunicationUtil("main", "axioPost", "/call/custList", {
      cdbtCode: code,
    })
      .then((result) => {
        setSelectCode(code);
        if (result.length != 0) {
          let columnList = [];
          let custInfoList = [];
          result[0].detail.forEach((detail) => {
            columnList.push({ value: detail.key, sort: detail.displayOrdering });
          });

          result.forEach((data) => {
            let custInfo = {};
            data.detail.forEach((detail) => {
              custInfo[detail.key] = detail.value;
            });
            custInfo["idx"] = data.idx;
            custInfoList.push(custInfo);
          });

          columnList.sort((a, b) => {
            return a.sort - b.sort;
          });

          setCustList({
            columnList: columnList,
            custInfo: custInfoList,
          });
        } else {
          setCustList({
            columnList: [],
            custInfo: [],
          });

          throw DOMException("not pound");
        }
      })
      .catch((error) => {
        setAlertColor("error");
        setAlertText("데이터가 없습니다.");
        setUseAlert(true);
        setTimeout(() => {
          setUseAlert(false);
        }, 1500);
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
          tempEmployee.assignedCustomer = result[i].outboundList;

          tempEmployee.assignedCustomer.forEach((data) => {
            data.setting.sort((a, b) => {
              return a.displayOrderingNumber - b.displayOrderingNumber;
            });
          });

          tempEmployeeList.push(tempEmployee);
        }
        setEmployeeList(tempEmployeeList);
      })
      .catch((error) => {
        console.log("");
      });
  };

  useEffect(() => {}, [custList]);

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

  const selectSaveHandle = () => {
    handleCustSelectModalOpen();
  };

  const custClickModalOpenHandle = (idx) => {
    setSelectCustIdx(idx);
    handleCustClickModalOpen();
  };

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
          <MDBox display="block" style={{ textAlign: "center" }} p={2}>
            <MDButton
              variant="gradient"
              color="info"
              style={{ whiteSpace: "nowrap", marginTop: "20%" }}
              size="large"
              disabled={selectCustIdxs.length === 0}
              onClick={() => selectSaveHandle()}
            >
              <Icon>add</Icon>
              &nbsp;선택저장
            </MDButton>
          </MDBox>
        </MDBox>
        <MDBox display="flex" justifyContent="space-between">
          <MDBox sx={{ width: "100%" }}>
            <CategoriesList
              custDBs={custDbList}
              title="고객 DB 목록"
              getListFunction={getCustList}
            />
          </MDBox>
          <MDBox sx={{ width: "100%", marginX: "1%" }}>
            {custList?.custInfo?.length > 0 ? (
              <CustsList
                custs={custList}
                title={"고객 목록"}
                rowClickFunction={custClickModalOpenHandle}
                selectCustIdxs={selectCustIdxs}
                setSelectCustIdxs={setSelectCustIdxs}
              />
            ) : (
              <Card sx={{ width: "100%", marginX: "1%" }}>
                <MDTypography variant="body2" color="text" fontWeight="regular">
                  고객 DB를 선택해 주세요
                </MDTypography>
              </Card>
            )}
          </MDBox>
          <MDBox sx={{ width: "100%" }}>
            <EmployeeList title={"직원 목록"} employees={employeeList} />
          </MDBox>
        </MDBox>
      </MDBox>
      {custClickModalOpen && (
        <CustClickModal
          open={custClickModalOpen}
          handleClose={handleCustClickModalClose}
          setAlertColor={setAlertColor}
          setAlertText={setAlertText}
          setUseAlert={setUseAlert}
          selectCustIdx={selectCustIdx}
          employeeList={employeeList}
          getList={getCustDbList}
          getList2={getEmployeeList}
        />
      )}
      {custSelectModalOpen && (
        <CustSelectModal
          open={custSelectModalOpen}
          handleClose={handleCustSelectModalClose}
          setAlertColor={setAlertColor}
          setAlertText={setAlertText}
          setUseAlert={setUseAlert}
          selectCustIdxs={selectCustIdxs}
          employeeList={employeeList}
          getList={getCustDbList}
          getList2={getEmployeeList}
        />
      )}
    </DashboardLayout>
  );
}

export default OutBoundDistribution;
