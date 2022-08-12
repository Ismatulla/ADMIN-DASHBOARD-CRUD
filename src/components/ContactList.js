import React, { useCallback, useEffect, useState } from 'react';
import { Link } from 'react-router-dom'
import { ContactService } from '../services/ContactService';
import Spinner from './Spinner/Spinner';

function ContactList(props) {
    const [state, setState] = useState({
        loading: false,
        contacts: [],
        errorMessage: '',
        filteredContacts: []
    })
    const [query, setQuery] = useState('')
    useEffect(() => {
        try {
            setState({ ...state, loading: true })
            const fetchData = async () => {
                const response = await ContactService.getAllContacts()
                setState({
                    ...state,
                    loading: false,
                    contacts: response.data,
                    filteredContacts: response.data
                })
            }

            fetchData()
        } catch (err) {
            setState({
                ...state,
                loading: false,
                errorMessage: err.message
            })
        }

    }, [])
    let { loading, contacts, errorMessage, filteredContacts } = state
    const clickDelete = async (Id) => {
        try {
            let response = await ContactService.deleteContact(Id)
            if (response) {
                setState({ ...state, loading: true })
                let res = await ContactService.getAllContacts()
                setState({
                    ...state,
                    loading: false,
                    contacts: res.data,
                    filteredContacts: res.data
                })
            }
        } catch (err) {
            setState({ ...state, errorMessage: err.message })
        }
    }
    const searchContact = (e) => {
        setQuery({ ...query, text: e.target.value })
        const theContacts = contacts.filter(contact => {
            return contact.name.toLowerCase().includes(e.target.value.toLowerCase())
        })
        setState({
            ...state,
            filteredContacts: theContacts
        })
    }
    return (
        <React.Fragment>
            <section className=" contact-search ">
                <div className="container">
                    <div className="grid">
                        <div className="row">
                            <div className="col">
                                <p className="h3 fw-bold">Contact Manager
                                    <Link to={`/contacts/add/id`} className="btn btn-primary ms-2">
                                        <i className="fa fa-plus-circle me-2" />
                                        New
                                    </Link>
                                </p>
                                <p className="fst-italic">Lorem ipsum dolor sit amet consectetur, adipisicing elit. Recusandae quibusdam adipisci nulla sed debitis? Sapiente architecto quasi et. Totam, voluptatum?</p>
                            </div>
                        </div>
                        <div className="row">
                            <div className="col-md-6">
                                <form className="row">
                                    <div className="col">
                                        <div className="mb-2">
                                            <input type="text"
                                                name='text'
                                                value={query.text}
                                                onChange={searchContact}
                                                className="form-control" placeholder='Search Names' />
                                        </div>
                                    </div>
                                    <div className="col">
                                        <div className="mb-2">
                                            <input type="submit" value="Search" className="btn btn-outline-dark" />
                                        </div>
                                    </div>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
            {
                loading ? <Spinner /> : <React.Fragment>
                    <section className="contact-list">
                        <div className="container">
                            <div className="row">
                                {filteredContacts.length > 0 && filteredContacts.map((contact) => {
                                    return (
                                        <div className="col-md-6" key={contact.id}>
                                            <div className="card m-2">
                                                <div className="card-body">
                                                    <div className="row d-flex  justify-content-around align-items-center">
                                                        <div className="col-md-4">
                                                            <img src={contact.photo} className=' contact-img' alt="" />
                                                        </div>
                                                        <div className="col-md-7">
                                                            <ul className='list-group'>
                                                                <li className='list-group-item list-group-item-action'>
                                                                    Name: <span className='fw-bold'>{contact.name}</span>
                                                                </li>
                                                                <li className='list-group-item list-group-item-action'>
                                                                    Mobile: <span className='fw-bold'>{contact.mobile}</span>
                                                                </li>
                                                                <li className='list-group-item list-group-item-action'>
                                                                    Email <span className='fw-bold'>{contact.email}</span>
                                                                </li>
                                                            </ul>
                                                        </div>
                                                        <div className="col-md-1  buttons  ">
                                                            <Link className='btn btn-warning my-1' to={`/contacts/view/${contact.id}`}>
                                                                <i className="fa fa-eye" />
                                                            </Link>
                                                            <Link className='btn btn-primary my-1' to={`/contacts/edit/${contact.id}`}>
                                                                <i className="fa fa-pen" />
                                                            </Link>
                                                            <button className='btn btn-danger my-1' onClick={() => clickDelete(contact.id)}>
                                                                <i className="fa fa-trash" />
                                                            </button>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    )
                                })}
                            </div>
                        </div>
                    </section>
                </React.Fragment>

            }
        </React.Fragment >
    );
}

export default ContactList;