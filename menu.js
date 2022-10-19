const sqlConnection = require('../db/config')

exports.getMenus=async(req,res)=>{
    try {
        const query = "SELECT * FROM menu"
        sqlConnection.query(query,function (err, data) {
            if (data && data?.length) {
                res.send({message:"Menu found successfully", data:data})
            }else{
                res.send({message:"Menu are not available", data:""})
            }
        })

    } catch (error) {
        console.log(error);
    }
}

exports.createMenu = async (req, res) => {
    try {
        const { name, price, type } = req.body
        sqlConnection.query(`INSERT INTO menu (name, price, type) 
                                    VALUES ('${name}','${price}','${type}')`, function (err, data) {

            if (err) {
                res.send({ message: 'Something went wrong...', data: "" })
            }
            else {  
                res.send({
                    message: "Your menu created successfully",
                    data: data
                })
            }
        })

    } catch (error) {
        console.log(error);
    }
}


exports.deleteMenu = async(req,res)=>{
    try {
        const id = req.query.id
        var delete_query ='DELETE FROM menu WHERE id= ?'

        sqlConnection.query(delete_query,[id],function (err, data) {
            if(data.affectedRows==1){
                res.send({message:"Delete Successfully",data: data})
            }else{
                res.send({message:"Something went wrong", data:""})
            }
        })
        
    } catch (error) {
        console.log(error);
    }
}
