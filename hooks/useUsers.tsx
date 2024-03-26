import useSWR from 'swr';

import fetcher from '@/util/fetcher';

function useUsers() {
    const { data, mutate, isLoading, } = useSWR('api/users', fetcher);
    
    return { data, mutate, isLoading };
}



export default useUsers