import useSWR from 'swr';

import fetcher from '@/util/fetcher';

function useSongs() {
    const { data, mutate, isLoading, } = useSWR('/api/songs', fetcher);
    
    return { data, mutate, isLoading };
}



export default useSongs