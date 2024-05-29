import MDBox from "components/MDBox";
import MDButton from "components/MDButton";

// Material Dashboard 2 PRO React examples
import DashboardLayout from "layouts/common/LayoutContainers/DashboardLayout";
import DashboardNavbar from "layouts/common/Navbars/DashboardNavbar";
import Footer from "layouts/common/Footer";
import {
  serverCommunicationUtil,
  sessionChecker,
} from "../../../common/util/serverCommunicationUtil";
import { useEffect, useState } from "react";

function Checker() {
  const [showPage, setShowPage] = useState(false);

  useEffect(() => {
    sessionChecker().then((checkerResult) => {
      debugger;
      if (checkerResult === "success") {
        setShowPage(true);
      }
    });
  }, []);

  if (!showPage) {
    return null; // 혹은 로딩 스피너 등을 반환.
  }

  const authCheckerHandler = () => {
    serverCommunicationUtil("main", "axioPost", "/sessionCheck2", {}).then((result) => {
      return result;
    });
    console.log("체크");
  };

  return (
    <DashboardLayout>
      <DashboardNavbar />
      <MDBox pt={3} pb={8}>
        <MDButton variant="gradient" color="dark" onClick={authCheckerHandler}>
          권한체크
        </MDButton>
      </MDBox>
      <Footer />
    </DashboardLayout>
  );
}

export default Checker;
