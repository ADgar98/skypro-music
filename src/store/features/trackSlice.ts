import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { TrackType } from '../../sherdTypes/sheredTypes';

type initialStateType = {
  currentTrack: TrackType | null;
  allTracks: TrackType[];
  shuffledPlaylist: TrackType[];
  isPlay: boolean;
  isShuffle: boolean;
  favoriteTracks: TrackType[];
  pagePlaylist: TrackType[];
  filters: {
    authors: string[];
    genres: string[];
    years: string;
  };
};

const initialState: initialStateType = {
  currentTrack: null,
  allTracks: [],
  isPlay: false,
  isShuffle: false,
  shuffledPlaylist: [],
  favoriteTracks: [],
  pagePlaylist: [],
  filters: {
    authors: [],
    genres: [],
    years: 'По умолчанию',
  },
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
      state.shuffledPlaylist = [...state.allTracks].sort(
        () => Math.random() - 0.5,
      );
    },

    setFavoriteTracks: (state, action: PayloadAction<TrackType[]>) => {
      state.favoriteTracks = action.payload;
    },

    addLikedTracks: (state, action: PayloadAction<TrackType>) => {
      state.favoriteTracks = [...state.favoriteTracks, action.payload];
    },

    removeLikedTracks(state, action: PayloadAction<TrackType>) {
      const index = state.favoriteTracks.findIndex(
        (track) => track._id === action.payload._id,
      );
      if (index !== -1) {
        state.favoriteTracks.splice(index, 1);
      }
    },

    setIsPlay: (state, action: PayloadAction<boolean>) => {
      state.isPlay = action.payload;
    },
    toggleShuffle: (state) => {
      state.isShuffle = !state.isShuffle;
    },
    setNextTrack: (state) => {
      if (state.currentTrack && state.allTracks) {
        const allPLaylist = state.isShuffle
          ? state.shuffledPlaylist
          : state.allTracks;
        const curIndex = allPLaylist.findIndex(
          (el) => el._id === state.currentTrack?._id,
        );
        const nextIndex = curIndex + 1;
        if (nextIndex >= allPLaylist.length) {
          return;
        }
        const nextTrackIndex = curIndex + 1;
        state.currentTrack = allPLaylist[nextTrackIndex];
      }
    },

    setPrevTrack: (state) => {
      if (state.currentTrack && state.allTracks) {
        const allPLaylist = state.isShuffle
          ? state.shuffledPlaylist
          : state.allTracks;
        const curIndex = allPLaylist.findIndex(
          (el) => el._id === state.currentTrack?._id,
        );
        const lastIndex = curIndex - 1;
        if (lastIndex < 0) {
          return;
        }
        const nextTrackIndex = curIndex - 1;
        state.currentTrack = allPLaylist[nextTrackIndex];
      }
    },
    setPagePlaylist: (state, action: PayloadAction<TrackType[]>) => {
      state.pagePlaylist = action.payload;
    },

    setFilterAuthors: (state, action: PayloadAction<string>) => {
      const author = action.payload;
      if (state.filters.authors.includes(author)) {
        state.filters.authors = state.filters.authors.filter((el) => {
          return el !== author;
        });
      } else {
        state.filters.authors = [...state.filters.authors, author];
      }
    },

    setFilterGenres: (state, action: PayloadAction<string>) => {
      const genres = action.payload;
      if (state.filters.genres.includes(genres)) {
        state.filters.genres = state.filters.genres.filter((el) => {
          return el !== genres;
        });
      } else {
        state.filters.genres = [...state.filters.genres, genres];
      }
    },
    setFilterYears: (state, action: PayloadAction<string>) => {
      const date = action.payload;
      if (state.filters.years === date) {
        state.filters.years = 'По умолчанию'
      } else {
        state.filters.years = action.payload
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
  setFavoriteTracks,
  addLikedTracks,
  removeLikedTracks,
  setPagePlaylist,
  setFilterAuthors,
  setFilterGenres,
  setFilterYears,
} = trackSlice.actions;
export const trackSliceReducer = trackSlice.reducer;
