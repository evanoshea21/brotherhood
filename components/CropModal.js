import React from 'react'
import Modal from '@mui/material/Modal';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import { useRef } from "react";
import Cropper, { ReactCropperElement } from "react-cropper";
import "cropperjs/dist/cropper.css";

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4,
};


const CropModal = ({setPreviewUrl, localUrl, setFile, fileName}) => {
  const [open, setOpen] = React.useState(false);
  const [newPreview, setNewPreview] = React.useState();
  const [newFile, setNewFile] = React.useState();

  const handleOpen = () => setOpen(true);
  const handleClose = () => {
    setFile(newFile);
    setPreviewUrl(newPreview);
    setOpen(false);
  };

  const cropperRef = useRef();
  const onCrop = async () => {
      //get current cropped
        const cropper = cropperRef.current?.cropper;
        //get data from cropped as Data Url
        let dataUrl = cropper.getCroppedCanvas().toDataURL();
        //setFile to be Cropped File after data conversion
        let resultFile = await dataURLtoFile(dataUrl, fileName);
        if(resultFile instanceof File) {
          setNewFile(resultFile);
          //set new preview
          let url = URL.createObjectURL(resultFile);
          setNewPreview(url);
        }

  };

  const dataURLtoFile = async (dataurl, filename) => {
    try {
      var arr = dataurl.split(',');
      var mime = await arr[0].match(/:(.*?);/)[1];
      var bstr = await atob(arr[1]);
      var n = bstr.length;
      var u8arr = new Uint8Array(n);

      while(n--){
          u8arr[n] = bstr.charCodeAt(n);
      }

      return new File([u8arr], filename, {type:mime});
    } catch(err) {
      return err;
    }
  };

  return (
    <div>
      <Button variant="outlined" onClick={handleOpen}>Crop / Resize</Button>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
        <Cropper
          src={localUrl}
          style={{ height: 400, width: "100%" }}
          // Cropper.js options
          aspectRatio={1 / 1}
          guides={true}
          crop={onCrop}
          ref={cropperRef}
        />





          {/* <Typography id="modal-modal-title" variant="h6" component="h2">
            Text in a modal
          </Typography>
          <Typography id="modal-modal-description" sx={{ mt: 2 }}>
            Duis mollis, est non commodo luctus, nisi erat porttitor ligula.
          </Typography> */}
        </Box>
      </Modal>
    </div>
  )
}

export default CropModal