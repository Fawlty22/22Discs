import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { DiscModule } from './disc/disc.module';

@Module({
  imports: [DiscModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
