import React from 'react'

interface SongManagmentBarProps{
    muted:boolean;
   looped:boolean;
   songSource:string;
}

const  SongManagmentBar= React.forwardRef<HTMLAudioElement, SongManagmentBarProps>(({muted, looped, songSource}:SongManagmentBarProps, ref)=> {
  return (
   <audio ref={ref} src={songSource} loop={looped} muted={muted}/>
  )
});
SongManagmentBar.displayName="SongManagment"

export default SongManagmentBar