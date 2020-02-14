import React, { useCallback, useEffect, useState } from 'react'
import './styles.css'
import { MdClose, MdDelete, MdEdit } from 'react-icons/md'
import logo from '../../image/logo.svg'
import Modal from 'react-modal';
import api from '../../services/api'
import 'react-toastify/dist/ReactToastify.css';
import { toast } from 'react-toastify';
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
  const [users, setUsers] = useState([])
  const [name, setName] = useState('')
  const [country, setCountry] = useState('')
  const [email, setEmail] = useState('')
  const [phone, setPhone] = useState('')
  const [editId, editSetId] = useState('')
  const [editName, editSetName] = useState('')
  const [editCountry, editSetCountry] = useState('')
  const [editEmail, editSetEmail] = useState('')
  const [editPhone, editSetPhone] = useState('')
  let subtitle;
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
  const loadUsers = useCallback(() => {
    async function load() {
      const response = await api.get('/users')
      const userList = response.data;
      setUsers(userList)
    }
    load()
  }, [])
  useEffect(() => {
    loadUsers()
  })
  function handleAdd() {
    const response = api.post('/users', {
      name,
      country,
      email,
      phone
    }).then((res) => {
      loadUsers()
      toast('User added successfully!');
      setName('')
      setCountry('')
      setEmail('')
      setPhone('')
    }).catch((error) => {
      console.log(error)
    })
    console.log(response.data)
  }
  async function handleDel(id) {
    await api.delete(`/users/${id}`);
    loadUsers()
    toast.warn('the field has been deleted')
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
      toast.success('User changed successfully')
      loadUsers()
    }).catch((error) => {
      toast.error('ERROR: check the fields')
    })
  }
  return (
    <>
      <div className='container'>
        <header>
          <div className='logo'>
            <img alt='ferreiracontato' src={logo} />
          </div>
        </header>
        <main>
          <div className='text-top'>
            <h1>Insert your contact</h1>
            <p>All fields are required</p>
            <div />
            <form className='animation' onSubmit={() => handleAdd}>
              <label htmlFor='name'>Name<span className='f-required'> * </span>
                <input
                  autoComplete='off'
                  name='name'
                  onChange={e => setName(e.target.value)}
                  placeholder='Type your name'
                  required
                  type='text'
                  value={name}
                />
              </label>
              <label htmlFor='country'>Country<span className='f-required'> * </span>
                <input
                  autoComplete='off'
                  name='country'
                  onChange={e => setCountry(e.target.value)}
                  placeholder='Type your country'
                  required
                  type='text'
                  value={country}
                />
              </label>
              <label htmlFor='email'>Email<span className='f-required'> * </span>
                <input
                  autoComplete='off'
                  name='email'
                  onChange={e => setEmail(e.target.value)}
                  placeholder='Type your e-mail'
                  required
                  type='text'
                  value={email}
                />
              </label>
              <label htmlFor='phone'>Phone
                <input
                  autoComplete='off'
                  name='phone'
                  onChange={e => setPhone(e.target.value)}
                  placeholder='Enter your phone'
                  required
                  type='text'
                  value={phone}
                />
              </label>
              <button type='Submit'>Insert</button>
            </form>
          </div>
        </main>
        <main className='main-table'>
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
              <tr className='animation' key={user._id}>
                <td>{user.name}</td>
                <td>{user.country}</td>
                <td>{user.email}</td>
                <td>{user.phone}</td>
                <td><MdDelete className='delete-button' color='#747474' onClick={() => handleDel(user._id)} size={24} />
                  <MdEdit className='delete-button' color='#747474' onClick={() => openModal(user, index)} size={24} /></td>
              </tr>
            ))}
            <Modal
              contentLabel='Example Modal'
              isOpen={modalIsOpen}
              onAfterOpen={afterOpenModal}
              onRequestClose={closeModal}
              style={customStyles}
            >
              <div className='modal-header'>
                <h2 ref={_subtitle => (subtitle = _subtitle)}>Edit</h2>
                <MdClose className='close-button' color='#333' onClick={closeModal} size={24} />
              </div>
              <p>Change the user information.</p>
              <form className='modal-form'>
                <label htmlFor='name'> Name :
                  <input
                    name='name'
                    onChange={(e) => editSetName(e.target.value)}
                    placeholder='Type your new name'
                    type='text'
                    value={editName} />
                </label>
                <label htmlFor='name'> Country :
                  <input
                    name='country'
                    onChange={(e) => editSetCountry(e.target.value)}
                    placeholder='Type your new country'
                    type='text'
                    value={editCountry} />
                </label>
                <label htmlFor='name'> Email :
                  <input
                    name='email'
                    onChange={(e) => editSetEmail(e.target.value)}
                    placeholder='Type your new email'
                    type='text'
                    value={editEmail} />
                </label>
                <label htmlFor='name'> Phone :
                  <input
                    name='phone'
                    onChange={(e) => editSetPhone(e.target.value)}
                    placeholder='Type your new phone'
                    type='text'
                    value={editPhone} />
                </label>
                <div className='modal-buttons'>
                  <button className='btn-cancel' onClick={closeModal} type='button'>Cancel</button>
                  <button className='btn-change' onClick={() => handleEdit()} type='button' > Change</button>
                </div>
              </form>
            </Modal>
          </table>
        </main>
      </div>
    </>
  );
}