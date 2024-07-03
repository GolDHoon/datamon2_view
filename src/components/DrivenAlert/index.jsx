import React, { useEffect, useRef } from "react";
import ReactDOM from "react-dom";
import MDBox from "../MDBox";
import MDAlert from "../MDAlert";
import PropTypes from "prop-types";
import DrivenTable from "../DrivenTable";

// 컴포넌트 렌더링 함수
// eslint-disable-next-line react/prop-types
const AlertContent = ({ alertColor, alertText }) => (
  <MDBox sx={{ display: "flex", justifyContent: "space-evenly" }}>
    <MDAlert
      color={alertColor}
      dismissible={false}
      fullWidth
      style={{
        position: "relative",
        zIndex: "9999",
        textAlign: "center",
      }}
    >
      {alertText}
    </MDAlert>
  </MDBox>
);

// 컨테이너 및 JSX를 통한 렌더링 함수
const DrivenAlert = ({ alertColor, alertText }) => {
  // ref를 사용하여 컨테이너 div를 핸들링
  const containerDiv = useRef(document.createElement("div"));

  useEffect(() => {
    // componentDidMount: body의 첫번째 자식으로 삽입
    document.body.insertBefore(containerDiv.current, document.body.firstChild);

    // componentWillUnmount: Container div 삭제
    return () => {
      document.body.removeChild(containerDiv.current);
    };
  }, []); // 빈 dependency array를 전달하여 이 effect가 mount와 unmount 시에만 실행되게 합니다.

  return ReactDOM.createPortal(
    <AlertContent alertColor={alertColor} alertText={alertText} />,
    containerDiv.current // 새로 생성한 div에 AlertContent를 렌더링합니다.
  );
};

export default DrivenAlert;
