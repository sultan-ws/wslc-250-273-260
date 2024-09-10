const addColor = async( req, res ) =>{
    try{
        res.status(200).json({message: 'success'});
    }
    catch(error){
        console.log(error);
        res.status(500).json({message:'Internal server error'});
    }
};

module.exports = {
    addColor
}