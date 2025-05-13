import { BaseService } from "@core/service";
import { Injectable, NotFoundException } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Order } from "@shared/types";
import {
  DeepPartial,
  EntityManager,
  FindOptionsRelations,
  FindOptionsSelect,
  FindOptionsWhere,
  Repository,
} from "typeorm";

import { CreateExampleDto } from "./dto";
import { Example } from "./entities/example.entity";

type FindOneOptionsExtended = {
  entityManager?: EntityManager;
  relations?: FindOptionsRelations<Example>;
  select?: FindOptionsSelect<Example>[];
};

type FindManyOptionsExtended = {
  entityManager?: EntityManager;
  relations?: FindOptionsRelations<Example>;
  skip?: number;
  take?: number;
  order?: Order;
  select?: FindOptionsSelect<Example>[];
  sortBy?: FindOptionsSelect<Example>[];
  search?: string;
};

@Injectable()
export class ExampleService extends BaseService {
  constructor(
    @InjectRepository(Example)
    private exampleRepository: Repository<Example>,
  ) {
    super();
  }

  async findOneExample(
    where: FindOptionsWhere<Example>,
    { entityManager = this.exampleRepository.manager, select = [], ...params }: FindOneOptionsExtended = {},
  ) {
    return entityManager.findOne(Example, {
      where,
      select: select.reduce((acc, obj) => ({ ...acc, ...obj }), {}),
      ...params,
    });
  }

  async findManyExamples(
    where: FindOptionsWhere<Example>[],
    {
      search,
      entityManager = this.exampleRepository.manager,
      select = [],
      sortBy = [],
      order,
      ...params
    }: FindManyOptionsExtended = {},
  ) {
    return entityManager.find(Example, {
      where,
      select: select.reduce((acc, obj) => ({ ...acc, ...obj }), {}),
      order: sortBy.reduce((acc, obj) => {
        for (const key in obj) {
          acc[key] = order;
        }
        return acc;
      }, {}),
      ...params,
    });
  }

  async findOneExampleOrThrow(where: FindOptionsWhere<Example>, params: FindOneOptionsExtended = {}) {
    const example = await this.findOneExample(where, params);
    if (!example) throw new NotFoundException("Example not found");
    return example;
  }
  async findManyExamplesOrThrow(where: FindOptionsWhere<Example>[], params: FindManyOptionsExtended = {}) {
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
