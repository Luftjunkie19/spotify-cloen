import { storage } from '@/pages/_app';
import { Blob } from 'buffer';
import {getDownloadURL, getStorage, ref, uploadBytes} from 'firebase/storage'

type Props = {
    path: string,
    imageUrl:string,
}

function useStorage() {
 
    const uploadImage=async ({path, imageUrl}:Props)=>{

        const uploadPath = `${path}/${imageUrl}`;


        const image = ref(storage, uploadPath);

        await uploadBytes(image, imageUrl);
        const photoURL= await getDownloadURL(image);

        return photoURL;

    }
    
    return {uploadImage}
}

export default useStorage