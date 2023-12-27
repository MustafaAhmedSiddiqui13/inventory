import React, { Fragment, useState, useEffect, useContext } from "react";
import { Dialog, Transition } from "@headlessui/react";
import AddProduct from "../components/AddProduct";
import UpdateProduct from "../components/UpdateProduct";
import AuthContext from "../AuthContext";
import LineBreak from "../components/LineBreak";

function GRN() {
  const localStorageData = JSON.parse(localStorage.getItem("user"));

  const [showProductModal, setShowProductModal] = useState(false);

  const [grn, setAllGRNs] = useState([]);
  const [items, setAllItems] = useState([]);
  const [warehouses, setAllWarehouses] = useState([]);
  const [cities, setAllCities] = useState([]);
  const [searchTerm, setSearchTerm] = useState();
  const [updatePage, setUpdatePage] = useState(true);
  const [stores, setAllStores] = useState([]);
  const [suppliers, setAllSuppliers] = useState([]);

  const authContext = useContext(AuthContext);
  console.log("====================================");
  console.log(authContext);
  console.log("====================================");

  useEffect(() => {
    fetchProductsData();
    fetchStoresData();
    fetchItemsData();
    fetchWarehouseData();
    fetchCityData();
    fetchSuppliersData();
  }, [updatePage]);

  // Fetching Data of All GRNs
  const fetchProductsData = () => {
    fetch(`http://localhost:4000/api/grn/get/${authContext.user}`)
      .then((response) => response.json())
      .then((data) => {
        setAllGRNs(data);
      })
      .catch((err) => console.log(err));
  };

  // Fetching Data of All Items
  const fetchItemsData = () => {
    fetch(`http://localhost:4000/api/item/get/${authContext.user}`)
      .then((response) => response.json())
      .then((data) => {
        setAllItems(data);
      })
      .catch((err) => console.log(err));
  };

  // Fetching Data of Search Products
  const fetchSearchData = () => {
    fetch(`http://localhost:4000/api/product/search?searchTerm=${searchTerm}`)
      .then((response) => response.json())
      .then((data) => {
        setAllGRNs(data);
      })
      .catch((err) => console.log(err));
  };

  // Fetching all stores data
  const fetchStoresData = () => {
    fetch(`http://localhost:4000/api/store/get/${authContext.user}`)
      .then((response) => response.json())
      .then((data) => {
        setAllStores(data);
      });
  };

  const fetchWarehouseData = () => {
    fetch(`http://localhost:4000/api/warehouse/get/${authContext.user}`)
      .then((response) => response.json())
      .then((data) => {
        setAllWarehouses(data);
      });
  };

  const fetchCityData = () => {
    fetch(`http://localhost:4000/api/warehouse/get/city/${authContext.user}`)
      .then((response) => response.json())
      .then((data) => {
        setAllCities(data);
      })
      .catch((err) => console.log(err));
  };

  // Fetching Data of All Suppliers
  const fetchSuppliersData = () => {
    fetch(`http://localhost:4000/api/supplier/get/${authContext.user}`)
      .then((response) => response.json())
      .then((data) => {
        setAllSuppliers(data);
      })
      .catch((err) => console.log(err));
  };

  // Modal for Product ADD
  const addProductModalSetting = () => {
    setShowProductModal(!showProductModal);
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

  return (
    <div className="col-span-12 lg:col-span-10  flex justify-center">
      <div className=" flex flex-col gap-5 w-11/12">
        {showProductModal && (
          <AddProduct
            suppliers={suppliers}
            cities={cities}
            warehouses={warehouses}
            products={grn}
            items={items}
            addProductModalSetting={addProductModalSetting}
            handlePageUpdate={handlePageUpdate}
          />
        )}
        <div className="overflow-x-auto rounded-lg border bg-white border-gray-200">
          <div className="flex justify-between pt-5 pb-3 px-3 items-center">
            <div className="flex gap-4 justify-center items-center">
              <span className="font-bold">GRN</span>
              <div className="flex justify-center items-center px-2 border-2 rounded-md ">
                <img
                  alt="search-icon"
                  className="w-5 h-5"
                  src={require("../assets/search-icon.png")}
                />
                <input
                  className="border-none outline-none focus:border-none text-xs"
                  type="text"
                  placeholder="Search here"
                  value={searchTerm}
                  onChange={handleSearchTerm}
                />
              </div>
            </div>
            <div className="flex gap-4">
              <button
                className="bg-blue-500 hover:bg-blue-700 text-white font-bold p-2 text-xs  rounded"
                onClick={addProductModalSetting}
              >
                Create GRN
              </button>
            </div>
          </div>
        </div>
        {/* Table  */}
        <div className="overflow-x-auto rounded-lg border bg-white border-gray-200 ">
          <table className="min-w-full divide-y-2 divide-gray-200 text-sm">
            <thead>
              <tr>
                <th className="whitespace-nowrap px-4 py-2 text-left font-medium text-gray-900">
                  Item's Name
                </th>
                <th className="whitespace-nowrap px-4 py-2 text-left font-medium text-gray-900">
                  Pack Size
                </th>
                <th className="whitespace-nowrap px-4 py-2 text-left font-medium text-gray-900">
                  Stock
                </th>
                <th className="whitespace-nowrap px-4 py-2 text-left font-medium text-gray-900">
                  Supplier
                </th>
                <th className="whitespace-nowrap px-4 py-2 text-left font-medium text-gray-900">
                  Warehouse
                </th>
                <th className="whitespace-nowrap px-4 py-2 text-left font-medium text-gray-900">
                  Purchase Date
                </th>
                <th className="whitespace-nowrap px-4 py-2 text-left font-medium text-gray-900">
                  Production Date
                </th>
                <th className="whitespace-nowrap px-4 py-2 text-left font-medium text-gray-900">
                  Expiration Date
                </th>
              </tr>
            </thead>

            <tbody className="divide-y divide-gray-200">
              {grn.map((element, index) => {
                return (
                  <tr key={element._id}>
                    <td className="whitespace-nowrap px-4 py-2  text-gray-900">
                      {element.items?.name}
                    </td>
                    <td className="whitespace-nowrap px-4 py-2  text-gray-900">
                      {element.packSize?.packSize}
                      {element.items?.units}
                    </td>
                    <td className="whitespace-nowrap px-4 py-2 text-gray-700">
                      {element.stock}
                    </td>
                    <td className="whitespace-nowrap px-4 py-2 text-gray-700">
                      <LineBreak text={element.supplier} n={1} />
                    </td>
                    <td className="whitespace-nowrap px-4 py-2 text-gray-700">
                      <>
                        <p>{element.city},</p>
                        <p>{element.area},</p>
                        <p>Warehouse {element.warehouseNumber}</p>
                      </>
                    </td>
                    <td className="whitespace-nowrap px-4 py-2 text-gray-700">
                      {element.purchaseDate}
                    </td>
                    <td className="whitespace-nowrap px-4 py-2 text-gray-700">
                      {element.production}
                    </td>
                    <td className="whitespace-nowrap px-4 py-2 text-gray-700">
                      {element.expirationDate}
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

export default GRN;
