import Backdrop from "@mui/material/Backdrop";
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import Fade from "@mui/material/Fade";
import PropTypes from "prop-types";
import { TextField } from "@mui/material";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 600,
  height: 300,
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
  display: "flex",
  justifyContent: "center",
  flexDirection: "column",
};

const PurchaseModal = ({ open, setOpen, value, handleClick }) => {
  const handleClose = () => setOpen(false);

  return (
    <div>
      <Modal
        aria-labelledby="transition-modal-title"
        aria-describedby="transition-modal-description"
        open={open}
        onClose={handleClose}
        closeAfterTransition
        slots={{ backdrop: Backdrop }}
        slotProps={{
          backdrop: {
            timeout: 500,
          },
        }}
      >
        <Fade in={open}>
          <Box sx={style}>
            <div className="modal_input_box">
              <TextField
                value={value}
                disabled
                id="outlined-multiline-flexible"
                multiline
                maxRows={4}
              />
              <TextField
                value={
                  value === 100
                    ? "$1"
                    : value === 500
                    ? "$5"
                    : value === 1000
                    ? "$10"
                    : "default value"
                }
                disabled
                id="outlined-multiline-flexible"
                multiline
                maxRows={4}
              />
            </div>
            <div>
              <button className="submit_btn" onClick={handleClick}>
                Buy Now
              </button>
            </div>
          </Box>
        </Fade>
      </Modal>
    </div>
  );
};
PurchaseModal.propTypes = {
  open: PropTypes.any.isRequired,
  setOpen: PropTypes.any.isRequired,
  value: PropTypes.any.isRequired,
  handleClick: PropTypes.any.isRequired,
};
export default PurchaseModal;
