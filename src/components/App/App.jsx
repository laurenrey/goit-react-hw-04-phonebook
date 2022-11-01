import { useState } from 'react';
import { nanoid } from 'nanoid';
import toast, { Toaster } from 'react-hot-toast';
import { ContactForm } from '../ContactForm/ContactForm';
import { ContactList } from '../ContactList/ContactList';
import { Filter } from '../Filter/Filter';
import { Wrapper, MainTitle, ContactsTitle, Message } from './App.styled';
import useLocalStorage from 'hooks/useLocalStorage';

export function App() {
  const [contacts, setContacts] = useLocalStorage('contacts', [
    { id: 'id-1', name: 'Rosie Simpson', number: '459-12-56' },
    { id: 'id-2', name: 'Hermione Kline', number: '443-89-12' },
    { id: 'id-3', name: 'Eden Clements', number: '645-17-79' },
    { id: 'id-4', name: 'Annie Copeland', number: '227-91-26' },
  ]);

  const [filter, setFilter] = useState('');

  const addContact = (name, number) => {
    const newContact = {
      id: nanoid(),
      name,
      number,
    };

    if (
      contacts.find(
        contact => contact.name.toLowerCase() === newContact.name.toLowerCase()
      )
    ) {
      toast.error(`${newContact.name} is already in contacts.`);
      return;
    }

    setContacts(contacts => [newContact, ...contacts]);
  };

  const deleteContact = id => {
    setContacts(prevState => prevState.filter(contact => contact.id !== id));
  };

  const changeFilter = e => {
    setFilter(e.currentTarget.value);
  };

  const getVisibleContacts = () => {
    const normalizedFilter = filter.toLowerCase();

    return contacts.filter(contact =>
      contact.name.toLowerCase().includes(normalizedFilter)
    );
  };

  return (
    <Wrapper>
      <MainTitle>Phonebook</MainTitle>
      <ContactForm onSubmit={addContact} />
      <Toaster position="top-center" reverseOrder={false} />

      <ContactsTitle>Contacts</ContactsTitle>
      {contacts.length !== 0 ? (
        <>
          <Filter value={filter} onChange={changeFilter} />
          <ContactList
            contacts={getVisibleContacts()}
            deleteContact={deleteContact}
          />
        </>
      ) : (
        <Message>The phonebook is empty!</Message>
      )}
    </Wrapper>
  );
}

//////////////////////

// export function App() {
//   const [contacts, setContacts] = useState([
//     { id: 'id-1', name: 'Rosie Simpson', number: '459-12-56' },
//     { id: 'id-2', name: 'Hermione Kline', number: '443-89-12' },
//     { id: 'id-3', name: 'Eden Clements', number: '645-17-79' },
//     { id: 'id-4', name: 'Annie Copeland', number: '227-91-26' },
//   ]);

//   const [filter, setFilter] = useState('');

//   useEffect(() => {
//     const parsedContacts = JSON.parse(localStorage.getItem('contacts'));

//     if (parsedContacts) {
//       setContacts(parsedContacts);
//     }
//   }, []);

//   useEffect(() => {
//     localStorage.setItem('contacts', JSON.stringify(contacts));
//   }, [contacts]);
