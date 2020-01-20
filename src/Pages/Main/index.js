import React from 'react';
import { useState, useEffect } from 'react'
import './styles.css'
import logo from '../../image/logo.svg'
import { MdDelete, MdEdit } from 'react-icons/md'

import api from '../../services/api'
import axios from 'axios'
// import { Container } from './styles';

export default function Main() {

  const [users, setUser] = useState([])

  const [name, setName] = useState('')
  const [country, setCountry] = useState('')
  const [email, setEmail] = useState('')
  const [phone, setPhone] = useState('')



  useEffect(() => {

    async function loadTable() {
      const response = await api.get('/users')

      const user = response.data;

      setUser(response.data)
    }

    loadTable()

  }, [users])



  async function handleAdd(e) {
    e.preventDefault();

    const response = await api.post('/users', {
      name,
      country,
      email,
      phone
    })

    setName('')
    setCountry('')
    setEmail('')
    setPhone('')


  }

  async function handleDel(id) {
    const filteredUsers = users.filter(user => user._id !== id)
    await api.delete('/users/' + id);

    setUser(filteredUsers)

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
              <label htmlFor="name">Name :
              <input
                  placeholder="Type your name"
                  name="name"
                  type="text"
                  required
                  value={name}
                  onChange={e => setName(e.target.value)}

                >
                </input>


              </label>

              <label htmlFor="country">Country :
              <input
                  placeholder="Type your country"
                  name="country"
                  type="text"
                  value={country}
                  onChange={e => setCountry(e.target.value)}

                >
                </input>



              </label>

              <label htmlFor="email">Email :

            <input
                  placeholder="Type your e-mail"
                  name="email"
                  type="text"
                  value={email}
                  onChange={e => setEmail(e.target.value)}

                >

                </input>
              </label>

              <label htmlFor="phone">Phone :
            <input
                  placeholder="Enter your phone"
                  name="phone"
                  type="text"
                  value={phone}
                  onChange={e => setPhone(e.target.value)}
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
            {users.map(user => (
              <tr className="animation" key={user._id}>
                <td>{user.name}</td>
                <td>{user.country}</td>
                <td>{user.email}</td>
                <td>{user.phone}</td>
                <td><MdDelete onClick={() => handleDel(user._id)} className="delete-button" size={24} color="#747474"></MdDelete>
                  <MdEdit size={24} color="#747474"></MdEdit></td>
              </tr>
            ))}


          </table>
        </main>

      </div>
    </>

  );
}
