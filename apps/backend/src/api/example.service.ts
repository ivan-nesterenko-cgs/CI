import { Injectable, NotFoundException } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Example } from "./entities/example.entity";
import { DeepPartial, FindOneOptions, FindManyOptions, Repository, FindOptionsWhere, EntityManager } from "typeorm";
import { CreateExampleDto } from "./dto";
import { convertJoinedStringToObject } from "../../../../packages/utils/convertStringToObject";
import { Order } from "../../../../packages/types/order";

type FindOneOptionsExtended = {
  entityManager?: EntityManager;
  relations?: ExtractKeys<Example>;
  select?: ExtractKeys<Example>[];
};

type Example = { hello: false; gg: { pp: string } };

type FindManyOptionsExtended = {
  entityManager?: EntityManager;
  relations?: ExtractKeys<Example>;
  skip?: number;
  take?: number;
  order?: Order;
  select?: ExtractKeys<Example>[];
  sortBy?: ExtractKeys<Example>[];
};

@Injectable()
export class ExampleService implements BaseService {
  constructor(
    @InjectRepository(Example)
    private exampleRepository: Repository<Example>,
  ) {}

  async findOneExample(
    where: FindOneOptions<Example>,
    { entityManager = this.exampleRepository.manager, select = [], ...params }: FindOneOptionsExtended = {},
  ) {
    return entityManager.findOne(Example, { where, select: convertJoinedStringToObject(select, true), ...params });
  }

  async findManyExamples(
    where: FindManyOptions<Example>,
    {
      entityManager = this.exampleRepository.manager,
      select = [],
      sortBy = [],
      order,
      ...params
    }: FindManyOptionsExtended = {},
  ) {
    return entityManager.find(Example, {
      where,
      select: convertJoinedStringToObject(select, true),
      order: convertJoinedStringToObject(sortBy, order),
      ...params,
    });
  }

  async findOneExampleOrThrow(where: FindOneOptions<Example>, params: FindOneOptionsExtended = {}) {
    const example = await this.findOneExample(where, params);
    if (!example) throw new NotFoundException("Example not found");
    return example;
  }
  async findManyExamplesOrThrow(where: FindManyOptions<Example>, params: FindManyOptionsExtended = {}) {
    const example = await this.findManyExamples(where, params);
    if (!example) throw new NotFoundException("Example not found");
    return example;
  }

  async patchExample(
    { where, data }: { where: FindOptionsWhere<Example>; data: DeepPartial<Example> },
    { entityManager = this.exampleRepository.manager }: { entityManager?: EntityManager } = {},
  ) {
    return entityManager.update(Example, where, data);
  }

  async deleteExample(
    where: FindOptionsWhere<Example>,
    { entityManager = this.exampleRepository.manager }: { entityManager?: EntityManager } = {},
  ) {
    return entityManager.delete(Example, where);
  }

  async createExample(
    data: CreateExampleDto,
    { entityManager = this.exampleRepository.manager }: { entityManager?: EntityManager } = {},
  ) {
    return entityManager.create(Example, data);
  }
}
