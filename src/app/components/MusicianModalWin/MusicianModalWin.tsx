import { getUniqueValuesByKey } from '@/utils/helpers';
import styles from './musicianModalWin.module.css';
import { data } from '@/data';

const ArrOfAuthor = getUniqueValuesByKey(data, 'author');

export default function MusicianModalWin() {
  return (
    <div className={styles.musicianModalWinBox}>
      <div className={styles.authorFilteredBox}>
        {ArrOfAuthor.map((author) => (
          <p key={author} className={styles.authorFilteredP}>
            {author}
          </p>
        ))}
      </div>
    </div>
  );
}
