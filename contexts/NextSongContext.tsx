import { createSlice } from '@reduxjs/toolkit';
import { StaticImageData } from 'next/image';

type nextSongContext = {
    imageUrl: String | null,
    songPath:String | null,
    title: String | null,
    artists: String[] | null,
    songId: string | null,
}

const initialState: nextSongContext = {
    imageUrl: null,
    title: null,
    artists: null,
    songPath:null,
    songId: null,
}

export const nextSongContext = createSlice({
    name: "nextSong",
    initialState: initialState,
    reducers: {
       setNextSong(state, action){
        const {imageUrl, title, artists, songPath, songId}=action.payload;
state.imageUrl=imageUrl;
state.artists=artists;
state.songPath=songPath;
state.title=title;
state.songId=songId;
       }
    }
});


export const nextSongActions = nextSongContext.actions;