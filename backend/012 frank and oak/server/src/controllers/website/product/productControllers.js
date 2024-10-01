const Product = require("../../../models/product/product");

const webReadProducts = async (req, res) => {
    try {
        const response = await Product.find({status:true})
            .populate('parent_category')
            .populate('product_category')
            .populate( {path: 'color_ids'})
            .populate({path: 'size_ids'});

        const filepath = `${req.protocol}://${req.get('host')}/frankandoak-files/product/`
        res.status(200).json({ message: 'success', data: response, filepath });
    }
    catch (error) {
        console.log(error);
    }
};

module.exports = {webReadProducts};