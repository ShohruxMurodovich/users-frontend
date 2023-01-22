import Login from './Pages/Login/login'
import Register from './Pages/Register/register'
import Home from './Pages/Home/home'
import { Route, Routes } from 'react-router-dom';
import './main.css'

function App() {
	return (
		<>
			<Routes>
				<Route path='/' element={<Login />} />
				<Route path='/register' element={<Register />} />
				<Route path='/home/:id' element={<Home />} />
			</Routes>
		</>
	);
}

export default App;
