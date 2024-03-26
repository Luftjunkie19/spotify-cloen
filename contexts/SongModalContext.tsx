import { createSlice } from '@reduxjs/toolkit';

export const songModalContext = createSlice({
    name: "songmodal",
    initialState: {
        isShown:false,
    },
    reducers: {
        showModal(state) { 
            state.isShown=true;
        },
        toggleModal(state) {
            state.isShown = !state.isShown;
        },
        closeModal(state) {
            state.isShown = false;  
        }
    }
});

export const songModalActions = songModalContext.actions;