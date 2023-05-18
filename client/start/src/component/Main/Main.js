import TaskList from "../Task/TaskList";
import "./Main.css";

const Main = () => {
	const handleLogout = () => {
		localStorage.removeItem("token");
		window.location.reload();
	};

	return (
		<div className="main_container">
			<nav className="navbar">
				<h1>Welcome User</h1>
				<button className="white_btn" onClick={handleLogout}>
					Logout
				</button>
			</nav>
			<TaskList />     
		</div>
		
	);
};

export default Main;