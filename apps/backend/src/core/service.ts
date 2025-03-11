import { Raw } from "typeorm";

export class BaseService implements BaseServiceAbstract {
  search(search: string) {
    return Raw((alias) => `LOWER(CAST(${alias} AS TEXT)) LIKE LOWER(:value)`, {
      value: `%${search.trim()}%`,
    });
  }

  searchThroughJSON(search: string) {
    return Raw((alias) => `LOWER(CAST(${alias} AS JSONB) :: TEXT) LIKE LOWER(:value)`, {
      value: `%${search.trim()}%`,
    });
  }
}
