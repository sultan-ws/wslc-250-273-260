import React, { useEffect, useState } from "react";
import { RiFacebookFill } from "react-icons/ri";
import { CiInstagram } from "react-icons/ci";
import { FaYoutube } from "react-icons/fa";
import { FaXTwitter } from "react-icons/fa6";
import { FaEye } from "react-icons/fa";
import { FaEyeSlash } from "react-icons/fa";
import Cookies from "js-cookie";
import axios from "axios";
import { Form, useNavigate } from "react-router-dom";


function Profile() {

  const [show, setShow] = useState(false);

  const [admin, setAdmin] = useState({});
  const [preImage, setPreImage] = useState({});
  const [filepath, setFilepath] = useState('');
  const [emailProcess, setEmailProcess] = useState(false);
  const [otpBtnText, setOtpBtnText] = useState('Genrate OTP')


  //read admin
  useEffect(() => {
    try {
      axios
        .get(`${process.env.REACT_APP_API_URL}/api/admin-panel/admin/read-admin`)
        .then((response) => {
          console.log(response.data);
          setAdmin(response.data.data[0]);
          setFilepath(response.data.path);
        })
        .catch((error) => {
          console.log(error);
          alert('Something went wrong')
        })
    }
    catch (error) {
      console.log(error);
      alert('Something went wrong');
    }
  }, []);

  const handleImgPre = (e) => {

    const file = e.target.files[0];

    if (file) {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => {
        setPreImage((pre) => (
          { ...pre, [e.target.name]: reader.result }
        ));
      }
    }
  };

  const handleUpdateAdmin = (e) => {
    e.preventDefault();

    const form = new FormData(e.target);

    axios.put(`${process.env.REACT_APP_API_URL}/api/admin-panel/admin/update-admin/${admin._id}`, form)
      .then((response) => {
        console.log(response.data);
      })
      .catch((error) => {
        console.log(error);
        alert('Something went wrong');
      })
  }

  const handleGenrateOtp = () => {

    axios.post(`${process.env.REACT_APP_API_URL}/api/admin-panel/admin/genrate-otp`, { email: admin.email })
      .then((response) => {
        console.log(response);


        setEmailProcess(true);

        let i = 60;

        setOtpBtnText(`Regenrate OTP in ${i}s`);
        i--;

        const interval = setInterval(() => {


          setOtpBtnText(`Regenrate OTP in ${i}s`);
          if (i === 0) {
            clearInterval(interval);
            setEmailProcess(false);
            setOtpBtnText('Genrate OTP')
          }

          i--;
        }, 1000);
      })
      .catch((error) => {

      })




  }

  const handleUpdateEmail = (e)=>{
    e.preventDefault();
  
    axios.put(`${process.env.REACT_APP_API_URL}/api/admin-panel/admin/update-email`,
      {
        currentemail: admin.email,
        email: e.target.newemail.value,
        otp: e.target.userotp.value
      }
    )
    .then((response)=>{
      console.log(response.data);
    })
    .catch((error)=>{
      console.log(error);
    })
  };

  return (
    <div>
      <div className="w-[90%] mx-auto mt-[140px] mb-[20px] bg-white border rounded-[10px]">
        <span className="block text-[#303640] bg-[#f8f8f9] rounded-[10px_10px_0_0] h-[60px] p-[15px_15px] box-border font-bold text-[25px] border-b">
          Profile
        </span>
        <div className="w-full grid grid-cols-[2fr_2fr]">
          <div className="p-[10px]">
            <form method="post" onSubmit={handleUpdateAdmin}>
              <div className="w-full ">
                <span className="block m-[15px_0]">Name</span>
                <input
                  type="text"
                  value={admin.name}
                  name="name"
                  onChange={(e) => { setAdmin({ ...admin, name: e.target.value }) }}
                  className="w-full border h-[35px] rounded-[5px] p-2 input"
                />
              </div>
              <div className="w-full ">
                <span className="block m-[15px_0]">Social Link</span>
                <div className="w-full grid grid-cols-[10%_auto] mb-[10px]">
                  <span className="w-full h-full text-[20px] p-[8px]">
                    <RiFacebookFill />
                  </span>
                  <input
                    type="text"
                    value={admin.fb}
                    name="fb"
                    onChange={(e) => { setAdmin({ ...admin, fb: e.target.value }) }}
                    className="w-full border h-[35px] rounded-[5px] p-2 input"
                  />
                </div>
                <div className="w-full grid grid-cols-[10%_auto] mb-[10px]">
                  <span className="w-full h-full text-[20px] p-[8px]">
                    <CiInstagram />
                  </span>
                  <input
                    type="text"
                    value={admin.instagram}
                    name="instagram"
                    onChange={(e) => { setAdmin({ ...admin, instagram: e.target.value }) }}
                    className="w-full border h-[35px] rounded-[5px] p-2 input"
                  />
                </div>
                <div className="w-full grid grid-cols-[10%_auto] mb-[10px]">
                  <span className="w-full h-full text-[20px] p-[8px]">
                    <FaYoutube />
                  </span>
                  <input
                    type="text"
                    value={admin.youtube}
                    name="youtube"
                    onChange={(e) => { setAdmin({ ...admin, youtube: e.target.value }) }}
                    className="w-full border h-[35px] rounded-[5px] p-2 input"
                  />
                </div>
                <div className="w-full grid grid-cols-[10%_auto] mb-[10px]">
                  <span className="w-full h-full text-[20px] p-[8px]">
                    <FaXTwitter />
                  </span>
                  <input
                    type="text"
                    value={admin.twitter}
                    name="twitter"
                    onChange={(e) => { setAdmin({ ...admin, twitter: e.target.value }) }}
                    className="w-full border h-[35px] rounded-[5px] p-2 input"
                  />
                </div>
              </div>
              <div className="w-full my-[20px]">
                <span className="block m-[15px_0]">Logo</span>
                <div className="w-[50px] h-[50px] object-fill">
                  <img src={preImage.logo || filepath + admin.logo} alt="Logo" className="w-full h-full" />
                </div>
                <input
                  type="file"
                  name="logo"
                  className="input border w-full m-[10px_0] category"
                  onChange={handleImgPre}
                />
              </div>
              <div className="w-full my-[20px]">
                <span className="block m-[15px_0]">Fav Icon</span>
                <div className="w-[50px] h-[50px] object-fill">
                  <img
                    src={preImage.fav_icon || filepath + admin.fav_icon}
                    alt="Logo"
                    className="w-full h-full"
                  />
                </div>
                <input
                  type="file"
                  name="fav_icon"
                  className="input border w-full m-[10px_0] category"
                  onChange={handleImgPre}
                />
              </div>
              <div className="w-full my-[20px]">
                <span className="block m-[15px_0]">Footer Logo</span>
                <div className="w-[50px] h-[50px] object-fill">
                  <img
                    src={preImage.footer_logo || filepath + admin.footer_logo}
                    alt="Logo"
                    className="w-full h-full"
                  />
                </div>
                <input
                  type="file"
                  name="footer_logo"
                  className="input border w-full m-[10px_0] category"
                  onChange={handleImgPre}
                />
              </div>
              <div className="w-full my-[20px] relative ">
                <span className="block m-[15px_0]">Password</span>
                <input
                  type={show === false ? "password" : "text"}
                  value={admin.password}
                  name="password"
                  onChange={(e) => { setAdmin({ ...admin, password: e.target.value }) }}
                  className="w-full border h-[35px] rounded-[5px] p-2 input"
                />
                <span
                  onClick={() => setShow(!show)}
                  className="absolute right-[20px] bottom-[10px] cursor-pointer text-[#303640]"
                >
                  {show === false ? <FaEye /> : <FaEyeSlash />}
                </span>
              </div>
              <button type="submit" className="w-[150px] h-[40px] rounded-md text-white bg-[#5351c9] my-[30px]">
                Update
              </button>
            </form>
          </div>
          <div className="flex flex-col justify-center p-[10px] box-border items-center gap-[10px] h-[400px]">
            <div className="border border-slate-300 w-[200px] h-[200px] rounded-[50%] object-contain">
              <img
                src="/profile.jpg"
                alt="profile img"
                className="w-full h-full rounded-[50%]"
              />
            </div>
            <span className="block text-center">Profile Image</span>
          </div>
        </div>
      </div>
      <div className="mb-[80px] w-[90%] mx-auto border rounded-[10px]">
        <span className="block text-[#303640] bg-[#f8f8f9] rounded-[10px_10px_0_0] h-[60px] p-[15px_15px] box-border font-bold text-[25px] border-b">
          Update Email
        </span>
        <div className="w-full p-[30px]">
          <form method="post" onSubmit={handleUpdateEmail}>
            <div className="w-full mb-[10px]">
              <span className="block m-[15px_0]">Current Email</span>
              <input
                type="email"
                value={admin.email}
                onChange={(e) => { setAdmin({ ...admin, email: e.target.value }) }}
                className="w-full border h-[35px] rounded-[5px] p-2 input"
                readOnly
              />
            </div>
            <div>
              <button
                disabled={emailProcess}
                type="button"
                onClick={handleGenrateOtp}
                className={`px-[50px] block h-[40px] rounded-md text-white bg-[#5351c9]  my-[30px]`}>
                {otpBtnText}
              </button>
            </div>
            <div className="w-full mb-[10px]" style={{
              display: (emailProcess) ? '' : 'none'

            }}>
              <span className="block m-[15px_0]">OTP</span>
              <input
                type="text"
                placeholder="Enter OTP"
                name='userotp'

                className="w-full border h-[35px] rounded-[5px] p-2 input"
              />
              <input
                type="text"
                placeholder="Enter new email"
                name='newemail'

                className="w-full border h-[35px] rounded-[5px] p-2 input"
              />

              <div>
                <button

                  type="submit"

                  className={`w-[150px] block h-[40px] rounded-md text-white bg-[#5351c9]  my-[30px]`}>
                  Update Email
                </button>
              </div>
            </div>


          </form>
        </div>
      </div>
    </div>
  );
}

export default Profile;
