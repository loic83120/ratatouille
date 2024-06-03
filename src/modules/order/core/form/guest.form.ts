import { IIDprovider } from '@ratatouille/modules/core/id-provider';
import { OrderingDomainModel } from '@ratatouille/modules/order/core/model/ordering.domain-model';

export class GuestForm {
  constructor(private idProvider: IIDprovider) {}

  addGuest(state: OrderingDomainModel.Form) {
    return {
      ...state,
      guests: [
        ...state.guests,
        {
          id: this.idProvider.generate(),
          firstname: 'Luke',
          lastname: 'Skywalker',
          age: 53,
        },
      ],
    };
  }

  removeGuest(state: OrderingDomainModel.Form, id: string) {
    return { ...state, guests: state.guests.filter((guest) => guest.id !== id) };
  }
}
