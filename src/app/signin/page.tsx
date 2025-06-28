'use client'
import styles from './signin.module.css';
import classNames from 'classnames';
import Image from 'next/image';
import Link from 'next/link';
import { fetchSignIn } from "../../api";
import { useState } from 'react';

export default function Signin() {

    const [formData, setFormData] = useState({
    login: "",
    password: "",
  });

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
    
  };

  console.log(formData);
  

    const getMusic = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
        e.preventDefault();
        fetchSignIn(formData.login, formData.password)
    }
    
    return (
        <>
            <div className={styles.wrapper}>
                <div className={styles.containerEnter}>
                    <div className={styles.modal__block}>
                        <form className={styles.modal__form}>
                            <Link href="/">
                                <div className={styles.modal__logo}>
                                    <Image src="/img/logo_modal.png" alt="logo"
                                    width={140}
                                    height={21} />
                                </div>
                            </Link>
                            <input
                                className={classNames(styles.modal__input, styles.login)}
                                type="text"
                                name="login"
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
                            <div className={styles.errorContainer}>{/*Блок для ошибок*/}</div>
                            <button onClick={getMusic} className={styles.modal__btnEnter}>Войти</button>
                            <Link href='/signup' className={styles.modal__btnSignup}>
                                Зарегистрироваться
                            </Link>
                        </form>
                    </div>
                </div>
            </div>
        </>
    );
}
    
