import { useEffect, useState } from 'react';
import Filter from './components/Filter';
import './App.css';
import Table from './components/Table';

const sortItems = (data, asc) => {
  return data.sort((a, b) => {
    if (a.name < b.name) {
      return asc ? -1 : 1;
    }
    if (a.name > b.name) {
      return asc ? 1 : -1;
    }
    return 0;
  })
};

function App() {
  const [contacts, setContacts] = useState([]);
  const [filteredContacts, setFilteredContacts] = useState([]);
  const [cities, setCities] = useState([]);

  const fetchItems = async () => {
    const jsonRes = await fetch('https://contactify-api.herokuapp.com/api/contacts');
    const data = await jsonRes.json();
    setContacts(data);
    setCities([...new Set(data.map((contact) => contact.city)).values()]);
    setFilteredContacts(sortItems(data, true));
  };

  const handleSortBy = (asc) => {
    setFilteredContacts(sortItems(contacts, asc));
  };

  const handleFilterBy = ({ name, city, showActive }) => {
    const filtered = contacts.filter((contact) => {
      return contact.name.toLowerCase().includes(name.toLowerCase())
        && contact.city.toLowerCase().includes(city.toLowerCase())
        && (showActive ? contact.isActive : true);
    });

    setFilteredContacts(filtered);
  };

  useEffect(() => {
    fetchItems();
  }, []);

  return (
    <div className="app">
      <div className="filter-and-heading">
        <Filter cities={cities} handleFilter={handleFilterBy} />
        <h1 className="heading">Contactify</h1>
      </div>
      <Table
        contacts={filteredContacts}
        handleSort={handleSortBy}
      />
    </div>
  );
}

export default App;
