import { createSlice } from '@reduxjs/toolkit';

export const playlistModalContext = createSlice({
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

export const playlistModalActions = playlistModalContext.actions;