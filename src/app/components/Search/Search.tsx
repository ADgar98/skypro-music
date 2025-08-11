'use client'
import { useEffect, useState } from 'react'
import styles from './Search.module.css'
import { TrackType } from '@/sherdTypes/sheredTypes';



interface PlaylistItemProps {
  tracks: TrackType[];
  setTracks: React.Dispatch<React.SetStateAction<TrackType[]>>;
}

export const Search = ({ tracks, setTracks }: PlaylistItemProps) => {

  const [searchTracks, setSearchTracks] = useState('')
  const [originalTracks, setOriginalTracks] = useState<TrackType[]>([]);

useEffect(() => {
  if (tracks && !searchTracks.trim()) {
    setOriginalTracks(tracks);
  }
}, [tracks]);


useEffect(() => {
  
  if (!searchTracks.trim() || searchTracks === '') {
    setTracks(originalTracks);
    return;
  }
  setTracks(tracks.filter(track => 
    track.name.toLowerCase().includes(searchTracks.toLowerCase()) ||
    track.author.toLowerCase().includes(searchTracks.toLowerCase())
  ));
}, [searchTracks]);
    return(
        <div className={styles.centerblock__search}>
        <svg className={styles.search__svg}>
          <use xlinkHref="/img/icon/sprite.svg#icon-search"></use>
        </svg>
        <input
          className={styles.search__text}
          type="search"
          placeholder="Поиск"
          name="search"
          value={searchTracks}
          onChange={(e) => setSearchTracks(e.target.value)}
        />
      </div>
    )
}