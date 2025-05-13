import { BaseService } from "@core/service";
import { Inject, Injectable } from "@nestjs/common";

import { ExampleActionsService } from "./Example-actions.service";

@Injectable()
export class ExampleService extends BaseService implements BaseServiceAbstract {
  constructor(
    @Inject(ExampleActionsService)
    private actionsService: ExampleActionsService,
  ) {
    super();
  }

  async findOneExampleOrThrow(...args: ExtractParameters<typeof this.actionsService, "findOneExampleOrThrow">) {
    return this.actionsService.findOneExampleOrThrow(...args);
  }
  async findManyExamplesOrThrow(...args: ExtractParameters<typeof this.actionsService, "findManyExamplesOrThrow">) {
    return this.actionsService.findManyExamplesOrThrow(...args);
  }

  async patchExample(...args: ExtractParameters<typeof this.actionsService, "patchExampleBySchema">) {
    return this.actionsService.patchExampleBySchema(...args);
  }

  async deleteExample(...args: ExtractParameters<typeof this.actionsService, "deleteExample">) {
    return this.actionsService.deleteExample(...args);
  }

  async createExample(...args: ExtractParameters<typeof this.actionsService, "createExample">) {
    return this.actionsService.createExample(...args);
  }
}
