import styles from './ImageCard.module.css';

const ImageCard = ({ image }) => {
  const { urls, alt_description } = image;

  return (
    <div className={styles.card}>
      <img className={styles.image} src={urls.small} alt={alt_description} />
    </div>
  );
};

export default ImageCard;
