const sqlConnection = require('../db/config')

exports.bookTable = async (req, res) => {
    try {
        console.log(req.body);
        const { name, phone, email, persons, date, time} = req.body
        sqlConnection.query(`INSERT INTO tables (name, phone, email, persons, date, time) 
                                    VALUES ('${name}','${phone}', '${email}','${persons}','${date}','${time}')`, function (err, data) {
            console.log(err);                                        
            if (err) {
                res.send({ message: 'Something went wrong...', data: "" })
            }
            else {
                res.send({
                    message: "Table booked successfully",
                    data: { name, phone, email, persons, date, time, id: data.insertId}
                })
            }
        })

    } catch (error) {
        console.log(error);
    }
}

exports.getAllTables=async(req,res)=>{
    try {
        const query = "SELECT * FROM tables"
        sqlConnection.query(query,function (err, data) {
            console.log(data);
            if (data.length) {
                res.send({message:"tables fetch Successfully", data:data})
            }else{
                res.send({message:"Something went wrong", data:""})
            }
        })

    } catch (error) {
        console.log(error);
    }
}

