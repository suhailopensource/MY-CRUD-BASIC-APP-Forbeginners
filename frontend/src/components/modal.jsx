import React from "react";
import { useEffect } from "react";
import "../App.css";

const modal = ({ setShowModal, modalData, ID, setModalData, setItems }) => {
  const host = "http://localhost:8000";
  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setModalData((prevFormData) => ({ ...prevFormData, [name]: value }));
  };
  const updateGivenItem = (modalData) => {
    fetch(`${host}/api/v1/item/${ID}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(modalData),
    })
      .then((response) => response.json())
      .then((data) => {
        // Handle the response from the backend
      })
      .catch((error) => {
        // Handle any errors
        console.error(error);
      });
  };
  const getItems = () => {
    try {
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
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getItems();
  }, [updateGivenItem]);

  return (
    <>
      <div
        id="defaultModal"
        tabIndex="-1"
        aria-hidden="true"
        className={`fixed top-0 left-0 right-0 z-50 w-full p-4 overflow-x-hidden overflow-y-auto md:inset-0 h-[calc(100%-1rem)] max-h-full`}
      >
        <div className=" relative w-full max-w-2xl max-h-full">
          <div className="relative lol rounded-lg shadow dark:bg-gray-700">
            <div className="flex items-start justify-between p-4 border-b rounded-t dark:border-gray-600">
              <h3 className="text-xl font-semibold text-gray-900 dark:text-black">
                Edit User
              </h3>
            </div>

            <div className="p-6 space-y-6">
              <input
                type="text"
                name="name"
                value={modalData.name}
                onChange={handleInputChange}
                className="text-black  bg-transparent  w-full bg-gray-100 bg-opacity-50 rounded border border-black-300 focus:border-indigo-500 focus:bg-transparent focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
              />
              <input
                type="email"
                name="email"
                value={modalData.email}
                onChange={handleInputChange}
                className="bg-transparent text-black w-full bg-gray-100 bg-opacity-50 rounded border border-gray-300 focus:border-indigo-500 focus:bg-transparent focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
              />
            </div>
            <div className="flex items-center p-6 space-x-2 border-t border-gray-200 rounded-b dark:border-gray-600">
              <button
                data-modal-hide="defaultModal"
                type="button"
                className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                onClick={() => {
                  updateGivenItem(modalData);
                  setShowModal(false);
                }}
              >
                Update
              </button>
              <button
                data-modal-hide="defaultModal"
                type="button"
                className="text-black bg-white hover:bg-gray-100 focus:ring-4 focus:outline-none focus:ring-blue-300 rounded-lg border border-gray-200 text-sm font-medium px-5 py-2.5 hover:text-gray-900 focus:z-10 dark:bg-gray-700 dark:text-gray-300 dark:border-gray-500 dark:hover:text-white dark:hover:bg-gray-600 dark:focus:ring-gray-600"
                onClick={() => {
                  setShowModal(false);
                }}
              >
                Decline
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default modal;
