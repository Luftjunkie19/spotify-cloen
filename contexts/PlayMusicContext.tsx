import { createSlice } from '@reduxjs/toolkit';

type playMusicInteface = {
    isPlaying: boolean,
    imageUrl: String | null,
    title: String | null,
    artists: String[] | null,
    songLength: number | null,
    currentTime: number | null,
}

const initialState: playMusicInteface = {
    isPlaying: false,
    imageUrl: null,
    title: null,
    artists: null,
    songLength: null,
    currentTime: null,
    
}

export const PlayMusicContext = createSlice({
    name: "playMusic",
    initialState: initialState,
    reducers: {
        pauseSong(state) {
            state.isPlaying = false;
        },
        restartSong(state) {
            state.currentTime = 0;
            state.isPlaying = true;
        }
    }
});


export const playMusicActions = PlayMusicContext.actions;