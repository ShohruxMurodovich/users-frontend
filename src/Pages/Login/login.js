import { Link, useParams } from "react-router-dom";
import { useLogin } from "../../context/Authentication";
import "../Login/login.css"

function Login() {
  const [token, setToken] = useLogin();
  const params = useParams()

  const handleSubmit = (e) => {
		e.preventDefault();

		const {email ,  password } = e.target;

		fetch('https://users-d5ri.onrender.com/login', {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
			},
			body: JSON.stringify({
				email: email.value,
				password: password.value,
			}),
		})
			.then((res) => res.json())
			.then((data) => {
				setToken(data?.access_token)
				if(token){
          window.location.href = `/home/${data.id}`
        }
			})
			.catch((err) => console.log(err));
	};


  return (
    <>
    <div className="case">
      <div className="box">
        <div className="form">
          <h2>Login</h2>
          <form onSubmit={handleSubmit} method="post" autoComplete="off">

            <div className="inputBox">
              <input name="email" type="text" required />
              <span>Email</span>
              <i></i>
            </div>

            <div className="inputBox">
              <input name="password" type="password" required />
              <span>Password</span>
              <i></i>
            </div>

            <div className="links">
              <a href="#">Forgot Password</a>
              <Link to={'/register'}>SignUp</Link>
            </div>
            <button className="btn" type="submit">Login</button>
          </form>
        </div>
      </div>
      </div>
    </>
  );
}

export default Login;