import ImageCard from './ImageCard';
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

export default ImageGallery;
