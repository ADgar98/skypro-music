'use client';

import { fetchSignIn, getToken } from '@/api';
import styles from './signin.module.css';
import classNames from 'classnames';
import Image from 'next/image';
import Link from 'next/link';

import { useState } from 'react';
import { AxiosError } from 'axios';
import { useRouter } from 'next/navigation';
import { useAppDispatch } from '@/store/store';
import { setAccessToken, setRefreshToken, setUserInfo } from '@/store/features/authSlice';



export default function Signin() {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });
  const [error, setError] = useState('');
  const router = useRouter()

  const dispatch = useAppDispatch();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setError('');
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  

  const onSubmit = async (
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>,
  ) => {
    e.preventDefault();
    if (!formData.email.trim() || !formData.password.trim()) {
      setError('Заполните все поля');
      return;
    }
    try {
      const response = await fetchSignIn(formData);
      if (response) {
        dispatch(setUserInfo(response.data.username))
         const token = await getToken(formData);
         dispatch(setAccessToken(token.access))
         dispatch(setRefreshToken(token.refresh))
        router.push('/music/main')
      }
     
      
    } catch (error) {
      if (error instanceof AxiosError) {
        if (error.response) {
          setError(error.response.data.message);
          
        } else if (error.request) {
          setError('отсутствует интернет, попробуйте позже');
        } else {
          setError('неизвестная, попробуйте позже');
        }
      }
    }
  };


  return (
    <>
      <Link href="/music/main">
        <div className={styles.modal__logo}>
          <Image src="/img/logo_modal.png" alt="logo" width={140} height={21} />
        </div>
      </Link>
      <input
        className={classNames(styles.modal__input, styles.login)}
        type="text"
        name="email"
        placeholder="Почта"
        onChange={handleChange}
      />
      <input
        className={classNames(styles.modal__input)}
        type="password"
        name="password"
        placeholder="Пароль"
        onChange={handleChange}
      />
      <div className={styles.errorContainer}>{error}</div>
      <button onClick={onSubmit} className={styles.modal__btnEnter}>
        Войти
      </button>
      <Link href="/auth/signup" className={styles.modal__btnSignup}>
        Зарегистрироваться
      </Link>
    </>
  );
}
