// prop-types is a library for typechecking of props
import PropTypes from "prop-types";

// @mui material components

// Material Dashboard 2 PRO React components
import MDBox from "../../../../../components/MDBox";
import MDButton from "../../../../../components/MDButton";
import { Modal } from "@mui/material";
import Card from "@mui/material/Card";
import Grid from "@mui/material/Grid";
import BlackInfo from "../BlackInfo";
import { useState } from "react";

function IdxCell({ idx }) {
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

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
        <MDButton color={"dark"} variant={"outlined"} onClick={handleOpen}>
          차단Ip
        </MDButton>
      </MDBox>
      {/* 차단 IP ------------------------------------------*/}
      <Modal
        open={open}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Card sx={style} id="popup" style={{ height: "fit-content" }}>
          <Grid container justifyContent="center" alignItems="center">
            <Grid width="100%">
              <MDBox>
                <BlackInfo />
                <MDBox mt={2} width="100%" display="flex" justifyContent="flex-end">
                  <MDButton
                    variant="gradient"
                    color="info"
                    style={{ margin: "0 2% 0 0" }}
                    // onClick={saveHandler}
                  >
                    완료
                  </MDButton>
                  <MDButton color="dark" onClick={handleClose}>
                    취소
                  </MDButton>
                </MDBox>
              </MDBox>
            </Grid>
          </Grid>
        </Card>
      </Modal>
      {/* 차단 IP ------------------------------------------ */}
      <MDBox m={"6px"}>
        <MDButton color={"dark"} variant={"outlined"}>
          차단키워드
        </MDButton>
      </MDBox>
    </MDBox>
  );
}

// Typechecking props for the IdCell
IdxCell.propTypes = {
  idx: PropTypes.string.isRequired,
};

export default IdxCell;
