import propTypes from 'prop-types';
import { Button, ItemLi } from './Contact.styled';
export const Contact = ({ name, number, deleteContact, id }) => {
  return (
    <>
      <ItemLi key={id}>
        <span>{name}</span>
        <span>{number}</span>
        <Button
          type="button"
          onClick={() => {
            deleteContact(id);
          }}
        >
          Delete
        </Button>
      </ItemLi>
    </>
  );
};
Contact.propTypes = {
  id: propTypes.string.isRequired,
  name: propTypes.string.isRequired,
  number: propTypes.string.isRequired,
  deleteContact: propTypes.func.isRequired,
};
