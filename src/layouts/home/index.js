// @mui material components
import Grid from "@mui/material/Grid";
import Tooltip from "@mui/material/Tooltip";
import Icon from "@mui/material/Icon";

// Material Dashboard 2 PRO React components
import MDBox from "components/MDBox";
import MDTypography from "components/MDTypography";

// Material Dashboard 2 PRO React examples
import DashboardLayout from "layouts/common/LayoutContainers/DashboardLayout";
import DashboardNavbar from "layouts/common/Navbars/DashboardNavbar";
import Footer from "layouts/common/Footer";
import ReportsBarChart from "layouts/common/Charts/BarCharts/ReportsBarChart";
import ReportsLineChart from "layouts/common/Charts/LineCharts/ReportsLineChart";
import ComplexStatisticsCard from "layouts/common/Cards/StatisticsCards/ComplexStatisticsCard";
import BookingCard from "layouts/common/Cards/BookingCard";

// Anaytics dashboard components
import SalesByCountry from "layouts/home/components/SalesByCountry";

// Data
import reportsBarChartData from "layouts/home/data/reportsBarChartData";
import reportsLineChartData from "layouts/home/data/reportsLineChartData";

// Images
import booking1 from "assets/images/products/product-1-min.jpg";
import booking2 from "assets/images/products/product-2-min.jpg";
import booking3 from "assets/images/products/product-3-min.jpg";

import React, { useState, useEffect } from "react";
import { Helmet } from "react-helmet";
import { serverCommunicationUtil, sessionChecker } from "../../common/util/serverCommunicationUtil";
import { useNavigate } from "react-router-dom";

function Home() {
  const [showPage, setShowPage] = useState(false);
  const [statistics, setStatistics] = useState([]);
  const navigate = useNavigate();

  const getStatistics = () => {
    serverCommunicationUtil("main", "axioPost", "/homeStatistics", {})
      .then((result) => {
        let conversionData = [];

        for (var i = 0; i < result.length; i++) {
          let dataList = [];
          let labels = Object.keys(result[i].data);

          for (var j = 0; j < labels.length; j++) {
            dataList.push(parseInt(result[i].data[labels[j]]));
          }

          conversionData.push({
            labels: labels,
            datasets: { label: result[i].DBName, data: dataList },
          });
        }

        setStatistics(conversionData);
      })
      .catch((error) => {
        console.log("");
      });
  };

  useEffect(() => {
    sessionChecker()
      .then((checkerResult) => {
        if (checkerResult === "success") {
          setShowPage(true);
        } else {
          navigate("/login");
        }
      })
      .catch((error) => navigate("/login"));
    getStatistics();
  }, []);

  if (!showPage) {
    return null; // 혹은 로딩 스피너 등을 반환.
  }

  // Action buttons for the BookingCard
  const actionButtons = (
    <>
      <Tooltip title="Refresh" placement="bottom">
        <MDTypography
          variant="body1"
          color="primary"
          lineHeight={1}
          sx={{ cursor: "pointer", mx: 3 }}
        >
          <Icon color="inherit">refresh</Icon>
        </MDTypography>
      </Tooltip>
      <Tooltip title="Edit" placement="bottom">
        <MDTypography variant="body1" color="info" lineHeight={1} sx={{ cursor: "pointer", mx: 3 }}>
          <Icon color="inherit">edit</Icon>
        </MDTypography>
      </Tooltip>
    </>
  );

  return (
    <DashboardLayout>
      <Helmet>
        <title>데이터몬</title>
        <meta name="description" content="데이터몬 홈페이지" />
      </Helmet>
      <DashboardNavbar />
      {statistics.map((statistic) => (
        <MDBox py={3} key={statistic.datasets.label}>
          <MDBox mt={6}>
            <MDBox mb={3}>
              <ReportsLineChart
                color="info"
                title={`${statistic.datasets.label} 일일 고객 데이터 수집량`}
                date={`${new Date()}`}
                chart={statistic}
              />
            </MDBox>
          </MDBox>
        </MDBox>
      ))}
      <Footer />
    </DashboardLayout>
  );
}

export default Home;
