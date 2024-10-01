import { TailSpin } from 'react-loader-spinner';
import styles from './Loader.module.css';

const Loader = () => {
  return (
    <div className={styles.loader}>
      <TailSpin height={80} width={80} color="blue" ariaLabel="loading" />
    </div>
  );
};

export default Loader;
