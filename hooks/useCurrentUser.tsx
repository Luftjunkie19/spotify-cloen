import useSWR from 'swr';

import fetcher from '@/util/fetcher';

function useCurrentUser() {
    const { data, mutate, isLoading, } = useSWR('/api/currentUser', fetcher);
    
    return { data, mutate, isLoading };
}

export default useCurrentUser