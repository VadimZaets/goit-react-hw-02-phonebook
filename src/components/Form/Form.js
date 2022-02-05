import { Component } from "react";
import PropTypes from "prop-types";
class Form extends Component {
  state = {
    name: "",
    number: "",
  };
  handleChange = (e) => {
    const { name, value } = e.target;
    this.setState({
      [name]: value,
    });
  };

  handleSubmit = (e) => {
    e.preventDefault();
    this.props.onAddContact(this.state);
    this.setState({ name: "", number: "" });
  };
  render() {
    return (
      <form onSubmit={this.handleSubmit}>
        <lable>
          Name
          <input
            type="text"
            name="name"
            value={this.state.name}
            onChange={this.handleChange}
          />
        </lable>
        <label>
          Number
          <input
            type="text"
            name="number"
            value={this.state.number}
            onChange={this.handleChange}
          />
        </label>
        <button type="submit">Add contact</button>
      </form>
    );
  }
}
Form.propTypes = {
  onAddContact: PropTypes.func,
  name: PropTypes.string.isRequired,
  number: PropTypes.string.isRequired,
};
export default Form;
