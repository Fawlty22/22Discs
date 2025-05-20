import { DiscDto } from 'src/disc/dtos/disc.dto';
import { Disc } from 'src/disc/entities/disc.entity';

export const discs: Disc[] = [
  {
    id: 1,
    userId: 1,
    inBag: true,
    name: 'Destroyer',
    brand: 'Innova',
    category: 'Distance Driver',
    speed: 12,
    glide: 5,
    turn: -1,
    fade: 3,
    flightpath:
      'https://s3.amazonaws.com/media.marshallstreetdiscgolf.com/inbounds/2079719.webp',
  },
  {
    id: 2,
    userId: 1,
    inBag: true,
    name: 'Buzzz',
    brand: 'Discraft',
    category: 'Midrange',
    speed: 5,
    glide: 4,
    turn: 0,
    fade: 1,
    flightpath:
      'https://s3.amazonaws.com/media.marshallstreetdiscgolf.com/inbounds/2380596.webp',
  },
];
