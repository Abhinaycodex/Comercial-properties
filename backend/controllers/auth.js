const register =async (req, res) => {
    try {
        console.log(req.body)

        res.status(200).json({msg: req.body})
    } 
    catch (error) {
        res.status(500).json(error, "internal server error")
    }
};

module.exports={register}  