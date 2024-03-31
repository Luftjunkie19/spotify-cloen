import useSWR from 'swr';

import fetcher from '@/util/fetcher';


function useUsers(userId?:string) {
    const { data, mutate, isLoading, } = useSWR(userId ? `/api/users/${userId}`:'api/users/allUsers', fetcher);
    
    return { data, mutate, isLoading };
}



export default useUsers