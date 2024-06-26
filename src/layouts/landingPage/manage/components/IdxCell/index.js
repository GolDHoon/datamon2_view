// prop-types is a library for typechecking of props
import PropTypes from "prop-types";

// @mui material components

// Material Dashboard 2 PRO React components
import MDBox from "../../../../../components/MDBox";
import MDButton from "../../../../../components/MDButton";

function IdxCell({ idx }) {
  return (
    <MDBox display="flex" alignItems="center">
      <MDBox m={"6px"}>
        <MDButton color={"dark"} variant={"outlined"}>
          차단Ip
        </MDButton>
      </MDBox>
      <MDBox m={"6px"}>
        <MDButton color={"dark"} variant={"outlined"}>
          차단키워드
        </MDButton>
      </MDBox>
    </MDBox>
  );
}

// Typechecking props for the IdCell
IdxCell.propTypes = {
  idx: PropTypes.string.isRequired,
};

export default IdxCell;
