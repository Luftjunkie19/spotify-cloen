import useSWR from 'swr';

import fetcher from '@/util/fetcher';

function useAdvertisement() {
    const { data, mutate, isLoading, } = useSWR('/api/advertisement/get', fetcher);
    
    return { data, mutate, isLoading };
}

export default useAdvertisement