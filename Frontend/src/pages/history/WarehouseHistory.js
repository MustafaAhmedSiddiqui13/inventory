import React, { useState, useEffect, useContext } from "react";
import AuthContext from "D:/inventory/Frontend/src/AuthContext";
import { useNavigate } from "react-router-dom";
import LineBreak from "../../components/LineBreak";

function WarehouseHistory() {
  const [warehouseHistory, setAllWarehouseHistoryData] = useState([]);
  const authContext = useContext(AuthContext);
  const navigate = useNavigate();
  const [selectedOption, setSelectedOption] = useState("Warehouse History");

  useEffect(() => {
    fetchWarehouseHistoryData();
  }, []);

  // Fetching Data of All Warehouse History items
  const fetchWarehouseHistoryData = () => {
    fetch(`http://localhost:4000/api/warehouseHistory/get/${authContext.user}`)
      .then((response) => response.json())
      .then((data) => {
        setAllWarehouseHistoryData(data);
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
    } else if (selectedValue === "Supplier History") {
      navigate("/supplierHistory");
    } else if (selectedValue === "Order History") {
      navigate("/history");
    } else if (selectedValue === "GRN History") {
      navigate("/grnHistory");
    } else if (selectedValue === "GRRN History") {
      navigate("/grrnHistory");
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
              <option>Warehouse History</option>
              <option value="Item History">Item History</option>
              <option value="Product History">Product History</option>
              <option value="Vendor History">Vendor History</option>
              <option value="Supplier History">Supplier History</option>
              <option value="Order History">Order History</option>
              <option value="GRN History">GRN History</option>
              <option value="GRRN History">GRRN History</option>
            </select>
          </div>
        </div>

        {/* Supplier History Table  */}
        <div className="overflow-x-auto rounded-lg border bg-white border-gray-200 ">
          <div className="flex justify-between pt-5 pb-3 px-3">
            <div className="flex gap-4 justify-center items-center ">
              <span className="font-bold">Warehouse History</span>
            </div>
          </div>
          <table className="min-w-full divide-y-2 divide-gray-200 text-sm">
            <thead>
              <tr>
                <th className="whitespace-nowrap px-4 py-2 text-left font-medium text-gray-900">
                  City
                </th>
                <th className="whitespace-nowrap px-4 py-2 text-left font-medium text-gray-900">
                  Area
                </th>
                <th className="flex flex-col items-center whitespace-nowrap px-4 py-2 text-left font-medium text-gray-900">
                  Warehouse Number
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
              {warehouseHistory.map((element, index) => {
                return (
                  <tr key={element._id}>
                    <td className="whitespace-nowrap px-4 py-2  text-gray-900">
                      {element.city}
                    </td>
                    <td className="whitespace-nowrap px-4 py-2 text-gray-700">
                      {element.area}
                    </td>
                    <td className="whitespace-nowrap px-4 py-2 text-gray-700">
                      {element.warehouseNumber.map((warehouseNumber) => {
                        return (
                          <div className="py-8">
                            <p className="flex flex-col justify-start items-center">
                              {warehouseNumber.warehouseNumber}
                            </p>
                          </div>
                        );
                      })}
                    </td>
                    <td className="whitespace-nowrap px-4 py-2 text-gray-700">
                      {element.warehouseNumber.map((address) => {
                        return (
                          <div className=" py-2">
                            <LineBreak text={address.address} n={5} />
                          </div>
                        );
                      })}
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

export default WarehouseHistory;
