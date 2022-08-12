import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom'
import { ContactService } from '../services/ContactService';
import { useNavigate } from 'react-router-dom';
function AddContact(props) {
    let navigate = useNavigate()
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
        errorMessage: []
    })
    let updateInput = (e) => {
        setState({
            ...state,
            contact: {
                ...state.contact,
                [e.target.name]: e.target.value
            }
        })
    }
    useEffect(() => {
        try {
            setState({
                ...state,
                loading: true
            })
            const getAllGroups = async () => {
                let response = await ContactService.getGroups()
                setState({
                    ...state,
                    loading: false,
                    group: response.data
                })

            }
            getAllGroups()
        } catch (err) {
            console.log(err);
        }
    }, []);
    let { loading, contact, group, errorMessage } = state
    const formSubmit = async (e) => {
        e.preventDefault()
        try {
            let response = await ContactService.createContact(contact)
            if (response) {
                navigate('/contacts/list', { replace: true })
            }
        } catch (err) {
            setState({ ...state, errorMessage: err.message })
            navigate('/contacts/add', { replace: false })
        }
    }
    return (
        <React.Fragment>
            <section className="add-contact">
                <div className="container">
                    <div className="row">
                        <div className="col">
                            <p className="h4 text-success fw-bold">Create Contact</p>
                            <p className="first-italic">Lorem ipsum dolor sit amet, consectetur adipisicing elit. Cum quo aut placeat cumque eos saepe ducimus accusantium tempora voluptatibus beatae.</p>
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-md-4">
                            <form onSubmit={formSubmit}>
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
                                        type="url" className='form-control' placeholder='photo url' />
                                </div>
                                <div className="mb-2">
                                    <input
                                        required={true}
                                        name='mobile'
                                        value={contact.mobile}
                                        onChange={updateInput}
                                        type="tel" className='form-control' placeholder='mobile' />
                                </div>
                                <div className="mb-2">
                                    <input
                                        required={true}
                                        name='number'
                                        value={contact.number}
                                        onChange={updateInput}
                                        type="tel" className='form-control' placeholder='number' />
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
                                            group.length > 0 && group.map(group => {
                                                return (
                                                    <option key={group.id} value={group.id}>{group.name}</option>
                                                )
                                            })
                                        }
                                    </select>
                                </div>
                                <div className="mb-2">
                                    <input type='submit' className="btn btn-success" value="create" />
                                    <Link to={'/contacts/list'} className="btn btn-dark ms-2">canel</Link>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </section>
        </React.Fragment>
    );
}
export default AddContact;