import React from 'react';
import ContactList from '../components/ContactList';
import SearchBar from '../components/SearchBar';
import { useSearchParams } from 'react-router-dom';
import { getContacts, deleteContact } from '../utils/api';
import LocaleContext, { LocaleConsumer } from '../contexts/LocaleContext';

// mengubah komponen HomePage menjadi functional component agar bisa menggunakan hook useSearchParams untuk mengelola query parameter pada URL. Dengan cara ini, kita bisa mendapatkan nilai keyword dari URL dan memperbarui URL saat keyword berubah.
function HomePage() {
    const [searchParams, setSearchParams] = useSearchParams();
    const [contacts, setContacts] = React.useState([]);
    const [keyword, setKeyword] = React.useState(() => {
        return searchParams.get('keyword') || '';
    });

    const { locale } = React.useContext(LocaleContext);

    React.useEffect(() => {
        getContacts().then(({ data }) => {
            setContacts(data);
        });
    }, []);

    async function onDeleteHandler(id) {
        await deleteContact(id);

        const { data } = await getContacts();
        setContacts(data);
    }

    function onKeywordChangeEventHandler(keyword) {
        setKeyword(keyword);
        setSearchParams({ keyword });
    }

    const filteredContacts = contacts.filter((contact) => {
        return contact.name.toLowerCase().includes(
            keyword.toLowerCase()
        );
    });

    return (
        <section className='home-page'>
            <SearchBar keyword={keyword} KeywordChange={onKeywordChangeEventHandler} />
            <h2 className='daftar-kontak'>{locale === 'id' ? 'Daftar Kontak' : 'Contact List'}</h2>
            <ContactList contacts={filteredContacts} onDelete={onDeleteHandler} />
        </section>
    );

}

export default HomePage;


// function HomePageWrapper() {
//     const [searchParams, setSearchParams] = useSearchParams();
//     const keyword = searchParams.get('keyword');

//     function changeSearchParams(keyword) {
//         setSearchParams({ keyword });
//     }

//     return <HomePage defaultKeyword={keyword} keywordChange={changeSearchParams} />
// }


// class HomePage extends React.Component {
//     constructor(props) {
//         super(props);

//         this.state = {
//             contacts: [],
//             keyword: props.defaultKeyword || '',
//         }

//         this.onKeywordChangeEventHandler = this.onKeywordChangeEventHandler.bind(this);
//         this.onDeleteHandler = this.onDeleteHandler.bind(this);
//     }

//     async componentDidMount() {
//         const { data } = await getContacts();
//         this.setState(() => {
//             return {
//                 contacts: data,
//             }
//         });
//     }


//     onKeywordChangeEventHandler(keyword) {
//         this.setState(() => {
//             return {
//                 keyword,
//             }
//         });

//         this.props.keywordChange(keyword);
//     }

//     async onDeleteHandler(id) {
//         await deleteContact(id);

//         const { data } = await getContacts();
//         this.setState(() => {
//             return {
//                 contacts: data,
//             }
//         });
//     }

//     render() {
//         const contacts = this.state.contacts.filter((contact) => {
//             return contact.name.toLowerCase().includes(
//                 this.state.keyword.toLowerCase()
//             );
//         });

//         return (
//             <LocaleConsumer>
//                 {
//                     ({ locale }) => {
//                         return (
//                             <section className='home-page'>
//                                 <SearchBar keyword={this.state.keyword} KeywordChange={this.onKeywordChangeEventHandler} />
//                                 <h2 className='daftar-kontak'>{locale === 'id' ? 'Daftar Kontak' : 'Contact List'}</h2>
//                                 <ContactList contacts={contacts} onDelete={this.onDeleteHandler} />
//                             </section>
//                         );
//                     }
//                 }
//             </LocaleConsumer>
//         )
//     }
// }

// export default HomePageWrapper;