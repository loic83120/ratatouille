import React from 'react';
import { OrderingDomainModel } from '@ratatouille/modules/order/core/model/ordering.domain-model';

export const useGuestsSection = () => {
  function addGuest() {
    setGuests([...guests, { id: Math.random().toString(), firstname: '', lastname: '', age: 0 }]);
  }

  function removeGuest(id: string) {
    setGuests((guests) => guests.filter((guest) => guest.id !== id));
  }

  function updateGuest(id: string, key: string, value: any) {}

  function changeOrganizer() {}

  function onNext() {}

  function isSubmitable() {
    return false;
  }

  const [guests, setGuests] = React.useState<OrderingDomainModel.Guest[]>([]);

  return {
    addGuest,
    removeGuest,
    updateGuest,
    changeOrganizer,
    onNext,
    isSubmitable: isSubmitable(),
    guests,
  };
};
