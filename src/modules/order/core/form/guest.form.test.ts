import { GuestForm } from './guest.form';

describe('Add a guest', () => {
  it('should add a guest', () => {
    const form = new GuestForm();
    const state = form.addGuest();
    expect(state).toEqual([{ id: '1', firstname: 'Anakin', lastname: 'Skywalker', age: 35 }]);
  });
});
