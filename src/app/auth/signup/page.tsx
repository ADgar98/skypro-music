'use client';
import { fetchSignUp } from '@/api';
import styles from './signup.module.css';
import classNames from 'classnames';
import Image from 'next/image';
import Link from 'next/link';
import { useState } from 'react';
import { AxiosError } from 'axios';
import { useRouter } from 'next/navigation';

export default function SignUp() {
  const [testPassword, setTestPassword] = useState('');
  const [error, setError] = useState('');

  const [formData, setFormData] = useState({
    email: '',
    password: '',
    username: '',
  });
  const router = useRouter();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setError('');
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const testPasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setTestPassword(e.target.value);
  };

  const onSubmit = async (
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>,
  ) => {
    e.preventDefault();

    if (testPassword != formData.password) {
      setError('Пароли не совпадают');
      return;
    }
    if (
      !formData.email.trim() ||
      !formData.password.trim() ||
      !formData.username.trim()
    ) {
      setError('Заполните все поля');
      return;
    }
    try {
      const response = await fetchSignUp(formData);
      if (response) {
        router.push('/auth/signin');
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
        className={classNames(styles.modal__input, styles.login)}
        type="text"
        name="username"
        placeholder="Логин"
        onChange={handleChange}
      />
      <input
        className={styles.modal__input}
        type="password"
        name="password"
        placeholder="Пароль"
        onChange={handleChange}
      />
      <input
        className={styles.modal__input}
        type="password"
        name="password"
        placeholder="Повторите пароль"
        onChange={testPasswordChange}
      />
      <div className={styles.errorContainer}>{error}</div>
      <button onClick={onSubmit} className={styles.modal__btnSignupEnt}>
        Зарегистрироваться
      </button>
    </>
  );
}
