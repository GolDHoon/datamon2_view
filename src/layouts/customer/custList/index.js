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
  const [menu, setMenu] = useState(null);
  const [rows, setRows] = useState([]);
  const [keyList, setKeyList] = useState([]);
  const [showPage, setShowPage] = useState(false);
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);
  const [sourceIsChecked, setSourceIsChecked] = useState(false);
  const [campaignIsChecked, setCampaignIsChecked] = useState(false);
  const [filter, setFilter] = useState({ SOURCE: sourceIsChecked, CAMPAIGN: campaignIsChecked });
  const openMenu = (event) => setMenu(event.currentTarget);
  const closeMenu = () => setMenu(null);

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

  useEffect(() => {
    if (startDate && endDate) {
      // Convert date objects to specific datetime format or timestamp
      const convertedStartDate = startDate.getTime();
      const convertedEndDate = endDate.getTime();

      // Filter rows based on selected date range
      const filteredRows = rows.filter((row) => {
        // Assuming the createDate is in timestamp format for comparison
        const rowDate = new Date(row.createDate).getTime();
        return rowDate >= convertedStartDate && rowDate <= convertedEndDate;
      });

      setRows(filteredRows);
    }
  }, [startDate, endDate]);

  useEffect(() => {
    var selectedCustDB = getSessionStorage("selectedCustDB");

    if (selectedCustDB === null) {
      navigate("/");
      alert("고객DB를 선택해주세요");
    } else {
      sessionChecker().then((checkerResult) => {
        if (checkerResult === "success") {
          setShowPage(true);
        }
      });

      serverCommunicationUtil("main", "axioPost", "/custInfo/list", {
        lpgeCode: selectedCustDB.code,
      })
        .then((result) => {
          debugger;
          setRows(result.rows);
          setKeyList(result.keyList);
        })
        .catch((error) => {
          console.log("");
        });
    }
  }, []);

  useEffect(() => {
    setFilter({ SOURCE: sourceIsChecked, CAMPAIGN: campaignIsChecked });
  }, [sourceIsChecked, campaignIsChecked]);

  if (!showPage) {
    return null; // 혹은 로딩 스피너 등을 반환.
  }

  const onChangeSourceFilter = (event) => {
    setSourceIsChecked(event.target.checked);
  };

  const onChangeCampaignFilter = (event) => {
    setCampaignIsChecked(event.target.checked);
  };

  const onClickSourceFilter = () => {
    setSourceIsChecked(!sourceIsChecked);
  };

  const onClickCampaignFilter = () => {
    setCampaignIsChecked(!campaignIsChecked);
  };

  const renderMenu = (
    <Menu
      anchorEl={menu}
      anchorOrigin={{ vertical: "bottom", horizontal: "left" }}
      transformOrigin={{ vertical: "top", horizontal: "left" }}
      open={Boolean(menu)}
      onClose={closeMenu}
      keepMounted
    >
      <MDBox display="flex" alignItems="center">
        <Checkbox onChange={onChangeSourceFilter} checked={sourceIsChecked} />
        <MenuItem onClick={onClickSourceFilter}>SOURCE</MenuItem>
      </MDBox>
      <MDBox display="flex" alignItems="center">
        <Checkbox onChange={onChangeCampaignFilter} checked={campaignIsChecked} />
        <MenuItem onClick={onClickCampaignFilter}>CAMPAIGN</MenuItem>
      </MDBox>
    </Menu>
  );

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
              <MDButton variant={menu ? "contained" : "outlined"} color="dark" onClick={openMenu}>
                검색필터
                <Icon>keyboard_arrow_down</Icon>
              </MDButton>
            </MDBox>
            {renderMenu}
            <MDBox ml={1}>
              <MDButton variant="outlined" color="dark" onClick={() => exportToCsv(rows, keyList)}>
                <Icon>description</Icon>
                &nbsp;export csv
              </MDButton>
            </MDBox>
          </MDBox>
        </MDBox>
        <Card>
          {
            <DataTable
              table={dataTableData(rows, keyList)}
              entriesPerPage={true}
              canSearch
              filterProps={filter}
            />
          }
        </Card>
      </MDBox>
      <Footer />
    </DashboardLayout>
  );
}

export default CustInfoList;
