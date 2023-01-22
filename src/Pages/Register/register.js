import { Link } from "react-router-dom";

import "./register.css"

function Register() {

  const handleAdd = (e) =>{

		e.preventDefault();

    const { name,  email,  password, img } = e.target;

    fetch('https://users-d5ri.onrender.com/add/user', {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
			},
			body: JSON.stringify({
				name: name.value,
        email: email.value,
        password: password.value,
        img: img.value,
			}),
		})
			.then((res) => res.json())
			.then((data) => console.log(data))
			.catch((err) => console.log(err));

      window.location.href = '/'
  }

  return (
    <>
    <div className="case">
     <div className="box_register">
        <div className="form">
          <h2>Sign Up</h2>
          <form onSubmit={handleAdd} method="POST" autoComplete="off">

          <div className="inputBox">
              <input name="name" type="text" required />
              <span>Username</span>
              <i></i>
            </div>

            <div className="inputBox">
              <input name="email" type="text" required />
              <span>Email</span>
              <i></i>
            </div>

            <div className="inputBox">
              <input name="password" type="text" required />
              <span>Password</span>
              <i></i>
            </div>

            <div className="inputBox">
              <input name="img" type="text" required />
              <span>User Img</span>
              <i></i>
            </div>

            <div className="links">
              <a href="#">Forgot Password</a>
              <Link to={'/'}>Login</Link>
            </div>
            <button className="btn" type="submit">SignUp</button>
          </form>
        </div>
      </div>
      </div>
    </>
  );
}

export default Register;