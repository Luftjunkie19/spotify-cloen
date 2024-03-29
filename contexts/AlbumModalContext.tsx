import { createSlice } from '@reduxjs/toolkit';

export const albumModalContext = createSlice({
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

export const albumModalActions = albumModalContext.actions;