import { useState } from 'react';
import PropTypes from 'prop-types';
import { Form, Label, Input, Button } from './ContactForm.styled';

export function ContactForm({ onSubmit }) {
  const [name, setName] = useState('');
  const [number, setNumber] = useState('');

  const onChange = e => {
    const { name, value } = e.currentTarget;

    switch (name) {
      case 'name':
        setName(value);
        break;

      case 'number':
        setNumber(value);
        break;

      default:
        return;
    }
  };

  const onFormSubmit = e => {
    e.preventDefault();
    onSubmit(name, number);
    reset();
  };

  const reset = () => {
    setName('');
    setNumber('');
  };

  return (
    <Form onSubmit={onFormSubmit}>
      <Label>
        Name
        <Input
          value={name}
          onChange={onChange}
          type="text"
          name="name"
          pattern="^[a-zA-Zа-яА-Я]+(([' -][a-zA-Zа-яА-Я ])?[a-zA-Zа-яА-Я]*)*$"
          title="Name may contain only letters, apostrophe, dash and spaces. For example Adrian, Jacob Mercer, Charles de Batz de Castelmore d'Artagnan"
          required
        />
      </Label>
      <Label>
        Number
        <Input
          value={number}
          onChange={onChange}
          type="tel"
          name="number"
          pattern="\+?\d{1,4}?[-.\s]?\(?\d{1,3}?\)?[-.\s]?\d{1,4}[-.\s]?\d{1,4}[-.\s]?\d{1,9}"
          title="Phone number must be digits and can contain spaces, dashes, parentheses and can start with +"
          required
        />
      </Label>

      <Button type="submit">Add contact</Button>
    </Form>
  );
}

ContactForm.propTypes = {
  onSubmit: PropTypes.func.isRequired,
};

/////////////////////////////////////////////////
// export class ContactForm extends Component {
//   state = {
//     name: '',
//     number: '',
//   };

// onChange = e => {
//   const { name, value } = e.currentTarget;
//   this.setState({ [name]: value });
// };

// onSubmit = e => {
//   e.preventDefault();
//   this.props.onSubmit(this.state);
//   this.reset();
// };

// reset = () => {
//   this.setState({ name: '', number: '' });
// };

// render() {
// return (
//   <Form onSubmit={this.onSubmit}>
//     <Label>
//       Name
//       <Input
//         value={this.state.name}
//         onChange={this.onChange}
//         type="text"
//         name="name"
//         pattern="^[a-zA-Zа-яА-Я]+(([' -][a-zA-Zа-яА-Я ])?[a-zA-Zа-яА-Я]*)*$"
//         title="Name may contain only letters, apostrophe, dash and spaces. For example Adrian, Jacob Mercer, Charles de Batz de Castelmore d'Artagnan"
//         required
//       />
//     </Label>
//     <Label>
//       Number
//       <Input
//         value={this.state.number}
//         onChange={this.onChange}
//         type="tel"
//         name="number"
//         pattern="\+?\d{1,4}?[-.\s]?\(?\d{1,3}?\)?[-.\s]?\d{1,4}[-.\s]?\d{1,4}[-.\s]?\d{1,9}"
//         title="Phone number must be digits and can contain spaces, dashes, parentheses and can start with +"
//         required
//       />
//     </Label>
//     <Button type="submit">Add contact</Button>
//   </Form>
// );
// }
// }
