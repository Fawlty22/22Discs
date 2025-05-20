import { Disc } from 'src/disc/entities/disc.entity';
import { discs } from './constants';
import { NotFoundException } from '@nestjs/common';

const discsInfo: Disc[] = discs;

export const mockDiscRepository = {
  findOneBy: async (criteria: Partial<Disc>): Promise<Disc | null> => {
    return (
      discsInfo.find((disc) =>
        Object.entries(criteria).every(
          ([key, value]) => disc[key as keyof Disc] === value,
        ),
      ) || null
    );
  },
  findOneByOrFail: async (criteria: Partial<Disc>): Promise<Disc> => {
    const found = await mockDiscRepository.findOneBy(criteria);
    if (!found) {
      throw new NotFoundException('Disc not found');
    }
    return found;
  },
  find: async (): Promise<Disc[]> => {
    return discsInfo;
  },
  create: (partialDisc: Partial<Disc>): Disc => {
    let nextId = discsInfo.length + 1;
    partialDisc.id = nextId;
    return Object.assign(new Disc(), partialDisc);
  },
  save: async (disc: Disc): Promise<Disc> => {
    let nextId = discsInfo.length + 1;
    if (disc.id) {
      // Update existing disc
      const index = discsInfo.findIndex((d) => d.id === disc.id);
      if (index !== -1) {
        discsInfo[index] = { ...discsInfo[index], ...disc };
        return discsInfo[index];
      }
    }
    // Create new disc
    const newDisc = { ...disc, id: nextId++ };
    discsInfo.push(newDisc);
    return newDisc;
  },
  delete: async (id: number): Promise<{ affected: number }> => {
    const index = discsInfo.findIndex((disc) => disc.id === id);
    if (index === -1) {
      return { affected: 0 };
    }
    discsInfo.splice(index, 1);
    return { affected: 1 };
  },
};
