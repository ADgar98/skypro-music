import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { TrackType } from '../../sherdTypes/sheredTypes';

type initialStateType = {
  currentTrack: TrackType | null;
  allTracks: TrackType[] | null;
  isPlay: boolean;
};

const initialState: initialStateType = {
  currentTrack: null,
  allTracks: null,
  isPlay: false,
};

const trackSlice = createSlice({
  name: 'tracks',  
  initialState,  
  reducers: {
    setCurrentTrack: (state, action: PayloadAction<TrackType>) => {
    state.currentTrack = action.payload;    
    },
    setAllTracks: (state, action: PayloadAction<TrackType[]>) => {
      state.allTracks = action.payload
    },
    setIsPlay: (state, action: PayloadAction<boolean>) => {
      state.isPlay = action.payload
    }
  },
});

export const { setCurrentTrack, setAllTracks, setIsPlay } = trackSlice.actions;
export const trackSliceReducer = trackSlice.reducer;
