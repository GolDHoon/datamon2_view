// prop-types is a library for typechecking of props
import PropTypes from "prop-types";

// Material Dashboard 2 PRO React components
import MDTypography from "components/MDTypography";

function DefaultCell({ value }) {
  return (
    <MDTypography variant="caption" fontWeight="medium" color="text">
      {value}
    </MDTypography>
  );
}

// Typechecking props for the DefaultCell
DefaultCell.propTypes = {
  value: PropTypes.oneOfType([PropTypes.string, PropTypes.number, PropTypes.oneOf([null])]),
};

export default DefaultCell;
