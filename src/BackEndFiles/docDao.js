
//docid name address password contact city expertise

const mysql = require("mysql");

const pool = mysql.createPool({

    connectionLimit : 10,
    host : "localhost",
    user : "root",
    database : "doctordb",
});

function addDoctor(doctor)
{
   return new Promise(function(resolve,reject){

    pool.getConnection(function(err,con){

        if(err)throw err;

           con.query("INSERT INTO doctor SET ?",doctor,function(err,rows){

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

// the actual search function runs on this single query
function doctorsByCityAndExps(doccity,docexp)
{
    //docid docname docrate
    return new Promise(function(resolve,reject){

        pool.getConnection(function(err,con){

            if(err)throw err;
            //var qr = "SELECT docid,docname,doccity,docexps,AVG(visrate) FROM doctor";
            var qr = "SELECT doctor.docid,docname,IFNULL(AVG(visrate),0) AS docrate FROM doctor";
            //var qr = "SELECT * FROM doctor";
            qr += " LEFT JOIN rating ON doctor.docid = rating.docid";
            qr += " WHERE doccity = " + doccity;
            qr += " AND (doctor.docexps LIKE " + "'% " + docexp + " %'";
            qr += " OR doctor.docexps LIKE '" + docexp + " %' OR doctor.docexps LIKE '% " + docexp + "')";
            qr += " GROUP BY doctor.docid";
            
            //qr += " ON doctor.docid = rating.docid";  
            //qr += " AND (doctor.docexps LIKE " + "'% " + docexp + " %'";
            //qr += " OR doctor.docexps LIKE '" + docexp + " %' OR doctor.docexps LIKE '% " + docexp + "')";

            console.log(qr);
            con.query(qr,function(err,rows){

                con.release();

                if(err)throw err;

                var jsonStr = JSON.stringify(rows);
                var resOut = JSON.parse(jsonStr);
                resolve(resOut);

            });
        });
    });
}

//update address contact city expertise
function updateDoc(doctor)
{
    return new Promise(function(resolve,reject){

        pool.getConnection(function(err,con){

            if(err)throw err;
            var arr = [];
            arr.push(doctor['docaddress']);
            arr.push(doctor['doccon']);
            arr.push(doctor['doccity']);
            arr.push(doctor['docexps']);
            arr.push(doctor['docpass']);
            console.log(arr);
            con.query("UPDATE doctor SET docaddress = ?, doccon = ?, doccity = ?, docexps = ? WHERE docpass = ?",arr,function(err,rows){

                con.release();
                var str = "yes";

                if(err)
                {
                    console.log(err);
                    str = "no";
                }

                resolve(str);

            });
        });
    });
}

function docById(docid)
{
    return new Promise(function(resolve,reject){

        pool.getConnection(function(err,con){

            if(err)throw err;

            con.query("SELECT * FROM doctor WHERE docid = ?",docid,function(err,rows){

                con.release();

                var jsonStr = JSON.stringify(rows);
                var resOut = JSON.parse(jsonStr);
                resolve(resOut);

            });

        });

    });
}

function allConPass()
{
    return new Promise(function(resolve,reject){

        pool.getConnection(function(err,con){

            if(err)throw err;

            con.query("SELECT doccon AS con,docpass AS pass FROM doctor",function(err,rows){

                con.release();

                var jsonStr = JSON.stringify(rows);
                var resOut = JSON.parse(jsonStr);
                resolve(resOut);

            });

        });

    });
}

function allPassDoc()
{
    return new Promise(function(resolve,reject){

        pool.getConnection(function(err,con){

            if(err)throw err;

            con.query("SELECT docpass, docid FROM doctor",function(err,rows){

                con.release();

                var jsonStr = JSON.stringify(rows);
                var resOut = JSON.parse(jsonStr);
                resolve(resOut);

            });

        });

    });
}

module.exports.addDoctor = addDoctor;
module.exports.doctorsByCityAndExps = doctorsByCityAndExps;
module.exports.updateDoc = updateDoc;
module.exports.docById = docById;
module.exports.allConPass = allConPass;
module.exports.allPassDoc = allPassDoc;

