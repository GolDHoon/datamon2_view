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

// Material Dashboard 2 PRO React components
import MDBox from "../../../../../components/MDBox";
import MDButton from "../../../../../components/MDButton";
import { serverCommunicationUtil } from "../../../../../common/util/serverCommunicationUtil";

function CustomerCell({ value }) {
  const modifyHandler = () => {
    let newPassword = window.prompt("정보를 입력하세요.");
    if (newPassword !== null) {
      const data = {
        idx: value,
        userPw: newPassword,
      };
      serverCommunicationUtil("main", "axioGet", "/developer/passwordsetting", data)
        .then((result) => {
          alert("변경한 비밀번호 : " + result);
        })
        .catch((error) => {
          alert("서버 장애.");
        });
    } else {
      // 사용자가 취소를 클릭했다면 이 블럭의 코드를 실행합니다.
      alert(newPassword);
    }
    return value;
  };
  return (
    <MDBox display="flex" alignItems="center">
      <MDButton size="large" color="error" variant="outlined" onClick={modifyHandler}>
        비밀번호 수정
      </MDButton>
      {/*{value}*/}
    </MDBox>
  );
}

// Setting default value for the props of CustomerCell
CustomerCell.defaultProps = {
  value: "0",
};

// Typechecking props for the CustomerCell
CustomerCell.propTypes = {
  value: PropTypes.oneOfType([PropTypes.string, PropTypes.number, PropTypes.oneOf([null])]),
};

export default CustomerCell;
