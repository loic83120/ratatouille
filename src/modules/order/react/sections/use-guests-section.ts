import React, { useRef } from 'react';
import { OrderingDomainModel } from '@ratatouille/modules/order/core/model/ordering.domain-model';
import { GuestForm } from '@ratatouille/modules/order/core/form/guest.form';
import { useDependencies } from '@ratatouille/modules/app/react/DependenciesProvider';

export const useGuestsSection = () => {
  function addGuest() {
    const newState = guestForm.current.addGuest(guests);
    setGuests(newState);
  }

  function removeGuest(id: string) {
    const newState = guestForm.current.removeGuest(guests, id);
    setGuests(newState);
  }

  function updateGuest(id: string, key: string, value: any) {}

  function changeOrganizer() {}

  function onNext() {}

  function isSubmitable() {
    return false;
  }

  const { idProvider } = useDependencies();
  const guestForm = useRef(new GuestForm(idProvider));
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
