import { useEffect } from 'react';
import PropTypes from 'prop-types';
import styles from './ImageModal.module.css';

const ImageModal = ({ isOpen, onRequestClose, image }) => {

  console.log('Modal is open:', isOpen);

  useEffect(() => {
    const handleKeyDown = (event) => {
      if (event.key === 'Escape') {
        onRequestClose();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [onRequestClose]);

  if (!isOpen) return null;

  return (
    <div className={`${styles.modalOverlay} ${isOpen ? styles.active : ''}`} onClick={onRequestClose}>
      <div className={`${styles.modalContent} ${isOpen ? styles.active : ''}`} onClick={(e) => e.stopPropagation()}>
        <img src={image.urls.regular} alt={image.alt_description} />
        <div>
          <h2>{image.user.name}</h2>
          <p>Likes: {image.likes}</p>
        </div>
        <button onClick={onRequestClose}>Close</button>
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
