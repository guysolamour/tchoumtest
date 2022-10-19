import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { AppController } from './app.controller';
import { AppService } from './app.service';

import { ContinentSchema } from './schema/continent.schema';
import { ContinentService } from './service/continent/continent.service';

import { ContinentController } from './controller/continent/continent.controller';

@Module({
  imports: [
      MongooseModule.forRoot('mongodb://localhost:27017/continentsdb'),
      MongooseModule.forFeature([{ name: 'Continent', schema: ContinentSchema }])
  ],
  controllers: [AppController, ContinentController],
  providers: [AppService, ContinentService],
})


export class AppModule {}
