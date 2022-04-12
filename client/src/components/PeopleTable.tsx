import { useState } from "react";

import { Person } from "../types";

interface PeopleTableProps {
  people: Person[];
  loading: boolean;
  error?: string;
  onDelete: (id: string) => Promise<void>;
  onEdit: (person: Person) => Promise<void>;
}

const PeopleTable = ({
  people,
  loading,
  error,
  onDelete,
  onEdit,
}: PeopleTableProps) => {
  const [editing, setEditing] = useState<Person | null>(null);

  const onEditClick = async (person: Person) => {
    if (editing?.id === person.id) {
      await onEdit(editing);
      setEditing(null);
    } else {
      setEditing(person);
    }
  };

  const onEditField = (changes: any) => {
    if (!editing) return;
    setEditing((e) => ({ ...e, ...changes }));
  };

  if (loading) return <code>LOADING...</code>;

  return (
    <table>
      <thead>
        <tr>
          <th>📸</th>
          <th>Name</th>
          <th>Location</th>
          <th>Actions</th>
        </tr>
      </thead>
      <tbody>
        {error ? (
          <tr>
            <td colSpan={3}>{JSON.stringify(error)}</td>
          </tr>
        ) : loading ? (
          <tr>
            <td colSpan={3}>
              <code>LOADING...</code>
            </td>
          </tr>
        ) : people?.length ? (
          people.map((person) => {
            const isEditingThis = !!editing && editing?.id === person.id;

            return (
              <tr key={person.name.first + person.id}>
                <td>
                  <img
                    style={{ height: 48, borderRadius: "50%" }}
                    src={person.picture.thumbnail}
                  />
                </td>
                <td>
                  {!!isEditingThis ? (
                    <>
                      <input
                        value={editing.name.first}
                        onChange={(e) =>
                          onEditField({
                            name: { ...editing.name, first: e.target.value },
                          })
                        }
                      />
                      <input
                        value={editing.name.last}
                        onChange={(e) =>
                          onEditField({
                            name: { ...editing.name, last: e.target.value },
                          })
                        }
                      />
                    </>
                  ) : (
                    `${person.name.first} ${person.name.last}`
                  )}
                </td>
                <td>
                  {person.location.city}, {person.location.state}
                  {", "}
                  {person.location.country}
                </td>
                <td>
                  <button role="button" onClick={() => onDelete(person.id)}>
                    DELETE
                  </button>
                  <button role="button" onClick={() => onEditClick(person)}>
                    {isEditingThis ? "SAVE" : "EDIT"}
                  </button>
                </td>
              </tr>
            );
          })
        ) : (
          <tr>
            <td colSpan={3}>
              <code>No data</code>
            </td>
          </tr>
        )}
      </tbody>
    </table>
  );
};

export default PeopleTable;
