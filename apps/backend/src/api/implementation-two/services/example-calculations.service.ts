import { BaseService } from "@core/service";
import { Injectable, NotFoundException } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Order } from "@shared/types/order.type";
import {
  DeepPartial,
  EntityManager,
  FindOptionsOrder,
  FindOptionsRelations,
  FindOptionsSelect,
  FindOptionsWhere,
  Repository,
} from "typeorm";

import { PatchExample, CreateExample } from "./schemas";
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
export class ExampleCalculationsService extends BaseService implements BaseServiceAbstract {
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
    where: FindOptionsWhere<Example>[] | FindOptionsWhere<Example>,
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
      }, {} as FindOptionsOrder<Example>),
      ...params,
    });
  }

  async findOneExampleOrThrow(where: FindOptionsWhere<Example>, params: FindOneOptionsExtended = {}) {
    const example = await this.findOneExample(where, params);
    if (!example) throw new NotFoundException("Example not found");
    return example;
  }
  async findManyExamplesOrThrow(
    where: FindOptionsWhere<Example>[] | FindOptionsWhere<Example>,
    params: FindManyOptionsExtended = {},
  ) {
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

  async patchExampleBySchema(
    { where, data }: { where: FindOptionsWhere<Example>; data: PatchExample },
    { entityManager = this.exampleRepository.manager }: { entityManager?: EntityManager } = {},
  ) {
    return entityManager.update(Example, where, data);
  }

  async createExample(
    data: CreateExample,
    { entityManager = this.exampleRepository.manager }: { entityManager?: EntityManager } = {},
  ) {
    return entityManager.create(Example, data);
  }
}
