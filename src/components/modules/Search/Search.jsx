import React from 'react';
import PropTypes from 'prop-types';
import style from './Search.module.css'

const Filter = ({ value, onChange }) => (
  <label className={style.input_name}>
    Find contacts by name
    <input type="text" value={value} onChange={onChange} />
  </label>
);

export default Filter;

Filter.propTypes = {
  value: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
};
