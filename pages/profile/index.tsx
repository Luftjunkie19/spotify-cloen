import React, {
  useEffect,
  useState,
} from 'react';

import Image from 'next/image';
import Link from 'next/link';
import { FaPencilAlt } from 'react-icons/fa';

import image from '@/assets/wp8138021.jpg';
import EditModal from '@/components/modals/EditModal';
import useCurrentUser from '@/hooks/useCurrentUser';
import useUsers from '@/hooks/useUsers';

export interface userData{
  username: string,
  profileImg: string | null
}

function UsersProfilePage() {
  const { data: user } = useCurrentUser();
  const { data: usersData } = useUsers();
  
  const [username, setUsername] = useState<string>('');
  const [photoUrl, setPhotoUrl] = useState<string | null>(null);
  const [openedModal, setOpenedModal] = useState(false);



  const openModal = () => {
    setOpenedModal(true);
  }
  

  const closeModal = () => {
    setOpenedModal(false);
  }


  useEffect(() => {
    
    if (user) {
      setPhotoUrl(user.profileImg);
      setUsername(user.username);
}

  },[]);


  const userDataObject:userData={
    username: username,
    profileImg:photoUrl,
  }

   const handleFileInputChange = (event:any) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setPhotoUrl(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const changeUsername=(e:any)=>{
    setUsername(e.target.value);
  }

  const submitChanges = async () => {
    await fetch('/api/updateUser', {
      method: "POST",
      body: JSON.stringify({ id: user.id, uploadPhoto: photoUrl, nickname: username }),
      headers: {
        'Content-Type': 'application/json'
      }
    });
    closeModal();
  }

  return (
      <div className='w-full h-full'>
          {user &&
              <>
          <div className=" flex gap-4 p-4 items-center">
          <div className="w-64 group h-64 rounded-full overflow-hidden relative top-0 left-0">
            <Image width={256} height={256} src={user.profileImg ? user.profileImg : image} className='w-64 h-64 object-cover rounded-full' alt='' />
            <button onClick={openModal} className="w-full group flex flex-col gap-2 justify-center items-center h-full group-hover:top-0 group-hover:left-0 rounded-full duration-500 absolute transition-all top-full -left-full bg-spotifyOpacityDarkGray">
             <FaPencilAlt className='transition-all group-hover:opacity-100 group-hover:-translate-y-0 translate-y-full opacity-0 delay-500' size={36}/> 
             <p className='transition-all group-hover:opacity-100 group-hover:-translate-y-0 translate-y-full opacity-0 delay-600' >Choose photo</p>
          </button>
         </div>

              <div className='flex flex-col gap-4'>
                <p className="text-xs">{user.isSubscribed ? 'Premium Profile' : 'Profile'}</p>
                  <p className=" font-medium text-5xl">{user.username}</p>
                  <div className="flex gap-4">
                    <p className='text-sm'>{user.followers.length} Followers</p>
                    <p className='text-sm'>{user.followed.length} Following</p>
                    <p>{user.favouriteSongs.length} Favourite Songs</p>
                  </div>
              </div>     
          </div>
          
          <div className="flex flex-col gap-2 mt-6 px-2">
                  <p className="text-2xl font-medium">Recently Followed: </p>
                  {user.followed.length === 0 && <p>Nobody has been followed by you yet.</p>}
          {user.followed.map((item: any) => (<Link key={item} href={`/users/${item}`}>
            {usersData.find((userData: any) => userData.id === item) && 
              <div className="flex flex-col gap-2 w-fit p-4">
                <Image src={usersData.find((userData: any) => userData.id === item).profileImg} alt="" className="w-48 h-48 rounded-full" width={96} height={96}/>
                <p>{usersData.find((userData: any) => userData.id === item).username}</p>
                <p className="text-sm">Artist</p>
            </div>
            }
          </Link>))}
        </div>
              </>     
          }

      <EditModal submitForm={submitChanges} changeUsername={changeUsername} changePhoto={handleFileInputChange} userData={userDataObject} onClose={closeModal} isOpen={openedModal} />
      
    </div>
  )
}

export default UsersProfilePage