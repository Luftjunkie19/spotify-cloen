import useSWR from 'swr';

import fetcher from '@/util/fetcher';

function usePlaylists(songId?:string) {
    const { data, mutate, isLoading, } = useSWR(songId ? `/api/playlist/${songId}` : '/api/playlist/playlists', fetcher);
    
    return { data, mutate, isLoading };
}



export default usePlaylists