import useSWR from 'swr';

import fetcher from '@/util/fetcher';


function useUsers(userId?:string) {
    const { data, mutate, isLoading, } = useSWR(userId ? `/api/users/${userId}`:'api/users', fetcher);
    
    return { data, mutate, isLoading };
}



export default useUsers