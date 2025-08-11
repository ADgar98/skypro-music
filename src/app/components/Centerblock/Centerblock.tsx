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
import { Search } from '../Search/Search';

export default function Centerblock() {
  const dispatch = useAppDispatch();
  const allTracks = useAppSelector((state) => state.tracks.allTracks);
  const filteredAuthors = useAppSelector(
    (state) => state.tracks.filters.authors,
  );
  const filtredGeners = useAppSelector((state) => state.tracks.filters.genres);
  const filtredYears = useAppSelector((state) => state.tracks.filters.years);

  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState('');

  const [tracks, setTracks] = useState<TrackType[]>([]);
  const [pagePlaylist, setPagePlaylist] = useState<TrackType[]>([])

  const accessToken = useAppSelector((state) => state.auth.access);
  const refreshT = useAppSelector((state) => state.auth.refresh);

  useEffect(() => {
    if (!refreshT || refreshT === '') {
      return;
    }

    const fetchFavoriteTracks = async () => {
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

  useEffect(() => {
    let currentPlaylist;
    if (filteredAuthors.length > 0 && filtredGeners.length > 0) {
      const authorFilterPlaylist = allTracks.filter((track) => {
        return filteredAuthors.includes(track.author);
      });
      currentPlaylist = authorFilterPlaylist.filter((track) => {
        return filtredGeners.some((el) => track.genre.includes(el));
      });
      setTracks(currentPlaylist);
    } else if (filteredAuthors.length > 0) {
      currentPlaylist = allTracks.filter((track) => {
        return filteredAuthors.includes(track.author);
      });
      setTracks(currentPlaylist);
    } else if (filtredGeners.length > 0) {
      currentPlaylist = allTracks.filter((track) => {
        return filtredGeners.some((el) => track.genre.includes(el));
      });
      setTracks(currentPlaylist);
    } else {
      setTracks(allTracks);
    }
    if (currentPlaylist) {
      setPagePlaylist(currentPlaylist)
    }
  }, [filteredAuthors, allTracks, filtredGeners]);

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
      setTracks(sortedDesc)
    } else { 
      setTracks(pagePlaylist)
    }
  }, [filtredYears]);

  return (
    <div className={styles.centerblock}>
      <Search tracks={tracks} setTracks={setTracks} />
      <h2 className={styles.centerblock__h2}>Треки</h2>
      <Filter tracks={allTracks} />
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
