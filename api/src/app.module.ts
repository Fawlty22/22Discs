import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { DiscModule } from './disc/disc.module';
import { DatabaseModule } from './database/database.module';

@Module({
  imports: [DiscModule, DatabaseModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
