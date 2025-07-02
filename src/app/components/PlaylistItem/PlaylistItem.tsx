'use client';

import Link from 'next/link';
import styles from './playlistItem.module.css';
import { TrackType } from '@/sherdTypes/sheredTypes';
import { useAppDispatch, useAppSelector } from '@/store/store';
import { setAllTracks, setCurrentTrack, setIsPlay } from '@/store/features/trackSlice';
import classNames from 'classnames';
import { formatTime } from '@/utils/helpers';

export default function PlaylistItem() {
  const dispatch = useAppDispatch();
  const allTracks = useAppSelector((state) => state.tracks.allTracks);
  const isPlay = useAppSelector((state) => state.tracks.isPlay);
  const currentTrack = useAppSelector((state) => state.tracks.currentTrack);

  if (!allTracks) {
    return <></>;
  }

  

  const onClickTrack = (track: TrackType) => {
    dispatch(setCurrentTrack(track));
    dispatch(setAllTracks(allTracks))
    dispatch(setIsPlay(true))
  };

  return (
    <>
      {allTracks.map((track: TrackType) => (
        <div
          key={track._id}
          onClick={() => onClickTrack(track)}
          className={styles.playlist__item}
        >
          <div className={styles.playlist__track}>
            <div className={styles.track__title}>
              <div className={styles.track__titleImage}>
                <svg
                  className={classNames(styles.track__titleSvg, {
                    [styles.activeTrack]: isPlay && currentTrack?._id === track._id,
                    [styles.setTrack]: !isPlay && currentTrack?._id === track._id,
                  })}
                >
                  {currentTrack?._id != track._id && (<use xlinkHref="/img/icon/sprite.svg#icon-note"></use>)}
                  
                </svg>
              </div>
              <div>
                <Link className={styles.track__titleLink} href="">
                  {track.name} <span className={styles.track__titleSpan}></span>
                </Link>
              </div>
            </div>
            <div className={styles.track__author}>
              <Link className={styles.track__authorLink} href="">
                {track.author}
              </Link>
            </div>
            <div className={styles.track__album}>
              <Link className={styles.track__albumLink} href="">
                {track.album}
              </Link>
            </div>
            <div>
              <svg className={styles.track__timeSvg}>
                <use xlinkHref="/img/icon/sprite.svg#icon-like"></use>
              </svg>
              <span className={styles.track__timeText}>
                {formatTime(track.duration_in_seconds)}
              </span>
            </div>
          </div>
        </div>
      ))}
    </>
  );
}
