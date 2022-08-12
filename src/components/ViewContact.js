import React, { useEffect, useState } from 'react';
import { Spinner } from 'react-bootstrap';
import { Link, useParams } from 'react-router-dom'
import { ContactService } from '../services/ContactService';
function ViewContact(props) {
    let { contactId } = useParams()
    let [state, setState] = useState({
        loading: false,
        contact: {},
        errorMessage: '',
        group: {}
    })
    useEffect(() => {
        try {
            const getSingleData = async () => {
                setState({
                    ...state,
                    loading: true
                })
                const response = await ContactService.getContact(contactId)
                let groupResponse = await ContactService.getGroup(response.data)
                setState({
                    ...state,
                    loading: false,
                    contact: response.data,
                    group: groupResponse.data
                })
            }
            getSingleData()
        } catch (err) {
            setState({
                ...state,
                errorMessage: err.message
            })
        }
    }, [contactId])
    let { loading, errorMessage, contact, group } = state
    return (
        <React.Fragment>
            <section className='view-contact-intro p-3'>
                <div className="container">
                    <div className="row">
                        <div className="col">
                            <p className="h3 text-warning fw-bold">View Contact</p>
                            <p className="fs-italic">Lorem ipsum dolor sit amet consectetur adipisicing elit. Provident, sint neque mollitia nisi veniam praesentium inventore aut eius perspiciatis quam?</p>
                        </div>
                    </div>
                </div>
            </section>
            {loading ? <Spinner /> : <React.Fragment>
                {
                    Object.keys(contact).length > 0 && Object.keys(group).length > 0 && <section className="view-contact mt-3">
                        <div className="container">
                            <div className="row">
                                <div className="col-md-4">
                                    <img src={contact.photo}
                                        className='contact-img' alt="" />
                                </div>
                                <div className="col-md-8">
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
                                        <li className='list-group-item list-group-item-action'>
                                            Company <span className='fw-bold'>{contact.company}</span>
                                        </li>
                                        <li className='list-group-item list-group-item-action'>
                                            Title <span className='fw-bold'>{contact.title}</span>
                                        </li>
                                        <li className='list-group-item list-group-item-action'>
                                            Group <span className='fw-bold'>
                                                {group.name}
                                            </span>
                                        </li>
                                    </ul>
                                </div>
                            </div>
                            <div className="row">
                                <div className="col">
                                    <Link to={'/contacts/list'} className="btn btn-warning">back</Link>
                                </div>
                            </div>
                        </div>
                    </section>
                }
            </React.Fragment>
            }
        </React.Fragment>
    );
}

export default ViewContact;