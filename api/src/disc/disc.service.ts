import { HttpException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { DeleteResult, Repository } from 'typeorm';
import { Disc } from './entities/disc.entity';
import { DiscDto } from './dtos/disc.dto';
import { DiscSearchResult } from './dtos/disc-search-result.interface';

@Injectable()
export class DiscService {
  discUrl: string = 'https://discit-api.fly.dev/disc?name=';
  constructor(
    @InjectRepository(Disc)
    private readonly discRepository: Repository<Disc>,
  ) {}

  //   async createDisc(discData: DiscDto): Promise<Disc> {
  //     const disc = this.discRepository.create(discData);
  //     return await this.discRepository.save(disc);
  //   }

  async getDiscById(discId: number): Promise<Disc | null> {
    return await this.discRepository.findOneBy({ id: discId });
  }

  //   async getCollectionById(id: number): Promise<Disc[]> {
  //     return await this.discRepository.find({ where: { userId: id } });
  //   }

  //   async searchForDiscByName(
  //     name: string,
  //   ): Promise<DiscSearchResult | DiscSearchResult[]> {
  //     try {
  //       const discData = await fetch(this.discUrl + encodeURI(name));
  //       const response: DiscSearchResult | DiscSearchResult[] =
  //         await discData.json();
  //       return response;
  //     } catch (e) {
  //       throw new HttpException('Error searching for disc' + name, e);
  //     }
  //   }

  async updateDisc(discData: Disc): Promise<Disc> {
    return await this.discRepository.save(discData);
  }

  //   async deleteDisc(discId: number): Promise<DeleteResult> {
  //     return await this.discRepository.delete(discId);
  //   }
}
