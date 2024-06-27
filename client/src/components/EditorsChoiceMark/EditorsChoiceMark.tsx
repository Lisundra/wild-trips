import React from 'react';
import styles from './EditorsChoiceMark.module.css';

function EditorsChoiceMark() {

  return (
    <div className={styles.editorsChoiseMarkContainer}>
      <div className={styles.leftLaurelContainer}>
        <img className={styles.leftLaurel} src="src/assets/icons/left_laurel.png" alt="editor's choice left laurel" />
      </div>
      <p className={styles.editorsChoiseTitle}>
        выбор редакции
      </p>
      <div className={styles.rightLaurelContainer}>
        <img className={styles.rightLaurel} src="src/assets/icons/right_laurel.png" alt="editor's choice right laurel" />
      </div>
    </div>
  );
}

export default EditorsChoiceMark;
