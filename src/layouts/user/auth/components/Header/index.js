/**
=========================================================
* Material Dashboard 2 PRO React - v2.2.0
=========================================================

* Product Page: https://www.creative-tim.com/product/material-dashboard-pro-react
* Copyright 2023 Creative Tim (https://www.creative-tim.com)

Coded by www.creative-tim.com

 =========================================================

* The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.
*/

import { useState } from "react";

// @mui material components
import Card from "@mui/material/Card";
import Grid from "@mui/material/Grid";
import Switch from "@mui/material/Switch";

// Material Dashboard 2 PRO React components
import MDBox from "components/MDBox";
import MDTypography from "components/MDTypography";
import MDAvatar from "components/MDAvatar";

// Images
import burceMars from "assets/images/bruce-mars.jpg";
import MDButton from "../../../../../components/MDButton";
import Icon from "@mui/material/Icon";

function Header(selectedCdbt) {
  const [visible, setVisible] = useState(true);

  const handleSetVisible = () => setVisible(!visible);

  return (
    <Card>
      <MDBox display="flex" justifyContent="space-between">
        <MDBox p={4}>
          <MDTypography variant="h2" fontWeight="medium" style={{ marginBottom: 8 }}>
            멤버 목록
          </MDTypography>
          <MDTypography variant="h4" color="text" fontWeight="regular">
            {selectedCdbt === "" ? "왼쪽의 고객 DB를 선택해주세요." : "고객DB의 유저 리스트"}
          </MDTypography>
        </MDBox>
        <MDBox p={2}>
          <MDButton
            variant="gradient"
            color="info"
            style={{ whiteSpace: "nowrap", marginTop: "50%" }}
            size="large"
          >
            <Icon>add</Icon>
            &nbsp;맴버 초대
          </MDButton>
        </MDBox>
      </MDBox>
    </Card>
  );
}

export default Header;
