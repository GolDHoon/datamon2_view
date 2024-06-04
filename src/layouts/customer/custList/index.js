import { useEffect, useState } from "react";

// @mui material components
import Card from "@mui/material/Card";
import Icon from "@mui/material/Icon";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import Divider from "@mui/material/Divider";

// Material Dashboard 2 PRO React components
import MDBox from "components/MDBox";
import MDTypography from "components/MDTypography";
import MDButton from "components/MDButton";

// Material Dashboard 2 PRO React examples
import DashboardLayout from "layouts/common/LayoutContainers/DashboardLayout";
import DashboardNavbar from "layouts/common/Navbars/DashboardNavbar";
import Footer from "layouts/common/Footer";
import DataTable from "layouts/common/Tables/DataTable";
import dataTableData from "layouts/customer/custList/data/dataTableData";
import {
  serverCommunicationUtil,
  sessionChecker,
} from "../../../common/util/serverCommunicationUtil";
import { getSessionStorage } from "../../../common/common";
import MDDatePicker from "../../../components/MDDatePicker";

function CustInfoList() {
  const [menu, setMenu] = useState(null);
  const [rows, setRows] = useState([]);
  const [keyList, setKeyList] = useState([]);
  const [showPage, setShowPage] = useState(false);
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);

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
    sessionChecker().then((checkerResult) => {
      if (checkerResult === "success") {
        setShowPage(true);
      }
    });

    serverCommunicationUtil("main", "axioPost", "/custInfo/list", {
      lpgeCode: getSessionStorage("selectedLandingPage").code,
    })
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

  const renderMenu = (
    <Menu
      anchorEl={menu}
      anchorOrigin={{ vertical: "bottom", horizontal: "left" }}
      transformOrigin={{ vertical: "top", horizontal: "left" }}
      open={Boolean(menu)}
      onClose={closeMenu}
      keepMounted
    >
      <MenuItem onClick={closeMenu}>Status: Paid</MenuItem>
      <MenuItem onClick={closeMenu}>Status: Refunded</MenuItem>
      <MenuItem onClick={closeMenu}>Status: Canceled</MenuItem>
      <Divider sx={{ margin: "0.5rem 0" }} />
      <MenuItem onClick={closeMenu}>
        <MDTypography variant="button" color="error" fontWeight="regular">
          Remove Filter
        </MDTypography>
      </MenuItem>
    </Menu>
  );

  return (
    <DashboardLayout>
      <DashboardNavbar />
      <MDBox my={3}>
        <MDBox display="flex" justifyContent="space-between" alignItems="flex-start" mb={2}>
          <MDButton variant="gradient" color="info">
            new order
          </MDButton>
          <MDBox display="flex">
            <MDButton variant={menu ? "contained" : "outlined"} color="dark" onClick={openMenu}>
              filters&nbsp;
              <Icon>keyboard_arrow_down</Icon>
            </MDButton>
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
          {<DataTable table={dataTableData(rows, keyList)} entriesPerPage={false} canSearch />}
        </Card>
      </MDBox>
      <Footer />
    </DashboardLayout>
  );
}

export default CustInfoList;
