const Product = require('./../../../models/product/product');

const insertProduct = async (req, res) => {
    try {
        const data = req.body;

        data.color_ids = JSON.parse(data.colors);
        data.size_ids = JSON.parse(data.sizes);

        if (req.files) {
            if (req.files.thumbnail) data.thumbnail = req.files.thumbnail[0].filename;

            if (req.files.hover_thumbnail) data.hover_thumbnail = req.files.hover_thumbnail[0].filename

            if (req.files.gallery) data.gallery = req.files.gallery.map(file => file.filename);

        }

        console.log(data);

        const dataToSave = new Product(data);

        const response = await dataToSave.save();

        res.status(200).json({ message: 'success', data: response });
    }
    catch (error) {
        console.log(error);
        res.status(500).json({ message: 'internal server error' });
    }
};

const readProducts = async (req, res) => {
    try {
        const response = await Product.find()
            .populate('parent_category')
            .populate('product_category')
            .populate( 'color_ids')
            .populate('size_ids');


        res.status(200).json({ message: 'success', data: response });
    }
    catch (error) {
        console.log(error);
    }
}

module.exports = {
    insertProduct,
    readProducts
}