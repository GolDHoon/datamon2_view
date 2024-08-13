// react-router-dom components
import { Link } from "react-router-dom";

// prop-types is a library for typechecking of props
import PropTypes from "prop-types";

// @mui material components
import Card from "@mui/material/Card";
import Icon from "@mui/material/Icon";

// Material Dashboard 2 PRO React components
import MDBox from "components/MDBox";
import MDTypography from "components/MDTypography";

function CustDBList({ title, custDBs, getListFunction }) {
  const renderItems = custDBs.map(({ color, icon, name, code }, key) => (
    <MDBox
      key={name}
      component="li"
      display="flex"
      justifyContent="space-between"
      alignItems="center"
      borderRadius="lg"
      onClick={() => {
        getListFunction(code);
      }}
      sx={{ cursor: "pointer" }}
      py={1}
      pr={2}
      mb={custDBs.length - 1 === key ? 0 : 1}
    >
      <MDBox display="flex" alignItems="center">
        <MDBox
          display="grid"
          alignItems="center"
          justifyContent="center"
          bgColor={color}
          borderRadius="lg"
          shadow="md"
          color="white"
          width="2rem"
          height="2rem"
          mr={2}
          variant="gradient"
          fontSize="0.875rem"
        >
          <Icon
            sx={{
              display: "grid",
              placeItems: "center",
            }}
          >
            {icon}
          </Icon>
        </MDBox>
        <MDBox display="flex" flexDirection="column">
          <MDTypography variant="button" fontWeight="medium" gutterBottom>
            {name}
          </MDTypography>
        </MDBox>
      </MDBox>
      <MDBox display="flex">
        <MDTypography
          component={Link}
          variant="button"
          color={color}
          sx={{
            lineHeight: 0,
            transition: "all 0.2s cubic-bezier(.34,1.61,.7,1.3)",
            p: 0.5,

            "&:hover, &:focus": {
              transform: "translateX(5px)",
            },
          }}
        >
          <Icon sx={{ fontWeight: "bold" }}>chevron_right</Icon>
        </MDTypography>
      </MDBox>
    </MDBox>
  ));

  return (
    <Card>
      <MDBox pt={2} px={2}>
        <MDTypography variant="h6" fontWeight="medium" textTransform="capitalize">
          {title}
        </MDTypography>
      </MDBox>
      <MDBox p={2}>
        <MDBox
          component="ul"
          display="flex"
          flexDirection="column"
          p={0}
          m={0}
          sx={{ maxHeight: "316px", overflowY: "auto" }}
        >
          {renderItems}
        </MDBox>
      </MDBox>
    </Card>
  );
}

// Typechecking props for the CategoriesList
CustDBList.propTypes = {
  title: PropTypes.string.isRequired,
  custDBs: PropTypes.arrayOf(PropTypes.object).isRequired,
  getListFunction: PropTypes.func,
};

export default CustDBList;
