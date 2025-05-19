import { Module } from '@nestjs/common';
import { DiscController } from './disc.controller';
import { DiscService } from './disc.service';
import { getRepositoryToken, TypeOrmModule } from '@nestjs/typeorm';
import { Disc } from './entities/disc.entity';
import { mockDiscRepository } from 'src/mocks/disc.repository.mock';

@Module({
  imports: [],
  controllers: [DiscController],
  providers: [
    DiscService,
    {
      provide: getRepositoryToken(Disc),
      useValue: mockDiscRepository,
    },
  ],
})
export class DiscModule {}
