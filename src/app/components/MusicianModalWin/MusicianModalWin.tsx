import { getUniqueValuesByKey } from '@/utils/helpers';
import styles from './musicianModalWin.module.css';
import { TrackType } from '@/sherdTypes/sheredTypes';
import classNames from 'classnames';
import { useAppSelector } from '@/store/store';

interface PlaylistItemProps {
  tracks: TrackType[];
  onSelect: (value: string) => void;
}

export default function MusicianModalWin({
  tracks,
  onSelect,
}: PlaylistItemProps) {
  const ArrOfAuthor = getUniqueValuesByKey(tracks, 'author');
  const filteredAuthors = useAppSelector(
    (state) => state.tracks.filters.authors,
  );

  return (
    <div className={styles.musicianModalWinBox}>
      <div className={styles.authorFilteredBox}>
        {ArrOfAuthor.map((author) => (
          <p
            key={author}
            className={classNames(styles.authorFilteredP, {
              [styles.initAuthors]: filteredAuthors.includes(author),
            })}
            onClick={() => onSelect(author)}
          >
            {author}
          </p>
        ))}
      </div>
    </div>
  );
}
