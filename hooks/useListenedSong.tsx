import useSWR from 'swr';

import fetcher from '@/util/fetcher';

function useListenedSong(songId:string) {
    const { data, mutate, isLoading, } = useSWR(songId ? `/api/listenedSong/${songId}` : null, fetcher);
    
    return { data, mutate, isLoading };
}



export default useListenedSong