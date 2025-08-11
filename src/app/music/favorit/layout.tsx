import { ReactNode } from 'react';
import styles from './layout.module.css';
import MainNav from '@/app/components/MainNav/MainNav';

import MainSidebar from '@/app/components/MainSidebar/MainSidebar';
import Bar from '@/app/components/Bar/Bar';

interface CategoryLayoutProps {
  children: ReactNode;
}

export default function CategoryLayout({ children }: CategoryLayoutProps) {
  return (
    <div className={styles.wrapper}>
      <div className={styles.container}>
        <main className={styles.main}>
          <MainNav />
          {children}
          <MainSidebar />
          <Bar />
        </main>
        <footer className="footer"></footer>
      </div>
    </div>
  );
}
