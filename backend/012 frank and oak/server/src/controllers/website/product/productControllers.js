const Product = require("../../../models/product/product");

const webReadProducts = async (req, res) => {
    try {
        const response = await Product.find()
            .populate('parent_category')
            .populate('product_category')
            .populate('sizes')
            .populate('colors');

        console.log(response);

        const filepath = `${req.protocol}://${req.get('host')}/frankandoak-files/product/`
        res.status(200).json({ message: 'success', data: response, filepath });
    }
    catch (error) {
        console.log(error);
    }
};

module.exports = {webReadProducts};