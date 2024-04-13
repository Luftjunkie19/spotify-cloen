import { storage } from '@/pages/_app';
import { getDownloadURL, ref, uploadBytes } from 'firebase/storage';

type Props = {
    path: string,
    image: File, // Change imageUrl to image of type File
};

function useStorage() {
 
    const uploadImage = async ({ path, image }: Props) => {
        const uploadPath = `${path}/${image}`;
        const imageRef = ref(storage, uploadPath);

        // Convert the image to Blob
        const blob = new Blob([image]);

        // Upload the image
        await uploadBytes(imageRef, blob);
        
        // Get the download URL
        const photoURL = await getDownloadURL(imageRef);

        return photoURL;
    };
    
    return { uploadImage };
}

export default useStorage;
