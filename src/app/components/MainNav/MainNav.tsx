'use client'
import Image from "next/image";
import Link from "next/link";
import styles from "./mainNav.module.css";
import { useState } from "react";

export default function MainNav() {
  const [openModWin, setOpenModWin] = useState<boolean>(false)

  const clickOnBurger = () => {
    setOpenModWin(prev => !prev)
  }
    return(
        <nav className={styles.main__nav}>
            <div className={styles.nav__logo}>
              
              <Image
                width={250}
                height={170}
                className={styles.logo__image}
                src="/img/logo.png"
                alt={'logo'}
              />
            </div>
            <div onClick={clickOnBurger} className={styles.nav__burger}>
              <span className={styles.burger__line}></span>
              <span className={styles.burger__line}></span>
              <span className={styles.burger__line}></span>
            </div>
            {openModWin && (
              <div className={styles.nav__menu}>
              <ul className={styles.menu__list}>
                <li className={styles.menu__item}>
                  {/*TODO: a -> Link*/}
                  <Link href="/" className={styles.menu__link}>
                    Главное
                  </Link>
                </li>
                <li className={styles.menu__item}>
                  <Link href="#" className={styles.menu__link}>
                    Мой плейлист
                  </Link>
                </li>
                <li className={styles.menu__item}>
                  <Link href="/signin" className={styles.menu__link}>
                    Войти
                  </Link>
                </li>
              </ul>
            </div>
            )}
          </nav>
    )
}
