import React from 'react';
import PropTypes from 'prop-types';
import Contact from '../Contacts/Contact';
import style from './ContactList.module.css';

const ContactList = ({ visibleContacts, onDeleteContact }) => (
  <ul className={style.contact_list}>
    {visibleContacts.map(({ id, name, number }) => {
      return (
        <Contact
          name={name}
          key={id}
          number={number}
          onDeleteContact={() => onDeleteContact(id)}
        />
      );
    })}
  </ul>
);

export default ContactList;

ContactList.defaultProps = {
  visibleContacts: [],
};

ContactList.propTypes = {
  onDeleteContact: PropTypes.func.isRequired,
  visibleContacts: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string.isRequired,
      name: PropTypes.string.isRequired,
      number: PropTypes.string.isRequired,
    })
  ),
};
