import React from 'react';
import styles from './Footer.module.css';

export default function Footer() {
  return (
    <div className={styles.footerContainer}>
      <div className={styles.upperPart}>
        <div className={styles.about}>
          О нас
        </div>
        <div>
          <img className={styles.logo} src="/src/assets/icons/favicon.ico" alt="logo" />
        </div>
        <ul className={styles.socialList}>
          <li>
            <a target="_blank" href="https://telegram.org/">
              <img className={styles.socialIcon} src="/src/assets/icons/tg.svg" alt="telegram-logo" />
            </a>
          </li>
          <li>
            <a target="_blank" href="https://www.vk.com/">
              <img className={styles.socialIcon} src="/src/assets/icons/vk.svg" alt="vk-logo" />
            </a>
          </li>
          <li>
            <a target="_blank" href="https://www.instagram.com/">
              <img className={styles.socialIcon} src="/src/assets/icons/inst.svg" alt="instagram-logo" />
            </a>
          </li>
          <li>
            <a target="_blank" href="https://www.facebook.com/">
              <img className={styles.socialIcon} src="/src/assets/icons/fb.svg" alt="fb-logo" />
            </a>
          </li>
        </ul>
      </div>

      <div className={styles.lowerPart}>
        2024
      </div>
    </div>
  );
}
