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
import Card from "@mui/material/Card";

// Material Dashboard 2 PRO React components
import MDBox from "components/MDBox";
import MDTypography from "components/MDTypography";
import { AccordionDetails, AccordionSummary } from "@mui/material";
import MuiAccordion from "@mui/material/Accordion";
import { styled } from "@mui/material/styles";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";

const Accordion = styled((props) => (
  <MuiAccordion disableGutters elevation={0} square {...props} />
))(({ theme }) => ({
  border: `0px solid ${theme.palette.divider}`,
  "&:not(:last-child)": {
    borderBottom: 0,
  },
  "&::before": {
    display: "none",
  },
}));

function EmployeeList({ title, employees }) {
  const renderItems = employees.map(({ name, role, useYn, assignedCustomer }, key) => (
    <Accordion key={key} sx={{ border: "0px solid #ffffff" }}>
      <AccordionSummary>
        <MDBox sx={{ width: "100%" }}>
          <MDBox display="flex" justifyContent={"space-between"} sx={{ width: "100%" }}>
            <MDBox>
              <MDTypography variant="button" fontWeight="medium" gutterBottom>
                {name}({role})
              </MDTypography>
            </MDBox>
            <MDBox>
              <MDTypography variant="button" fontWeight="medium" gutterBottom color={"error"}>
                {assignedCustomer.length}
              </MDTypography>
            </MDBox>
          </MDBox>
          <MDBox display="flex" justifyContent={"center"} sx={{ width: "100%" }}>
            <KeyboardArrowDownIcon />
          </MDBox>
        </MDBox>
      </AccordionSummary>
      <AccordionDetails>테스트 details</AccordionDetails>
    </Accordion>
  ));

  return (
    <Card>
      <MDBox pt={2} px={2}>
        <MDTypography variant="h6" fontWeight="medium" textTransform="capitalize">
          {title}
        </MDTypography>
      </MDBox>
      <MDBox p={2}>
        <MDBox component="ul" display="flex" flexDirection="column" p={0} m={0}>
          {renderItems}
        </MDBox>
      </MDBox>
    </Card>
  );
}

// Typechecking props for the CategoriesList
EmployeeList.propTypes = {
  title: PropTypes.string.isRequired,
  employees: PropTypes.arrayOf(PropTypes.object).isRequired,
  clickFunction: PropTypes.func,
};

export default EmployeeList;
