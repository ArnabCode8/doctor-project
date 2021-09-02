import React from 'react';
import ReactDOM from 'react-dom';
//import { Button } from 'reactstrap';
import './addDoc.css';
import baseLink from '../NesInfo';

//name address password contact city expertise
//suppose doc is passed as dctor object in props
export default class AddDoc extends React.Component
{

    constructor(props)
    {
        super(props);
        this.state = {
          
            docid: parseInt(this.props.docid),  
            name: "",
            address: "",
            contact: "",
            password: this.props.password,
            cityid: 1,
            exps: [],  
            tempExpertice: [],
            citites: [],
            expertice: [],
            conPassArr: []     
    
        }
    }

    expStrToArr(expStr)
    {
        var arr = expStr.split(" ");
        var len = arr.length;
        var i;
        var resOut = [];
        for(i=0;i<len;i++)
        {
            resOut[i] = parseInt(arr[i]);
        }

        console.log(resOut);
        return resOut;
    }

    //not necessary currently
    updateForm()
    {
        console.log("Update form is called");
       //nameIn addressIn cityIn expOp: expId expAdd
       document.getElementById("nameIn").value = this.state.name;
       document.getElementById("addressIn").value = this.state.address;
       document.getElementById("cityIn").value = this.state.cityid;
       var x = document.getElementsByClassName("expOp");
       var len = x.length;
       var i;
       var k;
       var index;
       for(i=0;i<len;i++)
       {
           k = parseInt(x[i].getElementsByClassName("expId")[0].innerHTML);
           index = this.state.exps.findIndex((j)=>j==k);
           if(index > -1)
           {
               x[i].getElementsByClassName("expAdd")[0].innerHTML = "added";
           }
       }

       if(parseInt(this.state.docid) != 0)
       {
           document.getElementById("submitAll").innerHTML = "Update";
       }

       //console.log("exps received : " + this.state.exps.findIndex((k)=>k==1));
    }

    componentDidMount()
    {
        var that = this;

        setTimeout(that.fetchDocConPass(that),1000);
        

        if(this.state.docid != 0)
        {
            this.fetchDoctorById();
        }

        setTimeout(that.fetchCities(that),6000);
        setTimeout(that.fetchExps(that),9000);
        
    }

    fetchDoctorById()
    {

        var that = this;

        var dc = JSON.stringify(this.state.docid);
        console.log("base link is : " + baseLink);
        var actionStr = baseLink +  "singledoc/" + dc; 
        fetch(actionStr,{

            method: "GET",
            //mode: 'no-cors',

        }).then((response)=>{

            return response.text();

        }).then((val)=>{

            var jsonObj = JSON.parse(val);
            console.log("value received");
            console.log(jsonObj);

            that.setState({

                name: jsonObj[0]['docname'],
                address: jsonObj[0]['docaddress'],
                contact: jsonObj[0]['doccon'],
                password: jsonObj[0]['docpass'],
                cityid: jsonObj[0]['doccity'],
                exps: that.expStrToArr(jsonObj[0]['docexps'])

            });

        });

    }

    fetchDocConPass(d)
    {
        var that = d;
        var actionStr = baseLink + "docconpass";
        fetch(actionStr,{

            method: "GET",

        }).then(function(response){

            return response.text();

        }).then(function(val){

            var jsonObj = JSON.parse(val);
            console.log("con pass in react");
            console.log(jsonObj);

            that.setState({

                conPassArr: jsonObj

            })
            
        });
        
    }

    fetchCities(d)
    {
        var that = d;

        var actionStr = baseLink + "city";
        fetch(actionStr,{

            method: "GET",

        }).then(function(response){

            return response.text();

        }).then(function(val){

            var jsonObj = JSON.parse(val);
            console.log("all cities");
            console.log(jsonObj);

            that.setState({

                citites: jsonObj

            });

        });

    }

    fetchExps(d)
    {
        var that = d;
        var actionStr = baseLink + "exp";
        fetch(actionStr,{

            method: "GET",

        }).then(function(response){

            return response.text();

        }).then(function(val){

            var jsonObj = JSON.parse(val);
            console.log("all exps");
            console.log(jsonObj);

            that.setState({

                expertice: jsonObj,
                tempExpertice: jsonObj

            });

        });

    }

    componentDidUpdate()
    {
        //this.updateForm();
        console.log("component did update is called");
    }

    bindName(e)
    {
        var x = e.target.value;
        console.log("bindName is Called" + x);
        this.setState({

            name: x

        });
    }

    bindAddress(e)
    {
        var x = e.target.value;
        console.log("bindAddress is Called" + x);
        this.setState({

            address: x

        });
    }
    
    bindCity(e)
    {
        var x = e.target.value;
        console.log("bindCity is Called : id =" + x);
        this.setState({

            cityid: x

        }); 
    }

    bindContact(e)
    {
        var x = e.target.value;
        console.log("bindCity is Called : id =" + x);
        this.setState({

            contact: x

        });
    }

    bindExp(e)
    {
        var v = e.target.parentElement.getElementsByClassName('expId')[0].innerHTML;
        var val = parseInt(v);
        var arr = this.state.exps;
        console.log("bindExp is called (exp id):" + val);
        var index = arr.findIndex((k)=>k==val);
        console.log("find index : " + index);
        if(index != -1)
        {
            arr.splice(index,1);
            e.target.innerHTML = "add";
            this.setState({

                exps: arr

            })
        }
        else
        {
            e.target.innerHTML = "added";
            arr.push(val);
            this.setState({

                exps: arr

            })
        }

        //console.log('modified exps : ' + this.state.exps);
    }

    bindSearch(e)
    {
        var x = e.target.value;
        console.log("keyword entered : " + x);

        var arr = this.state.expertice;
        arr = arr.filter((item)=>{

            var mot = item.expname.toLowerCase();

            return (mot.indexOf(x.toLowerCase()) == 0);

        });

        console.log(arr);

        this.setState({

            tempExpertice: arr

        });

    }

    showFill()
    {
        console.log("name : " + this.state.name);
        console.log("address : " + this.state.address);
        console.log("city id : " + this.state.cityid);
        console.log("contact : " + this.state.contact);
        console.log(this.state.exps);
        //nameIn addressIn cityIn expOp: expId expAdd


        if(this.state.name == null || this.state.name.trim() == "")
        {
            window.alert("name can't be empty");
            return;
        }

        if(this.state.address == null || this.state.address.trim() == "")
        {
            window.alert("address can't be empty");
            return;
        }

        if(this.state.contact == null || this.state.contact.trim() == "")
        {
            window.alert("contact can't be empty");
            return;
        }

        if(this.state.exps.length == 0)
        {
            window.alert("expertises can't be empty");
            return;
        }


        var docSend = {"docname":this.state.name,"docpass":this.state.password,"docaddress":this.state.address,"doccon":this.state.contact,"doccity":parseInt(this.state.cityid),"docexps":this.expArrToStr(this.state.exps)};
        console.log("sending doc object as : ");
        console.log(docSend);

        if(this.state.docid == 0)
        {
            var index = this.state.conPassArr.findIndex((item) => (item.con == this.state.contact));
            console.log("index : " + index);
            if(index != -1)
            {
               window.alert("This Contact is already used");
            }
            else
            {
               console.log("contact is unique");
               //insert doctor
               var actionStr = baseLink + "doctor/" + JSON.stringify(docSend);
               fetch(actionStr,{

                method: "POST",

               }).then(function(response){

                return response.text();

               }).then(function(val){

                var jsonObj = JSON.parse(val);
    
                if(jsonObj == "yes")
                {
                    ReactDOM.render(<h2>Successfully Inserted</h2>,document.getElementById("addDocContainer"));
                }
                else
                {
                    ReactDOM.render(<h2>Insertion failed</h2>,document.getElementById("addDocContainer"));
                }

               }); //fetch ends

            }
        }
        else
        {
            var index = this.state.conPassArr.findIndex((item) => (item.con == this.state.contact && item.pass != this.state.password));
            console.log("index : " + index);
            if(index != -1)
            {
               window.alert("This Contact is already used");
            }
            else
            {
                console.log("contact is unique wrt password");
                //update doctor
               var actionStr = baseLink + "doctor/" + JSON.stringify(docSend);
               fetch(actionStr,{

                method: "PUT",

               }).then(function(response){

                return response.text();

               }).then(function(val){

                var jsonObj = JSON.parse(val);

                if(jsonObj == "yes")
                {
                   ReactDOM.render(<h2>Successfully Updated</h2>,document.getElementById("addDocContainer"));
                }
                else
                {
                    ReactDOM.render(<h2>Updation failed</h2>,document.getElementById("addDocContainer"));
                }

               }); //fetch ends


            }

        }

    }

    expArrToStr(arr)
    {
        var len = arr.length;
        var i;
        var str = "";
        for(i=0;i<len;i++)
        {
            str += arr[i] + " ";
        }

        str = str.trim();
        return str;
    }

    render()
    {

        return(

            <div id = 'addDocContainer'>
               {
                   parseInt(this.state.docid) == 0?
                   <h3>Add Doctor Page</h3>
                   :
                   <h3>Edit Doctor Page</h3>
               }
              <hr/>
              <label for='nameIn'>Enter Name: </label><br/>
              <input id = 'nameIn' type = 'text' onChange={(e)=>this.bindName(e)} placeholder = 'Enter Name' value = {this.state.name}></input><br/>
              
              <label for='contactIn'>Enter Contact: </label><br/>
              <input type = 'text' id = 'contactIn' onChange={(e)=>this.bindContact(e)} placeholder = 'Enter Contact' value = {this.state.contact}></input><br/>
              
              <label for='addressIn'>Enter Address: </label><br/>
              <input id = 'addressIn' type = 'text-area' onChange={(e)=>this.bindAddress(e)} placeholder = 'Enter Address' value = {this.state.address}></input>
              <br/>
              <label for='cityIn'>Enter City: </label><br/>
              
              <select id = 'cityIn' onChange={(e)=>this.bindCity(e)} value = {this.state.cityid}>
              { 
                 this.state.citites.map(
                    (item) => <option value = {item.cityid}>{item.cityname}</option>
                 )

              }
              </select>
              <hr/>
              <input type = 'text' id = 'expSearch' placeholder = 'Type Exp' onChange={(e)=>this.bindSearch(e)}></input>
              <div id = 'expList'>
              {
                  this.state.tempExpertice.length != 0?
                  this.state.tempExpertice.map(

                    (item) => <div className = 'expOp'>
                              <p className = 'expId'>{item.expid}</p>
                              <p className = 'expName'>{item.expname}</p>
                              {
                                  this.state.exps.findIndex((k)=> k == parseInt(item.expid)) == -1?
                                  <button color="primary" className = 'expAdd' onClick={(e)=>this.bindExp(e)}>add</button>
                                  :
                                  <button color="primary" className = 'expAdd' onClick={(e)=>this.bindExp(e)}>added</button>
                              }
                              </div>

                  ) : null
              }
              </div>    
              {
                  parseInt(this.state.docid) == 0?
                  <button color="success" id = 'submitAll' onClick={()=>this.showFill()}>Submit</button>
                  :
                  <button color="success" id = 'submitAll' onClick={()=>this.showFill()}>Update</button>
              } 
              

            </div>

        );

        //render ends  
    }

    //class ends
}