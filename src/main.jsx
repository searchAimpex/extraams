import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { createBrowserRouter, createRoutesFromElements, Route, RouterProvider } from 'react-router-dom'
import LoginScreen from './Screen/LoginScreen.jsx'
import store from './store.js'
import { Provider } from 'react-redux'
import PrivateRoute from './Route/PrivateRoute.jsx'
import Dashboard from './Screen/Dashboard.jsx'
import { University } from 'lucide-react'
import UniversityView from './Screen/UniversityView.jsx'
import FessScreen from './Screen/FessScreen.jsx'
import ImportantDownload from './Screen/ImportantDownload.jsx'
import UniversityMaterial from './Screen/UniversityMaterial.jsx'
import ViewTransaction from './Screen/ViewTransaction.jsx'
import CreateTransaction from './Screen/CreateTransaction.jsx'
import CreateLead from './Screen/CreateLead.jsx'
import ViewLead from './Screen/ViewLead.jsx'
import CreateOnlineAdmission from './Screen/CreateOnlineAdmission.jsx'
import ViewOnlineAdmission from './Screen/ViewOnlineAdmission.jsx'
import CreateAdmission from './Screen/CreateAdmission.jsx'
import ViewAdmission from './Screen/ViewAdmission.jsx'
import Profile from './Screen/Profile.jsx'
import MyCommission from './Screen/MyCommission.jsx'


const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path='/' element={<App />}>
            <Route path='/' element={<LoginScreen />} />
            <Route path='/user' element={<PrivateRoute />} >
              <Route path='/user/dashboard' element={<Dashboard />} />
              <Route path='/user/university' element={<UniversityView />} />
              <Route path='/user/fees' element={<FessScreen />} />
              <Route path = '/user/download' element = {< ImportantDownload/>} />
              <Route path = '/user/material' element = {<UniversityMaterial />} />
              <Route path = '/user/createtransaction' element = {<CreateTransaction/>} />
              <Route path = '/user/viewtransaction' element = {<ViewTransaction />} />
              <Route path  = '/user/createlead' element = {<CreateLead />} />
              <Route path  = '/user/viewlead' element = {<ViewLead />} />
              <Route path = '/user/applyonline' element = {<CreateOnlineAdmission />} />
              <Route path = '/user/viewonline' element = { <ViewOnlineAdmission />} />
              <Route path = '/user/apply' element = {< CreateAdmission />} />
              <Route path = '/user/applyview' element={< ViewAdmission/>} />
              <Route path = '/user/profile' element = {< Profile />} />
              <Route path = '/user/commission' element = {<MyCommission /> } />
             </Route>


    </Route>
  ))

createRoot(document.getElementById('root')).render(
  <Provider store= {store}>
    <StrictMode>
      <RouterProvider router={router} />
    </StrictMode>
  </Provider>,
)