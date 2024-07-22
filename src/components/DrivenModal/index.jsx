import { Modal } from "@mui/material";
import Card from "@mui/material/Card";
import PropTypes from "prop-types";

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

export default function DrivenModal(props) {
  const { open, children } = props;

  return (
    <div style={{ margin: "25%" }}>
      <Modal
        open={open}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Card sx={style} id="popup">
          {children}
        </Card>
      </Modal>
    </div>
  );
}

DrivenModal.defaultProps = {
  open: false,
};

DrivenModal.propTypes = {
  open: PropTypes.bool,
  children: PropTypes.array,
};
