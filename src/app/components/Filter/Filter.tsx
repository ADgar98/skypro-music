'use client';
import { useState } from 'react';
import MusicianModalWin from '../MusicianModalWin/MusicianModalWin';
import styles from './filter.module.css';
import DateFilterModWin from '../DateFilterModWin/DateFilterModWin';
import GenreFilterModWin from '../GenreFilterModWin/GenreFilterModWin';
import { TrackType } from '@/sherdTypes/sheredTypes';

interface PlaylistItemProps {
  tracks: TrackType[];
}

export default function Filter({ tracks }: PlaylistItemProps) {
  const [musicianWin, setMusicianWin] = useState<boolean>(false);
  const [dateWin, setDateWin] = useState<boolean>(false);
  const [genreWin, setGenreWin] = useState<boolean>(false);
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
          className={`${styles.filter__button} ${musicianWin ? styles.active : ''}`}
        >
          исполнителю
        </div>
        <div className={styles.filterbox}>
          {musicianWin && <MusicianModalWin tracks={tracks} />}
        </div>
      </div>

      <div className={styles.filter__container}>
        <div
          onClick={openDateWin}
          data-active={dateWin}
          className={`${styles.filter__button} ${dateWin ? styles.active : ''}`}
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
          className={`${styles.filter__button} ${genreWin ? styles.active : ''}`}
        >
          жанру
        </div>
        <div className={styles.filterbox}>
          {genreWin && <GenreFilterModWin tracks={tracks} />}
        </div>
      </div>
    </div>
  );
}
