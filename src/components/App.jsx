import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { nanoid } from 'nanoid';
import { ContactForm } from './ContactForm/ContactForm';
import { Filter } from './Filter/Filter';
import { ContactList } from './ContactList/ContactList';
import { PhonebookImg } from './PhonebookImg/PhonebookImg';
import css from './styles/styles.module.css';
import defaultData from './data/data.json'

const KEY_LOCALSTORAGE = 'contactList';

export const App = () => {
  const [contacts, setContacts] = useState(() => {
    const contactsFromLocalStorage = localStorage.getItem(KEY_LOCALSTORAGE);
    return contactsFromLocalStorage === null ? defaultData : JSON.parse(contactsFromLocalStorage);    
  });

  const [filter, setFilter] = useState('');

  useEffect(() => {
    localStorage.setItem(KEY_LOCALSTORAGE, JSON.stringify(contacts));
    
  }, [contacts]);


  const handleSubmit = evt => {
    const id = nanoid();
    const name = evt.name;
    const number = evt.number;
    const contactsLists = [...contacts];

    if (contactsLists.findIndex(contact => name === contact.name && number === contact.number) !== -1) {
      return alert(`${name} is already in contacts.`);
    } else {
      contactsLists.push({id, name, number});      
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