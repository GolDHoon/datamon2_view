import React, { useEffect, useRef, useState } from "react";
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
        top: "5px",
        position: "absolute",
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
  const [isVisible, setVisible] = useState(false); // 추가: isVisible 상태

  useEffect(() => {
    if (alertText) {
      setVisible(true);
      // 0.5s 후에 서서히 사라지는 경우를 처리합니다.
      const invisibleTimer = setTimeout(() => setVisible(false), 500);
      return () => clearTimeout(invisibleTimer);
    }
  }, [alertText]);

  useEffect(() => {
    document.body.insertBefore(containerDiv.current, document.body.firstChild);
    return () => {
      document.body.removeChild(containerDiv.current);
    };
  }, []);

  const transitionStyle = {
    opacity: isVisible ? 1 : 0, // isVisible이 참이면 opacity는 1, 아니면 0
    transition: isVisible ? "none" : "opacity 1s ease-out",
  };

  return ReactDOM.createPortal(
    <div style={transitionStyle}>
      <AlertContent alertColor={alertColor} alertText={alertText} />
    </div>,
    containerDiv.current
  );
};

export default DrivenAlert;
