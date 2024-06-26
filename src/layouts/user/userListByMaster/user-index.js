import { useEffect, useState } from "react";

// @mui material components
import Card from "@mui/material/Card";
import Icon from "@mui/material/Icon";

import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import NewUser from "layouts/login/components/pages/users/new-user";
import * as React from "react";

// Material Dashboard 2 PRO React components
import MDBox from "components/MDBox";
import MDButton from "components/MDButton";

// Material Dashboard 2 PRO React examples
import Footer from "layouts/common/Footer";
import DashboardLayout from "layouts/common/LayoutContainers/DashboardLayout";
import DashboardNavbar from "layouts/common/Navbars/DashboardNavbar";
import DataTable from "layouts/user/userListByMaster/DataTable";
import dataTableData from "layouts/user/userListByMaster/data/dataTableData";
import { useNavigate } from "react-router-dom";
import {
  serverCommunicationUtil,
  sessionChecker,
} from "../../../common/util/serverCommunicationUtil";
import MDTypography from "../../../components/MDTypography";

function UserInfoListByMaster() {
  const navigate = useNavigate();
  const [rows, setRows] = useState([]);
  const [keyList, setKeyList] = useState([]);
  const [showPage, setShowPage] = useState(false);
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);

  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);

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
      listType: "company",
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

  const style = {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: "50%",
    bgcolor: "background.paper",
    "border-radius": "15px",
    boxShadow: 24,
    p: 4,
  };

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
              onClick={handleOpen}
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
      <div style={{ margin: "25%" }}>
        <Modal
          open={open}
          aria-labelledby="modal-modal-title"
          aria-describedby="modal-modal-description"
        >
          <Box sx={style} id="popup">
            <NewUser></NewUser>
          </Box>
        </Modal>
      </div>
    </DashboardLayout>
  );
}

export default UserInfoListByMaster;
