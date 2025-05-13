import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseArrayPipe,
  ParseEnumPipe,
  ParseIntPipe,
  ParseUUIDPipe,
  Patch,
  Query,
} from "@nestjs/common";
import { Order } from "src/types/order.type";
import { FindOptionsSelect } from "typeorm";

import { PatchExample, patchExampleSchema, CreateExample, createExampleSchema } from "./schemas";
import { Example } from "./entities/example.entity";
import { ExampleService } from "./services";

@Controller("examples")
export class ExampleController {
  constructor(private readonly exampleService: ExampleService) {}

  @Post("/")
  createExample(@Body(new ZodValidationPipe(createExampleSchema)) data: CreateExample) {
    return this.exampleService.createScenario(data);
  }

  @Get("/:id")
  getExample(@Param("id", ParseUUIDPipe) id: string) {
    return this.exampleService.findOneExampleOrThrow({ id });
  }

  @Get()
  getExamples(
    @Query("take", new ParseIntPipe({ optional: true })) take?: number,
    @Query("skip", new ParseIntPipe({ optional: true })) skip?: number,
    @Query("order", new ParseEnumPipe({ optional: true })) order?: Order,
    @Query("sortBy", new ParseArrayPipe({ separator: ",", optional: true }))
    sortBy?: FindOptionsSelect<Example>[],
    @Query("search") search?: string,
  ) {
    return this.exampleService.findManyExamplesOrThrow({ id: "" }, { take, skip, order, sortBy, search });
  }

  @Patch("/:id")
  patchExample(
    @Param("id", ParseUUIDPipe) id: string,
    @Body(new ZodValidationPipe(patchExampleSchema)) dto: PatchExample,
  ) {
    return this.exampleService.patchExampleBySchema({ where: { id }, data: dto });
  }

  @Delete("/:id")
  deleteExample(@Param("id", ParseUUIDPipe) id: string) {
    return this.exampleService.deleteExample({ id });
  }
}
