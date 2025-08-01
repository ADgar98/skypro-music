'use client';

import { TrackType } from '@/sherdTypes/sheredTypes';
import { useAppDispatch, useAppSelector } from '@/store/store';
import {
  setAllTracks,
  setCurrentTrack,
  setIsPlay,
} from '@/store/features/trackSlice';


import { Track } from '../Track/Track';

interface PlaylistItemProps {
  tracks: TrackType[];
}

export default function PlaylistItem({ tracks }: PlaylistItemProps) {
  const dispatch = useAppDispatch();


  const isPlay = useAppSelector((state) => state.tracks.isPlay);
  

  if (!tracks) {
    return <></>;
  }

  const onClickTrack = (track: TrackType) => {
    dispatch(setCurrentTrack(track));
    dispatch(setAllTracks(tracks));
    dispatch(setIsPlay(true));
  };

  return (
    <>
      {tracks.map((track: TrackType) => (
        <Track
          key={track._id}
          track={track}
          onClickTrack={onClickTrack}
          isPlay={isPlay}
        />
      ))}
    </>
  );
}
