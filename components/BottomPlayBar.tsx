import React, { useEffect, useRef, useState } from 'react';
import Image from 'next/image';
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
  const { data: users } = useUsers();
  const { data } = useSongs();
const randomSong = data && data.filter((item: any) => item.title !== songTitle)[Math.floor(Math.random() * data.filter((item: any) => item.title !== songTitle).length)];
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
const handleEnded=()=>{
  const randomSong = songs && songs.filter((item:any)=>item.id !== songId)[Math.floor(Math.random() * songs.filter((item:any)=>item.id !== songId).length)];
  
  const randomArtist = users && randomSong && users.find((userItem:any)=>userItem.id === randomSong.artistId);
 if(audioData){
  if(audioData.loop){
    audioData.currentTime=0;
    audioData.play();
  }else{
    console.log(randomSong);
   
     dispatch(playMusicActions.startSong({songPath: randomSong?.musicPath, imageUrl: randomSong?.songCover, artists: randomArtist && [randomArtist], title:randomSong?.title, songId:randomSong?.id}));

 
     fetch('/api/next-song/songToList',{
       method:'POST',
       body:JSON.stringify({songId, userId:userData.id}),
       headers:{
         'Content-Type':'application/json'
       }
     }).then(result=>result.json()).then(data=>data);
   
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
  }
};

const loadMetaData=()=>{
  if(audioData){
    setDuration(audioData?.duration);
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
    setLooped(!looped);
}

const toggleMute=()=>{
  setMuted(!muted);
}



const goForward=()=>{

  const randomSong = songs && songs.filter((item:any)=>item.id !== songId)[Math.floor(Math.random() * songs.filter((item:any)=>item.id !== songId).length)];
  
  const randomArtist = users && randomSong && users.find((userItem:any)=>userItem.id === randomSong.artistId);

if(audioData){
  audioData.currentTime=0;
  setMoment(0);
}

console.log(randomSong, randomArtist);

if(userData.isSubscribed){
  dispatch(playMusicActions.startSong({songPath: randomSong.musicPath, songId:randomSong.id, imageUrl: randomSong.songCover, artists:[randomArtist], title:randomSong.title}));
  fetch('/api/next-song/songToList',{
    method:'POST',
    body:JSON.stringify({songId, userId:userData.id}),
    headers:{
      'Content-Type':'application/json'
    }
  }).then(result=>result.json()).then(data=>console.log(data));
}
  if(!userData.isSubscribed && userData.availableSkips > 0){
    fetch(`api/next-song/${userData.id}`).then((result)=>result.json()).then((resultData)=>console.log(resultData));
    dispatch(playMusicActions.startSong({songPath: randomSong.musicPath, imageUrl: randomSong.songCover, artists:[randomArtist], title:randomSong.title, songId:randomSong.id}));
    fetch('/api/next-song/songToList',{
      method:'POST',
      body:JSON.stringify({songId, userId:userData && userData.id}),
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

  console.log(response.favouriteSongs.includes(songId));
     
 }

const goBack= async ()=>{
  console.log(userData);
  const fetchData= await fetch('/api/previousSong',{
    method:"POST",
    body:JSON.stringify({songId}),
    headers:{
      'Content-Type':'application/json'
    }
  });

  const data=await fetchData.json();
  console.log(data);
  if(userData.isSubscribed){
    toast.success('You are able to skip back');
    const artist= users.find((item:any)=>item.id === data.artistId);
   dispatch(playMusicActions.startSong({songPath: data.musicPath, imageUrl: data.songCover, artists:[artist], title:data.title, songId:data.id}));
  }else{
    toast.error('You have to be subsribed to Clonify');
  }
}

  return (
    <div className={`fixed ${songPath ? 'flex' : 'hidden'} bottom-0 left-0 w-full pt-2 px-4 bg-spotifyBlack h-20 z-50 justify-between`}>
      <div className="flex gap-6 items-center ">
        <Image className="w-12 h-12 rounded-lg" width={48} height={48} src={songCover ? songCover : songImage} alt='' />
        <div className="flex flex-col justify-center">
          <Marquee speed={20} direction={'right'} pauseOnHover  className="max-w-24">
    
            <p className="font-medium cursor-pointer hover:underline transition px-1">{songTitle ? songTitle : ''}</p>
       
          </Marquee>
          <p className="text-xs text-nowrap cursor-pointer hover:underline transition text-spotifyLightGray">{artists ? artists.join(', ') : ''}</p>
        </div>
          </div>

      <div className="sm:flex lg:hidden gap-6">
        <button onClick={handleLike} className='sm:block lg:hidden'><FaCheckCircle className={userData && userData.favouriteSongs.includes(songId) ? 'text-spotifyGreen': 'text-white'} size={24}/></button>
           <button onClick={toggleSong} className='sm:block lg:hidden'> {!isPlaying ? <FaPauseCircle size={36}/> : <IoPlayCircle size={36} />}</button>
      </div>
      
      <div className="sm:hidden lg:flex flex-col gap-2 self-center">
        <div className="flex gap-8 self-center">
          <button><FaShuffle size={24}/></button>
          <button onClick={goBack}><MdSkipPrevious size={24} /></button>
          <audio muted={muted} loop={looped} ref={audioReference} src={songPath}></audio>
          <button onClick={toggleSong}>
            {isPlaying ? <FaPauseCircle size={36}/> : <IoPlayCircle size={36} />}
            </button>
          <button onClick={goForward}><IoIosSkipForward  size={24}/></button>
          <button onClick={toggleLoop}><RxLoop className={`${looped ? 'text-spotifyGreen' : 'text-white'}`}  size={24}/></button>
      </div>
        <div className="flex gap-1 items-center py-2">
          <p className="text-xs text-spotifyLightGray">{Math.round(moment/60)}:{`${ moment < 10 ? `0${Math.round(moment)}` : `${Math.round(moment)}`}`}</p>  
        <input value={moment} min={0} max={duration} onChange={(e:React.ChangeEvent<HTMLInputElement>)=>{
          if(audioData){
            audioData.currentTime= +e.target.value;
            setMoment(+e.target.value);
          }
        }} className="range range-xs lg:w-80 xl:w-96 [--range-shdw:#1db954]" type="range" />
          <p className="text-xs text-spotifyLightGray">-{Math.round((duration  / 60) - (moment/60))}:{`${ duration - moment < 10 ? `0${Math.round(duration - moment)}` : `${Math.round(duration - moment)}`}`} </p>
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
  )
}

export default BottomPlayBar