const mysql = require("mysql");

const pool = mysql.createPool({

    connectionLimit : 10,
    host : "localhost",
    user : "root",
    database : "doctordb",
});

function addCity(city)
{
    return new Promise(function(resolve,reject){

        pool.getConnection(function(err,con){

            if(err)throw err;

            con.query("INSERT INTO city SET ?",city,function(err,rows){

                con.release();
                var str = "yes";
                if(err)
                {
                    str = "no";
                    console.log(err);
                }

                resolve(str);

            });

        });

    });
}

function allCities()
{
    return new Promise(function(resolve,reject){

        pool.getConnection(function(err,con){

            if(err)throw err;

            con.query("SELECT * FROM city",function(err,rows){

                con.release();

                if(err)
                {
                    console.log(err);
                }
                else
                {
                    var jsonStr = JSON.stringify(rows);
                    var resOut = JSON.parse(jsonStr);
                    resolve(resOut);
                }

            });

        });

    });
}

function cityNameById(id)
{
    return new Promise(function(resolve,reject){

        pool.getConnection(function(err,con){

            if(err)throw err;

            var cityid = parseInt(id);
            con.query("SELECT cityname FROM city WHERE cityid = ?",cityid,function(err,rows){

                con.release();

                if(err)
                {
                    console.log(err);
                }
                else
                {
                    var jsonStr = JSON.stringify(rows);
                    var jsonObj = JSON.parse(jsonStr);
                    resolve(jsonObj);
                }

            });

        });

    });

}

module.exports.addCity = addCity;
module.exports.allCities = allCities;
module.exports.cityNameById = cityNameById;