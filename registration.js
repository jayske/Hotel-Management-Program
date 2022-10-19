const sqlConnection = require('../db/config')

exports.registerUser = async (req, res) => {
    try {
        const { email, password, role, username} = req.body
        query = `INSERT INTO users (username, email, password, role) 
            VALUES ('${username}','${email}','${password}','${role}')`

        var count_query = `SELECT count(email), id FROM users WHERE email= ?`
    
        sqlConnection.query(count_query, [email], function (err, data) {
            if (data[0]['count(email)'] == 0) {
                sqlConnection.query(query, function (err, data) {
                    if (err) {
                        res.send({ message: 'Something went wrong...' , data:""})
                    }
                    else {
                        res.send({
                            message: "Successfully Registerd",
                            data: { email, password, role, username, id:data.insertId}
                        })
                    }
                })
            } else {
                res.send({message:"This email is already in use...",data:""})
            }

        })

    } catch (error) {
        console.log(error);
    }
}