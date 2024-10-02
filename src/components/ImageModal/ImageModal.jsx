import PropTypes from "prop-types";
import "./ImageModal.module.css";

const ImageModal = ({ isOpen, onRequestClose, image }) => {
  if (!isOpen) return null;

  return (
    <div className="modalOverlay" onClick={onRequestClose}>
      <div className="modalContent" onClick={(e) => e.stopPropagation()}>
        <button onClick={onRequestClose}>Close</button>
        <img src={image.urls.regular} alt={image.alt_description} />
        <div>
          <h2>{image.user.name}</h2>
          <p>Likes: {image.likes}</p>
        </div>
      </div>
    </div>
  );
};

ImageModal.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  onRequestClose: PropTypes.func.isRequired,
  image: PropTypes.shape({
    urls: PropTypes.shape({
      regular: PropTypes.string.isRequired,
    }).isRequired,
    alt_description: PropTypes.string,
    user: PropTypes.shape({
      name: PropTypes.string.isRequired,
    }).isRequired,
    likes: PropTypes.number.isRequired,
  }).isRequired,
};

export default ImageModal;
