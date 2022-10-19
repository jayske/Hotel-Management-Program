const sqlConnection = require('../db/config')

exports.feedback = async (req, res) => {
    try {
        const { name, email, message} = req.body
        console.log(req.body);
        sqlConnection.query(`INSERT INTO feedback (name, email, message) 
                                    VALUES ('${name}','${email}','${message}')`, function (err, data) {

            if (err) {
                res.send({ message: 'Something went wrong...', data: "" })
            }
            else {
                res.send({
                    message: "Your Feedback submited successfully",
                    data: data
                })
            }
        })

    } catch (error) {
        console.log(error);
    }
}

exports.getFeedback=async(req,res)=>{
    try {
        const query = "SELECT * FROM feedback"
        sqlConnection.query(query,function (err, data) {
            if (data && data?.length) {
                res.send({message:"Feedback found successfully", data:data})
            }else{
                res.send({message:"Feedback are not available", data:""})
            }
        })

    } catch (error) {
        console.log(error);
    }
}
