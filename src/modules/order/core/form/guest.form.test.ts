import { OrderingDomainModel } from '@ratatouille/modules/order/core/model/ordering.domain-model';
import { GuestForm } from './guest.form';
import { IIDprovider } from '@ratatouille/modules/core/id-provider';

class StubIDProvider implements IIDprovider {
  generate(): string {
    return '1';
  }
}

const idProvider = new StubIDProvider();

const emptyInitialState: OrderingDomainModel.Guest[] = [];
const stateWithOneUser: OrderingDomainModel.Guest[] = [
  {
    id: '1',
    firstname: 'Luke',
    lastname: 'Skywalker',
    age: 53,
  },
];
const stateWithTwoUsers: OrderingDomainModel.Guest[] = [
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
const form = new GuestForm(idProvider);

describe('Add a guest', () => {
  it('should add a guest', () => {
    const state = form.addGuest(emptyInitialState);
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
    const state = form.addGuest(stateWithOneUser);
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
    const state = form.addGuest(stateWithTwoUsers);
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

describe('Removing a guest', () => {
  it('should do nothing when there is no user', () => {
    const state = form.removeGuest(emptyInitialState, '1');
    expect(state).toEqual([]);
  });

  it('should remove the user with ID when there is a user with ID 1', () => {
    const state = form.removeGuest(stateWithOneUser, '1');
    expect(state).toEqual([]);
  });

  it('should remove only the user with ID 1 when there is ywo users', () => {
    const state = form.removeGuest(stateWithTwoUsers, '1');
    expect(state).toEqual([
      {
        id: '2',
        firstname: 'Luke',
        lastname: 'Skywalker',
        age: 53,
      },
    ]);
  });
});
