import React, { FC } from 'react';
import styles from './Loader.module.scss';
import SyncLoader from "react-spinners/SyncLoader";

const Loader: FC = () => {
  return (
    <div className={styles.Loader}>
      <SyncLoader color={'#e6e6e6'} loading={true} size={15} />
    </div>
  )
};

export default Loader;
