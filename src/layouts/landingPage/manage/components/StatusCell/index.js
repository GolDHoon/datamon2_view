// prop-types is a library for typechecking of props
import PropTypes from "prop-types";

// @mui material components
import Icon from "@mui/material/Icon";

// Material Dashboard 2 PRO React components
import MDBox from "../../../../../components/MDBox";
import MDTypography from "../../../../../components/MDTypography";
import MDButton from "../../../../../components/MDButton";
import Switch from "@mui/material/Switch";
import { useState } from "react";

function StatusCell({ key, value }) {
  const [bool, setBool] = useState(value === "true");
  const handleSwitch = () => {
    setBool(!bool);
  };
  return (
    <MDBox display="flex" alignItems="center">
      <Switch checked={bool} onClick={handleSwitch}></Switch>
    </MDBox>
  );
}

// Typechecking props for the StatusCell
StatusCell.propTypes = {
  key: PropTypes.string,
  value: PropTypes.string,
};

export default StatusCell;
