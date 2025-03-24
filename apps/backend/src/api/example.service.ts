import { Injectable, NotFoundException } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Example } from "./entities/example.entity";
import { DeepPartial, FindOneOptions, FindManyOptions, Repository, FindOptionsWhere, EntityManager } from "typeorm";
import { CreateExampleDto } from "./dto";
import { convertJoinedStringToObject } from "../../../../packages/utils/convertStringToObject";
import { Order } from "../../../../packages/types/order";
import { BaseService } from "../core/service";

type ExtractedEntityKeys<Entity extends BaseEntity> = Omit<
  ExtractKeys<Entity>,
  'save' | 'id' | 'hasId' | 'remove' | 'softRemove' | 'recover' | 'reload'
>;

type FindOneOptionsExtended<Entity extends BaseEntity> = {
  entityManager?: EntityManager;
  relations?: ExtractedEntityKeys<Entity>[];
  select?: ExtractedEntityKeys<Entity>[];
};

type FindManyOptionsExtended<Entity extends BaseEntity> = {
  entityManager?: EntityManager;
  relations?: ExtractedEntityKeys<Entity>[];
  skip?: number;
  take?: number;
  order?: Order;
  select?: ExtractedEntityKeys<Entity>[];
  sortBy?: ExtractedEntityKeys<Entity>[];
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
    where: FindOneOptions<Example>,
    { entityManager = this.exampleRepository.manager, select = [],relations, ...params }: FindOneOptionsExtended<Example> = {},
  ) {
    return entityManager.findOne(Example, { 
      where,       
      select: convertJoinedStringToObject(select as string[], true),
      relations: relations as string[],
      ...params });
  }

  async findManyExamples(
    where: FindManyOptions<Example>,
    {
      entityManager = this.exampleRepository.manager,
      select = [],
      sortBy = [],
      order,
      search,
      ...params
    }: FindManyOptionsExtended<Example> = {},
  ) {
    return entityManager.find(Example, {
      where,
      select: convertJoinedStringToObject(select as string[], true),
      order: convertJoinedStringToObject(sortBy as string[], order),
      relations: relations as string[],
      ...params,
    });
  }

  async findOneExampleOrThrow(where: FindOneOptions<Example>, params: FindOneOptionsExtended<Example> = {}) {
    const example = await this.findOneExample(where, params);
    if (!example) throw new NotFoundException("Example not found");
    return example;
  }
  async findManyExamplesOrThrow(where: FindManyOptions<Example>, params: FindManyOptionsExtended<Example> = {}) {
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
