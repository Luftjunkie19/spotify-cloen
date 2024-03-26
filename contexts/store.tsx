import { configureStore } from '@reduxjs/toolkit';

import { PlayMusicContext } from './PlayMusicContext';
import { songModalContext } from './SongModalContext';

export const store = configureStore({
    reducer: {
        playmusic: PlayMusicContext.reducer,
        songmodal: songModalContext.reducer,
    }
});