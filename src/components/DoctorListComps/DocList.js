import React from 'react';
import ReactDOM from 'react-dom';
import baseLink from '../NesInfo';
import DocProfile from '../DocProfileComps/DocProfile';
import './docList.css';
import { func } from 'prop-types';

export default class DocList extends React.Component
{
    constructor(props)
    {
        super(props);
        this.state = {

            cityid: "",
            expid: "",
            cityNameKey: "",
            expNameKey: "",
            allcities: [], 
            fixedAllCities: [],
            alldocs: [],
            fixedAllDocs: [],
            allexps: [],
            fixedAllExps: []
        };
    }

    componentDidMount()
    {
        this.fetchCities();
        this.fetchExps();
    }

    fetchCities()
    {
        var that = this;
        var actionStr = baseLink + "city";
        fetch(actionStr,{

            method: "GET",

        }).then(function(response){

            return response.text();

        }).then(function(val){

            var jsonObj = JSON.parse(val);
            that.setState({

                allcities: jsonObj,
                fixedAllCities: jsonObj

            });

        });
    }

    fetchExps()
    {
        var that = this;
        var actionStr = baseLink + "exp";
        fetch(actionStr,{

            method: "GET",

        }).then(function(response){

            return response.text();

        }).then(function(val){

            var jsonObj = JSON.parse(val);
            that.setState({

                allexps: jsonObj,
                fixedAllExps: jsonObj

            });

        });
    }

    cityFilter(e)
    {
        var x = e.target.value;
        console.log("city filter for : " + x);
        this.setState({

            cityNameKey: x

        });

        var arr = this.state.fixedAllCities;
        arr = arr.filter((item)=>{

          var mot = item.cityname.toLowerCase();
          var chi = x.trim().toLowerCase();  
        
          return (mot.indexOf(chi) == 0);

        });
        console.log("city filtered array : " + arr);
        this.setState({

            allcities: arr

        });

    }

    expFilter(e)
    {
        var x = e.target.value;
        console.log("exp filter for : " + x);
        this.setState({

            expNameKey: x

        });

        var arr = this.state.fixedAllExps;
        arr = arr.filter((item)=>(item.expname.toLowerCase().indexOf(x.trim().toLowerCase()) == 0));
        console.log("exp filtered array : " + arr);
        this.setState({

            allexps: arr

        })

    }

    docsSearch()
    {
        console.log("docs search is called for cityid: " + this.state.cityid + " and expid: " + this.state.expid);
        var actionStr = baseLink + "doctor/" + JSON.stringify(parseInt(this.state.cityid)) + "/" + JSON.stringify(this.state.expid); 
        var that = this;
        fetch(actionStr,{

            method: "GET",

        }).then(function(response){

            return response.text();

        }).then(function(val){

            var jsonObj = JSON.parse(val);
            that.setState({

                alldocs: jsonObj

            });

        });
    }

    goDoc(e)
    {
        var id = e.target.parentElement.getElementsByClassName("docListDocId")[0].innerHTML;
        console.log("go doc is called for id : " + id);
        ReactDOM.render(<DocProfile docid = {id}/>,document.getElementById('docListDocPanel'))
    }

    sortByRate()
    {
       var arr = this.state.alldocs;
       arr.sort(
           
        (item1,item2)=>{

            return (parseInt(item2.docrate) - parseInt(item1.docrate));

         }
       );

       this.setState({

        alldocs: arr

       });
    }

    sortByName()
    {
       var arr = this.state.alldocs;
       arr.sort(
           
        (item1,item2)=>{

              var name1 = item1.docname.toLowerCase();
              var name2 = item2.docname.toLowerCase();

              if(name1 < name2)
              return -1;

              if(name1 > name2)
              return 1;
          
              return 0;
         }

       );

       this.setState({

        alldocs: arr

       });

    }

    render()
    {
        return (

            <div id = 'docListContainer'>
            <input type = "text" id = 'docListCityText' placeholder = "Type city" onChange={(e)=>this.cityFilter(e)}></input>
            <select id = 'docListCitySelect' onChange={(e)=>this.setState({cityid: e.target.value})}>
            <option value = "0">None</option>
            {
                this.state.allcities.length > 0?
                this.state.allcities.map(
                    (item) => <option value = {item.cityid}>{item.cityname}</option> 
                    )
                :
                null    
            }
            </select>
            <input type = "text" id = 'docListExpText' placeholder = "Type Expertice" onChange={(e)=>this.expFilter(e)}></input>
            <select id = 'docListExpSelect' onChange={(e)=>this.setState({expid: e.target.value})}>
            <option value = "0">None</option> 
            {
                this.state.allexps.length > 0?
                this.state.allexps.map(
                    (item) => <option value = {item.expid}>{item.expname}</option> 
                    )
                :
                null    
            }
            </select>    
            <button id = 'docListSearchBtn' onClick={()=>this.docsSearch()}>Search</button>
            <hr/>
            <div id = 'docListDoctorList'>
            {
                this.state.alldocs.length == 0?
                <h2>No Doctors</h2>
                :
                <>
                <button id = 'docListSortByRate' onClick={()=>this.sortByRate()}>Sort By Rate</button>
                <button id = 'docListSortByName' onClick={()=>this.sortByName()}>Sort By Name</button>
                {
                    this.state.alldocs.map(
                        
                        (item) => <div className = 'docListUnitDoc'>
                                <p className = 'docListDocId'>{item.docid}</p>
                                <p className = 'docListDocName'>{item.docname}</p>
                                <br/><hr/>
                                <p className = 'docListDocRate'>Rating: {item.docrate}/5</p>
                                <button className = 'docListGoDoc'onClick={(e)=>this.goDoc(e)}>Show</button> 
                                </div>
                        
                    )
                }
                </>
                 
            }
            </div>
            <div id = 'docListDocPanel'>doc profile will be loaded here</div>    

            </div>
        );
    }

}