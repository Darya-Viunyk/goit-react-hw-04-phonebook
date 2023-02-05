import { useEffect, useState } from 'react';

import { Filter } from 'components/Filter/Filter';

import { Container, NameH2 } from './App.styled';
import { FormContacts } from 'components/FormContacts/FormContacts';
import { Contacts } from 'components/Contacts/Contacts';

export const App = () => {
  const [contacts, setContacts] = useState(() => {
    const savedContacts = localStorage.getItem('contacts');
    if (savedContacts !== null) {
      const parcedContacts = JSON.parse(savedContacts);
      return parcedContacts;
    }
    return [];
  });
  const [filter, setFilter] = useState('');

  useEffect(() => {
    localStorage.setItem('contacts', JSON.stringify(contacts));
  }, [contacts]);

  const getFilteredContacts = () => {
    return contacts.filter(it => it.name.toLowerCase().includes(filter));
  };

  const addUser = data => {
    const newUser = contacts.some(
      it => it.name.toLowerCase() === data.name.toLowerCase()
    );
    return newUser
      ? alert(`${data.name} is alredy in contacts`)
      : setContacts([...contacts, newUser]);
  };

  const deleteContact = id => {
    setContacts(prevState => ({
      contacts: prevState.contacts.filter(user => user.id !== id),
    }));
  };

  return (
    <>
      <Container>
        <NameH2>Phonebook</NameH2>
        <div>
          <FormContacts addUser={addUser} />
        </div>
        <div>
          <NameH2>Contacts</NameH2>
          <Filter
            onChangeValue={event => setFilter({ filter: event.target.value })}
            value={filter}
          />
          <Contacts
            contacts={getFilteredContacts()}
            deleteContact={deleteContact}
          />
        </div>
      </Container>
    </>
  );
};
