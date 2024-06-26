// prop-types is a library for typechecking of props
import PropTypes from "prop-types";

// @mui material components
import Checkbox from "@mui/material/Checkbox";

// Material Dashboard 2 PRO React components
import MDBox from "components/MDBox";
import MDTypography from "components/MDTypography";
import MDButton from "../../../../../components/MDButton";
import Icon from "@mui/material/Icon";

function IdxCell({ value }) {
  return (
    <MDBox display="flex" alignItems="center">
      <MDButton>
        <MDTypography fontWeight="bold" color="error">
          <Icon fontSize="large">delete</Icon>
          &nbsp;삭제
        </MDTypography>
      </MDButton>
      <MDButton>
        <MDTypography fontWeight="bold">
          <Icon fontSize="large">create</Icon>
          &nbsp;수정
        </MDTypography>
      </MDButton>
    </MDBox>
  );
}

// Typechecking props for the IdCell
IdxCell.propTypes = {
  value: PropTypes.string,
};

export default IdxCell;
