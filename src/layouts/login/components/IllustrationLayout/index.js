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
import Grid from "@mui/material/Grid";

// Material Dashboard 2 PRO React components
import MDBox from "components/MDBox";
import MDTypography from "components/MDTypography";

// Material Dashboard 2 PRO React examples
import PageLayout from "layouts/common/LayoutContainers/PageLayout";

// Material Dashboard 2 PRO React context
import { useMaterialUIController } from "context";
import logo from "../../../../assets/images/login_logo.png";

function IllustrationLayout({ header, title, description, illustration, children }) {
  const [controller] = useMaterialUIController();
  const { darkMode } = controller;

  const mainBoxStyle = {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    background: "#f2f6ff",
  };

  const loginBoxStyle = {
    "border-radius": "15px",
    "box-shadow": "0 3px 6px 0 rgba(0, 0, 0, 0.16)",
    background: "#fff",
  };
  return (
    <PageLayout background="#f2f6ff" style={{ width: "inherit" }}>
      <Grid
        container
        sx={{
          backgroundColor: ({ palette: { background, white } }) =>
            darkMode ? background.default : white.main,
        }}
        style={mainBoxStyle}
      >
        <Grid item xs={11} sm={8} md={6} lg={4} xl={3} sx={{ mx: "auto" }}>
          <MDBox
            style={{
              width: "100%",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              marginBottom: "3%",
            }}
          >
            <MDBox component="img" src={logo} alt="logo" />
          </MDBox>
          <MDBox
            display="flex"
            flexDirection="column"
            justifyContent="center"
            style={loginBoxStyle}
          >
            <MDBox py={3} px={3} textAlign="center">
              {!header ? (
                <>
                  <MDBox mb={1} textAlign="center">
                    <MDTypography variant="h4" fontWeight="bold">
                      {title}
                    </MDTypography>
                  </MDBox>
                  <MDTypography style={{ "font-size": ".9rem" }} color="text" fontWeight="bold">
                    {description}
                  </MDTypography>
                </>
              ) : (
                header
              )}
            </MDBox>
            <MDBox p={3}>{children}</MDBox>
          </MDBox>
        </Grid>
      </Grid>
    </PageLayout>
  );
}

// Setting default values for the props of IllustrationLayout
IllustrationLayout.defaultProps = {
  header: "",
  title: "",
  description: "",
  illustration: "",
};

// Typechecking props for the IllustrationLayout
IllustrationLayout.propTypes = {
  header: PropTypes.node,
  title: PropTypes.string,
  description: PropTypes.string,
  children: PropTypes.node.isRequired,
  illustration: PropTypes.string,
};

export default IllustrationLayout;
