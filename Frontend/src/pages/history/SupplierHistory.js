import React, { useState, useEffect, useContext } from "react";
import AuthContext from "D:/inventory/Frontend/src/AuthContext";
import { useNavigate } from "react-router-dom";

function SupplierHistory() {
  const [supplierHistory, setAllSupplierHistoryData] = useState([]);
  const authContext = useContext(AuthContext);
  const navigate = useNavigate();
  const [selectedOption, setSelectedOption] = useState("Supplier History");

  useEffect(() => {
    fetchSupplierHistoryData();
  }, []);

  // Fetching Data of All Supplier History items
  const fetchSupplierHistoryData = () => {
    fetch(`http://localhost:4000/api/supplierHistory/get/${authContext.user}`)
      .then((response) => response.json())
      .then((data) => {
        setAllSupplierHistoryData(data);
      })
      .catch((err) => console.log(err));
  };

  const handleSelectChange = (event) => {
    const selectedValue = event.target.value;
    setSelectedOption(selectedValue);

    // Navigate to the selected page
    if (selectedValue === "Item History") {
      navigate("/itemHistory");
    } else if (selectedValue === "Product History") {
      navigate("/productHistory");
    } else if (selectedValue === "Vendor History") {
      navigate("/storeHistory");
    } else if (selectedValue === "Order History") {
      navigate("/history");
    } else if (selectedValue === "Warehouse History") {
      navigate("/warehouseHistory");
    } else if (selectedValue === "GRN History") {
      navigate("/grnHistory");
    }
  };

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
              <option>Supplier History</option>
              <option value="Item History">Item History</option>
              <option value="Product History">Product History</option>
              <option value="Vendor History">Vendor History</option>
              <option value="Order History">Order History</option>
              <option value="Warehouse History">Warehouse History</option>
              <option value="GRN History">GRN History</option>
            </select>
          </div>
        </div>

        {/* Supplier History Table  */}
        <div className="overflow-x-auto rounded-lg border bg-white border-gray-200 ">
          <div className="flex justify-between pt-5 pb-3 px-3">
            <div className="flex gap-4 justify-center items-center ">
              <span className="font-bold">Supplier History</span>
            </div>
          </div>
          <table className="min-w-full divide-y-2 divide-gray-200 text-sm">
            <thead>
              <tr>
                <th className="whitespace-nowrap px-4 py-2 text-left font-medium text-gray-900">
                  Supplier's Name
                </th>
                <th className="whitespace-nowrap px-4 py-2 text-left font-medium text-gray-900">
                  City
                </th>
                <th className="whitespace-nowrap px-4 py-2 text-left font-medium text-gray-900">
                  Address
                </th>
                <th className="whitespace-nowrap px-4 py-2 text-left font-medium text-gray-900">
                  Request
                </th>
              </tr>
            </thead>

            <tbody className="divide-y divide-gray-200">
              {supplierHistory.map((element, index) => {
                return (
                  <tr key={element._id}>
                    <td className="whitespace-nowrap px-4 py-2  text-gray-900">
                      {element.name}
                    </td>
                    <td className="whitespace-nowrap px-4 py-2 text-gray-700">
                      {element.city}
                    </td>
                    <td className="whitespace-nowrap px-4 py-2 text-gray-700">
                      {element.address}
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

export default SupplierHistory;
