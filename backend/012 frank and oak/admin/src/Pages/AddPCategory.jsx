import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const AddPCategory = () => {
  const nav = useNavigate();
  const [parentCategories, setParentCategories] = useState([]);
  const [imgPre, setImgPre] = useState('');

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

  const handleAddCategory = (e)=>{
    e.preventDefault();


    axios.post(`${process.env.REACT_APP_API_URL}/api/admin-panel/product-category/add-category`, e.target)
    .then((response)=>{
      console.log(response)
      if(response.status === 200 )  nav('/dashboard/products/view-category');
     
    })
    .catch(()=>{
      alert('Something went wrong');
    })
  };

  const handlePrev = (e)=>{
    const file = e.target.files[0];

    if(file){
      const reader = new FileReader(); // blob

      reader.readAsDataURL(file);
      console.log(reader);

      reader.onload = () =>{
        setImgPre(reader.result);

        console.log(reader.result);
      }
    }
  }

  return (
    <div className="w-[90%] mx-auto my-[150px] bg-white border rounded-[10px]">
      <span className="bg-[#f8f8f9] rounded-[10px_10px_0_0] border-b p-[8px_16px] text-[20px] font-bold block text-[#303640]">
        Add Category
      </span>
      <div className="w-[90%] mx-auto my-[20px]">
        <form method="post" onSubmit={handleAddCategory}>
          <div className="w-full my-[10px]">
            <label htmlFor="categoryName" className="block text-[#303640]">
              Category Name
            </label>
            <input
              type="text"
              name="name"
              id="categoryName"
              placeholder="Category Name"
              className="input border p-1 w-full rounded-[5px] my-[10px]"
            />
          </div>
          <div className="w-full my-[10px]">
            <label htmlFor="categoryImg" className="block text-[#303640]">
              Category Image
            </label>
            <input
              type="file"
              name="thumbnail"
              id="categoryImg"
              className="input border w-full rounded-[5px] my-[10px] category"
              onChange={handlePrev}
            />

            <img src={imgPre} style={{width:'250px'}} alt="" />
          </div>
          <div className="w-full my-[10px]">
            <label htmlFor="categoryImg" className="block text-[#303640]">
              Parent Category
            </label>
            <select name="parent_category" id="" className="input border w-full rounded-[5px] my-[10px] category input">
             {
              parentCategories.map((category)=>(
                <option key={category._id} value={category._id}>{category.name}</option>
              ))
             }
            </select>
          </div>
          <div className="w-full my-[10px]">
            <label htmlFor="categoryDesc" className="block text-[#303640]">
              Category Description
            </label>
            <textarea
              type="file"
              name="description"
              id="categoryDesc"
              className="input border w-full rounded-[5px] my-[10px]"
            />
          </div>
          <div className="w-full my-[10px]">
            <label
              htmlFor="categoryStatus"
              className=" text-[#303640] mr-[20px]"
            >
              Status
            </label>
            <input
              type="radio"
              name="status"
              id="categoryStatus"
              value={true}
              className="input my-[10px] mx-[10px] accent-[#5351c9] cursor-pointer"
            />
            <span>Display</span>
            <input
              type="radio"
              name="status"
              id="categoryStatus"
              value={false}
              className="input my-[10px] mx-[10px] accent-[#5351c9] cursor-pointer"
            />
            <span>Hide</span>
          </div>
          <div className="w-full my-[20px] ">
            <button type="submit" className="bg-[#5351c9] rounded-md text-white w-[100px] h-[35px]">
              Add category
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddPCategory;

