import { useState } from 'react';
import PropTypes from 'prop-types';
import inititalState from './initialState';
import style from './ContactForm.module.css';

const ContactForm = ({ onSubmit }) => {
  const [state, setState] = useState({ ...inititalState });

  const handleChange = e => {
    const { name, value } = e.currentTarget;
    setState(prevState => {
      return {
        ...prevState,
        [name]: value,
      };
    });
  };

  const handleSubmit = e => {
    e.preventDefault();
    const result = onSubmit({ name, number });
    if (result) {
      setState({ ...inititalState });
    }
  };

  const { name, number } = state;

  return (
    <form onSubmit={handleSubmit}>
      <label className={style.input_name}>
        Name
        <input
          type="text"
          name="name"
          pattern="^[a-zA-Zа-яА-Я]+(([' -][a-zA-Zа-яА-Я ])?[a-zA-Zа-яА-Я]*)*$"
          title="Имя может состоять только из букв, апострофа, тире и пробелов. Например Adrian, Jacob Mercer, Charles de Batz de Castelmore d'Artagnan и т. п."
          required
          value={state.name}
          onChange={handleChange}
        />
      </label>
      <label className={style.input_name}>
        Number
        <input
          type="tel"
          name="number"
          pattern="\+?\d{1,4}?[-.\s]?\(?\d{1,3}?\)?[-.\s]?\d{1,4}[-.\s]?\d{1,4}[-.\s]?\d{1,9}"
          title="Номер телефона должен состоять из цифр и может содержать пробелы, тире, круглые скобки и может начинаться с +"
          required
          value={state.number}
          onChange={handleChange}
        />
      </label>
      <button type="submit">Add contact</button>
    </form>
  );
};

export default ContactForm;

ContactForm.propTypes = {
  onSubmit: PropTypes.func.isRequired,
};
