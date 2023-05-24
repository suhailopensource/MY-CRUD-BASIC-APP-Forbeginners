import React, { useEffect, useState, useRef } from "react";
import Modal from "./components/modal";
import InfoCard from "./components/infoCard";
import "./App.css";

function MyForm() {
  const [formData, setFormData] = useState({ name: "", email: "" });
  const [modalData, setModalData] = useState({ name: "", email: "" });
  const [refresh, setRefresh] = useState(false);
  // const initialItems = [];
  const [items, setItems] = useState([]);
  const [showmodal, setShowModal] = useState(false);
  const [ID, setID] = useState("");
  const host = "http://localhost:8000";

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setFormData((prevFormData) => ({ ...prevFormData, [name]: value }));
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    fetch(`${host}/api/v1/item/new`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(formData),
    })
      .then((response) => response.json())
      .then((data) => {
        // Handle the response from the backend
        // console.log(data);
      })
      .catch((error) => {
        // Handle any errors
        console.error(error);
      });
  };

  const getItems = () => {
    fetch(`${host}/api/v1/items`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((response) => response.json())
      .then((data) => {
        setItems(data.items);
      })
      .catch((error) => {
        // Handle any errors
        console.error(error);
      });
  };
  const deleteItem = (id) => {
    fetch(`${host}/api/v1/item/${id}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((response) => response.json())
      .then((data) => {
        console.log(data.message);
      })
      .catch((error) => {
        // Handle any errors
        console.error(error);
      });
  };

  useEffect(() => {
    getItems();
  }, [deleteItem, handleSubmit]);

  return (
    <>
      {showmodal && (
        <Modal
          setShowModal={setShowModal}
          modalData={modalData}
          ID={ID}
          setModalData={setModalData}
          setItems={setItems}
          showmodal={showmodal}
        />
      )}

      <div className="flex flex-col text-center w-full mb-6">
        <h1 className="text-white sm:text-3xl mt-8 text-2xl font-medium title-font mb-4 text-gray-900">
          USER MANAGEMENT SYSTEM
        </h1>
      </div>
      <form onSubmit={handleSubmit}>
        <div className="mt-2 flex lg:w-2/3 w-full sm:flex-row flex-col mx-auto px-8 sm:space-x-4 sm:space-y-0 space-y-4 sm:px-0 items-end">
          <div className="relative flex-grow w-full">
            <label
              htmlFor="full-name"
              className="color text-white leading-7 text-sm text-gray-600"
            >
              Full Name
            </label>
            <input
              type="text"
              id="full-name"
              name="name"
              value={formData.name}
              onChange={handleInputChange}
              className="bg-transparent text-white w-full bg-gray-100 bg-opacity-50 rounded border border-gray-300 focus:border-indigo-500 focus:bg-transparent focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
            />
          </div>
          <div className="relative flex-grow w-full">
            <label
              htmlFor="email"
              className="color text-white leading-7 text-sm text-gray-600"
            >
              Email
            </label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleInputChange}
              className="bg-transparent text-white w-full bg-gray-100 bg-opacity-50 rounded border border-gray-300 focus:border-indigo-500 focus:bg-transparent focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
            />
          </div>
        </div>
        <button
          type="submit"
          className="flex color-btn mx-auto border-0 py-2 px-8 color-btn focus:outline-none rounded text-lg mt-8"
        >
          Register
        </button>
      </form>
      <div className="flex flex-wrap mt-8 lg:w-4/5 sm:mx-auto sm:mb-2 -mx-2">
        {items.map((item, id) => {
          return (
            <InfoCard
              key={id}
              item={item}
              setFormData={setFormData}
              id={item._id}
              setShowModal={setShowModal}
              setModalData={setModalData}
              setID={setID}
              deleteItem={deleteItem}
            />
          );
        })}
      </div>
    </>
  );
}

export default MyForm;
