import React from 'react';
import ContactList from '../components/ContactList';
import { deleteContact, getContacts } from '../utils/data';
import SearchBar from '../components/SearchBar';


class HomePage extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            contacts: getContacts(),
            keyword: '',
        }

        this.onKeywordChangeEventHandler = this.onKeywordChangeEventHandler.bind(this);
        this.onDeleteHandler = this.onDeleteHandler.bind(this);
    }

    onKeywordChangeEventHandler(keyword) {
        this.setState(() => {
            return {
                keyword,
            }
        });
    }

    onDeleteHandler(id) {
        deleteContact(id);

        // update the contact state from data.js
        this.setState(() => {
            return {
                contacts: getContacts(),
            }
        });
    }

    render() {
        const contacts = this.state.contacts.filter((contact) => {
            return contact.name.toLowerCase().includes(
                this.state.keyword.toLowerCase()
            );
        });

        return (
            <section>
                <SearchBar keyword={this.state.keyword} KeywordChange={this.onKeywordChangeEventHandler} />
                <h2>Daftar Kontak</h2>
                <ContactList contacts={contacts} onDelete={this.onDeleteHandler} />
            </section>
        )
    }
}

export default HomePage;