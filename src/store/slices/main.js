// third-party
import { createSlice } from '@reduxjs/toolkit';

// ------------------------------------------------------------
const initialState = {
    listItem: [],
    selectedSchool: null
};

const main = createSlice({
    name: 'main',
    initialState,
    reducers: {
        selectSchool(state, action) {
            state.selectedSchool = {
                id: action.payload.id,
                name: action.payload.name,
                alias: action.payload.alias
            };
        },
        resetSchool(state) {
            state.selectedSchool = null;
        }
    }
});

// Reducer
export default main.reducer;

export const { selectSchool, resetSchool } = main.actions;
