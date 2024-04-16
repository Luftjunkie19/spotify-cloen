import {
  getDownloadURL,
  ref,
  uploadBytes,
} from 'firebase/storage';

import { storage } from '@/pages/_app';

type Props = {
    path: string,
    imageUrl:any,
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