import useSWR from 'swr';

import fetcher from '@/util/fetcher';

function useAlbums(albumId?:string) {
    const { data, mutate, isLoading, } = useSWR(albumId ? `/api/album/${albumId}` : '/api/album/albums', fetcher);
    
    return { data, mutate, isLoading };
}



export default useAlbums