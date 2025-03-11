import {
  Controller,
  Get,
  Patch,
  Delete,
  Query,
  Param,
  ParseIntPipe,
  Body,
  ParseEnumPipe,
  ParseArrayPipe,
} from "@nestjs/common";
import { ExampleService } from "./example.service";
import { PatchExampleDto } from "./dto";
import { Order } from "../../../../packages/types/order";

@Controller("examples")
export class ExampleController {
  constructor(private readonly exampleService: ExampleService) {}

  @Get("/:id")
  getExample(@Param("id", ParseUUIDPipe) id: string) {
    return this.exampleService.findOneExampleOrThrow({ id });
  }

  @Get()
  getExamples(
    @Query("take", new ParseIntPipe({ optional: true })) take?: number,
    @Query("skip", new ParseIntPipe({ optional: true })) skip?: number,
    @Query("order", new ParseEnumPipe({ optional: true })) order?: Order,
    @Query("sortBy", new ParseArrayPipe({ separator: ",", optional: true })) sortBy?: ExtractKeys<Example>[],
  ) {
    return this.exampleService.findManyExamplesOrThrow({}, { take, skip, order, sortBy });
  }

  @Patch("/:id")
  patchExamples(@Param("id", ParseUUIDPipe) id: string, @Body() dto: PatchExampleDto) {
    return this.exampleService.patchExample({ where: { id }, data: dto });
  }

  @Delete("/:id")
  deleteExamples(@Param("id", ParseUUIDPipe) id: string) {
    return this.exampleService.deleteExample({ id });
  }
}
