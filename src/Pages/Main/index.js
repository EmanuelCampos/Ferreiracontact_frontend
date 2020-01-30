import React from 'react';
import { useState, useEffect } from 'react'

import './styles.css'
import logo from '../../image/logo.svg'
import { MdDelete, MdEdit, MdClose } from 'react-icons/md'

import Modal from 'react-modal';

import api from '../../services/api'

import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const customStyles = {
  content: {
    top: '50%',
    left: '50%',
    right: 'auto',
    bottom: 'auto',
    marginRight: '-50%',
    transform: 'translate(-50%, -50%)',
    borderTop: '8px solid #FF0BBD',
    borderRadius: '4px'
  }
};

Modal.setAppElement('#root')

export default function Main() {

  const [users, setUser] = useState([])

  const [name, setName] = useState('')
  const [country, setCountry] = useState('')
  const [email, setEmail] = useState('')
  const [phone, setPhone] = useState('')


  const [editId, editSetId] = useState('')
  const [editName, editSetName] = useState('')
  const [editCountry, editSetCountry] = useState('')
  const [editEmail, editSetEmail] = useState('')
  const [editPhone, editSetPhone] = useState('')

  var subtitle;

  const [modalIsOpen, setIsOpen] = React.useState(false);

  function openModal(user, index) {

    editSetId(user._id);
    editSetName(user.name);
    editSetCountry(user.country);
    editSetEmail(user.email);
    editSetPhone(user.phone);

    console.log(user);
    setIsOpen(true);
  }

  function afterOpenModal() {
    // references are now sync'd and can be accessed.
    subtitle.style.color = '#292929';
  }

  function closeModal() {
    setIsOpen(false);
  }

  useEffect(() => {

    async function loadTable() {
      const response = await api.get('/users')

      const user = response.data;

      setUser(user)
    }

    loadTable()

  }, [users])



  async function handleAdd(e) {

    await api.post('/users', {
      name,
      country,
      email,
      phone
    })

    toast("User added successfully!");
    setName('')
    setCountry('')
    setEmail('')
    setPhone('')


  }

  async function handleDel(id) {

    const filteredUsers = users.filter(user => user._id !== id)
    await api.delete('/users/' + id);

    setUser(filteredUsers)

    toast.warn("the field has been deleted")
  }

  function handleEdit() {

    api.put('/users/', {
      _id: editId,
      name: editName,
      country: editCountry,
      email: editEmail,
      phone: editPhone
    }).then((res) => {
      closeModal()
      toast.success("User changed successfully")
    }).catch((error) => {
      toast.error("ERROR: check the fields")
    })


  }


  return (
    <>
      <div class="container">
        <header>
          <div className="logo">
            <img src={logo} alt="ferreiracontato"></img>
          </div>
        </header>
        <main>
          <div className="text-top">
            <h1>Insert your contact</h1>
            <p>All fields are required</p>
            <div>
            </div>
            <form className="animation" onSubmit={handleAdd}>
              <label htmlFor="name">Name<span class="f-required"> * </span>
                <input
                  placeholder="Type your name"
                  name="name"
                  type="text"
                  required
                  value={name}
                  onChange={e => setName(e.target.value)}
                  autocomplete="off"

                >
                </input>


              </label>

              <label htmlFor="country">Country<span class="f-required"> * </span>
                <input
                  placeholder="Type your country"
                  name="country"
                  type="text"
                  required
                  value={country}
                  onChange={e => setCountry(e.target.value)}
                  autocomplete="off"

                >
                </input>



              </label>

              <label htmlFor="email">Email<span class="f-required"> * </span>

                <input
                  placeholder="Type your e-mail"
                  name="email"
                  type="text"
                  required
                  value={email}
                  onChange={e => setEmail(e.target.value)}
                  autocomplete="off"

                >

                </input>
              </label>

              <label htmlFor="phone">Phone
            <input
                  placeholder="Enter your phone"
                  name="phone"
                  type="text"
                  required
                  value={phone}
                  onChange={e => setPhone(e.target.value)}
                  autocomplete="off"
                >

                </input>
              </label>


              <button type="Submit">Insert</button>
            </form>
          </div>

        </main>
        <main className="main-table">
          <h1>Contacts</h1>
          <p>This table have Name, country, e-mail, phone and actions for delete or edit your contacts.</p>
          <table>
            <tr>
              <th>Name</th>
              <th>Country</th>
              <th>E-mail</th>
              <th>Phone</th>
              <th>Action</th>
            </tr>
            {users.map((user, index) => (
              <tr className="animation" key={user._id}>
                <td>{user.name}</td>
                <td>{user.country}</td>
                <td>{user.email}</td>
                <td>{user.phone}</td>
                <td><MdDelete onClick={() => handleDel(user._id)} className="delete-button" size={24} color="#747474"></MdDelete>
                  <MdEdit onClick={() => openModal(user, index)} size={24} color="#747474" className="delete-button"></MdEdit></td>
              </tr>
            ))}
            <Modal
              isOpen={modalIsOpen}
              onAfterOpen={afterOpenModal}
              onRequestClose={closeModal}
              style={customStyles}
              contentLabel="Example Modal"
            >
              <div className="modal-header">
                <h2 ref={_subtitle => (subtitle = _subtitle)}>Edit</h2>
                <MdClose className="close-button" onClick={closeModal} size={24} color="#333"></MdClose>

              </div>
              <p>Change the user information.</p>

              <form className="modal-form">
                <label htmlFor="name"> Name :
                <input
                    type="text"
                    value={editName}
                    onChange={(e) => editSetName(e.target.value)}
                    name="name"
                    placeholder="Type your new name" />
                </label>
                <label htmlFor="name"> Country :
                <input
                    type="text"
                    value={editCountry}
                    onChange={(e) => editSetCountry(e.target.value)}
                    name="country"
                    placeholder="Type your new country" />
                </label>
                <label htmlFor="name"> Email :
                <input
                    type="text"
                    value={editEmail}
                    onChange={(e) => editSetEmail(e.target.value)}
                    name="email"
                    placeholder="Type your new email" />
                </label>
                <label htmlFor="name"> Phone :
                <input
                    type="text"
                    value={editPhone}
                    onChange={(e) => editSetPhone(e.target.value)}
                    name="phone"
                    placeholder="Type your new phone" />
                </label>
                <div className="modal-buttons">
                  <button className="btn-cancel" type="button" onClick={closeModal}>Cancel</button>
                  <button className="btn-change" type="button" onClick={() => handleEdit()} > Change</button>


                </div>
              </form>
            </Modal>


          </table>
        </main>

      </div>
    </>

  );
}
