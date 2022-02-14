import { useState } from "react";
import PropTypes from "prop-types";
import { v4 as uuidv4 } from "uuid";
export default function Form({ addContact, contacts }) {
  const [name, setName] = useState("");
  const [number, setNumber] = useState("");
  const handleChange = (event) => {
    const { name, value } = event.currentTarget;

    switch (name) {
      case "name":
        setName(value);
        break;
      case "number":
        setNumber(value);
        break;
      default:
        return;
    }
  };
  const handleSubmit = (event) => {
    event.preventDefault();
    const newContact = {
      id: uuidv4(),
      name,
      number,
    };

    if (contacts.find((contact) => contact.name === newContact.name)) {
      reset();
      return alert(`${newContact.name} is already in contacts`);
    }
    addContact(newContact);
    reset();
  };

  const reset = () => {
    setName("");
    setNumber("");
  };
  return (
    <form onSubmit={handleSubmit}>
      <lable>
        Name
        <input type="text" name="name" value={name} onChange={handleChange} />
      </lable>
      <label>
        Number
        <input
          type="text"
          name="number"
          value={number}
          onChange={handleChange}
        />
      </label>
      <button type="submit">Add contact</button>
    </form>
  );
}
Form.propTypes = {
  name: PropTypes.string,
  number: PropTypes.string,
};
