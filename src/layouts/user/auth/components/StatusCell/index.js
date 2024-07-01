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

// prop-types is a library for typechecking of props
import PropTypes from "prop-types";

// @mui material components
import Icon from "@mui/material/Icon";

// Material Dashboard 2 PRO React components
import MDBox from "components/MDBox";
import MDTypography from "components/MDTypography";
import MDButton from "components/MDButton";
import Switch from "@mui/material/Switch";
import { useState } from "react";
import { NativeSelect, Select } from "@mui/material";
import MenuItem from "@mui/material/MenuItem";

function StatusCell({ key, value }) {
  if (value === "true" || value === "false" || value == "null") {
    const [bool, setBool] = useState(value === "true");
    const handleSwitch = () => {
      setBool(!bool);
    };

    return (
      <MDBox display="flex" alignItems="center">
        <Switch checked={bool} onClick={handleSwitch}></Switch>
      </MDBox>
    );
  } else {
    const [selectAuth, setSelectAuth] = useState(value);
    return (
      <MDBox display="flex" alignItems="center">
        <NativeSelect
          value={selectAuth}
          variant={"outlined"}
          onChange={(event) => {
            setSelectAuth(event.target.value);
          }}
        >
          <option value={"AUTH_USAT_0000000001"}>관리자</option>
          <option value={"AUTH_USAT_0000000002"}>편집자</option>
          <option value={"AUTH_USAT_0000000003"}>뷰어</option>
        </NativeSelect>
      </MDBox>
    );
  }

  // return (
  //   <MDBox display="flex" alignItems="center">
  //     <Select value={commonAuth}>
  //       <MenuItem value={"AUTH_USAT_0000000001"}>관리자</MenuItem>
  //       <MenuItem value={"AUTH_USAT_0000000002"}>편집자</MenuItem>
  //       <MenuItem value={"AUTH_USAT_0000000003"}>뷰어</MenuItem>
  //     </Select>
  //     <Switch checked={bool} onClick={handleSwitch}></Switch>
  //   </MDBox>
  // );
}

// Typechecking props for the StatusCell
StatusCell.propTypes = {
  key: PropTypes.string,
  value: PropTypes.string,
};

export default StatusCell;
