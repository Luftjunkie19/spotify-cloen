import useSWR from 'swr';

import fetcher from '@/util/fetcher';

function useSongs(songId?:string) {
    const { data, mutate, isLoading, } = useSWR(songId ? `/api/song/${songId}` :'api/songs', fetcher);
    
    return { data, mutate, isLoading };
}



export default useSongs