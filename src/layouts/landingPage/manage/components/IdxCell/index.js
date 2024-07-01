// prop-types is a library for typechecking of props
import PropTypes from "prop-types";

// @mui material components

// Material Dashboard 2 PRO React components
import MDBox from "../../../../../components/MDBox";
import MDButton from "../../../../../components/MDButton";
import { Modal } from "@mui/material";
import Card from "@mui/material/Card";
import Grid from "@mui/material/Grid";
import BlackInfo from "../BlockedIpInfo";
import { useState } from "react";
import BlockedIpInfo from "../BlockedIpInfo";
import BlackKeyword from "../BlackKeyword";

function IdxCell({ code }) {
  const [ipOpen, setIpOpen] = useState(false);
  const [keywordOpen, setKeywordOpen] = useState(false);
  const handleIpOpen = () => setIpOpen(true);
  const handleIpClose = () => setIpOpen(false);
  const handleKeywordOpen = () => setKeywordOpen(true);
  const handleKeywordClose = () => setKeywordOpen(false);

  const style = {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: "50%",
    bgcolor: "background.paper",
    boxShadow: 24,
    p: 4,
  };

  return (
    <MDBox display="flex" alignItems="center">
      <MDBox m={"6px"}>
        <MDButton color={"dark"} variant={"outlined"} onClick={handleIpOpen}>
          차단Ip
        </MDButton>
      </MDBox>
      {/* 차단 IP ------------------------------------------*/}
      <Modal
        open={ipOpen}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Card sx={style} id="popup" style={{ height: "fit-content" }}>
          <Grid container justifyContent="center" alignItems="center">
            <Grid width="100%">
              <MDBox>
                <BlockedIpInfo code={code} />
                <MDBox mt={2} width="100%" display="flex" justifyContent="flex-end">
                  <MDButton
                    variant="gradient"
                    color="info"
                    style={{ margin: "0 2% 0 0" }}
                    onClick={handleIpClose}
                  >
                    완료
                  </MDButton>
                  {/*<MDButton color="dark" onClick={handleIpClose}>*/}
                  {/*  취소*/}
                  {/*</MDButton>*/}
                </MDBox>
              </MDBox>
            </Grid>
          </Grid>
        </Card>
      </Modal>
      {/* 차단 IP ------------------------------------------ */}
      <MDBox m={"6px"}>
        <MDButton color={"dark"} variant={"outlined"} onClick={handleKeywordOpen}>
          차단키워드
        </MDButton>
      </MDBox>
      {/* 차단 키워드 ------------------------------------------*/}
      <Modal
        open={keywordOpen}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Card sx={style} id="popup" style={{ height: "fit-content" }}>
          <Grid container justifyContent="center" alignItems="center">
            <Grid width="100%">
              <MDBox>
                <BlackKeyword code={code} />
                <MDBox mt={2} width="100%" display="flex" justifyContent="flex-end">
                  <MDButton
                    variant="gradient"
                    color="info"
                    style={{ margin: "0 2% 0 0" }}
                    onClick={handleKeywordClose}
                  >
                    완료
                  </MDButton>
                  {/*<MDButton color="dark" onClick={handleIpClose}>*/}
                  {/*  취소*/}
                  {/*</MDButton>*/}
                </MDBox>
              </MDBox>
            </Grid>
          </Grid>
        </Card>
      </Modal>
      {/* 차단 키워드 ------------------------------------------ */}
    </MDBox>
  );
}

// Typechecking props for the IdCell
IdxCell.propTypes = {
  code: PropTypes.string.isRequired,
};

export default IdxCell;
