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
  if (employees === undefined) {
    return null;
  }
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
              {assignedCustomer?.length > 0 ? (
                <MDTypography variant="button" fontWeight="medium" gutterBottom color={"error"}>
                  {assignedCustomer.length}
                </MDTypography>
              ) : (
                <MDTypography variant="button" fontWeight="medium" gutterBottom color={"error"}>
                  0
                </MDTypography>
              )}
            </MDBox>
          </MDBox>
          <MDBox display="flex" justifyContent={"center"} sx={{ width: "100%" }}>
            <KeyboardArrowDownIcon />
          </MDBox>
        </MDBox>
      </AccordionSummary>
      <AccordionDetails>
        {assignedCustomer.map((data, index) => (
          <MDBox key={index}>
            {data.setting.map((setting, index2) => (
              <MDTypography variant="button" fontWeight="regular" key={index2}>
                [{setting.columnName} : {data.custInfo[setting.columnName]}]&nbsp;
              </MDTypography>
            ))}
          </MDBox>
        ))}
      </AccordionDetails>
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
EmployeeList.propTypes = {
  title: PropTypes.string.isRequired,
  employees: PropTypes.arrayOf(PropTypes.object).isRequired,
  clickFunction: PropTypes.func,
};

export default EmployeeList;
