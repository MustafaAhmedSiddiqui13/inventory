import React, { useState, useEffect, useContext } from "react";
import AuthContext from "../../AuthContext";
import { useNavigate } from "react-router-dom";

function StoreHistory() {
  const [storeHistory, setAllStoreHistoryData] = useState([]);
  const authContext = useContext(AuthContext);
  const navigate = useNavigate();
  const [selectedOption, setSelectedOption] = useState("Customer History");
  const [selectedVendor, setSelectedVendor] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("");
  const [selectedAddress, setSelectedAddress] = useState("");
  const [selectedCity, setSelectedCity] = useState("");
  const [selectedRequest, setSelectedRequest] = useState("");
  const uniqueVendors = new Set();
  const uniqueCategory = new Set();
  const uniqueAddress = new Set();
  const uniqueCity = new Set();
  const uniqueRequests = new Set();

  useEffect(() => {
    // Fetching Data of All Store History items
    const fetchStoreHistoryData = () => {
      fetch(
        `${process.env.REACT_APP_URL}/api/storeHistory/get/${authContext.user}`
      )
        .then((response) => response.json())
        .then((data) => {
          setAllStoreHistoryData(data);
        })
        .catch((err) => console.log(err));
    };
    fetchStoreHistoryData();
  }, [authContext.user]);

  const handleSelectChange = (event) => {
    const selectedValue = event.target.value;
    setSelectedOption(selectedValue);

    // Navigate to the selected page
    if (selectedValue === "Item History") {
      navigate("/itemHistory");
    } else if (selectedValue === "Product History") {
      navigate("/productHistory");
    } else if (selectedValue === "Order History") {
      navigate("/history");
    } else if (selectedValue === "Supplier History") {
      navigate("/supplierHistory");
    } else if (selectedValue === "Warehouse History") {
      navigate("/warehouseHistory");
    } else if (selectedValue === "GRN History") {
      navigate("/grnHistory");
    } else if (selectedValue === "GRRN History") {
      navigate("/grrnHistory");
    }
  };

  const handleVendorChange = (event) => {
    setSelectedVendor(event.target.value);
  };

  const handleCategoryChange = (event) => {
    setSelectedCategory(event.target.value);
  };

  const handleAddressChange = (event) => {
    setSelectedAddress(event.target.value);
  };

  const handleCityChange = (event) => {
    setSelectedCity(event.target.value);
  };

  const handleRequestsChange = (event) => {
    setSelectedRequest(event.target.value);
  };

  const filteredVendorHistory = storeHistory.filter((element) => {
    const vendorMatches = element.name
      .toLowerCase()
      .includes(selectedVendor.toLowerCase());

    const categoryMatches = element.category
      .toLowerCase()
      .includes(selectedCategory.toLowerCase());

    const addressMatches = element.address
      .toLowerCase()
      .includes(selectedAddress.toLowerCase());

    const cityMatches = element.city
      .toLowerCase()
      .includes(selectedCity.toLowerCase());

    const requestMatches = element.requestType.includes(selectedRequest);

    return (
      vendorMatches &&
      categoryMatches &&
      addressMatches &&
      cityMatches &&
      requestMatches
    );
  });

  return (
    <div className="col-span-12 lg:col-span-10  flex justify-center">
      <div className=" flex flex-col gap-5 w-11/12">
        <div className="overflow-x-auto rounded-lg border bg-white border-gray-200">
          <div className="flex justify-between pt-5 pb-3 px-3 items-center">
            <div className="flex gap-4 justify-center items-center">
              <span className="font-bold">Select History</span>
            </div>
            <select
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500 w-40"
              value={selectedOption}
              onChange={handleSelectChange}
            >
              <option>Customer History</option>
              <option value="Item History">Item History</option>
              <option value="Product History">Product History</option>
              <option value="Order History">Order History</option>
              <option value="Supplier History">Supplier History</option>
              <option value="Warehouse History">Warehouse History</option>
              <option value="GRN History">GRN History</option>
              <option value="GRRN History">GRRN History</option>
            </select>
          </div>
        </div>

        {/* Store History Table  */}
        <div className="overflow-x-auto rounded-lg border bg-white border-gray-200 ">
          <div className="flex gap-4 justify-center items-center ">
            <span className="font-bold pt-2">Customer History</span>
          </div>
          <div className="flex justify-between pt-5 pb-3 px-3">
            <div>
              <select
                id="items"
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                name="items"
                value={selectedVendor}
                onChange={handleVendorChange}
              >
                <option value={""}>Select Customer</option>
                {storeHistory.map((element, index) => {
                  // Add unique item names to the Set
                  uniqueVendors.add(element.name);
                })}
                {/* Render the options for the dropdown */}
                {Array.from(uniqueVendors).map((vendor, index) => (
                  <option key={index} value={vendor}>
                    {vendor}
                  </option>
                ))}
              </select>
            </div>
            <div>
              <select
                id="items"
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                name="items"
                value={selectedCategory}
                onChange={handleCategoryChange}
              >
                <option value={""}>Select Category</option>
                {storeHistory.map((element, index) => {
                  // Add unique item names to the Set
                  uniqueCategory.add(element.category);
                })}
                {/* Render the options for the dropdown */}
                {Array.from(uniqueCategory).map((category, index) => (
                  <option key={index} value={category}>
                    {category}
                  </option>
                ))}
              </select>
            </div>
            <div>
              <select
                id="items"
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                name="items"
                value={selectedAddress}
                onChange={handleAddressChange}
              >
                <option value={""}>Select Address</option>
                {
                  // Add unique item names to the Set
                  storeHistory.map((element) => {
                    uniqueAddress.add(element.address);
                  })
                }
                {/* Render the options for the dropdown */}
                {Array.from(uniqueAddress).map((address, index) => (
                  <option key={index} value={address}>
                    {address}
                  </option>
                ))}
              </select>
            </div>
            <div>
              <select
                id="items"
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                name="items"
                value={selectedCity}
                onChange={handleCityChange}
              >
                <option value={""}>Select City</option>
                {
                  // Add unique item names to the Set
                  storeHistory.map((element) => {
                    uniqueCity.add(element.city);
                  })
                }
                {/* Render the options for the dropdown */}
                {Array.from(uniqueCity).map((city, index) => (
                  <option key={index} value={city}>
                    {city}
                  </option>
                ))}
              </select>
            </div>
            <div>
              <select
                id="items"
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                name="items"
                value={selectedRequest}
                onChange={handleRequestsChange}
              >
                <option value={""}>Select Request</option>
                {storeHistory.map((element, index) => {
                  // Add unique item names to the Set
                  uniqueRequests.add(element.requestType);

                  return null; // No need to render anything here
                })}
                {/* Render the options for the dropdown */}
                {Array.from(uniqueRequests).map((requestType, index) => (
                  <option key={index} value={requestType}>
                    {requestType}
                  </option>
                ))}
              </select>
            </div>
            <div>
              <button
                // onClick={() => generatePDF(filteredItemHistory)}
                className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
              >
                Download PDF
              </button>
            </div>
          </div>
          <table className="min-w-full divide-y-2 divide-gray-200 text-sm">
            <thead>
              <tr>
                <th className="whitespace-nowrap px-4 py-2 text-left font-medium text-gray-900">
                  Customer Name
                </th>
                <th className="whitespace-nowrap px-4 py-2 text-left font-medium text-gray-900">
                  Category
                </th>
                <th className="whitespace-nowrap px-4 py-2 text-left font-medium text-gray-900">
                  Address
                </th>
                <th className="whitespace-nowrap px-4 py-2 text-left font-medium text-gray-900">
                  City
                </th>
                <th className="whitespace-nowrap px-4 py-2 text-left font-medium text-gray-900">
                  Request By
                </th>
                <th className="whitespace-nowrap px-4 py-2 text-left font-medium text-gray-900">
                  Request
                </th>
              </tr>
            </thead>

            <tbody className="divide-y divide-gray-200">
              {filteredVendorHistory.map((element, index) => {
                return (
                  <tr key={element._id}>
                    <td className="whitespace-nowrap px-4 py-2  text-gray-900">
                      {element.name}
                    </td>
                    <td className="whitespace-nowrap px-4 py-2 text-gray-700">
                      {element.category}
                    </td>
                    <td className="whitespace-nowrap px-4 py-2 text-gray-700">
                      {element.address}
                    </td>
                    <td className="whitespace-nowrap px-4 py-2 text-gray-700">
                      {element.city}
                    </td>
                    <td className="whitespace-nowrap px-4 py-2 text-gray-700">
                      {element.userID?.firstName} {element.userID?.lastName}
                    </td>
                    <td className="whitespace-nowrap px-4 py-2 text-gray-700">
                      {element.requestType}
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
        <div></div>
      </div>
    </div>
  );
}

export default StoreHistory;
