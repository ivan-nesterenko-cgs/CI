import { OnApplicationBootstrap, OnApplicationShutdown, OnModuleDestroy, OnModuleInit } from "@nestjs/common";

declare global {
  type BaseServiceAbstract = Partial<OnModuleInit & OnApplicationBootstrap & OnModuleDestroy & OnApplicationShutdown> &
    Record<string, any>;
}

export {};
