import React from 'react';
import filter from '../../assets/filter.svg';
import './index.scss'

function Filter({ filterHandler }) {
  return (
    <div className="filter">
      <img src={filter} className="filter-icon" alt="not found"/>
      <select onChange={(e) => filterHandler(e)} name="filter" id="filter">
        <option value="all">All Launches</option>
        <option value="upcoming">Upcoming Launches</option>
        <option value="success">Succesful Launches</option>
        <option value="failed">Failed Launches</option>
      </select>
    </div>
  );
}

export default Filter;