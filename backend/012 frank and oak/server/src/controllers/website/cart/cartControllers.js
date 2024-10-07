const Cart = require("../../../models/cart/cart");

const addToCart = async (req, res)=>{
    try{
        console.log(req.body);

        const dataToSave = new Cart(req.body);

        const response = await dataToSave.save();

        res.status(200).json({message: 'success', data: response});
    }
    catch(error){
        console.log(error);
        res.status(500).json({message: 'internal server error'});
    }
};

const readCart = async(req, res)=>{
    try{
        const data = await Cart.find(req.params).populate('product');

        console.log(data);

        res.status(200).json({message: 'success', data});
    }
    catch(error){
        console.log(error);
        res.status(500).json({message: 'internal server error'});
    }
}

module.exports = {
    addToCart,
    readCart
}