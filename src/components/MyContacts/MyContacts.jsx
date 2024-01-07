import { Component } from 'react'
import { nanoid } from 'nanoid';

import styles from './my-contacts.module.css'

import MyContactForm from './MyContactForm/MyContactForm';
import MyContactList from './MyContactList/MyContactList';
import Filter from './Filter/Filter';

class MyContacts extends Component {
    state = {
        contacts: [
            { id: 'id-1', name: 'Rosie Simpson', number: '459-12-56' },
            { id: 'id-2', name: 'Hermione Kline', number: '443-89-12' },
            { id: 'id-3', name: 'Eden Clements', number: '645-17-79' },
            { id: 'id-4', name: 'Annie Copeland', number: '227-91-26' },],
            filter: '',
    }

    isDublicate({ name, number }) {
        const { contacts } = this.state;
        const normalizedName = name.toLowerCase();
        const normalizedNumber = number.toLowerCase();
        
        const dublicate = contacts.find(item => {
            const normalizeCurrentName = item.name.toLowerCase();
            const normalizeCurrentNumber = item.number.toLowerCase();
            return (normalizeCurrentName === normalizedName &&  normalizeCurrentNumber === normalizedNumber)
        })

        return Boolean(dublicate);
    }

    addContact = (data) => {
        
        if (this.isDublicate(data)) { 
            return alert(`${data.name} is already in contacts.`)
        }

        this.setState(({ contacts }) => {
            const newContact = {
                id: nanoid(),
                ...data,
            }

            return {
                contacts: [...contacts, newContact]
            }
        })
    }

    deleteContact = (id) => { 
        this.setState(({contacts}) => {
            const newContacts = contacts.filter(item => item.id !== id);

            return {
                contacts: newContacts,
            }
    })        
    }

    changeFilter = ({ target }) => {
        this.setState({
            filter: target.value,
        });
    }

    getFilterdContacts() { 
        const { filter, contacts } = this.state;
        if (!filter) { 
            return contacts;
        }

        const normalizedFilter = filter.toLowerCase();

        const filteredContacts = contacts.filter(({name}) => { 
            const normalizedName = name.toLowerCase();

            return (normalizedName.includes(normalizedFilter))
        })

        return filteredContacts;
    }
        
    render() { 
        const { addContact, deleteContact, changeFilter } = this;
        const contacts = this.getFilterdContacts()

        return (
            <div className={styles.wrapper}>
                <h1>Phonebook</h1>
                <MyContactForm onSubmit={addContact} />
                <div className={styles.listwrapper}>
                <h2>Contacts</h2>
                <Filter onChange={changeFilter} />
                <MyContactList items={contacts} deleteContact={deleteContact} />
                </div>
            </div>
        )
    }
}

export default MyContacts;