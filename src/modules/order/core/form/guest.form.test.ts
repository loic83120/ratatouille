import { OrderingDomainModel } from '@ratatouille/modules/order/core/model/ordering.domain-model';
import { GuestForm } from './guest.form';

describe('Add a guest', () => {
  it('should add a guest', () => {
    const form = new GuestForm();
    const initialState: OrderingDomainModel.Guest[] = [];

    const state = form.addGuest(initialState);
    expect(state).toEqual([{ id: '1', firstname: 'Luke', lastname: 'Skywalker', age: 53 }]);
  });
});
