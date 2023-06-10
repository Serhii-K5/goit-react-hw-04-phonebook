import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { nanoid } from 'nanoid';
import { ContactForm } from './ContactForm/ContactForm';
import { Filter } from './Filter/Filter';
import { ContactList } from './ContactList/ContactList';
import { PhonebookImg } from './PhonebookImg/PhonebookImg';
import css from './styles/styles.module.css';
import defaultData from './data/data.json'

export const App = () => {
  const [contacts, setContacts] = useState([]);
  // const [contacts, setContacts] = useState([
  //   { id: 'id-1', name: 'Rosie Simpson', number: '459-12-56' },
  //   { id: 'id-2', name: 'Hermione Kline', number: '443-89-12' },
  //   { id: 'id-3', name: 'Eden Clements', number: '645-17-79' },
  //   { id: 'id-4', name: 'Annie Copeland', number: '227-91-26' },
  // ])
  
  const [filter, setFilter] = useState('');
  const [isRender, setRender] = useState(true);

  const KEY_LOCALSTORAGE = 'contactList';
  
  useEffect(() => {
    const contactsFromLocalStorage = localStorage.getItem(KEY_LOCALSTORAGE);

    if (contactsFromLocalStorage === 'undefined' || contactsFromLocalStorage === null) {
      setContacts(defaultData);
      localStorage.setItem(KEY_LOCALSTORAGE, JSON.stringify(defaultData)); 
    }
    return () => localStorage.removeItem(KEY_LOCALSTORAGE); //для запобігання засмічення localStorage
  },[])
  
  useEffect(() => {
    const contactsFromLocalStorage = localStorage.getItem(KEY_LOCALSTORAGE);
    
    if (contactsFromLocalStorage !== 'undefined' && contactsFromLocalStorage !== null) {
      setRender(false);
    }
    
  }, [contacts, isRender]);

  const handleSubmit = evt => {
    const id = nanoid();
    const name = evt.name;
    const number = evt.number;
    const contactsLists = [...contacts];

    if (contactsLists.findIndex(contact => name === contact.name) !== -1) {
      return alert(`${name} is already in contacts.`);
    } else {
      contactsLists.push({ name, id, number });      
    }

    setContacts(contactsLists);
    localStorage.setItem(KEY_LOCALSTORAGE, JSON.stringify(contactsLists));
  };

  const handleChange = evt => {
    const {value} = evt.target;
    setFilter(value);
  };

  const сontactFiltered = () => {
    const filterContactsList = contacts.filter(contact => {
      return contact.name
        .toLowerCase()
        .includes(filter.toLowerCase());
    });

    return filterContactsList;
  };

  const handleDelete = evt => {
    setContacts(contacts.filter(contact => contact.id !== evt));
  };

  return (      
    <div className={css.container}>
      <h1 hidden>HW #4 (phonebook)</h1>        
      <div className={css.containerPhonebookStyles}>
        <PhonebookImg />
        <section> 
          <h2>Phonebook</h2>
          <ContactForm handleSubmit={handleSubmit} />          
        </section>
        <section>
          <h2> Contacts</h2>
          <Filter filter={filter} handleChange={handleChange} />
          <ContactList
            contacts={сontactFiltered()}
            handleDelete={handleDelete}
          /> 
        </section>                       
      </div>
    </div>
  );
}

App.propTypes = {
  contacts: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string.isRequired,
      name: PropTypes.string.isRequired,
      number: PropTypes.string.isRequired,
    })
  ),
}