'use client';
import { useState } from 'react';
import MusicianModalWin from '../MusicianModalWin/MusicianModalWin';
import styles from './filter.module.css';
import DateFilterModWin from '../DateFilterModWin/DateFilterModWin';
import GenreFilterModWin from '../GenreFilterModWin/GenreFilterModWin';
import { TrackType } from '@/sherdTypes/sheredTypes';
import { useAppDispatch, useAppSelector } from '@/store/store';
import { setFilterAuthors, setFilterGenres} from '@/store/features/trackSlice';

interface PlaylistItemProps {
  tracks: TrackType[];
}

export default function Filter({ tracks }: PlaylistItemProps) {
  const [musicianWin, setMusicianWin] = useState<boolean>(false);
  const [dateWin, setDateWin] = useState<boolean>(false);
  const [genreWin, setGenreWin] = useState<boolean>(false);
const dispatch = useAppDispatch();
  const filteredAuthors = useAppSelector((state) => state.tracks.filters.authors);
  const filteredGenres = useAppSelector((state) => state.tracks.filters.genres);
const filteredYears = useAppSelector((state) => state.tracks.filters.years);


const onSelectedAuthor = (author: string) => {
  dispatch(setFilterAuthors(author))
}

const onSelectedGener = (gener: string) => {
  dispatch(setFilterGenres(gener))
}

  const openMusicianWin = () => {
    setMusicianWin((prev) => !prev);
    setDateWin(false);
    setGenreWin(false);
  };

  const openDateWin = () => {
    setDateWin((prev) => !prev);
    setMusicianWin(false);
    setGenreWin(false);
  };

  const openGenreWin = () => {
    setGenreWin((prev) => !prev);
    setDateWin(false);
    setMusicianWin(false);
  };

  return (
    <div className={styles.centerblock__filter}>
      <div className={styles.filter__title}>Искать по:</div>
      <div className={styles.filter__container}>
        <div
          onClick={openMusicianWin}
          data-active={musicianWin}
          className={`${styles.filter__button} ${musicianWin || filteredAuthors.length ? styles.active : ''}`}
        >
          исполнителю
          {filteredAuthors.length > 0 && (<span className={styles.numberOfFilters}>{filteredAuthors.length}</span>)}
        </div>
        <div className={styles.filterbox}>
          {musicianWin && <MusicianModalWin onSelect={onSelectedAuthor} tracks={tracks} />}
        </div>
      </div>

      <div className={styles.filter__container}>
        <div
          onClick={openDateWin}
          data-active={dateWin}
          className={`${styles.filter__button} ${dateWin || filteredYears !== 'По умолчанию' ? styles.active : ''}`}
        >
          году выпуска
        </div>
        <div className={styles.filterbox}>
          {dateWin && <DateFilterModWin />}
        </div>
      </div>
      <div className={styles.filter__container}>
        <div
          onClick={openGenreWin}
          data-active={genreWin}
          className={`${styles.filter__button} ${genreWin || filteredGenres.length ? styles.active : ''}`}
        >
          жанру
          {filteredGenres.length > 0 && (<span className={styles.numberOfFilters}>{filteredGenres.length}</span>)}
        </div>
        <div className={styles.filterbox}>
          {genreWin && <GenreFilterModWin onSelect={onSelectedGener} tracks={tracks} />}
        </div>
      </div>
    </div>
  );
}
