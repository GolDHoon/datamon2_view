// @mui material components
import Grid from "@mui/material/Grid";

// Material Dashboard 2 PRO React components
import MDBox from "components/MDBox";

// Settings page components
import Card from "@mui/material/Card";
import DataTable from "layouts/user/auth/DataTable/index";
import CategoriesList from "layouts/user/auth/components/CategoriesList";
import Header from "layouts/user/auth/components/Header";
import dataTableData from "layouts/user/auth/data/dataTableData";
import { useEffect, useState } from "react";
import { serverCommunicationUtil } from "../../../common/util/serverCommunicationUtil";
import MDTypography from "../../../components/MDTypography";
import DashboardLayout from "../../common/LayoutContainers/DashboardLayout";
import DashboardNavbar from "../../common/Navbars/DashboardNavbar";

function AuthMenagement() {
  const [cdbtList, setCdbtList] = useState([]);
  const [selectedCdbt, setSelectedCdbt] = useState("");
  const [rows, setRows] = useState([]);
  const [keyList, setKeyList] = useState([]);
  const onRowClick = (code) => {
    setSelectedCdbt(code);
    serverCommunicationUtil("main", "axioPost", "/userAuth/userListByCdbtCode", {
      cdbtCode: code,
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
    serverCommunicationUtil("main", "axioGet", "/userAuth/cdbtList", {})
      .then((result) => {
        var newCdbtList = [];
        result.forEach((data) => {
          newCdbtList.push({
            name: data.name,
            code: data.code,
            description: <></>,
          });
        });
        setCdbtList(newCdbtList);
      })
      .catch((error) => {
        console.log("");
      });
  }, [setCdbtList]);
  return (
    <DashboardLayout>
      <DashboardNavbar />
      <MDBox height="100%" mt={0.5} lineHeight={1} p={2}>
        <MDTypography variant="h4" fontWeight="medium">
          권한 관리자
        </MDTypography>
        <MDTypography variant="body2" color="text" fontWeight="regular">
          유저의 고객DB 권한을 관리하는 페이지입니다.
        </MDTypography>
      </MDBox>
      <MDBox mt={4}>
        <Grid container spacing={3}>
          <Grid item xs={12} lg={3}>
            <Card>
              <CategoriesList
                categories={cdbtList}
                title="등록된 고객DB"
                onRowClick={onRowClick}
              ></CategoriesList>
            </Card>
          </Grid>
          <Grid item xs={12} lg={9}>
            <MDBox mb={3}>
              <Grid container spacing={3}>
                <Grid item xs={12}>
                  <Header selectedCdbt={selectedCdbt} />
                </Grid>
                <Grid item xs={12}>
                  <DataTable table={dataTableData(rows, keyList)} entriesPerPage={true} canSearch />
                </Grid>
              </Grid>
            </MDBox>
          </Grid>
        </Grid>
      </MDBox>
    </DashboardLayout>
  );
}

export default AuthMenagement;
