import { getUniqueValuesByKey } from '@/utils/helpers';
import styles from './genreFilterModWin.module.css';
import { TrackType } from '@/sherdTypes/sheredTypes';

interface PlaylistItemProps {
  tracks: TrackType[];
}

export default function GenreFilterModWin({ tracks }: PlaylistItemProps) {
  const ArrOfGenre = getUniqueValuesByKey(tracks, 'genre');

  return (
    <div className={styles.genreModalWinBox}>
      <div className={styles.genreFilteredBox}>
        {ArrOfGenre.map((genre) => (
          <p key={genre} className={styles.genreFilteredP}>
            {genre}
          </p>
        ))}
      </div>
    </div>
  );
}
