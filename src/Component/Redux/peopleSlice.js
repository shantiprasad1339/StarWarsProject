import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  peopleData: [],
  searchData: '',
  currentPage: 1,
  itemsPerPage: 5,
};

const peopleSlice = createSlice({
  name: 'people',
  initialState,
  reducers: {
    setPeopleData: (state, action) => {
      state.peopleData = action.payload;
    },
    setSearchData: (state, action) => {
      state.searchData = action.payload;
    },
    setCurrentPage: (state, action) => {
      state.currentPage = action.payload;
    },
  },
});

export const { setPeopleData, setSearchData, setCurrentPage } = peopleSlice.actions;

export default peopleSlice.reducer;
