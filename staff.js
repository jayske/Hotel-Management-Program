const sqlConnection = require('../db/config')

exports.addStaff = async (req, res) => {
    try {
        const {name, email, phone, job, salary, gender} = req.body
        console.log(req.body);
        sqlConnection.query(`INSERT INTO staff (name, email, phone, job, salary, gender) 
                                    VALUES ('${name}','${email}','${phone}','${job}','${salary}','${gender}')`, function (err, data) {

            if (err) {
                res.send({ message: 'Something went wrong...', data: "" })
            }
            else {
                res.send({
                    message: "Staff added successfully",
                    data: data
                })
            }
        })

    } catch (error) {
        console.log(error);
    }
}

exports.getStaff=async(req,res)=>{
    try {
        const query = "SELECT * FROM staff"
        sqlConnection.query(query,function (err, data) {
            if (data && data?.length) {
                res.send({message:"staff found successfully", data:data})
            }else{
                res.send({message:"staff are not available", data:""})
            }
        })

    } catch (error) {
        console.log(error);
    }
}
