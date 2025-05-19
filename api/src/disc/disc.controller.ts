import {
  Controller,
  Post,
  Body,
  Get,
  Param,
  Put,
  Delete,
  Query,
} from '@nestjs/common';
import { DiscService } from './disc.service';
import { Disc } from './entities/disc.entity';
import { DeleteResult } from 'typeorm';

@Controller('disc')
export class DiscController {
  constructor(private readonly discService: DiscService) {}

  @Get(':id')
  async getDiscById(@Param('id') discId: number): Promise<Disc | null> {
    return await this.discService.getDiscById(+discId);
  }
  @Put(':id')
  async updateDisc(
    @Param('id') discId: number,
    @Body() disc: Disc,
  ): Promise<Disc> {
    return await this.discService.updateDisc(disc);
  }
}
