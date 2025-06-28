import styles from "./dateFilterModWin.module.css"
export default function DateFilterModWin() {
  return (
    <div className={styles.dateModalWinBox}>
      <div className={styles.dateFilteredBox}>
        <p className={styles.dateFilteredP}>По умолчанию</p>
        <p className={styles.dateFilteredP}>Сначала новые</p>
        <p className={styles.dateFilteredP}>Сначала старые</p>
      </div>
    </div>
  );
}