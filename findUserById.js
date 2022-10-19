const sqlConnection = require('../db/config')

exports.findUserById = async (req, res) => {
    try {
        const userId = req.query.id
        const query = "SELECT * FROM users where id = ?"
        sqlConnection.query(query, [userId], function (err, data) {
            if (data && data?.length) {
                res.send({
                    message: "Successfully found",
                    data: data[0]
                })
            } else {
                res.send({ message: "User not found", data: "" })
            }

        })
    } catch (error) {
        console.log(error);
    }
}

