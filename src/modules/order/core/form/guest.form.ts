import { IIDprovider } from "@ratatouille/modules/core/id-provider";
import { OrderingDomainModel } from "@ratatouille/modules/order/core/model/ordering.domain-model";

export class GuestForm {
  constructor(private idProvider: IIDprovider) {}

  addGuest(state: OrderingDomainModel.Form) {
    return {
      ...state,
      guests: [
        ...state.guests,
        {
          id: this.idProvider.generate(),
          firstname: "Luke",
          lastname: "Skywalker",
          age: 53,
        },
      ],
    };
  }

  removeGuest(state: OrderingDomainModel.Form, id: string) {
    return {
      ...state,
      guests: state.guests.filter((guest) => guest.id !== id),
    };
  }

  changeOrganizer(state: OrderingDomainModel.Form, id: string) {
    return {
      ...state,
      organizerId: state.guests.some((guest) => guest.id === id) ? id : null,
    };
  }

  isSubmitable(state: OrderingDomainModel.Form) {
    return state.organizerId !== null;
  }

  updateGuest<T extends keyof OrderingDomainModel.Guest>(
    state: OrderingDomainModel.Form,
    id: string,
    key: T,
    value: OrderingDomainModel.Guest[T]
  ) {
    return {
      ...state,
      guests: state.guests.map((guest) => {
        if (guest.id === id) {
          return {
            ...guest,
            [key]: value,
          };
        }
        return guest;
      }),
    };
  }
}
