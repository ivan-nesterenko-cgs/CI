import { BaseEntity, Entity } from 'typeorm';

export class ScenarioBase extends BaseEntity {}

@Entity()
export class Scenario extends ScenarioBase {}
