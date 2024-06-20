import React, { useState } from 'react';
import styles from './EmailSubscription.module.css';
import { Button, Input } from 'antd';
import axios from 'axios';

export default function EmailSubscription() {
  const [email, setEmail] = useState('');

  const handleSubmit = (event) => {
    event.preventDefault();
    // Логика для отправки email
    console.log('Отправить запрос с email:', email);
  };


  const sendMail = () => {
    axios
      .get("http://localhost:5000/", {
        params: {
          email,
          subject,
          message,
        },
      })
      .then(() => {
        //success
        console.log("success");
      })
      .catch(() => {
        console.log("failure");
      });
  };

  return (
    <div className={styles.subscriptionContainer}>
      <h3 className='text-4xl font-bold text-gray-800'>Делимся лучшим</h3>
      <p className='text-lg'>Подпишитесь на рассылку, чтобы увидеть новые туры первым!</p>
      <div className="signUpContainer flex items-center mt-4">
        <form onSubmit={handleSubmit} className="flex">
          <Input
            name="email"
            type='text'
            placeholder="Введите ваш email"
            value={email}
            onChange={(event) => setEmail(event.target.value)}
            required
          />
          {/* <p>{email}</p> */}
          <Button htmlType="submit" className="bg-emerald-500 hover:bg-emerald-400 text-white">Подписаться</Button>
        </form>
      </div>
    </div>
  );
}
