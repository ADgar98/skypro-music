import styles from './playlist.module.css';
import PlaylistItem from '../PlaylistItem/PlaylistItem';

export default function Playlist() {
  return (
    <div className={styles.content__playlist}>
      <PlaylistItem/>
    </div>
  );
}
