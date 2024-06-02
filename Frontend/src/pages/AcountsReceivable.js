import React, { useState, useEffect, useContext } from "react";
import AddSupplier from "../components/Supplier/AddSupplier";
import AuthContext from "../AuthContext";

function AccountsReceivable() {
  const localStorageData = JSON.parse(localStorage.getItem("user"));

  const [showVendorModal, setShowVendorModal] = useState(false);
  const [vendors, setAllVendors] = useState([]);
  const [selectedVendor, setSelectedVendor] = useState("");
  const [account, setAccount] = useState([]);
  const [cities, setAllCities] = useState([]);
  const [searchTerm, setSearchTerm] = useState();
  const [updatePage, setUpdatePage] = useState(true);
  const [showTable, setShowTable] = useState(false);

  const authContext = useContext(AuthContext);

  useEffect(() => {
    // Fetching Data of All Suppliers
    const fetchVendorsData = () => {
      fetch(`http://localhost:4000/api/store/get/${authContext.user}`)
        .then((response) => response.json())
        .then((data) => {
          setAllVendors(data);
        })
        .catch((err) => console.log(err));
    };

    fetchVendorsData();
  }, [authContext.user, updatePage]);

  // Fetching Data of Search Suppliers
  const fetchSearchData = () => {
    fetch(`http://localhost:4000/api/supplier/search?searchTerm=${searchTerm}`)
      .then((response) => response.json())
      .then((data) => {
        setAllVendors(data);
      })
      .catch((err) => console.log(err));
  };

  // Modal for Supplier ADD
  const addVendorModalSetting = () => {
    setShowVendorModal(!showVendorModal);
  };

  // Get Supplier by Name
  const getSupplier = (name) => {
    const encodedName = encodeURIComponent(name);
    const url = `http://localhost:4000/api/account/receivable?encodedName=${encodedName}`;

    fetch(url)
      .then((response) => response.json())
      .then((data) => {
        setAccount(data);
        console.log(data);
      })
      .catch((err) => console.log(err));
  };

  // Handle Page Update
  const handlePageUpdate = () => {
    setUpdatePage(!updatePage);
  };

  // Handle Search Term
  const handleSearchTerm = (e) => {
    setSearchTerm(e.target.value);
    fetchSearchData();
  };

  const handleVendorChange = (event) => {
    setSelectedVendor(event.target.value);
  };

  return (
    <div className="col-span-12 lg:col-span-10  flex justify-center">
      <div className=" flex flex-col gap-5 w-11/12">
        {showVendorModal && (
          <AddSupplier
            cities={cities}
            addSupplierModalSetting={addVendorModalSetting}
            handlePageUpdate={handlePageUpdate}
          />
        )}
        <div className="overflow-x-auto rounded-lg border bg-white border-gray-200">
          <div className="flex justify-between pt-5 pb-3 px-3">
            <div className="flex gap-4 justify-center items-center ">
              <span className="font-bold">Accounts Payable</span>
            </div>
            <select
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500 w-[60rem]"
              value={selectedVendor}
              onChange={handleVendorChange}
            >
              <option>Select Vendor</option>
              {vendors.map((vendor, index) => (
                <option key={index} value={vendor.name}>
                  {vendor.name}
                </option>
              ))}
            </select>

            <div className="flex gap-4">
              <button
                className="bg-blue-500 hover:bg-blue-700 text-white font-bold p-2 text-xs  rounded"
                onClick={() => {
                  getSupplier(selectedVendor);
                  setShowTable(true);
                }}
              >
                Search
              </button>
              <button
                className="bg-blue-500 hover:bg-blue-700 text-white font-bold p-2 text-xs  rounded"
                onClick={addVendorModalSetting}
              >
                Add Entry
              </button>
              <button
                className="bg-blue-500 hover:bg-blue-700 text-white font-bold p-2 text-xs  rounded"
                // onClick={addSupplierModalSetting}
              >
                Download
              </button>
            </div>
          </div>
        </div>
        {/* Table  */}

        {showTable && (
          <>
            <div>
              <h1 className="text-xl font-bold text-gray-900">
                {account[0]?.name}
              </h1>
              <h1 className="text-xl font-bold text-gray-900">
                Total: {account[0]?.total}
              </h1>
            </div>
            <div className="overflow-x-auto rounded-lg border bg-white border-gray-200 ">
              <table className="min-w-full divide-y-2 divide-gray-200 text-sm">
                <thead>
                  <tr>
                    <th className="whitespace-nowrap px-4 py-2 text-left font-medium text-gray-900">
                      Date
                    </th>
                    <th className="whitespace-nowrap px-4 py-2 text-left font-medium text-gray-900">
                      Bill ID
                    </th>
                    <th className="whitespace-nowrap px-4 py-2 text-left font-medium text-gray-900">
                      Debit
                    </th>
                    <th className="whitespace-nowrap px-4 py-2 text-left font-medium text-gray-900">
                      Credit
                    </th>
                  </tr>
                </thead>

                <tbody className="divide-y divide-gray-200">
                  {account[0]?.transactions.length === 0 ? (
                    <tr>
                      <td
                        colSpan="4"
                        className="whitespace-nowrap px-4 py-2 text-center text-gray-900"
                      >
                        No Records Found!
                      </td>
                    </tr>
                  ) : (
                    account[0]?.transactions.map((element, index) => (
                      <tr key={index}>
                        <td className="whitespace-nowrap px-4 py-2 text-gray-900">
                          {element.date}
                        </td>
                        <td className="whitespace-nowrap px-4 py-2 text-gray-700">
                          {element._id}
                        </td>
                        <td className="whitespace-nowrap px-4 py-2 text-gray-700">
                          {element.debit}
                        </td>
                        <td className="whitespace-nowrap px-4 py-2 text-gray-700">
                          {element.credit}
                        </td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            </div>
          </>
        )}
      </div>
    </div>
  );
}

export default AccountsReceivable;
