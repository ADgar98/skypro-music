import { TrackType } from '@/sherdTypes/sheredTypes';
import { FC } from 'react';
import styles from './Track.module.css';
import classNames from 'classnames';
import Link from 'next/link';
import { formatTime } from '@/utils/helpers';
import { useLikeTrack } from '@/hooks/useLikeTracks';
import { useAppSelector } from '@/store/store';

export const Track: FC<{
  track: TrackType;
  onClickTrack: (track: TrackType) => void;
  isPlay: boolean;
}> = ({ track, onClickTrack, isPlay }) => {
    const currentTrack = useAppSelector((state) => state.tracks.currentTrack);
  const { toggleLike, isLike } = useLikeTrack(track);
  const isAuth = useAppSelector((state) => state.auth.access)

  const getLikeIcon = () => {
    if (!isAuth) {
        return "icon-dislike"
    }
    else if (isAuth){
        return "icon-like"
    }
  }
  return (
    <>
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
                  [styles.activeTrack]:
                    isPlay && currentTrack?._id === track._id,
                  [styles.setTrack]: !isPlay && currentTrack?._id === track._id,
                })}
              >
                {currentTrack?._id != track._id && (
                  <use xlinkHref="/img/icon/sprite.svg#icon-note"></use>
                )}
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
            <svg
              onClick={(event) => {
                event.stopPropagation();
                toggleLike();
              }}
              className={classNames(styles.track__timeSvg, {[styles.likeSvg] : isLike})}
            >
              <use
                xlinkHref={`/img/icon/sprite.svg#${getLikeIcon()}`}
              ></use>
            </svg>
            <span className={styles.track__timeText}>
              {formatTime(track.duration_in_seconds)}
            </span>
          </div>
        </div>
      </div>
    </>
  );
};
