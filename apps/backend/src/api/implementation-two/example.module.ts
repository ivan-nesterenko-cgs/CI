import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { Example } from './entities/example.entity';
import { ExampleController } from './example.controller';
import * as services from './services';

@Module({
  imports: [...Object.values(services), TypeOrmModule.forFeature([Example])],
  controllers: [ExampleController],
  providers: [...Object.values(services)],
  exports: [...Object.values(services)],
})
export class ExampleModule {}
