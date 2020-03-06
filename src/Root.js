import React from 'react';
import { BrowserRouter } from "react-router-dom";
import './Root.css';
import Header from "./Components/Snippets/Header";

import MyRouters from "./Routers/MyRoutes";

class Root extends React.Component {
	state= {
		loading: true
	}

	compoundDidMount(){
		this.setState({ loading: false });
	}
	
	render() {
		return (
			<BrowserRouter>
				<Header />
				<MyRouters />
			</BrowserRouter>
		);
	}
}

export default Root;
