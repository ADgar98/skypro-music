'use client';
import { useAppDispatch, useAppSelector } from '@/store/store';
import styles from './dateFilterModWin.module.css';
import { setFilterYears } from '@/store/features/trackSlice';
import classNames from 'classnames';
export default function DateFilterModWin() {
  const dispatch = useAppDispatch();
  const sort = useAppSelector((state) => state.tracks.filters.years);
  return (
    <div className={styles.dateModalWinBox}>
      <div className={styles.dateFilteredBox}>
        <p
          onClick={() => dispatch(setFilterYears('По умолчанию'))}
          className={classNames(styles.dateFilteredP, {
            [styles.initYears]: sort === 'По умолчанию',
          })}
        >
          По умолчанию
        </p>
        <p
          onClick={() => dispatch(setFilterYears('Сначала новые'))}
          className={classNames(styles.dateFilteredP, {
            [styles.initYears]: sort === 'Сначала новые',
          })}
        >
          Сначала новые
        </p>
        <p
          onClick={() => dispatch(setFilterYears('Сначала старые'))}
          className={classNames(styles.dateFilteredP, {
            [styles.initYears]: sort === 'Сначала старые',
          })}
        >
          Сначала старые
        </p>
      </div>
    </div>
  );
}
