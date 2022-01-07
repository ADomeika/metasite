import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEye } from '@fortawesome/free-solid-svg-icons';
import './Filter.css';

function Filter({ cities, handleFilter }) {
  const [name, setName] = useState('');
  const [city, setCity] = useState('');
  const [showActive, setShowActive] = useState(false);

  const handleFilterBy = () => {
    handleFilter({
      name,
      city,
      showActive
    });
  };

  return (
    <div className="filter">
      <div>
        <input
          type="text"
          placeholder="Name"
          onChange={(e) => setName(e.target.value)}
        />
      </div>

      <div>
        <select
          defaultValue=""
          onChange={(e) => setCity(e.target.value)}
        >
          <option value="">City</option>
          {cities?.map((city) => (
            <option value={city} key={city}>{city}</option>
          ))}
        </select>
      </div>

      <div>
        <input
          type="checkbox"
          name="isActive"
          id="isActive"
          onChange={(e) => setShowActive(e.target.checked)}
        />
        <label htmlFor="isActive">
          Show active <FontAwesomeIcon icon={faEye} />
        </label>
      </div>

      <button
        className="filter-button"
        onClick={handleFilterBy}
      >Filter</button>
    </div>
  );
};

export default Filter;
