import { useEffect, useState } from 'react';
import { nanoid } from 'nanoid';
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
    window.localStorage.setItem('contacts', JSON.stringify(contacts));
  }, [contacts]);

  const getFilteredContacts = () => {
    return contacts.filter(it => it.name.toLowerCase().includes(filter));
  };
  const addUser = data => {
    if (
      contacts.some(it => it.name.toLowerCase() === data.name.toLowerCase())
    ) {
      alert(`${data.name} is alredy in contacts`);

      return;
    }
    data.id = nanoid(4);
    setContacts([...contacts, data]);
  };

  const deleteContact = id => {
    setContacts(prevState => prevState.filter(user => user.id !== id));
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
            onChangeValue={event => setFilter(event.currentTarget.value)}
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
