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

function CustInfoList() {
  const navigate = useNavigate();
  const [rows, setRows] = useState([]);
  const [keyList, setKeyList] = useState([]);
  const [showPage, setShowPage] = useState(false);

  function exportToCsv(rows, originalKeys) {
    let keys = [...originalKeys];
    keys.push("utmSourse");
    keys.push("utmMedium");
    keys.push("utmCampaign");
    keys.push("utmTerm");
    keys.push("createDate");
    keys.push("modifyDate");
    keys.push("useYn");

    const headerMap = {
      createDate: "생성일",
      modifyDate: "수정일",
      useYn: "사용여부",
    };

    const headerRow = keys.map((key) => headerMap[key] || key).join(",");

    const dataConverter = {
      useYn: (value) => (value ? "사용" : "미사용"),
    };

    const csvContent = rows
      .map((row) =>
        keys
          .map((field) =>
            JSON.stringify(dataConverter[field] ? dataConverter[field](row[field]) : row[field])
          )
          .join(",")
      )
      .join("\n");

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
        setKeyList(result.keyList);
      })
      .catch((error) => {
        console.log("");
      });
  };

  useEffect(() => {
    getList();
  }, []);

  useEffect(() => {
    if (getSessionStorage("selectedCustDB") === null) {
      navigate("/");
      alert("고객DB를 선택해주세요");
    } else {
      sessionChecker().then((checkerResult) => {
        if (checkerResult === "success") {
          setShowPage(true);
        }
      });
    }
  }, []);

  if (!showPage) {
    return null; // 혹은 로딩 스피너 등을 반환.
  }

  return (
    <DashboardLayout>
      <DashboardNavbar />
      <MDBox my={3}>
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
              <MDButton variant="outlined" color="dark" onClick={() => exportToCsv(rows, keyList)}>
                <Icon>description</Icon>
                &nbsp;export csv
              </MDButton>
            </MDBox>
          </MDBox>
        </MDBox>
        <Card>
          {<DataTable table={dataTableData(rows, keyList)} entriesPerPage={true} canSearch />}
        </Card>
      </MDBox>
      <Footer />
    </DashboardLayout>
  );
}

export default CustInfoList;
