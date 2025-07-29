'use client';

import Filter from '@/app/components/Filter/Filter';
import styles from './page.module.css';
import { useParams } from 'next/navigation';
import classNames from 'classnames';
import PlaylistItem from '@/app/components/PlaylistItem/PlaylistItem';
import { useEffect, useState } from 'react';
import { favoriteTracks, fetchCategoryMusic, fetchMusic } from '@/api';

import { TrackType } from '@/sherdTypes/sheredTypes';
import { AxiosError } from 'axios';
import { useAppDispatch, useAppSelector } from '@/store/store';
// import { setFavoriteTracks } from '@/store/features/trackSlice';
import { withReauth } from '@/utils/withReauth';



export default function CategoryPage() {
  const params = useParams<{ id: string }>();
  const [tracks, setTracks] = useState<TrackType[]>([]);
  const [error, setError] = useState('')
  const [isLoading, setIsLoading] = useState(true);
  const dispatch = useAppDispatch()
  const accessToken = useAppSelector((state) => state.auth.access)
  const refresh = useAppSelector((state) => state.auth.refresh)

  let playlistName;

  switch (params.id) {
    case '1':
      playlistName = 'Плейлист дня';
      break;
    case '2':
      playlistName = '100 танцевальных хитов';
      break;
    case '3':
      playlistName = 'Инди-заряд';
      break;
      case '4':
      playlistName = 'Мой плейлист';
      break;
    default:
      alert('Нет таких значений');
  }

  useEffect(() => {
    if (params.id === "4") {
    const fetchFavoriteTracks = async () => {
      try {
        const favorite = await withReauth(
          (newToken) => favoriteTracks(newToken || accessToken),
          refresh,
          dispatch
        );
        setTracks(favorite.data);
        console.log(favorite.data);
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
        setIsLoading(false)
      }
    };

    fetchFavoriteTracks();
  }

    else if (params.id === '1' || params.id === '2' || params.id === '3') {
      const categoryId = String(Number(params.id) + 1);

      const loadData = async () => {
        setIsLoading(true)
        try {
          const [categoryData, tracksData] = await Promise.all([
            fetchCategoryMusic(categoryId),
            fetchMusic(),
          ]);


          const items = categoryData.data.items.map(Number)

          const filtered = tracksData.filter((track: TrackType) =>
            items.includes(Number(track._id)),
          );
          setTracks(filtered);
    
        } catch (error ) {

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
        setIsLoading(false)
      }
      } 
      loadData();
    }
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
      <h2 className={styles.centerblock__h2}>{playlistName}</h2>
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
          {error && (
            <p className={styles.error}>
              {error}
            </p>
          )}
          <PlaylistItem tracks={tracks}/>
        </div>
      </div>
    </div>
  );
}
