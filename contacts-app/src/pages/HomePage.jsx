import React from 'react';
import ContactList from '../components/ContactList';
import SearchBar from '../components/SearchBar';
import { useSearchParams } from 'react-router-dom';
import { func } from 'prop-types';
import { getContacts, deleteContact } from '../utils/api';
import { LocaleConsumer } from '../contexts/LocaleContext';


function HomePageWrapper() {
    const [searchParams, setSearchParams] = useSearchParams();
    const keyword = searchParams.get('keyword');

    function changeSearchParams(keyword) {
        setSearchParams({ keyword });
    }

    return <HomePage defaultKeyword={keyword} keywordChange={changeSearchParams} />
}


class HomePage extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            contacts: [],
            keyword: props.defaultKeyword || '',
        }

        this.onKeywordChangeEventHandler = this.onKeywordChangeEventHandler.bind(this);
        this.onDeleteHandler = this.onDeleteHandler.bind(this);
    }

    async componentDidMount() {
        const { data } = await getContacts();
        this.setState(() => {
            return {
                contacts: data,
            }
        });
    }


    onKeywordChangeEventHandler(keyword) {
        this.setState(() => {
            return {
                keyword,
            }
        });

        this.props.keywordChange(keyword);
    }

    async onDeleteHandler(id) {
        await deleteContact(id);

        const { data } = await getContacts();
        this.setState(() => {
            return {
                contacts: data,
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
            <LocaleConsumer>
                {
                    ({ locale }) => {
                        return (
                            <section className='home-page'>
                                <SearchBar keyword={this.state.keyword} KeywordChange={this.onKeywordChangeEventHandler} />
                                <h2 className='daftar-kontak'>{locale === 'id' ? 'Daftar Kontak' : 'Contact List'}</h2>
                                <ContactList contacts={contacts} onDelete={this.onDeleteHandler} />
                            </section>
                        );
                    }
                }
            </LocaleConsumer>
        )
    }
}

export default HomePageWrapper;