import './App.css';
import { Routes, Route, Navigate } from 'react-router-dom'
import React from 'react';
import ContactList from './components/ContactList';
import Navbar from './components/Navbar';
import ViewContact from './components/ViewContact';
import EditContact from './components/EditContact';
import AddContact from './components/AddContact';

function App() {
  return (
    <React.Fragment>
      <Navbar />
  
      <Routes>
        <Route path={'/'} element={<Navigate to={'/contacts/list'} />} />
        <Route path={'/contacts/list'} element={<ContactList />} />
        <Route path={'/contacts/view/:contactId'} element={<ViewContact />} />
        <Route path={'/contacts/edit/:contactId'} element={<EditContact />} />
        <Route path={'/contacts/add/:id'} element={<AddContact />} />
      </Routes>
    </React.Fragment>
  );
}

export default App;
