import React from 'react';
import styles from './EmailSubscription.module.css';
import { Button, Input } from 'antd';

export default function EmailSubscription() {
  return (
    <div className={styles.subscriptionContainer}>
      <h3 className='text-4xl font-bold text-gray-800'>Делимся лучшим</h3>
      <p className='text-lg'>Подпишитесь на рассылку, чтобы увидеть новые туры первым!</p>
      <div className="signUpContainer flex items-center mt-4">
        <form action="" method='post' id='signUpForm' target='_blank' className="flex">
          <Input name="email" placeholder="Введите ваш email" className="" required/>
          <Button htmlType="submit" className="bg-emerald-500 hover:bg-emerald-400 text-white">Подписаться</Button>
        </form>
      </div>
    </div>
  );
}
