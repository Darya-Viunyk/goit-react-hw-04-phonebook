import { Component } from 'react';
import { nanoid } from 'nanoid';

import { Filter } from './components/Filter/Filter';
import { Container, NameH2 } from './App.styled';
import { FormContacts } from './components/FormContacts/FormContacts';
import { Contacts } from './components/Contacts/Contacts';

export class App extends Component {
  state = {
    contacts: [],
    filter: '',
  };
  componentDidMount() {
    const savedContacts = localStorage.getItem('contacts');
    const phoneСontacts = JSON.parse(savedContacts);

    if (phoneСontacts !== null) {
      return this.setState({
        contacts: phoneСontacts,
      });
    }
  }
  componentDidUpdate(_, prevState) {
    if (prevState.contacts !== this.state.contacts) {
      localStorage.setItem('contacts', JSON.stringify(this.state.contacts));
    }
  }
  getFilteredContacts = () => {
    const { contacts, filter } = this.state;

    return contacts.filter(it => it.name.toLowerCase().includes(filter));
  };
  addUser = data => {
    if (
      this.state.contacts.some(
        it => it.name.toLowerCase() === data.name.toLowerCase()
      )
    ) {
      alert(`${data.name} is alredy in contacts`);
      return;
    }
    const newUser = { ...data, id: nanoid() };
    this.setState(prevState => ({
      contacts: [...prevState.contacts, newUser],
    }));
  };

  deleteContact = id => {
    this.setState(prevState => ({
      contacts: prevState.contacts.filter(user => user.id !== id),
    }));
  };

  render() {
    return (
      <>
        <Container>
          <NameH2>Phonebook</NameH2>
          <div>
            <FormContacts addUser={this.addUser} />
          </div>
          <div>
            <NameH2>Contacts</NameH2>
            <Filter
              onChangeValue={event =>
                this.setState({ filter: event.target.value })
              }
              value={this.state.filter}
            />
            <Contacts
              contacts={this.getFilteredContacts()}
              deleteContact={this.deleteContact}
            />
          </div>
        </Container>
      </>
    );
  }
}
