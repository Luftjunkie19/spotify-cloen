import { configureStore } from '@reduxjs/toolkit';

import { PlayMusicContext } from './PlayMusicContext';
import { songModalContext } from './SongModalContext';
import { albumModalContext } from './AlbumModalContext';
import { playlistModalContext } from './PlayListModalContext';
import { nextSongContext } from './NextSongContext';

export const store = configureStore({
    reducer: {
        playmusic: PlayMusicContext.reducer,
        songmodal: songModalContext.reducer,
        albumModal: albumModalContext.reducer,
        playlistModal: playlistModalContext.reducer,
        nextSong: nextSongContext.reducer,
    }
});