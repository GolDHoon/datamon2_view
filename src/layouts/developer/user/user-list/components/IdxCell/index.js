// prop-types is a library for typechecking of props
import PropTypes from "prop-types";

// @mui material components
import Checkbox from "@mui/material/Checkbox";

// Material Dashboard 2 PRO React components
import MDBox from "components/MDBox";
import MDTypography from "components/MDTypography";

function IdxCell({ idx, checked }) {
  return (
    <MDBox display="flex" alignItems="center">
      <Checkbox defaultChecked={checked} />
      <MDBox ml={1}>
        <MDTypography variant="caption" fontWeight="medium" color="text">
          {idx}
        </MDTypography>
      </MDBox>
    </MDBox>
  );
}

// Setting default value for the props of IdCell
IdxCell.defaultProps = {
  checked: false,
};

// Typechecking props for the IdCell
IdxCell.propTypes = {
  idx: PropTypes.string.isRequired,
  checked: PropTypes.bool,
};

export default IdxCell;
