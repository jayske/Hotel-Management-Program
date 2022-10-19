const sqlConnection = require('../db/config')

exports.getRooms=async(req,res)=>{
    try {
        const query = "SELECT * FROM rooms"
        sqlConnection.query(query,function (err, data) {
            if (data.length) {
                res.send({message:"Rooms found successfully", data:data})
            }else{
                res.send({message:"Rooms are not available", data:""})
            }
        })

    } catch (error) {
        console.log(error);
    }
}

exports.bookRoom = async (req, res) => {
    try {
        const {room, status, firstname, lastname, phone, email, check_in_date, check_out_date} = req.body
        console.log(req.body);
        const query = 'UPDATE rooms SET status=?, firstname=?, lastname=?, phone=?, email=?, Check_in_Date=?, Check_out_Date=? WHERE roomNo = ?'
        const bodyArray = [status, firstname, lastname, phone, email, check_in_date, check_out_date, room]
        sqlConnection.query(query, bodyArray, function (err, data) {
            if (data.affectedRows>0) {
                res.send({
                    message: "Your room booked successfully",
                    data: req.body
                })
            } else {
                res.send({ message: "Someting went wrong", data: "" })
            }
        })

    } catch (error) {
        console.log(error);
    }
}

exports.findRoomById = async (req, res) => {
    try {
        const roomId = req.query.id
        const query = "SELECT * FROM rooms where roomNo = ?"
        sqlConnection.query(query, [roomId], function (err, data) {
            if (data.length) {
                res.send({
                    message: "Successfully found",
                    data: data[0]
                })
            } else {
                res.send({ message: "room not found", data: "" })
            }

        })
    } catch (error) {
        console.log(error);
    }
}

