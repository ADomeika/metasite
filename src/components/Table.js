import { faArrowDown, faArrowUp, faEye, faEyeSlash, faList } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React, { useState } from 'react';
import './Table.css';

function Table({ contacts, handleSort }) {
  const [sortAsc, setSortAsc] = useState(true);
  const [selectedContact, setSelectedContact] = useState(null);
  const [columnSelectionOpen, setColumnSelectionOpen] = useState(false);
  const [checked, setChecked] = useState({
    name: true,
    city: true,
    email: true,
    phone: true
  });

  const handleClick = (contact) => {
    setSelectedContact(contact);
  };

  const handleSortBy = () => {
    setSortAsc(!sortAsc);
    handleSort(!sortAsc);
  };

  const handleColumnSelectionClick = () => {
    setColumnSelectionOpen(!columnSelectionOpen);
  };

  const handleColumnSelectionChange = (e) => {
    setChecked({
      ...checked,
      [e.target.name]: e.target.checked
    });
  };

  return (
    <div className="table-wrapper">
      <table className="table" style={selectedContact !== null ? { borderBottomRightRadius: 0 } : {}}>
        <thead className="table-header">
          <tr>
            {checked.name && (
              <td className="cursor-pointer" onClick={handleSortBy}>
                Name {sortAsc ? <FontAwesomeIcon icon={faArrowDown} /> : <FontAwesomeIcon icon={faArrowUp} />}
              </td>
            )}
            {checked.city && (
              <td>City</td>
            )}
            <td></td>
            {checked.email && (
              <td>Email</td>
            )}
            {checked.phone && (
              <td className="text-right">Phone</td>
            )}
            <td style={columnSelectionOpen ? { backgroundColor: 'white' } : {}} className="text-right">
              <button
                className="headings-list-button"
                onClick={handleColumnSelectionClick}
              >
                <FontAwesomeIcon icon={faList} color={columnSelectionOpen ? 'var(--primary)' : 'var(--white)'} />
              </button>
            </td>
          </tr>
        </thead>
        <tbody className="table-body">
          {contacts.length > 0 ? contacts.map((contact) => (
            <tr
              onClick={() => handleClick(contact)}
              key={contact.id}
              className={selectedContact?.id === contact.id ? 'selected' : ''}
            >
              {checked.name && (
                <td>{contact.name} {contact.surname[0]}.</td>
              )}
              {checked.city && (
                <td>{contact.city}</td>
              )}
              <td>
                <FontAwesomeIcon
                  icon={contact.isActive ? faEye : faEyeSlash}
                  size="xs"
                />
                {contact.isActive}
              </td>
              {checked.email && (
                <td>{contact.email}</td>
              )}
              {checked.phone && (
                <td className="text-right">{contact.phone}</td>
              )}
              <td></td>
            </tr>
          )) : <tr><td colSpan={6} style={{ textAlign: 'center' }}>No data</td></tr>}
          {columnSelectionOpen && (
            <>
              <div className="column-select-overlay" />
              <div className="column-select-box">
                <div className="column-select-option">
                  <input
                    type="checkbox"
                    name="name"
                    id="name"
                    checked={checked.name}
                    onChange={handleColumnSelectionChange}
                  />
                  <label htmlFor="name">
                    Name
                  </label>
                </div>
                <div className="column-select-option">
                  <input
                    type="checkbox"
                    name="city"
                    id="city"
                    checked={checked.city}
                    onChange={handleColumnSelectionChange}
                  />
                  <label htmlFor="city">
                    City
                  </label>
                </div>
                <div className="column-select-option">
                  <input
                    type="checkbox"
                    name="email"
                    id="email"
                    checked={checked.email}
                    onChange={handleColumnSelectionChange}
                  />
                  <label htmlFor="email">
                    Email
                  </label>
                </div>
                <div className="column-select-option">
                  <input
                    type="checkbox"
                    name="phone"
                    id="phone"
                    checked={checked.phone}
                    onChange={handleColumnSelectionChange}
                  />
                  <label htmlFor="phone">
                    Phone
                  </label>
                </div>
              </div>
            </>
          )}
        </tbody>
      </table>
      {selectedContact !== null && (
        <div className="contact-information">
          <div className="contact-image-wrapper">
            <img alt="User profile" src={require('../assets/userpic.jpg')} className="contact-image" />
          </div>
          <div className="contact-information-details">
            <div className="contact-information-titles">
              <span className="contact-information-title">Name:</span>
              <span className="contact-information-title">City:</span>
              <span className="contact-information-title">Email:</span>
              <span className="contact-information-title">Phone:</span>
            </div>
            <div className="contact-information-detail">
              <span>{selectedContact.name} {selectedContact.surname[0]}.</span>
              <span>{selectedContact.city}</span>
              <span><a href={`mailto:${selectedContact.email}`}>{selectedContact.email}</a></span>
              <span>{selectedContact.phone}</span>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Table;
