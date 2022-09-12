import * as React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

//Cards for views path
import NavBar from './components/Navbar';
import ComposePage from './Views/ComposePage';
import HomePage from './Views/HomePage';
import DetailsPage from './Views/DetailsPage';
import AdminPage from './Views/AdminPage';
import ContactPage from './Views/ContactPage';


const App: React.FC<AppProps> = (props) =>{
    return(
        <BrowserRouter>
		<NavBar />
			<Routes>
				<Route path='/' element={<HomePage />}/>
				<Route path='/compose' element={<ComposePage />}/>
				<Route path='/details/:blogid' element={<DetailsPage />}/>
				<Route path='/admin/:blogid' element={<AdminPage />}/>
				<Route path='/contact' element={<ContactPage />}/>
			</Routes>
		</BrowserRouter>
    )
}

interface AppProps {}

export default App;