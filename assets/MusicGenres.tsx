import { StaticImageData } from 'next/image';

import rapImage
  from '@/assets/music-types/41ec9bc1aa2956d248874d5b070fbc1d.png';
import classicalImage from '@/assets/music-types/Classical.png';
import genreImage6
  from '@/assets/music-types/Female-Indie-Singer-Valeria-Salt.png';
import genreImage5 from '@/assets/music-types/IMG_1710_PNG.webp';
import genreImage from '@/assets/music-types/metal.png';
import genreImage4
  from '@/assets/music-types/pngtree-jazz-musician-playing-saxophone-scratchboard-png-image_13010325.png';
import genreImage7 from '@/assets/music-types/Timur-v4.png';

interface GenreObject{
    genre: String,
    colour?: String,
    path: String,
    image:StaticImageData
}


export const genres: Array<GenreObject> = [{
    genre: "Hip-hop/Rap",
    path: '/rap',
    image: rapImage
}, {
    genre: "Classical",
    path: '/classical',
    image: classicalImage
}, {
    genre: "Metal",
    path: '/metal',
    image: genreImage
}, {
    genre: "Jazz",
    path: '/jazz',
    image: genreImage4
}, {
    genre: "Country",
    path: '/country',
    image: genreImage5
}, {
    genre: "India",
    path: '/india',
    image: genreImage6
},  {
    genre: "Pop",
    path: '/pop',
    image: genreImage7
}]