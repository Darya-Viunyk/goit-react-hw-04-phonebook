import { Contact } from './Contact';
import propTypes from 'prop-types';
import { ListStyle } from './Contacts.styled';
export const Contacts = ({ contacts, deleteContact }) => {
  return (
    <ListStyle>
      {contacts.map(({ name, id, number }) => {
        return (
          <Contact
            key={id}
            id={id}
            name={name}
            number={number}
            deleteContact={deleteContact}
          />
        );
      })}
    </ListStyle>
  );
};
Contacts.propTypes = {
  contacts: propTypes.arrayOf(
    propTypes.shape({
      id: propTypes.string.isRequired,
      name: propTypes.string.isRequired,
      number: propTypes.string.isRequired,
    })
  ).isRequired,
  deleteContact: propTypes.func.isRequired,
};
