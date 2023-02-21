import React from 'react';
import { customAlphabet } from 'nanoid';
import PropTypes from 'prop-types';
import style from './Contact.module.css';


const nanoid = customAlphabet('1234567890', 2);
const id = 'id-' + nanoid(2);

const Contact = ({ name, number, id, onDeleteContact }) => (
  <li className={style.createList_item}>
    <span>
      {name}: {number}
    </span>

    <button type="button" onClick={() => onDeleteContact(id)}>
      Delete
    </button>
     
  </li>
);

export default Contact;

Contact.defaultProps = {
  id,
};

Contact.propTypes = {
  name: PropTypes.string,
  number: PropTypes.string.isRequired,
  id: PropTypes.string.isRequired,
  onDeleteContact: PropTypes.func.isRequired,
};
