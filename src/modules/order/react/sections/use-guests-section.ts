import React, { useRef } from "react";
import { OrderingDomainModel } from "@ratatouille/modules/order/core/model/ordering.domain-model";
import { GuestForm } from "@ratatouille/modules/order/core/form/guest.form";
import { useDependencies } from "@ratatouille/modules/app/react/DependenciesProvider";

export const useGuestsSection = () => {
  function addGuest() {
    const newState = guestForm.current.addGuest(form);
    setForm(newState);
  }

  function removeGuest(id: string) {
    const newState = guestForm.current.removeGuest(form, id);
    setForm(newState);
  }

  function updateGuest<T extends keyof OrderingDomainModel.Guest>(
    id: string,
    key: T,
    value: OrderingDomainModel.Guest[T]
  ) {
    const newState = guestForm.current.updateGuest(form, id, key, value);
    setForm(newState);
  }

  function changeOrganizer(id: string) {
    const newState = guestForm.current.changeOrganizer(form, id);
    setForm(newState);
  }

  function onNext() {}

  function isSubmitable() {
    return guestForm.current.isSubmitable(form);
  }

  const { idProvider } = useDependencies();
  const guestForm = useRef(new GuestForm(idProvider));
  const [form, setForm] = React.useState<OrderingDomainModel.Form>({
    guests: [],
    organizerId: null,
  });

  return {
    addGuest,
    removeGuest,
    updateGuest,
    changeOrganizer,
    onNext,
    isSubmitable: isSubmitable(),
    form,
  };
};
