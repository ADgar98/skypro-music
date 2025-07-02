'use client';
import Link from 'next/link';
import styles from './bar.module.css';
import classNames from 'classnames';
import { useAppDispatch, useAppSelector } from '@/store/store';
import { useEffect, useRef, useState } from 'react';
import {
  setIsPlay,
  setNextTrack,
  setPrevTrack,
  toggleShuffle,
} from '@/store/features/trackSlice';
import { getTimePanel } from '@/utils/helpers';
import ProgressBar from '../ProgressBar/ProgressBar';

export default function Bar() {
  const currentTrack = useAppSelector((state) => state.tracks.currentTrack);
  const dispatch = useAppDispatch();
  const isPlay = useAppSelector((state) => state.tracks.isPlay);
  const isSuffle = useAppSelector((state) => state.tracks.isShuffle);
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const [isLoop, setIsLoop] = useState(false);
  const [playingTime, setPlayingTime] = useState('');
  const [isLoadedTrack, setIsLoadedTrack] = useState(false);
  const [volume, setVolume] = useState(0.5);

  useEffect(() => {
    setIsLoadedTrack(false);
  }, [currentTrack]);

  const playTrack = () => {
    if (audioRef.current) {
      audioRef.current.play();
      dispatch(setIsPlay(true));
    }
  };

  const pauseTrack = () => {
    if (audioRef.current) {
      audioRef.current.pause();
      dispatch(setIsPlay(false));
    }
  };

  const repeatTrack = () => {
    setIsLoop((prev) => !prev);
  };

  const onTimeUpdate = () => {
    if (audioRef.current) {
      const timePanel = getTimePanel(
        audioRef.current.currentTime,
        audioRef.current.duration,
      );
      if (timePanel !== undefined) {
        setPlayingTime(timePanel);
      }
    }
  };

  const onLoadedMetadata = () => {
    if (audioRef.current) {
      console.log('start');
      audioRef.current.play();
      dispatch(setIsPlay(true));
      setIsLoadedTrack(true);
    }
  };

  const changeVolume = (e: React.ChangeEvent<HTMLInputElement>) => {
    setVolume(Number(e.target.value));
    if (audioRef.current) {
      audioRef.current.volume = volume / 100;
    }
  };

  const progressLine = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (audioRef.current) {
      const inputTime = Number(e.target.value);
      audioRef.current.currentTime = inputTime;
    }
  };

  const onNextTrack = () => {
    dispatch(setNextTrack());
  };

  const onPrevTrack = () => {
    dispatch(setPrevTrack());
  };

  const onToggleShuffle = () => {
    dispatch(toggleShuffle());
  };

  const onEndedPlay = () => {
    dispatch(setNextTrack())
  } 

  useEffect(() => {
    if (isPlay && audioRef.current && currentTrack) {
      playTrack();
    }
  }, [isPlay, currentTrack]);

  if (!currentTrack) {
    return <></>;
  }

  return (
    <div className={styles.bar}>
      <audio
        className={styles.visuallyHidden}
        controls
        ref={audioRef}
        src={currentTrack?.track_file}
        loop={isLoop}
        onTimeUpdate={onTimeUpdate}
        onLoadedMetadata={onLoadedMetadata}
        onEnded={onEndedPlay}
      ></audio>
      <div className={styles.bar__content}>
        <ProgressBar
          max={audioRef.current?.duration || 0}
          step={0.1}
          readOnly={isLoadedTrack}
          value={audioRef.current?.currentTime || 0}
          onChange={progressLine}
        />
        <div className={styles.bar__playerBlock}>
          <div className={styles.bar__player}>
            <div className={styles.player__controls}>
              <div onClick={onPrevTrack} className={styles.player__btnPrev}>
                <svg className={styles.player__btnPrevSvg}>
                  <use xlinkHref="/img/icon/sprite.svg#icon-prev"></use>
                </svg>
              </div>
              {isPlay && (
                <div
                  onClick={pauseTrack}
                  className={classNames(styles.player__btnPlay, styles.btn)}
                >
                  <svg className={styles.player__btnPlaySvg}>
                    <use xlinkHref="/img/icon/sprite.svg#icon-pause"></use>
                  </svg>
                </div>
              )}
              {!isPlay && (
                <div
                  onClick={playTrack}
                  className={classNames(styles.player__btnPlay, styles.btn)}
                >
                  <svg className={styles.player__btnPlaySvg}>
                    <use xlinkHref="/img/icon/sprite.svg#icon-play"></use>
                  </svg>
                </div>
              )}
              <div onClick={onNextTrack} className={styles.player__btnNext}>
                <svg className={styles.player__btnNextSvg}>
                  <use xlinkHref="/img/icon/sprite.svg#icon-next"></use>
                </svg>
              </div>
              <div
                onClick={repeatTrack}
                className={classNames(styles.player__btnRepeat, styles.btnIcon)}
              >
                <svg
                  className={
                    isLoop
                      ? `${styles.player__btnRepeatSvg} ${styles.activeLoop}`
                      : styles.player__btnRepeatSvg
                  }
                >
                  <use xlinkHref="/img/icon/sprite.svg#icon-repeat"></use>
                </svg>
              </div>
              <div
                onClick={onToggleShuffle}
                className={classNames(
                  styles.player__btnShuffle,
                  styles.btnIcon,
                )}
              >
                <svg
                  className={
                    isSuffle
                      ? `${styles.player__btnShuffleSvg } ${styles.activeShuffle}`
                      : styles.player__btnShuffleSvg
                  }
                >
                  <use xlinkHref="/img/icon/sprite.svg#icon-shuffle"></use>
                </svg>
              </div>
            </div>

            <div className={styles.player__trackPlay}>
              <div className={styles.trackPlay__contain}>
                <div className={styles.trackPlay__image}>
                  <svg className={styles.trackPlay__svg}>
                    <use xlinkHref="/img/icon/sprite.svg#icon-note"></use>
                  </svg>
                </div>
                <div className={styles.trackPlay__author}>
                  <Link className={styles.trackPlay__authorLink} href="">
                    {currentTrack.name}
                  </Link>
                </div>
                <div className={styles.trackPlay__album}>
                  <Link className={styles.trackPlay__albumLink} href="">
                    {currentTrack.author}
                  </Link>
                </div>
              </div>

              <div className={styles.trackPlay__dislike}>
                <div
                  className={classNames(
                    styles.player__btnShuffle,
                    styles.btnIcon,
                  )}
                >
                  <svg className={styles.trackPlay__likeSvg}>
                    <use xlinkHref="/img/icon/sprite.svg#icon-like"></use>
                  </svg>
                </div>
                <div
                  className={classNames(
                    styles.trackPlay__dislike,
                    styles.btnIcon,
                  )}
                >
                  <svg className={styles.trackPlay__dislikeSvg}>
                    <use xlinkHref="/img/icon/sprite.svg#icon-dislike"></use>
                  </svg>
                </div>
              </div>
            </div>
          </div>
          <div className={styles.bar__volumeBlock}>
            <div className={styles.volume__content}>
              <div className={styles.volume__image}>
                <svg className={styles.volume__svg}>
                  <use xlinkHref="/img/icon/sprite.svg#icon-volume"></use>
                </svg>
              </div>
              <div className={classNames(styles.volume__progress, styles.btn)}>
                <input
                  className={classNames(
                    styles.volume__progressLine,
                    styles.btn,
                  )}
                  type="range"
                  name="range"
                  onChange={changeVolume}
                />
              </div>
              {isLoadedTrack && (
                <div className={styles.playingTime}>{playingTime}</div>
              )}
              {!isLoadedTrack && (
                <div className={styles.playingTime}>Загружается...</div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
