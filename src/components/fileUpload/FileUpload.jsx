import uploadImg from "../../assets/upload.png";
import "./fileUpload.css";
import PropTypes from "prop-types";

const FileUpload = ({ files, setFiles }) => {
  const handleFileChange = (event) => {
    setFiles(event.target.files[0]);
  };

  return (
    <>
      <div className="upload_container_main">
        <div className="upload_img_init">
          <input
            accept="image/png, image/jpeg, image/jpg, image/svg"
            style={{ display: "none" }}
            id="localGuide"
            type="file"
            onChange={handleFileChange}
          />
          <label htmlFor="localGuide" className="upload_img_text">
            <img
              src={files ? URL.createObjectURL(files) : uploadImg}
              alt="uploadPhoto"
              className="uploading_img"
            />
            <span>Add Photos</span>
          </label>
        </div>
      </div>
      <div className="image_row"></div>
    </>
  );
};

FileUpload.propTypes = {
  files: PropTypes.any.isRequired,
  setFiles: PropTypes.any.isRequired,
};
export default FileUpload;
