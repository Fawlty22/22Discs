import { Module } from '@nestjs/common';
import { DiscController } from './disc.controller';
import { DiscService } from './disc.service';

@Module({
  controllers: [DiscController],
  providers: [DiscService]
})
export class DiscModule {}
