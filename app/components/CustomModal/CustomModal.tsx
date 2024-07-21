import React, { FC } from "react";
import { Modal, Box, Typography } from "@mui/material";

type Props = {
  open: boolean;
  setOpen: (open: boolean) => void;
  activeItem: any;
  component: any;
  setRoute?: (route: string) => void;
};

const CustomModal: FC<Props> = ({
  open,
  setOpen,
  component: Component,
  setRoute,
}) => {
  return (
    <Modal
      open={open}
      onClose={() => setOpen(false)}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <Box className="w-[540px] h-[660px] absolute top-[50%] left-[50%] -translate-x-1/2 -translate-y-1/2 bg-white 
      dark:bg-black rounded-[16px] shadow outline-none overflow-hidden">
        <Box className="w-full h-full p-8 overflow-auto">
          <Component setOpen={setOpen} setRoute={setRoute} />
        </Box>
      </Box>
    </Modal>
  );
};

export default CustomModal;