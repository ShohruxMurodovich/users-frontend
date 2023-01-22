import React, { useEffect, useState } from 'react'
import Logo from '../../assets/images/Logo.png'
import Delete from '../../assets/images/delete.png'
import Edit from '../../assets/images/edit.png'
import { NavLink, useParams } from 'react-router-dom'
import { useLogin } from '../../context/Authentication'


import "./home.css"

export default function Home() {
  const [token] = useLogin()
  const [users, setUsers] = useState()
  const [active, setActive] = useState()
  const { id } = useParams()


  useEffect(() => {
    fetch('https://users-d5ri.onrender.com/users', {
      method: 'GET',
      headers: {
        access_token: token
      }
    })
      .then((res) => res.json())
      .then((data) => setUsers(data))
      .catch((err) => console.log(err))
  })


  const handleDel = (id) => {
    fetch('https://users-d5ri.onrender.com/del/user/', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        id: id,
      }),
    })
      .then((res) => res.json())
      .then((data) => console.log(data))
      .catch((err) => console.log(err))

      window.location.href = '/home'
  }



  const handleChange = (e) => {
    e.preventDefault();

    const { name, email, password,  img } = e.target;

    fetch('https://users-d5ri.onrender.com/edit/user/', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        name: name.value,
        email: email.value,
        password: password.value,
        img: img.value,
        id: active
      }),
    })
      .then((res) => res.json())
      .then((data) => console.log(data))
      .catch((err) => console.log(err))


      setActive(false)
  }

  return (
    <>
      <div className="container">

        <header>
          <a className='logo_link' href="#"><img className='logo' src={Logo} alt="" /></a>

          <nav>
            <a className='nav_link active' href="#">Home</a>
            <a className='nav_link' href="#">Dashboard</a>
            <a className='nav_link' href="#">Orders</a>
            {
              users && users.filter(a => a.user_id == id).map(g => (
                <div key={g.user_id} className='nav_user' href="#">{g.user_name} <img className='nav_img' src={g.user_img} alt="user img" /></div>
              ))
            }
            <NavLink className='nav_logout' to={'/'} >Log Out</NavLink>
          </nav>
        </header>

        <main>
          <div className="users">
            {
              users && users.filter(a => a.user_id != id).map(g => (

                <div key={g.user_id} className="user">
                  <img className='user_img' src={g.user_img} alt="User Img" />
                  <h3 className='user_title'>Name: <span> {g.user_name}</span></h3>
                  <h3 className='user_title'>Email: <span> {g.user_email}</span></h3>
                  <h3 className='user_title'>password: <span> {g.user_password}</span></h3>

                  <div className="buttons">
                    <button onClick={() => handleDel(g.user_id)} className='button'><img className='button_img' src={Delete} alt="Delete icon" /></button>
                    <button onClick={() => setActive(g.user_id)} className='button'><img className='button_img' src={Edit} alt="Edit icon" /></button>
                  </div>
                </div>
              ))
            }


          </div>
        </main>
      </div>

      <div onClick={() => setActive(false)} className={active ? "modal active" : "modal"}>
        <div onClick={e => e.stopPropagation()} className='modal__content'>

            {
              users && users.filter(a => a.user_id == active).map(g => (
                <div className="box_register">
            <div className="form">
              <h2>Edit User</h2>
              <form method="POST" onSubmit={handleChange} autoComplete="off">

                <div className="inputBox">
                  <input name="name" type="text" defaultValue={g.user_name} required/>
                  <span>Username</span>
                  <i></i>
                </div>

                <div className="inputBox">
                  <input name="email" type="text" defaultValue={g.user_email} required/>
                  <span>Email</span>
                  <i></i>
                </div>

                <div className="inputBox">
                  <input name="password" type="text" defaultValue={g.user_password}  required/>
                  <span>Password</span>
                  <i></i>
                </div>

                <div className="inputBox">
                  <input name="img" type="text" defaultValue={g.user_img} required/>
                  <span>User Img</span>
                  <i></i>
                </div>

                <button className="btn" type="submit">EDIT</button>
              </form>
            </div>
          </div>
              ))
            }
        </div>
      </div>
    </>
  )
}
