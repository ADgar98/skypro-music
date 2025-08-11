import { getUniqueValuesByKey } from '@/utils/helpers';
import styles from './genreFilterModWin.module.css';
import { TrackType } from '@/sherdTypes/sheredTypes';
import classNames from 'classnames';
import { useAppSelector } from '@/store/store';

interface PlaylistItemProps {
  tracks: TrackType[];
  onSelect: (value: string) => void;
}

export default function GenreFilterModWin({ tracks, onSelect }: PlaylistItemProps) {
  const ArrOfGenre = getUniqueValuesByKey(tracks, 'genre');
const filtredGeners = useAppSelector((state) => state.tracks.filters.genres)
  return (
    <div className={styles.genreModalWinBox}>
      <div className={styles.genreFilteredBox}>
        {ArrOfGenre.map((genre) => (
          <p key={genre} className={classNames(styles.genreFilteredP, {[styles.initGenres] : filtredGeners.includes(genre)})} onClick={() => onSelect(genre)}>
            {genre}
          </p>
        ))}
      </div>
    </div>
  );
}
