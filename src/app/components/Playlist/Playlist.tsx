'use client'
import styles from './playlist.module.css';
import PlaylistItem from '../PlaylistItem/PlaylistItem';
import { fetchMusic } from '@/api';
import { useEffect } from 'react';
import { useAppDispatch } from '@/store/store';
import { setAllTracks } from '@/store/features/trackSlice';

export default function Playlist() {
  const dispatch = useAppDispatch()
  
  useEffect(() => {
  const loadTracks = async () => {
    try {
      const tracks = await fetchMusic(); 
      dispatch(setAllTracks(tracks));     
    } catch (error) {
      console.error('Не удалось загрузить треки', error);
    }
  };

  loadTracks();
  
  
}, [dispatch]);
  return (
    <div className={styles.content__playlist}>
      <PlaylistItem/>
    </div>
  );
}
