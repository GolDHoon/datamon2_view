import { useEffect, useState } from "react";

// @mui material components
import Card from "@mui/material/Card";
import Icon from "@mui/material/Icon";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";

// Material Dashboard 2 PRO React components
import MDBox from "components/MDBox";
import MDButton from "components/MDButton";

// Material Dashboard 2 PRO React examples
import DashboardLayout from "layouts/common/LayoutContainers/DashboardLayout";
import DashboardNavbar from "layouts/common/Navbars/DashboardNavbar";
import Footer from "layouts/common/Footer";
import DataTable from "layouts/user/userListByMember/DataTable";
import dataTableData from "layouts/user/userListByMember/data/dataTableData";
import {
  serverCommunicationUtil,
  sessionChecker,
} from "../../../common/util/serverCommunicationUtil";
import { useNavigate } from "react-router-dom";
import Checkbox from "@mui/material/Checkbox";
import MDTypography from "../../../components/MDTypography";

function UserInfoListByMemeber() {
  const navigate = useNavigate();
  const [rows, setRows] = useState([]);
  const [keyList, setKeyList] = useState([]);
  const [showPage, setShowPage] = useState(false);
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);

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

    serverCommunicationUtil("main", "axioGet", "/user/list", {
      listType: "user",
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
    </DashboardLayout>
  );
}

export default UserInfoListByMemeber;
