import { Route, Routes, Navigate } from "react-router-dom";
import './App.css';
import LogIn from './component/Login/LogIn'
import SignUp from './component/Signup/SignUp';
import Main from './component/Main/Main';


function App() {
	const user = localStorage.getItem("token");
	return (
		<Routes>
			{user && <Route path="/" exact element={<Main />} />}
			<Route path="/signup" exact element={<SignUp />} />
			<Route path="/login" exact element={<LogIn />} />
			<Route path="/" element={<Navigate replace to="/login" />} />
		</Routes>
	);
}

export default App;
