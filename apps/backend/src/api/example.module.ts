import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { ExampleController } from "./example.controller";
import { ExampleService } from "./example.service";
import { Example } from "./entities/example.entity";

@Module({
  imports: [ExampleService, TypeOrmModule.forFeature([Example])],
  controllers: [ExampleController],
  providers: [ExampleService],
  exports: [ExampleService],
})
export class ExampleModule {}
