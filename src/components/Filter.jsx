import React from 'react';
import PropTypes from 'prop-types';
import '../assets/styles/filter.css';

const renderFilterOptions = options => Object.keys(options).map(optionName => (
  <option key={`${optionName}-key`} value={optionName}>
    {`${optionName} - ${options[optionName]}`}
  </option>
));

const Filter = ({ onChange, filterOptions }) => (
  <select className="filter-by-exchange" onChange={onChange}>
    <option key="All-key">
      All
    </option>
    { renderFilterOptions(filterOptions) }
  </select>
);

Filter.propTypes = {
  onChange: PropTypes.func.isRequired,
  filterOptions: PropTypes.arrayOf(PropTypes.string).isRequired,
};

export default Filter;
