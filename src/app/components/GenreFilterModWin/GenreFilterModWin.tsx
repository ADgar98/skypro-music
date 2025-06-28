
import { getUniqueValuesByKey } from '@/utils/helpers';
import styles from './genreFilterModWin.module.css';
import { data } from '@/data';

const ArrOfGenre = getUniqueValuesByKey(data, 'genre');

export default function GenreFilterModWin() {
    return(
        <div className={styles.genreModalWinBox}>
      <div className={styles.genreFilteredBox}>
        {ArrOfGenre.map((genre) => (
          <p key={genre} className={styles.genreFilteredP}>
            {genre}
          </p>
        ))}
      </div>
    </div>
    )
}