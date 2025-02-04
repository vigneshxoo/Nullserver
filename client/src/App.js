import './App.css';
import { Routes, Route, Navigate } from 'react-router-dom';

import LoginPage from './pages/auth/login/Login';
import { Toaster } from 'react-hot-toast';
import { PrivateRouter } from './RoutingPage/Routes';
import SignUpPage from './pages/auth/signup/Signup';
import ProfilePage from './pages/Home/AllComponents/GetProfile';
import { Vidoe_Home } from './pages/Home/AllComponents/Vidoe_Home';
import { Click_viode_page } from './pages/Home/AllComponents/Click_viode_page';
import TProfilePage from './pages/Home/AllComponents/Profile';
import CreatePost from './pages/Home/AllComponents/PostCreate';
import { WatchVideos } from './pages/Home/AllComponents/WactchViodes';





function App() {
	return (


		<div>
			<Routes>
				<Route path="/login" element={<LoginPage />} />
				<Route path="/signup" element={<SignUpPage />} />
				
				<Route element={<PrivateRouter />}>
					<Route path="/" element={<Vidoe_Home/>} />
					{/* <Route path="/" element={<Sidebar/>} /> */}
					{/* //<Route path='/profile' element={<ProfilePage/>}/> */}
					<Route path='/vidoe/:id' element={< Click_viode_page/>}/>
					<Route path='/getprofile' element={< TProfilePage/>}/>
					<Route path='/create/post' element={< CreatePost/>}/>
					<Route path='/watch' element={< WatchVideos/>}/>

				</Route>

			</Routes>
			<Toaster />
		</div>
	);
}

export default App;
// >

// <Routes>
// {/* Public Routes */}
// <Route
//   path="/"
//   element={!isAuthenticated ? <SignUpPage /> : <Navigate to="/homepage" replace />}
// />
// <Route
//   path="/login"
//   element={!isAuthenticated ? <LoginPage /> : <Navigate to="/homepage" replace />}
// />
// <Route path='/profile' element={<ProfilePage/>}/>

// {/* Protected Routes */}
// <Route
//   path="/homepage"
//   element={
//     <ProtectedRoute>
//       <HomePage />
//     </ProtectedRoute>
//   }
// />

// {/* Fallback Route */}
// <Route path="*" element={<Navigate to={isAuthenticated ? "/homepage" : "/login"} replace />} />
// </Routes>