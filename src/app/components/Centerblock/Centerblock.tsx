'use client';
import classNames from 'classnames';
import styles from './centerblock.module.css';
import Filter from '../Filter/Filter';

import PlaylistItem from '../PlaylistItem/PlaylistItem';
import { useAppDispatch } from '@/store/store';
import { useEffect, useState } from 'react';
import { fetchMusic } from '@/api';
import { setAllTracks } from '@/store/features/trackSlice';
import { TrackType } from '@/sherdTypes/sheredTypes';

export default function Centerblock() {
  const dispatch = useAppDispatch();
  const [isLoading, setIsLoading] = useState(true);
  const [isError, setIsError] = useState(false);
  const [tracks, setTracks] = useState<TrackType[]>([])

  useEffect(() => {
    const loadTracks = async () => {
      setIsLoading(true);
      try {
        const tracks = await fetchMusic();
        dispatch(setAllTracks(tracks));
        setTracks(tracks)
      } catch (error) {
        setIsError(true);
        console.error('Не удалось загрузить треки', error);
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
      <Filter tracks={tracks}/>
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
          {isError && (
            <p className={styles.error}>
              Ошибка при загрузке треков, попробуйте перезагрузить
            </p>
          )}
          <PlaylistItem tracks={tracks}/>
        </div>
      </div>
    </div>
  );
}
