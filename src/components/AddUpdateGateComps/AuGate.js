import React from 'react';
import baseLink from '../NesInfo';
import AddDoc from '../AddDoctorComps/AddDoc';
import './auGate.css';

export default class AuGate extends React.Component
{
    constructor(props)
    {
        super(props);
        this.state = {

            status: this.props.status,
            docid: 0,
            password: "",
            passPanelOpen: true,
            allPass: []

        };
    }

    componentDidMount()
    {
       this.fetchAllPassDoc();
    }

    fetchAllPassDoc()
    {
        var that = this;
        var actionStr = baseLink + "docpassid";
        fetch(actionStr,{

            method: "GET",

        }).then(function(response){

            return response.text();

        }).then(function(val){

            var jsonObj = JSON.parse(val);
            console.log("fetched docid and passwords : ");
            console.log(jsonObj);

            that.setState({

            allPass: jsonObj                

            });

        });

    }

    submitDoc()
    {
        if(this.state.password.trim() == "" || this.state.password == null)
        {
            window.alert("Can't leave password empty");
            return;
        }

        if(this.state.status == "register")
        {
            var index = this.state.allPass.findIndex((item)=>item.docpass == this.state.password);
            if(index > -1)
            {
                window.alert("This password is already taken, try something new");
            }
            else
            {
                window.alert("password in unique");
                this.setState({

                    passPanelOpen: false

                });
            }
        }
        else
        {
            //login
            var index = this.state.allPass.findIndex((item)=>item.docpass == this.state.password);
            if(index > -1)
            {
                var did = this.state.allPass[index].docid;
                window.alert("corresponding docid is : " + did);
                this.setState({

                    docid: parseInt(did),
                    passPanelOpen: false

                });
            }
            else
            {
                window.alert("Invalid password");
            }

        }

    }

    render()
    {
        return (

            <>
             {
                this.state.passPanelOpen?
                <div id = 'gateContainer'>
                <input type = 'text' id = 'passIn' value = {this.state.password} onChange={(e)=>this.setState({password:e.target.value})} placeholder = 'Enter Password'></input>
                <button id = 'login' onClick={()=>this.submitDoc()}>{this.state.status}</button>
                </div>
                :
                <AddDoc docid = {this.state.docid} password = {this.state.password}/>    
             }
            </>
        );
    }
}