import { IIDprovider } from '@ratatouille/modules/core/id-provider';
import { OrderingDomainModel } from '@ratatouille/modules/order/core/model/ordering.domain-model';

export class GuestForm {
  constructor(private idProvider: IIDprovider) {}

  addGuest(state: OrderingDomainModel.Guest[]) {
    return [
      ...state,
      {
        id: this.idProvider.generate(),
        firstname: 'Luke',
        lastname: 'Skywalker',
        age: 53,
      },
    ];
  }

  removeGuest(state: OrderingDomainModel.Guest[], id: string) {
    return state.filter((guest) => guest.id !== id);
  }
}
