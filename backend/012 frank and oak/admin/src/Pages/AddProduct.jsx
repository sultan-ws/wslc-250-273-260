import axios from "axios";
import React, { useEffect, useState } from "react";

const AddProduct = () => {

  const [parentCategories, setParentCategories] = useState([]);
  const [parentCategory, setParentCategory] = useState('');
  const [productCategory, setProductCategory] = useState([]);
  const [colors, setColors] = useState([]);
  const [sizes, setSizes] = useState([]);

  const [checkedSizes, setCheckedSizes] = useState([]);
  const [checkedColors, setCheckedColors] = useState([]);

  const handleCheckSize = (e)=>{
    if(e.target.checked){
      setCheckedSizes((pre)=> (
        [...pre, e.target.value]
      ));
    }
    else
    {
      setCheckedSizes((pre)=> (
        pre.filter(item => item !== e.target.value)
      ));
    }
  };

  const handleCheckColor = (e)=>{
    if(e.target.checked){
      setCheckedColors((pre)=> (
        [...pre, e.target.value]
      ));
    }
    else
    {
      setCheckedColors((pre)=> (
        pre.filter(item => item !== e.target.value)
      ));
    }
  };
  
  useEffect(()=>{
    axios.get(`${process.env.REACT_APP_API_URL}/api/admin-panel/parent-category/active-categories`)
    .then((response)=>{
     

      if(response.status === 200) {
        console.log(response.data.data)
        setParentCategories(response.data.data);
        
      }
    })
    .catch(()=>{
      alert('Something went wrong');
    })
  },[]);

  useEffect(()=>{
    if(!parentCategory) return;

    axios.get(`${process.env.REACT_APP_API_URL}/api/admin-panel/product-category/read-category-by-parent-category/${parentCategory}`)
    .then((response)=>{
     

      if(response.status === 200) {
        console.log(response.data.data)
        setProductCategory(response.data.data);
        
      }
    })
    .catch(()=>{
      alert('Something went wrong');
    })

  },[parentCategory]);

  useEffect(()=>{
    axios.get(`${process.env.REACT_APP_API_URL}/api/admin-panel/color/active-colors`)
    .then((response)=>{
      console.log("colors:",response.data.data);
      setColors(response.data.data);
    })
    .catch((error)=>{
      console.log(error);
    });
  },[]);

  useEffect(()=>{
    axios.get(`${process.env.REACT_APP_API_URL}/api/admin-panel/size/active-sizes`)
    .then((response)=>{
      if(response.status === 200) {
        console.log('sizes:',response.data.data)
        setSizes(response.data.data);        
      }
    })
    .catch((errro)=>{
      alert('something went wrong');
    })
  },[]);

  const handleInsertProduct = (e)=>{
    e.preventDefault();

    console.log(checkedSizes, checkedColors);
    // return;

    if(e.target.parent_category.value === 'false') return alert('Please select parent category');

    const data = new FormData(e.target);
    data.append('colors', JSON.stringify(checkedColors));
    data.append('sizes', JSON.stringify(checkedSizes));


    axios.post(`${process.env.REACT_APP_API_URL}/api/admin-panel/product/insert-product`, data)
    .then((response)=>{
      console.log(response);
    })
    .catch((error)=>{
      console.log(error);
    })

  };

  return (
    <div className="w-[90%] mx-auto my-[150px] bg-white rounded-[10px] border">
      <span className="block border-b bg-[#f8f8f9] text-[#303640] text-[20px] font-bold p-[8px_16px] h-[40px] rounded-[10px_10px_0_0]">
        Product Details
      </span>
      <div className="w-[90%] mx-auto my-[20px]">
        <form method="post" onSubmit={handleInsertProduct}>
          <div className="w-full my-[10px]">
            <label htmlFor="product_name" className="block text-[#303640]">
              Product Name
            </label>
            <input
              type="text"
              id="product_name"
              name="name"
              placeholder="Name"
              className="w-full input border p-2 rounded-[5px] my-[10px]"
            />
          </div>
          <div className="w-full my-[10px]">
            <label htmlFor="product_desc" className="block text-[#303640]">
              Product Description
            </label>
            <textarea
              id="product_desc"
              name="description"
              placeholder="Description"
              rows={3}
              cols={10}
              className="w-full input border p-2 rounded-[5px] my-[10px]"
            />
          </div>
          <div className="w-full my-[10px]">
            <label
              htmlFor="product_short_desc"
              className="block text-[#303640]"
            >
              Short Description
            </label>
            <textarea
              id="product_short_desc"
              name="short_description"
              placeholder="Short Description"
              rows={2}
              cols={10}
              className="w-full input border p-2 rounded-[5px] my-[10px]"
            />
          </div>
          <div className="w-full my-[10px]">
            <label htmlFor="product_img" className="block text-[#303640]">
              Product Image
            </label>
            <input
              type="file"
              id="product_img"
              name="thumbnail"
              className="w-full input border rounded-[5px] my-[10px] category"
            />
          </div>
          <div className="w-full my-[10px]">
            <label htmlFor="image_animation" className="block text-[#303640]">
              Image Animation
            </label>
            <input
              type="file"
              id="image_animation"
              name="hover_thumbnail"
              className="w-full input border rounded-[5px] my-[10px] category"
            />
          </div>
          <div className="w-full my-[10px]">
            <label htmlFor="product_gallery" className="block text-[#303640]">
              Product Gallery
            </label>
            <input
              type="file"
              id="product_gallery"
              name="gallery"
              className="w-full input border rounded-[5px] my-[10px] category"
              multiple
            />
          </div>
          <div className="w-full my-[10px] grid grid-cols-[2fr_2fr] gap-[20px]">
            <div>
              <label htmlFor="product_price" className="block text-[#303640]">
                Price
              </label>
              <input
                type="text"
                id="product_price"
                name="price"
                placeholder="Product Price"
                className="w-full input border rounded-[5px] my-[10px] p-2"
              />
            </div>
            <div>
              <label htmlFor="product_mrp" className="block text-[#303640]">
                MRP
              </label>
              <input
                type="text"
                id="product_mrp"
                name="actual_price"
                placeholder="Product MRP"
                className="w-full input border rounded-[5px] my-[10px] p-2"
              />
            </div>
          </div>
          <div className="w-full my-[10px]">
            <label htmlFor="parent_category" className="block text-[#303640]">
              Select Parent Category
            </label>
            <select
              id="parent_category"
              name="parent_category"
              className="w-full input border p-2 rounded-[5px] my-[10px] cursor-pointer"
              onChange={(e)=>(setParentCategory(e.target.value))}
            >
              <option value={false}>--- Please select parent category ---</option>
               {
              parentCategories.map((category)=>(
                <option key={category._id} value={category._id}>{category.name}</option>
              ))
             }
            </select>
          </div>
          <div className="w-full my-[10px]">
            <label htmlFor="product_category" className="block text-[#303640]">
              Select Product Category
            </label>
            <select
              id="product_category"
              name="product_category"
              className="w-full input border p-2 rounded-[5px] my-[10px] cursor-pointer"
            >
              {
              productCategory.map((category)=>(
                <option key={category._id} value={category._id}>{category.name}</option>
              ))
             }
            </select>
          </div>
          <div className="w-full grid grid-cols-[2fr_2fr] gap-[20px]">
            <div>
              <label htmlFor="stock" className="block text-[#303640]">
                Manage Stock
              </label>
              <select
                name="stock"
                id="stock"
                className="p-2 input w-full border rounded-[5px] my-[10px]"
              >
                <option value="default" selected disabled hidden>
                  --Select Stock--
                </option>
                <option value={true}>In Stock</option>
                <option value={false}>Out of Stock</option>
              </select>
            </div>
            <div>
              <label htmlFor="brand" className="block text-[#303640]">
                Brand Name
              </label>
              <input
                type="text"
                name="brand"
                id="brand"
                placeholder="Brand"
                className="p-2 input w-full border rounded-[5px] my-[10px]"
              />
            </div>
          </div>
          <div className="w-full grid grid-cols-[2fr_2fr] gap-[20px]">
            <div>
              <label htmlFor="size" className="block text-[#303640]">
                Color
              </label>
              <ul>
              {
                colors.map((color, index)=>(
                  <li key={index}>
                    <input type="checkbox" value={color._id} onClick={handleCheckColor}/>
                    <span className="mx-10 ">{color.name}</span>
                    <span className={`px-6 border`} style={{
                      backgroundColor: color.code
                    }}></span>
                  </li>
                ))
              }
              </ul>
            </div>
            <div>
              <label htmlFor="color" className="block text-[#303640]">
                Size
              </label>
              <ul>
              {
                sizes.map((size, index)=>(
                  <li key={index}>
                    <input type="checkbox" value={size._id} onClick={handleCheckSize} />
                    <span className="mx-10 ">{size.name}</span>
                  </li>
                ))
              }
              </ul>
            </div>
          </div>
          <div className="w-full my-[10px] ">
            <label htmlFor="status" className="text-[#252b36f2] mr-[30px]">
              Status
            </label>
            <input
              type="radio"
              name="status"
              id="status"
              value={true}
              className="my-[10px] mx-[20px] accent-[#5351c9]"
            />
            <span>Display</span>
            <input
              type="radio"
              name="status"
              id="status"
              value={false}
              className="my-[10px] mx-[20px] accent-[#5351c9]"
              checked
            />
            <span>Hide</span>
          </div>
          <div className="w-full p-[8px_16px] my-[30px] ">
            <button className="bg-[#5351c9] rounded-md text-white w-[100px] h-[35px]">
              Add Product
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddProduct;
