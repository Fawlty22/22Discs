import {
  Controller,
  Post,
  Body,
  Get,
  Param,
  Put,
  Delete,
  Query,
  ParseIntPipe,
} from '@nestjs/common';
import { DiscService } from './disc.service';
import { Disc } from './entities/disc.entity';
import { DeleteResult } from 'typeorm';

@Controller('disc')
export class DiscController {
  constructor(private readonly discService: DiscService) {}

  @Post()
  async createDisc(@Body() discData: any): Promise<Disc> {
    return await this.discService.createDisc(discData);
  }

  @Get(':id')
  async getDiscById(
    @Param('id', ParseIntPipe) discId: number,
  ): Promise<Disc | null> {
    return await this.discService.getDiscById(discId);
  }

  @Put(':id')
  async updateDisc(@Body() disc: Disc): Promise<Disc> {
    return await this.discService.updateDisc(disc);
  }

  @Delete(':id')
  async deleteDisc(
    @Param('id', ParseIntPipe) discId: number,
  ): Promise<DeleteResult> {
    return await this.discService.deleteDisc(discId);
  }
}
