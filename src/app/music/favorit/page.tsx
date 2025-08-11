'use client';

import Filter from '@/app/components/Filter/Filter';
import styles from './page.module.css';

import classNames from 'classnames';
import PlaylistItem from '@/app/components/PlaylistItem/PlaylistItem';
import { useEffect, useState } from 'react';
import { favoriteTracks } from '@/api';

import { AxiosError } from 'axios';
import { useAppDispatch, useAppSelector } from '@/store/store';

import { withReauth } from '@/utils/withReauth';
import { setFavoriteTracks } from '@/store/features/trackSlice';
import { useInitAuth } from '@/hooks/useInitAuth';
import { TrackType } from '@/sherdTypes/sheredTypes';

export default function CategoryPage() {
  useInitAuth();

  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const dispatch = useAppDispatch();
  const accessToken = useAppSelector((state) => state.auth.access);
  const refresh = useAppSelector((state) => state.auth.refresh);
const [tracks, setTracks] = useState<TrackType[]>([]);
  
  const [pagePlaylist, setPagePlaylist] = useState<TrackType[]>([]);
    const [filteredPlaylist, setFilteredPlaylist] = useState<TrackType[]>([]);
    const filteredAuthors = useAppSelector(
      (state) => state.tracks.filters.authors,
    );
    const filtredGeners = useAppSelector((state) => state.tracks.filters.genres);
    const filtredYears = useAppSelector((state) => state.tracks.filters.years);

  useEffect(() => {
    if (!refresh || refresh === '') {
      return;
    }

    const fetchFavoriteTracks = async () => {
      setIsLoading(true);
      try {
        const favorite = await withReauth(
          (newToken) => favoriteTracks(newToken || accessToken),
          refresh,
          dispatch,
        );
        dispatch(setFavoriteTracks(favorite.data));
        setTracks(favorite.data);
        setPagePlaylist(favorite.data)
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
  }, [refresh, dispatch]);

    useEffect(() => {
    let currentPlaylist;
    if (filteredAuthors.length > 0 && filtredGeners.length > 0) {
      const authorFilterPlaylist = pagePlaylist.filter((track) => {
        return filteredAuthors.includes(track.author);
      });
      currentPlaylist = authorFilterPlaylist.filter((track) => {
        return filtredGeners.some((el) => track.genre.includes(el));
      });
      setTracks(currentPlaylist);
    } else if (filteredAuthors.length > 0) {
      currentPlaylist = pagePlaylist.filter((track) => {
        return filteredAuthors.includes(track.author);
      });
      setTracks(currentPlaylist);
    } else if (filtredGeners.length > 0) {
      currentPlaylist = pagePlaylist.filter((track) => {
        return filtredGeners.some((el) => track.genre.includes(el));
      });
      setTracks(currentPlaylist);
    } else {
      setTracks(pagePlaylist);
    }
    if (currentPlaylist) {
      setFilteredPlaylist(currentPlaylist);
    }
  }, [filteredAuthors, filtredGeners]);

  useEffect(() => {
    if (filtredYears === 'Сначала новые') {
      const sortedDesc = [...tracks].sort(
        (a, b) =>
          new Date(b.release_date).getTime() -
          new Date(a.release_date).getTime(),
      );
      setTracks(sortedDesc);
    } else if (filtredYears === 'Сначала старые') {
      const sortedDesc = [...tracks].sort(
        (a, b) =>
          new Date(a.release_date).getTime() -
          new Date(b.release_date).getTime(),
      );
      setTracks(sortedDesc);
    } else {
      setTracks(filteredPlaylist);
    }
  }, [filtredYears]);

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
      <h2 className={styles.centerblock__h2}>Мои треки</h2>
      <Filter tracks={pagePlaylist} />
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
