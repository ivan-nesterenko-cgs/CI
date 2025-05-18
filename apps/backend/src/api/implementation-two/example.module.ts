import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";

import { Example } from "./entities/example.entity";
import { ExampleController } from "./example.controller";
import { ExampleActionsService } from "./example-actions.service";
import { ExampleCalculationsService } from "./example-calculations.service";

@Module({
  imports: [TypeOrmModule.forFeature([Example])],
  controllers: [ExampleController],
  providers: [ExampleActionsService, ExampleCalculationsService],
  exports: [ExampleActionsService, ExampleCalculationsService],
})
export class ExampleModule {}
