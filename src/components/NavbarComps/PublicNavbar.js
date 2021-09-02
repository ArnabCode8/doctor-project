import React from 'react'
import ReactDOM from 'react-dom'
import { BrowserRouter as Router, Route, Link } from 'react-router-dom';
import './publicNavbar.css';
import AddDoc from '../AddDoctorComps/AddDoc';
import DocList from '../DoctorListComps/DocList';
import AuGate from '../AddUpdateGateComps/AuGate';

export default class PublicNavbar extends React.Component
{

    render()
    {
        return (
         
        <Router>
            <div id = 'navPanel'>
            <Link to="/addDoc" className = 'navLink'>Add Doctor</Link>
            <Link to="/editDoc" className = 'navLink'>Edit Doctor</Link>
            <Link to="/showDoc" className = 'navLink'>Search Doctors</Link>
            </div>
            <Route exact path="/addDoc">
            <AuGate status = "register" />
            </Route>

            <Route exact path="/showDoc">
              <DocList />   
            </Route>

            <Route exact path="/editDoc">
            <AuGate status = "login" />
            </Route>       

        </Router>

        );
    }

}

//ReactDOM.render(<PublicNavbar name = "Protul" />,document.getElementById('root1'));