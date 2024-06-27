import React from 'react';
import styles from './Footer.module.css';

export default function Footer() {
  return (
    <div className={styles.footerContainer}>
      <div className={styles.quote}>
        Be brave • Stay wild
      </div>
      <div>
        <img className={styles.logo} src="/src/assets/icons/logo.png" alt="logo" />
      </div>
      <ul className={styles.socialList}>
        <li>
          <a target="_blank" href="https://telegram.org/" rel="noopener noreferrer">
            <img className={styles.socialIcon} src="/src/assets/icons/tg.svg" alt="telegram-logo" />
          </a>
        </li>
        <li>
          <a target="_blank" href="https://www.vk.com/" rel="noopener noreferrer">
            <img className={styles.socialIcon} src="/src/assets/icons/vk.svg" alt="vk-logo" />
          </a>
        </li>
        <li>
          <a target="_blank" href="https://www.instagram.com/" rel="noopener noreferrer">
            <img className={styles.socialIcon} src="/src/assets/icons/inst.svg" alt="instagram-logo" />
          </a>
        </li>
        <li>
          <a target="_blank" href="https://www.facebook.com/" rel="noopener noreferrer">
            <img className={styles.socialIcon} src="/src/assets/icons/fb.svg" alt="fb-logo" />
          </a>
        </li>
      </ul>
      <div className={styles.lowerPart}>
        2024 ©
      </div>
    </div>
  );
}
