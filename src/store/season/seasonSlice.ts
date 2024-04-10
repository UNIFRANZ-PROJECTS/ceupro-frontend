import { SeasonModel } from '@/models';
import { createSlice } from '@reduxjs/toolkit';

export const seasonSlice = createSlice({
  name: 'season',
  initialState: {
    seasons: [] as SeasonModel[],
    seasonEnable: null as SeasonModel | null,
  },
  reducers: {
    setSeasonsEnable: (state, action) => {
      state.seasonEnable = action.payload.season;
    },
    setSeasons: (state, action) => {
      state.seasons = action.payload.seasons;
    },
    setAddSeason: (state, action) => {
      state.seasons = [...state.seasons, action.payload.season];
    },
    setUpdateSeason: (state, action) => {
      state.seasons = [
        ...state.seasons.map((e) => {
          if (e.id === action.payload.season.id) {
            return {
              ...action.payload.season,
            };
          }
          return e;
        }),
      ];
    },
    setDeleteSeason: (state, action) => {
      state.seasons = [
        ...state.seasons.filter((e) => e.id != action.payload.id),
      ];
    },
    setEnableSeason: (state, action) => {
      state.seasons = [
        ...state.seasons.map((e) => {
          if (e.id === action.payload.season.id) {
            return {
              ...action.payload.season,
            };
          } else {
            return {
              ...e,
              enableState: false,
            };
          }
        }),
      ];
    },
  },
});

// Action creators are generated for each case reducer function
export const {
  setSeasonsEnable,
  setSeasons,
  setAddSeason,
  setUpdateSeason,
  setDeleteSeason,
  setEnableSeason,
} = seasonSlice.actions;
