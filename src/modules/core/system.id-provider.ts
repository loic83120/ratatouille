import { IIDprovider } from '@ratatouille/modules/core/id-provider';
import { nanoid } from 'nanoid';

export class SystemIdProvider implements IIDprovider {
  generate(): string {
    return nanoid();
  }
}
