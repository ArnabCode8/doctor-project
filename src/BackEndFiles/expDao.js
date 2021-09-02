const mysql = require("mysql");

const pool = mysql.createPool({

    connectionLimit : 10,
    host : "localhost",
    user : "root",
    database : "doctordb",
});

function addExp(exp)
{
    return new Promise(function(resolve,reject){

        pool.getConnection(function(err,con){

            if(err)throw err;

            con.query("INSERT INTO expertise SET ?",exp,function(err,rows){

                con.release();
                var str = "yes";
                if(err)
                {
                    str = "no";
                }

                resolve(str);

            });

        });

    });
}

function expsByIdStr(idStr)
{
    return new Promise(function(resolve,reject){

        pool.getConnection(function(err,con){

            if(err)throw err;

            var arr = idStr.split(" ");
            var len = arr.length;
            var i;
            var qr = "SELECT expname AS name FROM expertise WHERE expid IN (";

            for(i=0;i<len;i++)
            {
                qr += arr[i] + ",";
            }

            qr = qr.substring(0,qr.length - 1);
            qr += ")";

            con.query(qr,function(err,rows){

                con.release();
                if(err)
                {
                   console.log(err);
                }
                else
                {
                    var jsonStr = JSON.stringify(rows);
                    var jsonObj = JSON.parse(jsonStr);
                    var len1 = jsonObj.length;
                    var j;

                    var resOut = "";
                    for(j=0;j<len1;j++)
                    {
                        resOut += jsonObj[j]['name'] + "/";
                    }

                    resOut = resOut.substring(0,resOut.length - 1);

                    resolve(resOut);

                }

            });

        });

    });
}

function allExps()
{
    return new Promise(function(resolve,reject){

        pool.getConnection(function(err,con){

            if(err)throw err;

            con.query("SELECT * FROM expertise",function(err,rows){

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


module.exports.addExp = addExp;
module.exports.allExps = allExps;
module.exports.expsByIdStr = expsByIdStr;