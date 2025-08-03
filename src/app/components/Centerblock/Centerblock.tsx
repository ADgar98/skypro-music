'use client';
import classNames from 'classnames';
import styles from './centerblock.module.css';
import Filter from '../Filter/Filter';

import PlaylistItem from '../PlaylistItem/PlaylistItem';
import { useAppDispatch, useAppSelector } from '@/store/store';
import { useEffect, useState } from 'react';
import { favoriteTracks, fetchMusic } from '@/api';
import { setAllTracks, setFavoriteTracks } from '@/store/features/trackSlice';
import { TrackType } from '@/sherdTypes/sheredTypes';
import { withReauth } from '@/utils/withReauth';
import { AxiosError } from 'axios';

export default function Centerblock() {
  const dispatch = useAppDispatch();
  const favorite= useAppSelector((state) => state.tracks.favoriteTracks)
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState('');

  const [tracks, setTracks] = useState<TrackType[]>([]);

  const accessToken = useAppSelector((state) => state.auth.access);
  const refreshT = useAppSelector((state) => state.auth.refresh);

  useEffect(() => {

    if (!refreshT || refreshT === "") {
  return
}

    const fetchFavoriteTracks = async () => {
     console.log(refreshT);
     
      try {
        const favorite = await withReauth(
          (newToken) => favoriteTracks(newToken || accessToken),
          refreshT,
          dispatch,
        );
        dispatch(setFavoriteTracks(favorite.data));
      } catch (error) {
        if (error instanceof AxiosError) {
          if (error.response) {
            setError(error.response.data.message);
          } else if (error.request) {
            setError('отсутствует интернет, попробуйте позже');
          } else {
            setError('неизвестная, попробуйте позже');
          }
        }
      } finally {
        setIsLoading(false);
      }
    };

    fetchFavoriteTracks();
  }, [refreshT, dispatch]);

  
  useEffect(() => {
    const loadTracks = async () => {
      setIsLoading(true);
      try {
        const tracks = await fetchMusic();
        dispatch(setAllTracks(tracks));

        setTracks(tracks);
      } catch (error) {
        if (error instanceof AxiosError) {
          if (error.response) {
            setError(error.response.data.message);
          } else if (error.request) {
            setError('отсутствует интернет, попробуйте позже');
          } else {
            setError('неизвестная, попробуйте позже');
          }
        }
      } finally {
        setIsLoading(false);
      }
    };

    loadTracks();
  }, [dispatch]);



  return (
    <div className={styles.centerblock}>
      <div className={styles.centerblock__search}>
        <svg className={styles.search__svg}>
          <use xlinkHref="/img/icon/sprite.svg#icon-search"></use>
        </svg>
        <input
          className={styles.search__text}
          type="search"
          placeholder="Поиск"
          name="search"
        />
      </div>
      <h2 className={styles.centerblock__h2}>Треки</h2>
      <Filter tracks={tracks} />
      <div className={styles.centerblock__content}>
        <div className={styles.content__title}>
          <div className={classNames(styles.playlistTitle__col, styles.col01)}>
            Трек
          </div>
          <div className={classNames(styles.playlistTitle__col, styles.col02)}>
            Исполнитель
          </div>
          <div className={classNames(styles.playlistTitle__col, styles.col03)}>
            Альбом
          </div>
          <div className={classNames(styles.playlistTitle__col, styles.col04)}>
            <svg className={styles.playlistTitle__svg}>
              <use xlinkHref="/img/icon/sprite.svg#icon-watch"></use>
            </svg>
          </div>
        </div>
        <div className={styles.content__playlist}>
          {isLoading && <p className={styles.loading}>Загрузка...</p>}
          {error && <p className={styles.error}>{error}</p>}
          <PlaylistItem tracks={tracks} />
        </div>
      </div>
    </div>
  );
}
