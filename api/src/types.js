const { gql } = require("apollo-server-express");

module.exports = gql`
  type Name {
    title: String
    first: String!
    last: String!
  }

  type Location {
    street: Street
    city: String!
    state: String!
    country: String!
    postcode: Int
    coordinates: Coordinates
    timezone: Timezone
  }

  type Street {
    number: Int
    name: String
  }

  type Coordinates {
    latitude: String!
    longitude: String!
  }

  type Timezone {
    offset: String!
    description: String!
  }

  type Dob {
    date: String!
    age: Int!
  }

  type Picture {
    large: String!
    medium: String!
    thumbnail: String!
  }

  type Person {
    gender: String
    name: Name!
    location: Location
    email: String!
    dob: Dob
    redistered: Dob
    phone: String
    cell: String
    id: String!
    picture: Picture
    nat: String
  }

  type Query {
    people: [Person!]!
  }
`;
