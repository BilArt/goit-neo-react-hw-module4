import PropTypes from 'prop-types';
import ImageCard from './ImageCard/ImageCard';
import styles from './ImageGallery.module.css';

const ImageGallery = ({ images, onSelectImage }) => {
  return (
    <ul className={styles.gallery}>
      {images.map((image) => (
        <li key={image.id} onClick={() => onSelectImage(image)}>
          <ImageCard image={image} />
        </li>
      ))}
    </ul>
  );
};

ImageGallery.propTypes = {
  images: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string.isRequired, 
      urls: PropTypes.shape({
        small: PropTypes.string.isRequired,
      }).isRequired,
      alt_description: PropTypes.string,
    })
  ).isRequired,
  onSelectImage: PropTypes.func.isRequired,
};

export default ImageGallery;
