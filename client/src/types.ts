export type Book = {
  title: string;
  author: string;
};

type Name = {
  title?: string;
  first: string;
  last: string;
};

type Location = {
  street?: Street;
  city: string;
  state: string;
  country: string;
  postcode?: number;
  coordinates?: Coordinates;
  timezone?: Timezone;
};

type Street = {
  number: number;
  name: string;
};

type Coordinates = {
  latitude: string;
  longitude: string;
};

type Timezone = {
  offset: string;
  description: string;
};

type Dob = {
  date: string;
  age?: number;
};

type Picture = {
  large: string;
  medium: string;
  thumbnail: string;
};

export type Person = {
  gender?: string;
  name: Name;
  location: Location;
  email: string;
  dob: Dob;
  redistered: Dob;
  phone: string;
  cell: string;
  id: string;
  picture: Picture;
  nat: string;
};
