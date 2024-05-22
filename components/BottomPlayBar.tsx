import React, { useEffect, useRef, useState } from 'react';
import Image from 'next/image';
import MusicImage from '@/assets/360_F_454661277_NtQYM8oJq2wOzY1X9Y81FlFa06DVipVD.jpg'
import Marquee from 'react-fast-marquee';
import { toast } from 'react-hot-toast';
import { AiOutlinePlaySquare } from 'react-icons/ai';
import {
  FaCheckCircle,
  FaPauseCircle,
  FaVolumeMute,
} from 'react-icons/fa';
import { FaShuffle } from 'react-icons/fa6';
import { HiSpeakerWave } from 'react-icons/hi2';
import { IoIosSkipForward } from 'react-icons/io';
import { IoPlayCircle } from 'react-icons/io5';
import { MdSkipPrevious } from 'react-icons/md';
import { RxLoop } from 'react-icons/rx';
import {
  useDispatch,
  useSelector,
} from 'react-redux';
import songImage from '@/assets/360_F_454661277_NtQYM8oJq2wOzY1X9Y81FlFa06DVipVD.jpg'
import { playMusicActions } from '@/contexts/PlayMusicContext';
import useCurrentUser from '@/hooks/useCurrentUser';
import useSongs from '@/hooks/useSongs';
import useUsers from '@/hooks/useUsers';
import Link from 'next/link';
import { useRouter } from 'next/router';
import SongManagmentBar from './SongManagmentBar';
import useAdvertisement from '@/hooks/useAdvertisement';
import { nextSongActions } from '@/contexts/NextSongContext';

type Props = {
  rightClosed: boolean,
  toggleRight: () => void
}

function BottomPlayBar({ rightClosed, toggleRight }: Props) {
  const songCover = useSelector((state: any) => state.playmusic.imageUrl);
  const  isPlaying = useSelector((state:any)=>state.playmusic.isPlaying);
  const songTitle = useSelector((state: any) => state.playmusic.title);
  const songPath = useSelector((state: any) => state.playmusic.songPath);
  const artists = useSelector((state: any) => state.playmusic.artists);
  const currentTime =useSelector((state:any)=>state.playmusic.currentTime);
  const songId = useSelector((state:any)=>state.playmusic.songId);
  const dispatch = useDispatch();
  const audioReference = useRef<HTMLAudioElement>(null);
  const [moment, setMoment]=useState(0);
  const [duration, setDuration]=useState(0);
  const {data:userData}=useCurrentUser();
  const {data:songs}=useSongs();
  const audioData = audioReference.current;
  const [looped, setLooped]=useState(false);
  const [muted, setMuted]=useState(false);
  const [volumeLevel, setVolumeLevel] = useState(100);
  const {data:advertisement}=useAdvertisement();
  const { data: users } = useUsers();
  const router=useRouter();
  const pathname = router.pathname;
   //Next song data
   const nextSongCover=useSelector((state: any) => state.nextSong.imageUrl);
   const nextSongArtists=useSelector((state: any) => state.nextSong.artists);
   const nextSongTitle=useSelector((state: any) => state.nextSong.title);
   const nextSongId=useSelector((state: any) => state.nextSong.songId);
   const nextSongPath= useSelector((state: any) => state.nextSong.songPath);
 


  useEffect(()=>{
    if(audioData){
  audioData.addEventListener('timeupdate', updateCurrentTime);
  audioData.addEventListener('loadedmetadata', loadMetaData);
  audioData.addEventListener('ended',handleEnded);
  

  return ()=>{
    audioData.removeEventListener('timeupdate', updateCurrentTime);
    audioData.removeEventListener('loadedmetadata', loadMetaData);

    audioData.removeEventListener('ended', handleEnded);
  }
}

}, [audioData]);

const conditionalAdShow= userData && !userData.isSubscribed && (new Date().getTime() -  new Date(userData.pastFromLastAds).getTime()) / 60000 >= 30;
const handleEnded=()=>{
  const randomSong = songs && songs.filter((item:any)=>item.id !== songId)[Math.floor(Math.random() * songs.filter((item:any)=>item.id !== songId).length)];

  if(audioData){
  if(audioData.loop){
    audioData.currentTime=0;
    audioData.play();
    fetch('api/next-song/songToList',{
      method:'POST',
      body:JSON.stringify({songId, userId:userData && userData.id}),
      headers:{
        'Content-Type':'application/json'
      }
    }).then(result=>result.json()).then(data=>data);
  }
  if(conditionalAdShow && userData && advertisement){

     dispatch(playMusicActions.startSong({songPath: advertisement.musicPath, imageUrl: advertisement && advertisement.songCover, artists: ['Clonify'], title:advertisement.title, songId:advertisement.id}));
     
    fetch('/api/updateUser', {
      method:'POST',
      body:JSON.stringify({id:userData.id, updateAds: conditionalAdShow}),
      headers:{
        'Content-Type':'application/json'
      }
    }).then(res => res.json()).then((result)=>result)
     .catch(err => console.log(err))
   }  
  else{
    dispatch(playMusicActions.togglePlayingSong());
    if(randomSong){
      const randomArtist = users && randomSong && users.find((userItem:any)=>userItem.id === randomSong.artistId).username;
      dispatch(playMusicActions.startSong({songPath: randomSong.musicPath, imageUrl: randomSong && randomSong.songCover, artists: [randomArtist], title:randomSong.title, songId:randomSong.id}));
    }

     fetch('api/next-song/songToList',{
       method:'POST',
       body:JSON.stringify({songId, userId: userData.id}),
       headers:{
         'Content-Type':'application/json'
       }
     }).then(result=>result.json()).then(data=>console.log(data));
   
  }
 }
};

const handleVolume=(e:React.ChangeEvent<HTMLInputElement>)=>{
  if(audioData){
if(audioData.muted){
  audioData.volume=0;
  setVolumeLevel(0);
}
    audioData.volume= +e.target.value;
    setVolumeLevel(+e.target.value);
  }
}

const updateCurrentTime=()=>{
  if(audioData){
    setMoment(audioData?.currentTime);
    dispatch(playMusicActions.updateSongTime(audioData?.currentTime));
  }
};

const loadMetaData=()=>{
  if(audioData){
    setDuration(audioData.duration);
    dispatch(playMusicActions.updateSongLength(audioData.duration));
audioData.play()
  }
};

const toggleSong=()=>{
  dispatch(playMusicActions.togglePlayingSong());
  if(audioData){
    if(!isPlaying){
      audioData.play();
    }else{
      audioData.pause();
    }
  }
}

const toggleLoop=()=>{
  if(userData){
    if(userData.isSubscribed){
      setLooped(!looped);
    }else{
      toast.error('You have to purchase a subscription to use this feature');
    }
  }
}

const toggleMute=()=>{
  setMuted(!muted);
}





const goForward=()=>{

  const randomSong = songs && songs.filter((item:any)=>item.id !== songId && item.id !== nextSongId)[Math.floor(Math.random() * songs.filter((item:any)=>item.id !== songId && item.id !== nextSongId).length)];
  
if(audioData){
  audioData.currentTime=0;
  setMoment(0);
}

if(userData.isSubscribed && randomSong){
  const randomArtist = users && randomSong && users.find((userItem:any)=>userItem.id === randomSong.artistId).username;

  dispatch(playMusicActions.startSong({songPath: nextSongPath, songId:nextSongId, songCover:nextSongCover, artists:nextSongArtists , title:randomSong.title}));
  dispatch(nextSongActions.setNextSong({imageUrl:randomSong.songCover, title:randomSong.title, artists: [randomArtist], songPath:randomSong.musicPath, songId:randomSong.id}));
 
  fetch('api/next-song/songToList',{
    method:'POST',
    body:JSON.stringify({songId, userId:userData.id}),
    headers:{
      'Content-Type':'application/json'
    }
  }).then(result=>result.json()).then(data=>console.log(data));   
}




  if(!userData.isSubscribed && userData.availableSkips > 0 && randomSong){
    fetch(`/api/next-song/${userData.id}`).then((result)=>result.json()).then((resultData)=>console.log(resultData));
    const randomArtist = users && randomSong && users.find((userItem:any)=>userItem.id === randomSong.artistId).username;
    dispatch(playMusicActions.startSong({songPath: nextSongPath, songId:nextSongId, songCover:nextSongCover, artists:nextSongArtists , title:randomSong.title}));
    dispatch(nextSongActions.setNextSong({imageUrl:randomSong.songCover, title:randomSong.title, artists: [randomArtist], songPath:randomSong.musicPath, songId:randomSong.id}))
    fetch('api/next-song/songToList',{
      method:'POST',
      body:JSON.stringify({songId, userId:userData.id}),
      headers:{
        'Content-Type':'application/json'
      }
    }).then(result=>result.json()).then(data=>console.log(data));
  }
  
  if(!userData.isSubscribed && userData.availableSkips === 0){
    toast("In order to go forward you have to wait or purchase subscription");
  }



}


const handleLike= async ()=>{
  const fetchData= await fetch('api/like', {
     method:'POST',
     body:JSON.stringify({songId:songId, likerId:userData && userData.id}),
     headers:{
         'Content-Type':'application/json'
     }
  });

  const response = await fetchData.json();
     
 }

const goBack= async ()=>{
  console.log(userData);
  const fetchData= await fetch('api/previousSong',{
    method:"POST",
    body:JSON.stringify({songId: songId}),
    headers:{
      'Content-Type':'application/json'
    }
  });

  const data=await fetchData.json();
  console.log(data);
  if(userData.isSubscribed && data){
    const artist= users.find((item:any)=>item.id === data.artistId).username;
   dispatch(playMusicActions.startSong({songPath: data.musicPath, imageUrl: data.songCover, artists:[artist], title:data.title, songId:data.id}));
  }
  
  if(!userData.isSubscribed && data){
    toast.error('You have to be subsribed to Clonify');
  }

  else{
    return;
  }
}

  return (
    <>
    <div className={`fixed ${songPath && !pathname.includes('playedSong') ? 'flex' : 'hidden'} bottom-0 left-0 w-full pt-2 px-4 bg-spotifyBlack h-20 z-50 justify-between`}>
      <div className="flex gap-6 items-center ">
       {songCover ?  <>
       <Link className='sm:block lg:hidden w-12 h-12 rounded-lg' href={`/playedSong/${songId}`}>
        <Image className="w-12 h-12 rounded-lg" width={48} height={48} src={songCover} alt='' />
       </Link>

       <Link className='sm:hidden lg:block w-12 h-12 rounded-lg' href={`/song/${songId}`}>
        <Image className="w-12 h-12 rounded-lg" width={48} height={48} src={songCover} alt='' />
       </Link>
       </> : <>
       <Link className='sm:block lg:hidden w-12 h-12 rounded-lg' href={`/playedSong/${songId}`}>
       <Image className="w-12 h-12 rounded-lg" width={48} height={48} src={MusicImage} alt='' />
       </Link>

       <Link className='sm:hidden lg:block w-12 h-12 rounded-lg' href={`/song/${songId}`}>
       <Image className="w-12 h-12 rounded-lg" width={48} height={48} src={MusicImage} alt='' />
       </Link>
       </>}
        <div className="flex flex-col justify-center">
          <Marquee speed={20} direction={'right'} pauseOnHover  className="max-w-24">
    
            <p className="font-medium cursor-pointer hover:underline transition px-1">{songTitle}</p>
       
          </Marquee>
          <p className="text-xs text-nowrap cursor-pointer hover:underline transition text-spotifyLightGray">{artists}</p>
        </div>
          </div>

      <div className="sm:flex lg:hidden gap-6">
        <button disabled={conditionalAdShow} onClick={handleLike} className='sm:block lg:hidden'><FaCheckCircle className={userData && userData.favouriteSongs.includes(songId) ? 'text-spotifyGreen': 'text-white'} size={24}/></button>
           <button disabled={conditionalAdShow} onClick={toggleSong} className='sm:block lg:hidden'> {isPlaying ? <FaPauseCircle size={36}/> : <IoPlayCircle size={36} />}</button>
      </div>
      
      <div className="sm:hidden lg:flex flex-col gap-2 self-center">
        <div className="flex gap-8 self-center">
          <button><FaShuffle size={24}/></button>
          <button onClick={goBack}><MdSkipPrevious size={24} /></button>
          <SongManagmentBar muted={muted} looped={looped} ref={audioReference} songSource={songPath}/>
          <button onClick={toggleSong}>
            {isPlaying ? <FaPauseCircle size={36}/> : <IoPlayCircle size={36} />}
            </button>
          <button disabled={conditionalAdShow} onClick={goForward}><IoIosSkipForward  size={24}/></button>
          <button disabled={conditionalAdShow} onClick={toggleLoop}><RxLoop className={`${looped ? 'text-spotifyGreen' : 'text-white'}`}  size={24}/></button>
      </div>
        <div className="flex gap-1 items-center py-2">
          <p className="text-xs text-spotifyLightGray">{Math.floor((currentTime / 60))}:{`${ (currentTime % 60) < 10 ? `0${Math.floor((currentTime % 60))}` : `${Math.floor((currentTime % 60))}`}`}</p>  
        <input disabled={conditionalAdShow} value={currentTime} min={0} max={duration} onChange={(e:React.ChangeEvent<HTMLInputElement>)=>{
          if(audioData){
            audioData.currentTime= +e.target.value;
            dispatch(playMusicActions.updateSongTime(+e.target.value));
            setMoment(+e.target.value);
          }
        }} className="range range-xs lg:w-80 xl:w-96 [--range-shdw:#1db954]" type="range" />
          <p className="text-xs text-spotifyLightGray">-{Math.floor((duration - currentTime) / 60)}:{`${((duration - currentTime) % 60) < 10 ? `0${Math.floor(((duration - currentTime) % 60) )}` : `${Math.floor(((duration - currentTime) % 60) )}`}`} </p>
      </div>
      </div>
      

      <div className="sm:hidden lg:flex gap-4">
        <button className="sm:hidden lg:block" onClick={toggleRight}>
<AiOutlinePlaySquare className={`${!rightClosed ? 'text-white' : 'text-spotifyGreen'}`} size={20}/>
        </button>
      <div className=" sm:hidden lg:flex items-center gap-2">
        <button onClick={toggleMute}>
{muted ? <FaVolumeMute size={20}/> : <HiSpeakerWave size={20} />}
        </button>
<input className="range range-xs max-w-24 [--range-shdw:#fff]"  type="range" min={0} onChange={handleVolume} step={0.01} value={muted ? 0 : volumeLevel} max={1}  name="" id="" />

      </div>
      </div>
      
    </div>
    
    
    <div className={`${songPath && pathname.includes('playedSong') ? 'flex' : 'hidden'} bg-spotifyDarkGray fixed bottom-0 left-0 w-full items-center rounded-t-lg justify-center px-2 py-6 max-h-28 gap-2 flex-col`}>
      <div className="flex gap-6">
      <button><FaShuffle size={24}/></button>
          <button onClick={goBack}><MdSkipPrevious size={24} /></button>
          <SongManagmentBar muted={muted} looped={looped} ref={audioReference} songSource={songPath}/>
          <button onClick={toggleSong}>
            {isPlaying ? <FaPauseCircle size={36}/> : <IoPlayCircle size={36} />}
            </button>
          <button disabled={conditionalAdShow} onClick={goForward}><IoIosSkipForward  size={24}/></button>
          <button disabled={conditionalAdShow} onClick={toggleLoop}><RxLoop className={`${looped ? 'text-spotifyGreen' : 'text-white'}`}  size={24}/></button>
      </div>
      <div className="flex w-full gap-1 items-center justify-center py-2">
          <p className="text-xs text-spotifyLightGray"> <p className="text-xs text-spotifyLightGray">{Math.floor((currentTime / 60))}:{`${ (currentTime % 60) < 10 ? `0${Math.floor((currentTime % 60))}` : `${Math.floor((currentTime % 60))}`}`}</p>  </p>  
        <input  onChange={(e:React.ChangeEvent<HTMLInputElement>)=>{
          if(audioData){
            audioData.currentTime= +e.target.value;
            dispatch(playMusicActions.updateSongTime(+e.target.value));
            setMoment(+e.target.value);
          }
        }} max={duration} value={currentTime} className="range range-xs lg:w-80 xl:w-96 [--range-shdw:#1db954]" type="range" />
          <p className="text-xs text-spotifyLightGray">-{Math.floor((duration - currentTime) / 60)}:{`${((duration - currentTime) % 60) < 10 ? `0${Math.floor(((duration - currentTime) % 60) )}` : `${Math.floor(((duration - currentTime) % 60) )}`}`}</p>
      </div>

    </div>
    </>
  )
}

export default BottomPlayBar