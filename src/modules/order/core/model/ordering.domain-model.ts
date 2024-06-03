export namespace OrderingDomainModel {
  export type Form = {
    guests: Guest[];
    organizerId: string | null;
  };

  export type Guest = {
    id: string;
    firstname: string;
    lastname: string;
    age: number;
  };
}
