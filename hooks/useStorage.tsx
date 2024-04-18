import { Blob } from 'buffer';
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
 
    const uploadImage = async ({ path, imageUrl }: Props) => {
        const uploadPath = `${path}/${imageUrl}`;
        const imageRef = ref(storage, uploadPath);

        // Convert the image to Blob
        const blob = new Blob([imageUrl]);

        // Upload the image
        await uploadBytes(imageRef, imageUrl);
        
        // Get the download URL
        const photoURL = await getDownloadURL(imageRef);

        return photoURL;
    };
    
    return { uploadImage };
}

export default useStorage;
