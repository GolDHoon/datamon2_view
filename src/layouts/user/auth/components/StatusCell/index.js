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

function StatusCell({ key, value }) {
  let bool = false;
  if (value === "true") {
    bool = true;
  }
  return (
    <MDBox display="flex" alignItems="center">
      <Switch checked={bool}></Switch>
    </MDBox>
  );
}

// Typechecking props for the StatusCell
StatusCell.propTypes = {
  key: PropTypes.string,
  value: PropTypes.string,
};

export default StatusCell;
