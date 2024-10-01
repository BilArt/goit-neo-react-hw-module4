import Modal from 'react-modal';
import styles from './ImageModal.module.css';

Modal.setAppElement('#root'); // Set this if you're using a div with id="root"

const ImageModal = ({ isOpen, onRequestClose, image }) => {
  if (!image) return null;

  const { urls, alt_description, user, likes } = image;

  return (
    <Modal isOpen={isOpen} onRequestClose={onRequestClose} className={styles.modalContent}>
      <div>
        <img className={styles.image} src={urls.regular} alt={alt_description} />
        <p className={styles.author}>Author: {user.name}</p>
        <p className={styles.likes}>Likes: {likes}</p>
      </div>
    </Modal>
  );
};

export default ImageModal;
