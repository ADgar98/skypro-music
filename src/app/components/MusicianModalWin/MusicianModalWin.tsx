import { getUniqueValuesByKey } from '@/utils/helpers';
import styles from './musicianModalWin.module.css';
import { TrackType } from '@/sherdTypes/sheredTypes';

interface PlaylistItemProps {
  tracks: TrackType[];
}

export default function MusicianModalWin({tracks}: PlaylistItemProps) {
  const ArrOfAuthor = getUniqueValuesByKey(tracks, 'author');

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
