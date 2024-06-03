import { OrderingDomainModel } from '@ratatouille/modules/order/core/model/ordering.domain-model';
import { GuestForm } from './guest.form';
import { IIDprovider } from '@ratatouille/modules/core/id-provider';

class StubIDProvider implements IIDprovider {
  generate(): string {
    return '1';
  }
}

const idProvider = new StubIDProvider();

describe('Add a guest', () => {
  it('should add a guest', () => {
    const form = new GuestForm(idProvider);
    const initialState: OrderingDomainModel.Guest[] = [];

    const state = form.addGuest(initialState);
    expect(state).toEqual([
      {
        id: '1',
        firstname: 'Luke',
        lastname: 'Skywalker',
        age: 53,
      },
    ]);
  });

  it('should add a guest when there is already one', () => {
    const form = new GuestForm(idProvider);
    const initialState: OrderingDomainModel.Guest[] = [
      {
        id: '1',
        firstname: 'Luke',
        lastname: 'Skywalker',
        age: 53,
      },
    ];

    const state = form.addGuest(initialState);
    expect(state).toEqual([
      {
        id: '1',
        firstname: 'Luke',
        lastname: 'Skywalker',
        age: 53,
      },
      {
        id: '1',
        firstname: 'Luke',
        lastname: 'Skywalker',
        age: 53,
      },
    ]);
  });

  it('should add a guest when there is already two', () => {
    const form = new GuestForm(idProvider);
    const initialState: OrderingDomainModel.Guest[] = [
      {
        id: '1',
        firstname: 'Luke',
        lastname: 'Skywalker',
        age: 53,
      },
      {
        id: '2',
        firstname: 'Luke',
        lastname: 'Skywalker',
        age: 53,
      },
    ];

    const state = form.addGuest(initialState);
    expect(state).toEqual([
      {
        id: '1',
        firstname: 'Luke',
        lastname: 'Skywalker',
        age: 53,
      },
      {
        id: '2',
        firstname: 'Luke',
        lastname: 'Skywalker',
        age: 53,
      },
      {
        id: '1',
        firstname: 'Luke',
        lastname: 'Skywalker',
        age: 53,
      },
    ]);
  });
});
