import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { DiscModule } from './disc/disc.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Disc } from './disc/entities/disc.entity';

@Module({
  imports: [DiscModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
