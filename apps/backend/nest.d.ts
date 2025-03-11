import { OnApplicationBootstrap, OnApplicationShutdown, OnModuleDestroy, OnModuleInit } from "@nestjs/common";

declare global {
  type BaseService = Partial<OnModuleInit & OnApplicationBootstrap & OnModuleDestroy & OnApplicationShutdown> &
    Record<string, any>;
}

export {};
