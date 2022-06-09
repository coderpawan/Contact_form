import React, { useState } from "react";
import { FaRegEnvelope } from "react-icons/fa";
import { AiOutlineUser } from "react-icons/ai";
import { BsTelephone, BsChatLeftText } from "react-icons/bs";
import { BiBookAlt } from "react-icons/bi";
import Logo from "./logo.png";

const App = () => {
  const initialValues = {
    username: "",
    email: "",
    phone: "",
    subject: "",
    message: "",
  };
  const [formValues, setFormValues] = useState(initialValues);
  const [formErrors, setFormErrors] = useState({});
  const [isSubmit, setIsSubmit] = useState(false);
  const errors = {};

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormValues({ ...formValues, [name]: value });
    switch (name) {
      case "username":
        formErrors.username = "";
      case "email":
        formErrors.email = "";
      case "phone":
        formErrors.phone = "";
    }
  };
  const handleSubmit = async (event) => {
    event.preventDefault();
    const { username, email, phone, subject, message } = formValues;

    setFormErrors(validate(formValues));
    console.log(errors);
    if (Object.keys(errors).length === 0) {
      const res = fetch(
        "https://contactform-f4828-default-rtdb.firebaseio.com/userData.json",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            username,
            email,
            phone,
            subject,
            message,
          }),
        }
      );
      console.log(res);
      if (res) {
        setFormValues({
          username: "",
          email: "",
          phone: "",
          subject: "",
          message: "",
        });
        alert("Data has been stored");
      } else {
        alert("Data could not be stored !! Please try again");
      }
    }
  };
  // useEffect(() => {
  //   console.log(formErrors);
  //   if (Object.keys(formErrors).length === 0 && isSubmit) {
  //     console.log(formValues);
  //   }
  // }, [formErrors]);
  const validate = (values) => {
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/i;
    const phoneRegex =
      /^\s*(?:\+?(\d{1,3}))?[-. (]*(\d{3})[-. )]*(\d{3})[-. ]*(\d{4})(?: *x(\d+))?\s*$/i;
    if (!regex.test(values.email)) {
      errors.email = "This is not a valid Email!";
    }
    if (!phoneRegex.test(values.phone)) {
      errors.phone = "This is not a valid Phone Number!";
    }
    return errors;
  };
  return (
    <div className="flex flex-col items-center justify-center min-h-screen py-2 bg-gray-100">
      <div className="flex flex-col items-center justify-center w-full flex-1 px-20 text-center">
        <div className="bg-white rounded-2xl shadow-2xl lg:flex sm:flex-col-reverse lg:flex-row md:w-2/3 lg:max-w-4xl">
          <div className="lg:w-3/5 p-5">
            <div className="text-left font-bold">
              <img src={Logo} alt="logo" className="h-10" />
            </div>
            <div className="py-10">
              <h2 className="text-3xl font-bold text-blue-600 mb-2">
                Contact Details
              </h2>
              <div className="bg-blue-600 h-1 w-10 inline-block mb-2"></div>

              <form className="flex flex-col items-center" method="POST">
                <div className="bg-gray-100 w-64 p-2 flex items-center mb-3">
                  <AiOutlineUser className="text-gray-400 m-2" />
                  <input
                    type="text"
                    name="username"
                    placeholder="Name"
                    value={formValues.username}
                    onChange={handleChange}
                    className="bg-gray-100 outline-none text-sm flex-1"
                    required
                  />
                </div>
                <p className=" text-[12px] md:text-[16px]">
                  {formErrors.username}
                </p>
                <div className="bg-gray-100 w-64 p-2 flex items-center mb-3">
                  <FaRegEnvelope className="text-gray-400 m-2" />
                  <input
                    type="email"
                    name="email"
                    placeholder="Email"
                    value={formValues.email}
                    onChange={handleChange}
                    className="bg-gray-100 outline-none text-sm flex-1"
                    required
                  />
                </div>
                <p className="text-red-500 relative bottom-7 text-[12px] md:text-[16px]">
                  {formErrors.email}
                </p>
                <div className="bg-gray-100 w-64 p-2 flex items-center mb-3">
                  <BsTelephone className="text-gray-400 m-2" />
                  <input
                    type="text"
                    placeholder="Mobile Number"
                    required
                    name="phone"
                    onChange={handleChange}
                    value={formValues.phone}
                    className="bg-gray-100 outline-none text-sm flex-1"
                  />
                </div>
                <p className="text-red-500 relative bottom-2 text-[12px] md:text-[16px]">
                  {formErrors.phone}
                </p>
                <div className="bg-gray-100 w-64 p-2 flex items-center mb-3">
                  <BiBookAlt className="text-gray-400 m-2" />
                  <input
                    type="text"
                    name="subject"
                    onChange={handleChange}
                    value={formValues.subject}
                    placeholder="Subject"
                    className="bg-gray-100 outline-none text-sm flex-1"
                    required
                  />
                </div>
                <div className="bg-gray-100 w-64 p-2 flex items-center mb-3">
                  <BsChatLeftText className="text-gray-400 m-2 relative bottom-7" />
                  <textarea
                    placeholder="Type your message here"
                    rows="4"
                    name="message"
                    onChange={handleChange}
                    value={formValues.message}
                    required
                    className="bg-gray-100 outline-none text-sm flex-1"
                  />
                </div>

                <button
                  onClick={handleSubmit}
                  className="border-2 cursor-pointer mt-10 border-blue-600 text-blue-600 rounded-full px-12 py-2 inline-block font-semibold hover:bg-blue-600 hover:text-white"
                >
                  Submit
                </button>
              </form>
            </div>
          </div>
          <div className="lg:w-2/5 bg-blue-600 text-white rounded-tr-2xl rounded-br-2xl py-36 px-12">
            <h2 className="text-3xl  font-bold mb-2">Hello, Friend!</h2>
            <div className="bg-white h-1 w-10 inline-block mb-2"></div>
            <p className="mb-10">
              This is my Task 1 that has been assigned to me for the selection
              in <br /> E-cell Tech team!!
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default App;
