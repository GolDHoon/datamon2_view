// prop-types is a library for typechecking of props
import PropTypes from "prop-types";

// @mui material components
import Checkbox from "@mui/material/Checkbox";

// Material Dashboard 2 PRO React components
import MDBox from "components/MDBox";
import MDTypography from "components/MDTypography";
import MDButton from "../../../../../components/MDButton";
import Icon from "@mui/material/Icon";
import { useNavigate } from "react-router-dom";
import { serverCommunicationUtil } from "../../../../../common/util/serverCommunicationUtil";

function IdxCell({ idx }) {
  const navigate = useNavigate();
  const deleteHandler = () => {
    serverCommunicationUtil("main", "axioPost", "/user/deleteMemberUser", {
      idx: idx,
    })
      .then((result) => {
        window.location.reload();
        alert("삭제가 완료되었습니다.");
      })
      .catch((error) => {
        console.log("Error occurred while fetching the user list: ", error);
      });
  };
  return (
    <MDBox display="flex" alignItems="center">
      <MDButton onClick={deleteHandler}>
        <MDTypography fontWeight="bold" color="error">
          <Icon fontSize="large">delete</Icon>
          &nbsp;삭제
        </MDTypography>
      </MDButton>
      {/*<MDButton>*/}
      {/*  <MDTypography fontWeight="bold">*/}
      {/*    <Icon fontSize="large">create</Icon>*/}
      {/*    &nbsp;수정*/}
      {/*  </MDTypography>*/}
      {/*</MDButton>*/}
    </MDBox>
  );
}

// Typechecking props for the IdCell
IdxCell.propTypes = {
  idx: PropTypes.string,
};

export default IdxCell;
