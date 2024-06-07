import { OrderingDomainModel } from "@ratatouille/modules/order/core/model/ordering.domain-model";
import { GuestForm } from "./guest.form";
import { IIDprovider } from "@ratatouille/modules/core/id-provider";

class StubIDProvider implements IIDprovider {
  generate(): string {
    return "1";
  }
}

const idProvider = new StubIDProvider();

const emptyInitialState: OrderingDomainModel.Form = {
  guests: [],
  organizerId: null,
};
const stateWithOneUser: OrderingDomainModel.Form = {
  guests: [
    {
      id: "1",
      firstname: "Luke",
      lastname: "Skywalker",
      age: 53,
    },
  ],
  organizerId: null,
};

const stateWithTwoUsers: OrderingDomainModel.Form = {
  guests: [
    {
      id: "1",
      firstname: "Luke",
      lastname: "Skywalker",
      age: 53,
    },
    {
      id: "2",
      firstname: "Luke",
      lastname: "Skywalker",
      age: 53,
    },
  ],
  organizerId: null,
};
const form = new GuestForm(idProvider);

describe("Add a guest", () => {
  it("should add a guest", () => {
    const state = form.addGuest(emptyInitialState);
    expect(state.guests).toEqual([
      {
        id: "1",
        firstname: "Luke",
        lastname: "Skywalker",
        age: 53,
      },
    ]);
  });

  it("should add a guest when there is already one", () => {
    const state = form.addGuest(stateWithOneUser);
    expect(state.guests).toEqual([
      {
        id: "1",
        firstname: "Luke",
        lastname: "Skywalker",
        age: 53,
      },
      {
        id: "1",
        firstname: "Luke",
        lastname: "Skywalker",
        age: 53,
      },
    ]);
  });

  it("should add a guest when there is already two", () => {
    const state = form.addGuest(stateWithTwoUsers);
    expect(state.guests).toEqual([
      {
        id: "1",
        firstname: "Luke",
        lastname: "Skywalker",
        age: 53,
      },
      {
        id: "2",
        firstname: "Luke",
        lastname: "Skywalker",
        age: 53,
      },
      {
        id: "1",
        firstname: "Luke",
        lastname: "Skywalker",
        age: 53,
      },
    ]);
  });
});

describe("Removing a guest", () => {
  it("should do nothing when there is no user", () => {
    const state = form.removeGuest(emptyInitialState, "1");
    expect(state.guests).toEqual([]);
  });

  it("should remove the user with ID when there is a user with ID 1", () => {
    const state = form.removeGuest(stateWithOneUser, "1");
    expect(state.guests).toEqual([]);
  });

  it("should remove only the user with ID 1 when there is ywo users", () => {
    const state = form.removeGuest(stateWithTwoUsers, "1");
    expect(state.guests).toEqual([
      {
        id: "2",
        firstname: "Luke",
        lastname: "Skywalker",
        age: 53,
      },
    ]);
  });
});

describe("Add an organizer", () => {
  it("should set an organizer ID when the user does not exist", () => {
    const state = form.changeOrganizer(emptyInitialState, "1");
    expect(state.organizerId).toEqual(null);
  });

  it("should set an organizer ID when the user exists", () => {
    const state = form.changeOrganizer(stateWithOneUser, "1");
    expect(state.organizerId).toEqual("1");
  });
});

describe("Is submitable", () => {
  it("should not be submitable when no organizer", () => {
    const isSubmitable = form.isSubmitable(emptyInitialState);
    expect(isSubmitable).toEqual(false);
  });

  it("should be submitable when there is an organizer", () => {
    const withOrganizerState = { ...stateWithOneUser, organizerId: "1" };
    const isSubmitable = form.isSubmitable(withOrganizerState);
    expect(isSubmitable).toEqual(true);
  });
});

describe("Update a guest", () => {
  it.each([
    {
      key: "firstname" as keyof OrderingDomainModel.Guest,
      value: "Leia",
    },
    {
      key: "lastname" as keyof OrderingDomainModel.Guest,
      value: "Organa",
    },
    {
      key: "age" as keyof OrderingDomainModel.Guest,
      value: 52,
    },
  ])("should not change the %s of the guest", ({ key, value }) => {
    const state = form.updateGuest(stateWithOneUser, "1", key, value);
    expect(state.guests[0][key]).toEqual(value);
  });
});
