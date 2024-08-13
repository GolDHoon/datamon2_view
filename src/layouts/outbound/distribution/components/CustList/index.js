import PropTypes from "prop-types";

import Card from "@mui/material/Card";

import MDBox from "components/MDBox";
import MDTypography from "components/MDTypography";
import Checkbox from "@mui/material/Checkbox";
import MDButton from "../../../../../components/MDButton";

function CustsList({ title, custs, rowClickFunction, selectCustIdxs, setSelectCustIdxs }) {
  const renderItems = (
    <MDBox
      display="flex"
      justifyContent="space-between"
      alignItems="center"
      borderRadius="lg"
      py={1}
      pr={2}
    >
      <MDBox display="flex" alignItems="center" flexDirection="column" sx={{ width: "100%" }}>
        {custs?.custInfo?.map((cust, key) => (
          <MDBox display={"flex"} key={key} sx={{ width: "100%" }}>
            <Checkbox
              checked={selectCustIdxs.map((data) => data.idx).includes(cust.idx)}
              onChange={(event) => {
                if (event.target.checked) {
                  setSelectCustIdxs((item) => [...item, cust]);
                } else {
                  setSelectCustIdxs((item) => item.filter((item) => item.idx !== cust.idx));
                }
              }}
            />
            <MDBox
              display={"flex"}
              flexWrap={"wrap"}
              sx={{
                width: "100%",
                cursor: "pointer",
              }}
              onClick={(event) => rowClickFunction(cust.idx)}
            >
              {custs?.columnList?.map((item, index) => (
                <MDBox key={index} sx={{ marginX: "5px" }}>
                  <MDTypography variant="caption" fontWeight="medium" textTransform="capitalize">
                    [ {item.value} : {cust[item.value]} ]
                  </MDTypography>
                </MDBox>
              ))}
            </MDBox>
          </MDBox>
        ))}
      </MDBox>
    </MDBox>
  );

  return (
    <Card>
      <MDBox pt={2} px={2} sx={{ width: "100%" }}>
        <MDTypography variant="h6" fontWeight="medium" textTransform="capitalize">
          {title}
        </MDTypography>
      </MDBox>
      <MDBox p={2}>
        <MDBox
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
CustsList.propTypes = {
  title: PropTypes.string.isRequired,
  custs: PropTypes.shape({
    columnList: PropTypes.array,
    custInfo: PropTypes.array,
  }).isRequired,
  rowClickFunction: PropTypes.func,
  selectCustIdxs: PropTypes.array,
  setSelectCustIdxs: PropTypes.func,
};

export default CustsList;
