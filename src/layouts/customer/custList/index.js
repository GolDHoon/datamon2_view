import { useEffect, useState } from "react";

// @mui material components
import Card from "@mui/material/Card";
import Icon from "@mui/material/Icon";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";

// Material Dashboard 2 PRO React components
import MDBox from "components/MDBox";
import MDButton from "components/MDButton";
import MDTypography from "../../../components/MDTypography";

// Material Dashboard 2 PRO React examples
import Checkbox from "@mui/material/Checkbox";
import Footer from "layouts/common/Footer";
import DashboardLayout from "layouts/common/LayoutContainers/DashboardLayout";
import DashboardNavbar from "layouts/common/Navbars/DashboardNavbar";
import DataTable from "layouts/customer/custList/DataTable";
import dataTableData from "layouts/customer/custList/data/dataTableData";
import { useNavigate } from "react-router-dom";
import { getSessionStorage } from "../../../common/common";
import {
  serverCommunicationUtil,
  sessionChecker,
} from "../../../common/util/serverCommunicationUtil";
import DrivenAlert from "../../../components/DrivenAlert";
import DrivenTable from "../../../components/DrivenTable";

function CustInfoList() {
  const [alertColor, setAlertColor] = useState("info");
  const [alertText, setAlertText] = useState("");
  const [useAlert, setUseAlert] = useState(false);
  const [rows, setRows] = useState([]);
  const [columns, setColumns] = useState([]);
  const [keyList, setKeyList] = useState([]);
  const [showPage, setShowPage] = useState(false);

  const navigate = useNavigate();

  const useYnSwitch = (switchParam, rowIdx, switchValue) => {
    console.log("테스트");
  };

  const delYnSwitch = (switchParam, rowIdx, switchValue) => {
    console.log("테스트");
  };

  useEffect(() => {
    if (
      getSessionStorage("selectedCustDB") === null ||
      getSessionStorage("selectedCustDB") === "undefined"
    ) {
      setAlertColor("error");
      setAlertText("고객DB를 선택해주세요");
      setUseAlert(true);
      setTimeout(() => {
        setUseAlert(false);
        navigate("/");
      }, 1500);
      return;
    }
  }, []);

  function exportToCsv(rows, originalKeys) {
    var headerRow = "";
    columns.forEach((column) => {
      if (!(column.name === "허수여부" || column.name === "IP" || column.name === "삭제여부")) {
        headerRow = headerRow + column.name.toString() + ",";
      }
    });

    var csvContent = "";

    rows.forEach((row) => {
      columns.forEach((column) => {
        if (!(column.name === "허수여부" || column.name === "IP" || column.name === "삭제여부")) {
          var cell = row[column.name] !== " " ? row[column.name].toString() : "";
          csvContent = csvContent + cell + ",";
        }
      });

      csvContent = csvContent + "\n";
    });

    const csvWithHeaders = `${headerRow}\n${csvContent}`;

    const BOM = "\uFEFF";
    const csvWithBOM = `${BOM}${csvWithHeaders}`;

    const blob = new Blob([csvWithBOM], { type: "text/csv;charset=utf-8;" });

    const url = URL.createObjectURL(blob);

    const link = document.createElement("a");
    link.href = url;
    link.style.visibility = "hidden";
    link.download = "Export.csv";
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  }

  const getList = () => {
    serverCommunicationUtil("main", "axioPost", "/custInfo/list", {
      lpgeCode: getSessionStorage("selectedCustDB").code,
    })
      .then((result) => {
        setRows(result.rows);

        var columnsData = [];
        for (var i = 0; i < result.keyList.length; i++) {
          var key = result.keyList[i];
          columnsData.push({ name: key, width: "150px", type: "text" });
        }
        columnsData.push({ name: "sourse", width: "150px", type: "text" });
        columnsData.push({ name: "medium", width: "150px", type: "text" });
        columnsData.push({ name: "campaign", width: "250px", type: "text" });
        columnsData.push({ name: "term", width: "250px", type: "text" });
        columnsData.push({ name: "content", width: "250px", type: "text" });
        columnsData.push({ name: "IP", width: "150px", type: "text" });
        columnsData.push({
          name: "허수여부",
          width: "100px",
          type: "switch",
          switchParam: [],
          switchFunction: (switchParam, rowIdx, switchValue) =>
            useYnSwitch(switchParam, rowIdx, switchValue),
        });
        columnsData.push({
          name: "삭제여부",
          width: "100px",
          type: "switch",
          switchParam: [],
          switchFunction: (switchParam, rowIdx, switchValue) =>
            delYnSwitch(switchParam, rowIdx, switchValue),
        });
        columnsData.push({ name: "생성일", width: "200px", type: "text" });
        columnsData.push({ name: "수정일", width: "200px", type: "text" });

        setColumns(columnsData);
      })
      .catch((error) => {
        console.log("");
      });
  };

  useEffect(() => {
    sessionChecker()
      .then((checkerResult) => {
        if (checkerResult === "success") {
          setShowPage(true);
          getList();
        } else {
          navigate("/login");
        }
      })
      .catch((error) => navigate("/login"));
  }, []);

  if (!showPage) {
    return null; // 혹은 로딩 스피너 등을 반환.
  }

  return (
    <DashboardLayout>
      {useAlert ? (
        <DrivenAlert alertColor={alertColor} alertText={alertText} />
      ) : (
        <>
          <DashboardNavbar />
          <MDBox my={3} sx={{ maxWidth: "2300px" }}>
            <MDBox display="flex" justifyContent="space-between" alignItems="center">
              <MDBox height="100%" mt={0.5} lineHeight={1} p={2}>
                <MDTypography variant="h4" fontWeight="medium">
                  고객 정보 리스트
                </MDTypography>
                <MDTypography variant="body2" color="text" fontWeight="regular">
                  고객 정보 리스트 소개 표시 유고객저 정보 리스트 소개 표시
                </MDTypography>
              </MDBox>
              <MDBox display="flex">
                <MDBox ml={1}>
                  <MDButton
                    variant="outlined"
                    color="dark"
                    onClick={() => exportToCsv(rows, keyList)}
                  >
                    <Icon>description</Icon>
                    &nbsp;export csv
                  </MDButton>
                </MDBox>
              </MDBox>
            </MDBox>
            <Card>
              <DrivenTable
                rows={rows}
                columns={columns}
                useSearch={true}
                useSort={true}
                usePaging={true}
              />
            </Card>
          </MDBox>
        </>
      )}
    </DashboardLayout>
  );
}

export default CustInfoList;
