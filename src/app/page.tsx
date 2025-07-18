
import './page.css';
import styles from "./page.module.css";

import MainNav from './components/MainNav/MainNav';
import Centerblock from './components/Centerblock/Centerblock';
import MainSidebar from './components/MainSidebar/MainSidebar';
import Bar from './components/Bar/Bar';

export default function Home() {
  return (
    <div className={styles.wrapper}>
      <div className={styles.container}>
        <main className={styles.main}>
          <MainNav></MainNav>
          <Centerblock></Centerblock>
          <MainSidebar></MainSidebar>
          <Bar></Bar>
        </main>
        
        <footer className="footer"></footer>
      </div>
    </div>
  );
}
