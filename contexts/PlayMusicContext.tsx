import { createSlice } from '@reduxjs/toolkit';

type playMusicInteface = {
    isPlaying: boolean,
    imageUrl: String | null,
    songPath:String | null,
    title: String | null,
    artists: String[] | null,
    songLength: number | null,
    currentTime: number | null,
    showRightBar:Boolean,
    songId: string | null,
}

const initialState: playMusicInteface = {
    isPlaying: false,
    imageUrl: null,
    title: null,
    artists: null,
    songLength: null,
    currentTime: null,
    songPath:null,
    showRightBar: false,
    songId: null,
}

export const PlayMusicContext = createSlice({
    name: "playMusic",
    initialState: initialState,
    reducers: {
        togglePlayingSong(state) {
            state.isPlaying = !state.isPlaying;
        },
        closeRightBar(state) {
            state.showRightBar = false;
        },
        toggleRightBar(state) {
            state.showRightBar = !state.showRightBar;
        },
        restartSong(state) {
            state.currentTime = 0;
            state.isPlaying = true;
        },
        startSong(state, action) {
            const { songCover, songLength, songPath, title, artistList, songId } = action.payload;
            state.songPath = songPath;
            state.artists = artistList;
            state.imageUrl = songCover;
            state.songId = songId;
            state.title = title;
            state.showRightBar = true;
            state.isPlaying = false;
            state.currentTime = 0;
        }
    }
});


export const playMusicActions = PlayMusicContext.actions;