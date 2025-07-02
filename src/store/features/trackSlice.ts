import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { TrackType } from '../../sherdTypes/sheredTypes';

type initialStateType = {
  currentTrack: TrackType | null;
  allTracks: TrackType[];
  shuffledPlaylist: TrackType[];
  isPlay: boolean;
  isShuffle: boolean;
};

const initialState: initialStateType = {
  currentTrack: null,
  allTracks: [],
  isPlay: false,
  isShuffle: false,
  shuffledPlaylist: [],
};

const trackSlice = createSlice({
  name: 'tracks',
  initialState,
  reducers: {
    setCurrentTrack: (state, action: PayloadAction<TrackType>) => {
      state.currentTrack = action.payload;
    },
    setAllTracks: (state, action: PayloadAction<TrackType[]>) => {
      state.allTracks = action.payload;
      state.shuffledPlaylist = [...state.allTracks].sort(() => Math.random() - 0.5)
    },
    setIsPlay: (state, action: PayloadAction<boolean>) => {
      state.isPlay = action.payload;
    },
    toggleShuffle: (state) => {
      state.isShuffle = !state.isShuffle;
    },
    setNextTrack: (state) => {
      if (state.currentTrack && state.allTracks) {
        const allPLaylist = state.isShuffle ? state.shuffledPlaylist : state.allTracks;
        const curIndex = allPLaylist.findIndex(
          (el) => el._id === state.currentTrack?._id,
        );
        const lastIndex = state.allTracks.length - 1;
        if (curIndex === lastIndex && allPLaylist != state.shuffledPlaylist) {
          return;
        }
        const nextTrackIndex = curIndex + 1;
        state.currentTrack = allPLaylist[nextTrackIndex];
      }
    },

    setPrevTrack: (state) => {
      if (state.currentTrack && state.allTracks) {
        const allPLaylist = state.isShuffle ? state.shuffledPlaylist : state.allTracks;
        const curIndex = allPLaylist.findIndex(
          (el) => el._id === state.currentTrack?._id,
        );
        if (curIndex === 0 && allPLaylist != state.shuffledPlaylist) {
          return;
        }
        const nextTrackIndex = curIndex - 1;
        state.currentTrack = allPLaylist[nextTrackIndex];
      }
    },
  },
});

export const {
  setCurrentTrack,
  setAllTracks,
  setIsPlay,
  setNextTrack,
  setPrevTrack,
  toggleShuffle,
} = trackSlice.actions;
export const trackSliceReducer = trackSlice.reducer;
