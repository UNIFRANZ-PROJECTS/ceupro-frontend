import { SeasonModel } from '@/models';
import { createSlice } from '@reduxjs/toolkit';

export const seasonSlice = createSlice({
  name: 'season',
  initialState: {
    seasons: [] as SeasonModel[],
  },
  reducers: {
    setSeasons: (state, action) => {
        state.seasons = action.payload.categories;
    },
    setAddSeason: (state, action) => {
        state.seasons = [...state.seasons, action.payload.category];
    },
    setUpdateSeason: (state, action) => {
        state.seasons = [...state.seasons.map((e) => {
            if (e.id === action.payload.category.id) {
                return {
                    ...action.payload.category
                }
            }
            return e
        })];
    },
    setDeleteSeason: (state, action) => {
        state.seasons = [...state.seasons.filter(e => e.id != action.payload.id)];
    },
  }
});


// Action creators are generated for each case reducer function
export const { 
  setSeasons,
  setAddSeason,
  setUpdateSeason,
  setDeleteSeason,
 } = seasonSlice.actions;