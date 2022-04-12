import { useQuery, gql } from "@apollo/client";
import axios from "axios";

import { Person } from "../types";
import { cache, BASE_URL, client } from "../gql";
import PeopleTable from "./PeopleTable";

const QUERY = gql`
  query AllPeople {
    people {
      gender
      name {
        first
        last
      }
      location {
        street {
          number
          name
        }
        city
        state
        country
      }
      email
      dob {
        age
      }
      picture {
        thumbnail
      }
      id
      __typename
    }
  }
`;

function InMemoryCacher() {
  const { data, loading, error } = useQuery<{ people: Person[] }>(QUERY);

  const deletePerson = async (id: string) => {
    try {
      const res = await axios.delete<Person>(`${BASE_URL}/api/people`, {
        data: { id },
      });

      if (res.data.id) {
        cache.evict({
          id: cache.identify({ ...res.data, __typename: "Person" }),
        });
      }
    } catch (_) {
      console.error("Couldn't delete");
    }
  };

  const updatePerson = async (person: Person) => {
    try {
      const res = await axios.patch<Person>(`${BASE_URL}/api/people`, {
        ...person,
      });
      if (res.data.id) {
        cache.modify({
          id: cache.identify({ ...res.data, __typename: "Person" }),
          fields: {
            name(cached) {
              return { ...cached, ...res.data.name };
            },
          },
        });
      }
    } catch (_) {}
  };

  const restore = async () => {
    try {
      await axios.post(`${BASE_URL}/api/restore`, {});
      client.refetchQueries({ include: [QUERY] });
    } catch (_) {
      console.error("Couldn't restore");
    }
  };

  if (loading) return <code>LOADING...</code>;

  return (
    <>
      <button type="button" onClick={restore}>
        RESTORE
      </button>
      <PeopleTable
        people={data.people}
        loading={loading}
        error={error?.message}
        onEdit={updatePerson}
        onDelete={deletePerson}
      />
    </>
  );
}

export default InMemoryCacher;
