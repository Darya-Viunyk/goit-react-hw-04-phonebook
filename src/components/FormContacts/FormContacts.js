import propTypes from 'prop-types';
import { useState } from 'react';
import { Label, NameLabel, Button } from './FormContacts.styled';
import { Formik, Form, Field } from 'formik';
import styled from '@emotion/styled';
import * as yup from 'yup';

const Conteiner = styled(Form)`
  display: flex;
  flex-direction: column;
  gap: 20px;
  background: #dedada;
  padding: 10px 10px;
  border-radius: 5px;
`;
const Inpyt = styled(Field)`
  padding: 10px 10px;
  width: auto;
  outline: none;
  border: 1px solid #bbb;
  border-radius: 5px;
  display: block;
`;
const schema = yup.object().shape({
  name: yup.string().required(),
  number: yup.number().min(7).max(11).required(),
});

export const FormContacts = ({ addUser }) => {
  const [name, setName] = useState('');
  const [number, setNumber] = useState('');

  const handleChange = event => {
    const { name, value } = event.currentTarget;
    switch (name) {
      case 'name':
        setName(value);
        break;
      case 'number':
        setNumber(value);
        break;
      default:
        break;
    }
  };

  const reset = () => {
    setName('');
    setNumber('');
  };

  const handleSudmit = event => {
    event.preventDefault();
    addUser({ name, number });
    reset();
  };

  return (
    <Formik initialValues={{ name: '', number: '' }} validationSchema={schema}>
      <Conteiner onSubmit={handleSudmit}>
        <Label>
          <NameLabel>Name</NameLabel>

          <Inpyt
            onChange={handleChange}
            type="text"
            name="name"
            pattern="^[a-zA-Zа-яА-Я]+(([' -][a-zA-Zа-яА-Я ])?[a-zA-Zа-яА-Я]*)*$"
            title="Name may contain only letters, apostrophe, dash and spaces. For example Adrian, Jacob Mercer, Charles de Batz de Castelmore d'Artagnan"
            required
            value={name}
          />
        </Label>
        <Label>
          <NameLabel>Number</NameLabel>
          <Inpyt
            onChange={handleChange}
            type="tel"
            name="number"
            pattern="\+?\d{1,4}?[-.\s]?\(?\d{1,3}?\)?[-.\s]?\d{1,4}[-.\s]?\d{1,4}[-.\s]?\d{1,9}"
            title="Phone number must be digits and can contain spaces, dashes, parentheses and can start with +"
            required
            value={number}
          />
        </Label>
        <Button type="submit">Add contact</Button>
      </Conteiner>
    </Formik>
  );
};
// export FormContacts
// export class FormContacts extends Component {
//   state = {
//     name: '',
//     number: '',
//   };
//   handleChange = ({ target: { name, value } }) => {
//     this.setState({ [name]: value });
//   };
//   handleSudmit = event => {
//     event.preventDefault();
//     this.props.addUser({ ...this.state });
//     this.setState({ name: '', number: '' });
//   };

//   render() {
//     return (
//       <Formik
//         initialValues={{ name: '', number: '' }}
//         validationSchema={schema}
//       >
//         <Conteiner onSubmit={this.handleSudmit}>
//           <Label>
//             <NameLabel>Name</NameLabel>

//             <Inpyt
//               onChange={this.handleChange}
//               type="text"
//               name="name"
//               pattern="^[a-zA-Zа-яА-Я]+(([' -][a-zA-Zа-яА-Я ])?[a-zA-Zа-яА-Я]*)*$"
//               title="Name may contain only letters, apostrophe, dash and spaces. For example Adrian, Jacob Mercer, Charles de Batz de Castelmore d'Artagnan"
//               required
//               value={this.state.name}
//             />
//           </Label>
//           <Label>
//             <NameLabel>Number</NameLabel>
//             <Inpyt
//               onChange={this.handleChange}
//               type="tel"
//               name="number"
//               pattern="\+?\d{1,4}?[-.\s]?\(?\d{1,3}?\)?[-.\s]?\d{1,4}[-.\s]?\d{1,4}[-.\s]?\d{1,9}"
//               title="Phone number must be digits and can contain spaces, dashes, parentheses and can start with +"
//               required
//               value={this.state.number}
//             />
//           </Label>
//           <Button type="submit">Add contact</Button>
//         </Conteiner>
//       </Formik>
//     );
//   }
// }
FormContacts.propTypes = {
  addUser: propTypes.func.isRequired,
};
