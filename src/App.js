import { useState, useEffect } from "react";
import ContactList from "./components/ContactList/ContactList";
import Form from "./components/Form/Form";
import Filter from "./components/Filter/Filter";

export default function App() {
  const [contacts, setContacts] = useState(() => {
    const localStorageSaved = JSON.parse(localStorage.getItem("contacts"));
    return (
      localStorageSaved || [
        { id: "id-1", name: "Rosie Simpson", number: "459-12-56" },
        { id: "id-2", name: "Hermione Kline", number: "443-89-12" },
        { id: "id-3", name: "Eden Clements", number: "645-17-79" },
        { id: "id-4", name: "Annie Copeland", number: "227-91-26" },
      ]
    );
  });
  const [filter, setFilter] = useState("");

  useEffect(() => {
    const localStorageSave = JSON.stringify(contacts);
    localStorage.setItem("contacts", localStorageSave);
  }, [contacts]);

  const addContact = (newContact) => {
    setContacts((contacts) => [...contacts, newContact]);
  };
  const changeFilter = (e) => {
    setFilter(e);
  };
  const removeContact = (contactId) => {
    setContacts((contacts) => contacts.filter(({ id }) => id !== contactId));
  };
  const getVisibleContacts = contacts.filter((contacts) =>
    contacts.name.toLowerCase().includes(filter.toLowerCase())
  );

  return (
    <div>
      <h1>Phonebook</h1>
      <Form addContact={addContact} contacts={contacts} />
      <h2>Contacts</h2>
      <Filter value={filter} onChangeFilter={changeFilter} />
      {getVisibleContacts.length > 0 && (
        <ContactList
          contacts={getVisibleContacts}
          onRemoveContact={removeContact}
        />
      )}
    </div>
  );
}
