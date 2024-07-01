// prop-types is a library for typechecking of props
import PropTypes from "prop-types";

// @mui material components
import Checkbox from "@mui/material/Checkbox";

// Material Dashboard 2 PRO React components
import MDBox from "components/MDBox";
import MDTypography from "components/MDTypography";
import MDButton from "../../../../../components/MDButton";
import Icon from "@mui/material/Icon";
import { serverCommunicationUtil } from "../../../../../common/util/serverCommunicationUtil";
import { Select } from "@mui/material";
import MenuItem from "@mui/material/MenuItem";
import { useState } from "react";

function IdxCell({ idx, selectedCdbt }) {
  const outHandler = () => {
    serverCommunicationUtil("main", "axioPost", "/userAuth/deleteUserCdbtMappingByCopanyAndCdbt", {
      userId: idx,
      cdbtCode: selectedCdbt,
    })
      .then((result) => {
        location.reload();
      })
      .catch((error) => {
        console.log("");
      });
  };

  return (
    <MDBox display="flex" alignItems="center">
      <MDButton variant="outlined" color="dark" onClick={outHandler}>
        내보내기
      </MDButton>
    </MDBox>
  );
}

// Typechecking props for the IdCell
IdxCell.propTypes = {
  idx: PropTypes.string,
  selectedCdbt: PropTypes.string,
};

export default IdxCell;
