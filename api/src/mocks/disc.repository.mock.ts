import { Disc } from 'src/disc/entities/disc.entity';
import { discs } from './constants';

const DiscsInfo: Disc[] = discs;

export const mockDiscRepository = {
  findOneBy: async (criteria: Partial<Disc>): Promise<Disc | null> => {
    return (
      DiscsInfo.find((disc) =>
        Object.entries(criteria).every(
          ([key, value]) => disc[key as keyof Disc] === value,
        ),
      ) || null
    );
  },
  findOneByOrFail: async (criteria: Partial<Disc>): Promise<Disc> => {
    const found = await mockDiscRepository.findOneBy(criteria);
    if (!found) throw new Error('Disc not found');
    return found;
  },
  find: async (): Promise<Disc[]> => {
    return DiscsInfo;
  },
  save: async (disc: Disc): Promise<Disc> => {
    DiscsInfo.push(disc);
    return disc;
  },
  // add more methods if you want...
};
