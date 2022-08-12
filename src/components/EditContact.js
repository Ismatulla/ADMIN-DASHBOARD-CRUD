import React, { useEffect, useState } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom'
import { ContactService } from '../services/ContactService';
import Spinner from './Spinner/Spinner';
function EditContact(props) {
    const navigate = useNavigate()
    const { contactId } = useParams()
    const [state, setState] = useState({
        loading: false,
        contact: {
            name: '',
            photo: '',
            mobile: '',
            email: '',
            company: '',
            title: '',
            groupId: ''
        },
        group: [],
        errorMessage: ''
    })
    const { loading, contact, group, errorMessage } = state
    useEffect(() => {
        const response = async () => {
            try {
                setState({
                    ...state,
                    loading: true
                })
                const singleContact = await ContactService.getContact(contactId)
                const groupResponse = await ContactService.getGroups()
                setState({
                    ...state,
                    loading: false,
                    contact: singleContact.data,
                    group: groupResponse.data
                })
            } catch (err) {
                setState({
                    ...state,
                    loading: false,
                    errorMessage: err.message
                })
            }
        }
        response()
    }, [contactId])
    let updateInput = (e) => {
        setState({
            ...state,
            contact: {
                ...state.contact,
                [e.target.name]: e.target.value
            }
        })
    }
    const submitForm = async e => {
        e.preventDefault()
        try {
            const response = await ContactService.updateContact(state.contact, contactId);
            if (response) {
                navigate('/contacts/list', { replace: true })
            }
        } catch (err) {
            setState({
                ...state,
                errorMessage: err.message
            })
            navigate(`/contacts/edit/${contactId}`, { replace: false })
        }
    }
    return (
        <React.Fragment>
            {
                loading ? <Spinner /> : <React.Fragment>
                    <section className="add-contact">
                        <div className="container">
                            <div className="row">
                                <div className="col">
                                    <p className="h4 text-primary fw-bold">Edit Contact</p>
                                    <p className="first-italic">Lorem ipsum dolor sit amet, consectetur adipisicing elit. Cum quo aut placeat cumque eos saepe ducimus accusantium tempora voluptatibus beatae.</p>
                                </div>
                            </div>
                            <div className="row">
                                <div className="col-md-4">
                                    <form onSubmit={submitForm}>
                                        <div className="mb-2">
                                            <input
                                                required={true}
                                                name='name'
                                                value={contact.name}
                                                onChange={updateInput}
                                                type="text" className='form-control' placeholder='name' />
                                        </div>
                                        <div className="mb-2">
                                            <input
                                                required={true}
                                                name='photo'
                                                value={contact.photo}
                                                onChange={updateInput}
                                                type="text" className='form-control' placeholder='photo url' />
                                        </div>
                                        <div className="mb-2">

                                            <input
                                                required={true}
                                                name='mobile'
                                                value={contact.mobile}
                                                onChange={updateInput}
                                                type="mobile" className='form-control' placeholder='mobile' />
                                        </div>

                                        <div className="mb-2">
                                            <input
                                                required={true}
                                                name='email'
                                                value={contact.email}
                                                onChange={updateInput}
                                                type="email" className='form-control' placeholder='email' />
                                        </div>
                                        <div className="mb-2">
                                            <input
                                                required={true}
                                                name='company'
                                                value={contact.company}
                                                onChange={updateInput}
                                                type="text" className='form-control' placeholder='company' />
                                        </div>
                                        <div className="mb-2">
                                            <input
                                                required={true}
                                                name='title'
                                                value={contact.title}
                                                onChange={updateInput}
                                                type="text" className='form-control' placeholder='title' />
                                        </div>
                                        <div className="mb-2">
                                            <select
                                                required={true}
                                                name='groupId'
                                                value={contact.groupId}
                                                onChange={updateInput}
                                                className='form-control'>
                                                <option value="">Select a Group</option>
                                                {
                                                    group.length > 0 &&
                                                    group.map(group => {
                                                        return (
                                                            <option key={group.id} value={group.id}>{group.name}</option>
                                                        )
                                                    })
                                                }
                                            </select>
                                        </div>
                                        <div className="mb-2">
                                            <input type='submit' className="btn btn-primary" value="update" />
                                            <Link to={'/contacts/list'} className="btn btn-dark ms-2">canel</Link>
                                        </div>
                                    </form>
                                </div>
                                <div className="col-md-6">
                                    <img src={contact.photo} alt="not found" className='md-fluid contact-img' />
                                </div>
                            </div>
                        </div>
                    </section>
                </React.Fragment>
            }
        </React.Fragment>
    );
}

export default EditContact;