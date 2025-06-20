'use client';
import { useState } from 'react';
import MusicianModalWin from '../MusicianModalWin/MusicianModalWin';
import styles from './filter.module.css';
import { getUniqueValuesByKey } from '@/utils/helpers';
import { data } from '@/data';
import DateFilterModWin from '../DateFilterModWin/DateFilterModWin';
import GenreFilterModWin from '../GenreFilterModWin/GenreFilterModWin';

export default function Filter() {
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

  const ArrOfAuthor = getUniqueValuesByKey(data, 'author');

  const numberOfMusician = ArrOfAuthor.length;

  const ArrOfGenre = getUniqueValuesByKey(data, 'genre');

  const numberOfGenre = ArrOfGenre.length

  return (
    <div className={styles.centerblock__filter}>
      <div className={styles.filter__title}>Искать по:</div>
      <div
        onClick={openMusicianWin}
        data-active={musicianWin}
        className={`${styles.filter__button} ${musicianWin ? styles.active : ''}`}
      >
        исполнителю
        {musicianWin && (
          <span className={styles.filter__index}>{numberOfMusician}</span>
        )}
      </div>
      {musicianWin && <MusicianModalWin />}
      <div
        onClick={openDateWin}
        data-active={dateWin}
        className={`${styles.filter__button} ${dateWin ? styles.active : ''}`}
      >
        году выпуска
      </div>
      {dateWin && <DateFilterModWin />}
      <div
        onClick={openGenreWin}
        data-active={genreWin}
        className={`${styles.filter__button} ${genreWin ? styles.active : ''}`}
      >
        жанру
        {genreWin && (
          <span className={styles.filterGenre__index}>{numberOfGenre}</span>
        )}
      </div>
      {genreWin && <GenreFilterModWin />}
    </div>
  );
}
