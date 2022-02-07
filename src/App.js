import { Component } from "react";
import ContactList from "./components/ContactList/ContactList";
import Form from "./components/Form/Form";
import { v4 as uuidv4 } from "uuid";
import Filter from "./components/Filter/Filter";
class App extends Component {
  state = {
    contacts: [
      { id: "id-1", name: "Rosie Simpson", number: "459-12-56" },
      { id: "id-2", name: "Hermione Kline", number: "443-89-12" },
      { id: "id-3", name: "Eden Clements", number: "645-17-79" },
    ],
    filter: "",
  };
  componentDidMount() {
    const contact = localStorage.getItem("contacts");
    const parsedContact = JSON.parse(contact);
    if (parsedContact) {
      this.setState({ contacts: parsedContact });
    }
  }
  componentDidUpdate(prevProps, prevState) {
    if (this.state.contacts !== prevState.contacts) {
      localStorage.setItem("contacts", JSON.stringify(this.state.contacts));
    }
  }
  addContact = (human) => {
    const searchName = this.state.contacts
      .map((cont) => cont.name)
      .includes(human.name);

    if (searchName) {
      alert(`${human.name} is already in contacts`);
    } else if (human.name.length === 0) {
      alert("Fields must be filled!");
    } else {
      const contact = {
        ...human,
        id: uuidv4(),
      };

      this.setState((prevState) => ({
        contacts: [...prevState.contacts, contact],
      }));
    }
  };
  getVisibleContacts = () => {
    const { contacts, filter } = this.state;

    return contacts.filter((contacts) =>
      contacts.name.toLowerCase().includes(filter.toLowerCase())
    );
  };

  removeContact = (contactId) => {
    this.setState((prevState) => {
      return {
        contacts: prevState.contacts.filter(({ id }) => id !== contactId),
      };
    });
  };
  changeFilter = (filter) => {
    this.setState({ filter });
  };
  render() {
    const { filter } = this.state;

    const visibleContacts = this.getVisibleContacts();

    return (
      <div>
        <h1>Phonebook</h1>

        <Form onAddContact={this.addContact} />
        <h2>Contacts</h2>

        <Filter value={filter} onChangeFilter={this.changeFilter} />

        {visibleContacts.length > 0 && (
          <ContactList
            contacts={visibleContacts}
            onRemoveContact={this.removeContact}
          />
        )}
      </div>
    );
  }
}

export default App;
