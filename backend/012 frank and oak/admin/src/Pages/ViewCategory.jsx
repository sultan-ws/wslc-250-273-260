import axios from "axios";
import React, { useEffect, useState } from "react";
import { CiEdit } from "react-icons/ci";
import { MdDelete } from "react-icons/md";
import { Link } from "react-router-dom";

const ViewCategory = () => {
  // let [show1, setShow1] = useState(false);
  // let [show2, setShow2] = useState(false);
  // let [show3, setShow3] = useState(false);
  // let [show4, setShow4] = useState(false);

  const [categories, setCategories] = useState([]);
  const [checkedCategoris, setCheckedCategories] = useState([]);
  const [ifAllChecked, setIfAllChecked] = useState(false);

  const handleCheckCategory = (e) => {

    if (e.target.checked) {
      setCheckedCategories([...checkedCategoris, e.target.value])
    } else {
      setCheckedCategories(checkedCategoris.filter(item => item !== e.target.value))
    }

  };

  const handleAllCheck = (e) => {
    if (e.target.checked) {
      setCheckedCategories(categories.map((category) => category._id));
    }
    else {
      setCheckedCategories([]);
    }
  };

  const handleMultiDelete = () => {
    console.log(checkedCategoris);
  };

  useEffect(()=>{
    setIfAllChecked(categories.length === checkedCategoris.length && categories.length !== 0)
  },[checkedCategoris, categories]);

  const readCategories = async () => {
    try {
      const response = await axios.get(`${process.env.REACT_APP_API_URL}/api/admin-panel/parent-category/read-categories`);

      if (response.status !== 200) return alert('Something went wrong');

      console.log(response.data);

      setCategories(response.data.data);
    }
    catch (error) {
      console.log(error);
      alert('Something went wrong');
    }
  };

  useEffect(() => { readCategories() }, []);

  const handleDeletecategory = async (_id) => {
    if (!window.confirm('Are you sure to delete')) return

    try {
      const response = await axios.delete(`${process.env.REACT_APP_API_URL}/api/admin-panel/parent-category/delete-category/${_id}`);

      if (response.status !== 200) return alert('Something went wrong');

      alert('data deleted successfully');

      setCategories((preCategories) => (
        preCategories.filter((category) => category._id !== _id)
      ));
    }
    catch (error) {
      console.log(error);
      alert('Something went wrong');
    }

    console.log(_id);
  };

  const handleUpdateStatus = async (e) => {

    const newStatus = e.target.textContent !== 'Active';

    try {
      const response = await axios
        .put(`${process.env.REACT_APP_API_URL}/api/admin-panel/parent-category/update-status/${e.target.value}`, { newStatus });

      if (response.status !== 200) return alert('Something went wrong');

      alert('Status updated successfully');

      setCategories((preCategories) => (
        preCategories.map((category) => {
          if (category._id === e.target.value) return { ...category, status: newStatus }
          return category;
        })
      ))

    }
    catch (error) {
      console.log(error);
      alert('Something went wrong');
    }
  }


  return (
    <div className="w-[90%] mx-auto my-[150px] bg-white rounded-[10px] border">
      <span className="block h-[40px] bg-[#f8f8f9] text-[20px] text-[#303640] p-[8px_16px] border-b rounded-[10px_10px_0_0]">
        View Category
      </span>
      <div className="w-[90%] mx-auto my-[20px]">
        <table className="w-full">
          <thead>
            <tr className="text-left border-b">
              <th>
                <button
                  className="bg-red-400 rounded-sm px-2 py-1"
                  onClick={handleMultiDelete}
                >Delete</button>
                <input
                  type="checkbox"
                  name="deleteAll"
                  id="deleteAllCat"
                  onClick={handleAllCheck}
                  className="accent-[#5351c9]"
                  checked={ifAllChecked}
                />
              </th>
              <th>Sno</th>
              <th>Category Name</th>
              <th>Description</th>
              <th>Action</th>
              <th>Status</th>
            </tr>
          </thead>
          <tbody>
            {
              categories.map((category, index) => (
                <tr className="border-b" key={index}>
                  <td>
                    <input
                      type="checkbox"
                      name="delete"
                      id="delete1"
                      value={category._id}
                      onClick={handleCheckCategory}
                      className="accent-[#5351c9] cursor-pointer"
                      checked={checkedCategoris.includes(category._id)}
                    />
                  </td>
                  <td>{index + 1}</td>
                  <td>{category.name}</td>
                  <td className="w-[200px] flex-wrap p-1">
                    {category.description}
                    {/* <span
                    onClick={() => setShow1(!show1)}
                    className={
                      show1 === true ? "hidden" : "font-bold cursor-pointer"
                    }
                  >
                    ...Read
                  </span>
                  {show1 === false ? (
                    " "
                  ) : (
                    <span>
                      Deserunt nam est delectus itaque sint harum architecto.
                    </span>
                  )} */}
                  </td>
                  <td>
                    <MdDelete className="my-[5px] text-red-500 cursor-pointer inline" onClick={() => { handleDeletecategory(category._id) }} />{" "}
                    |{" "}
                    <Link to={`/dashboard/category/update-category/${'parentCategory._id'}`}>
                      <CiEdit className="my-[5px] text-yellow-500 cursor-pointer inline" />
                    </Link>
                  </td>
                  <td>
                    <button
                      value={category._id}
                      className={`p-[4px_10px] rounded-sm ${(category.status) ? 'bg-green-400' : 'bg-red-500'} text-white`}
                      onClick={handleUpdateStatus}
                    >
                      {
                        (category.status) ? 'Active' : 'Inactive'
                      }
                    </button>
                  </td>
                </tr>
              ))
            }




          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ViewCategory;
