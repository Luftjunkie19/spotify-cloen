import useSWR from 'swr';

import fetcher from '@/util/fetcher';

interface Props{
    artistId: string,
}

function useArtist({artistId}:Props) {
    const { data, mutate, isLoading, } = useSWR(artistId ? `/api/artists/${artistId}` : null, fetcher);
    
    return { data, mutate, isLoading };
}

export default useArtist