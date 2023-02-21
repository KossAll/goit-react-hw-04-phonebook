import { Component } from 'react';
import { customAlphabet } from 'nanoid';
import ContactForm from './modules/ContactForm/ContactForm';
import Search from './modules/Search/Search';
import ContactList from './modules/ContactList/ContactList';
import style from './modules/ContactForm/ContactForm.module.css'

export class App extends Component {
  state = {
    contacts: [],
    filter: '',
  };

  componentDidMount() {
    const contacts = JSON.parse(localStorage.getItem('contacts'));
    if (contacts?.length) {
      this.setState({ contacts });
    }
  }

  componentDidUpdate(prevProps, prevState) {
    const { contacts } = this.state;
    if (prevState.contacts.length !== contacts.length) {
      localStorage.setItem('contacts', JSON.stringify(contacts));
    }
  }

  formSubmitHandler = ({ name, number }) => {
    const nanoid = customAlphabet('1234567890', 2);
    const id = 'id-' + nanoid(2);
    const contact = { id, name, number };
    if (this.isNameExist(name)) {
      alert(`${contact.name} has already added in contacts`);
      return false;
    }

    this.setState(prevState => {
      return { contacts: [contact, ...prevState.contacts] };
    });
    return true;
  };

  isNameExist(contName) {
    const normalizedName = contName.toLowerCase();
    const { contacts } = this.state;
    const result = contacts.find(({ name }) => {
      return name.toLowerCase() === normalizedName;
    });

    return Boolean(result);
  }

  changeFilter = e => {
    this.setState({ filter: e.currentTarget.value });
  };

  getVisibleContacts() {
    const { contacts, filter } = this.state;
    if (!filter) {
      return contacts;
    }
    const normalizedFilter = filter.toLowerCase();
    return contacts.filter(
      ({ name, number }) =>
        name.toLowerCase().includes(normalizedFilter) ||
        number.includes(normalizedFilter)
    );
  }

  deleteContact = contactID => {
    this.setState(prevState => ({
      contacts: prevState.contacts.filter(contact => contact.id !== contactID),
    }));
  };

  render() {
    const { filter, contacts } = this.state;
    const isContact = Boolean(contacts.length);
    const visibleContacts = this.getVisibleContacts();

    return (
      <>
        <h1 className={style.title}>Phonebook</h1>
        <ContactForm onSubmit={this.formSubmitHandler} />
        <div>
          <h1 className={style.title}>Contacts</h1>
          <Search value={filter} onChange={this.changeFilter} />
          {isContact && (
            <ContactList
              visibleContacts={visibleContacts}
              onDeleteContact={this.deleteContact}
            />
          )}
          {!isContact && <p className={style.title}>No contact in phonebook</p>}
        </div>
      </>
    );
  }
}
