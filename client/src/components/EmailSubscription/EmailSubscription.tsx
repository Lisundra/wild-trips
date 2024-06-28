import React, { useState } from 'react';
import { Button, Input, message } from 'antd';
import axios from 'axios';
import styles from './EmailSubscription.module.css';
import RegButton from '../RegButton/RegButton';

export default function EmailSubscription() {
  const [email, setEmail] = useState('');

  const submitFormHandler = async (event: React.FormEvent<HTMLFormElement>): Promise<void> => {
    event.preventDefault();
    try {
      await axios.post(`${import.meta.env.VITE_URL}/${import.meta.env.VITE_API}/subscribe`, {
        email,
      });
      setEmail(''); // Зачищаем поле
      message.success('Вы успешно подписались на рассылку!');
    } catch (error) {
      console.log('Sending error on form submit', error);
      message.error('Ошибка при подписке на рассылку. Попробуйте снова.');
    }
  }

  return (
    <div className={styles.upperWrapper}>
      <div className={styles.subscriptionContainer}>
        <h3 className={styles.subscriptionHeading}>Делимся лучшим</h3>
        <div className={styles.descriptionContainer}>
          <p>Подпишитесь на рассылку и получите промокод на первое путешествие!</p>
          <br/>
          <p>Раз в неделю мы будем делиться с вами интересными новинками и акциями.</p>
        </div>
        <div className={styles.formContainer}>
          <form style={{ width: '300px' }} onSubmit={submitFormHandler} className={styles.submitForm}>
            <Input
              className={styles.subscriptionInput}
              name="email"
              type='text'
              placeholder="Введите ваш email"
              value={email}
              onChange={(event) => setEmail(event.target.value)}
              required
            />
            {/* <p>{email}</p> */}
            <RegButton style={{ width: '300px' }} htmlType="submit" className={styles.subscriptionBtn}>Подписаться</RegButton>
          </form>
        </div>
      </div>
    </div>
  );
}
