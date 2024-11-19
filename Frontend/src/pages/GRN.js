import React, { useState, Fragment, useEffect, useContext } from "react";
import AddProduct from "../components/GRN/AddProduct";
import UpdateGRN from "../components/GRN/UpdateGRN";
import AuthContext from "../AuthContext";
import LineBreak from "../components/LineBreak";
import { Dialog, Transition } from "@headlessui/react";

function GRN() {
  const localStorageData = JSON.parse(localStorage.getItem("user"));

  const [showProductModal, setShowProductModal] = useState(false);
  const [showUpdateModal, setShowUpdateModal] = useState(false);
  const [updateGRRN, setUpdateGRRN] = useState([]);

  const [grn, setAllGRNs] = useState([]);
  const [items, setAllItems] = useState([]);
  const [warehouses, setAllWarehouses] = useState([]);
  const [cities, setAllCities] = useState([]);
  const [searchTerm, setSearchTerm] = useState();
  const [updatePage, setUpdatePage] = useState(true);
  const [suppliers, setAllSuppliers] = useState([]);

  const [grnToBeDeleted, setGRNToBeDeleted] = useState("");
  let [isOpen, setIsOpen] = useState(false);

  const authContext = useContext(AuthContext);
  console.log("====================================");
  console.log(authContext);
  console.log("====================================");

  useEffect(() => {
    // Fetching Data of All GRNs
    const fetchProductsData = () => {
      fetch(`${process.env.REACT_APP_URL}/api/grn/get/${authContext.user}`)
        .then((response) => response.json())
        .then((data) => {
          setAllGRNs(data);
        })
        .catch((err) => console.log(err));
    };

    // Fetching Data of All Items
    const fetchItemsData = () => {
      fetch(`${process.env.REACT_APP_URL}/api/item/get/${authContext.user}`)
        .then((response) => response.json())
        .then((data) => {
          setAllItems(data);
        })
        .catch((err) => console.log(err));
    };

    const fetchWarehouseData = () => {
      fetch(
        `${process.env.REACT_APP_URL}/api/warehouse/get/${authContext.user}`
      )
        .then((response) => response.json())
        .then((data) => {
          setAllWarehouses(data);
        });
    };

    const fetchCityData = () => {
      fetch(
        `${process.env.REACT_APP_URL}/api/warehouse/get/city/${authContext.user}`
      )
        .then((response) => response.json())
        .then((data) => {
          setAllCities(data);
        })
        .catch((err) => console.log(err));
    };

    // Fetching Data of All Suppliers
    const fetchSuppliersData = () => {
      fetch(`${process.env.REACT_APP_URL}/api/supplier/get/${authContext.user}`)
        .then((response) => response.json())
        .then((data) => {
          setAllSuppliers(data);
        })
        .catch((err) => console.log(err));
    };
    fetchProductsData();
    fetchItemsData();
    fetchWarehouseData();
    fetchCityData();
    fetchSuppliersData();
  }, [authContext.user, updatePage]);

  // Fetching Data of Search Products
  const fetchSearchData = () => {
    fetch(
      `${process.env.REACT_APP_URL}/api/product/search?searchTerm=${searchTerm}`
    )
      .then((response) => response.json())
      .then((data) => {
        setAllGRNs(data);
      })
      .catch((err) => console.log(err));
  };

  // Delete item
  const deleteGRN = (id) => {
    fetch(`${process.env.REACT_APP_URL}/api/grn/delete/${id}`)
      .then((response) => response.json())
      .then((data) => {
        setUpdatePage(!updatePage);
      });
  };

  // Modal for Product ADD
  const addProductModalSetting = () => {
    setShowProductModal(!showProductModal);
  };

  const updateGRNModalSetting = (selectedGRRNData) => {
    console.log("Clicked: edit");
    setUpdateGRRN(selectedGRRNData);
    setShowUpdateModal(!showUpdateModal);
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

  function openModal(id) {
    setGRNToBeDeleted(id);
    setIsOpen(true);
  }

  function closeModal() {
    setIsOpen(false);
  }

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
        {showUpdateModal && (
          <UpdateGRN
            updateGRNData={updateGRRN}
            suppliers={suppliers}
            cities={cities}
            warehouses={warehouses}
            products={grn}
            items={items}
            handlePageUpdate={handlePageUpdate}
            updateModalSetting={updateGRNModalSetting}
          />
        )}
        <Transition appear show={isOpen} as={Fragment}>
          <Dialog as="div" className="relative z-10" onClose={closeModal}>
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0"
              enterTo="opacity-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100"
              leaveTo="opacity-0"
            >
              <div className="fixed inset-0 bg-black/25" />
            </Transition.Child>

            <div className="fixed inset-0 overflow-y-auto">
              <div className="flex min-h-full items-center justify-center p-4 text-center">
                <Transition.Child
                  as={Fragment}
                  enter="ease-out duration-300"
                  enterFrom="opacity-0 scale-95"
                  enterTo="opacity-100 scale-100"
                  leave="ease-in duration-200"
                  leaveFrom="opacity-100 scale-100"
                  leaveTo="opacity-0 scale-95"
                >
                  <Dialog.Panel className="w-full max-w-md transform overflow-hidden rounded-2xl bg-white p-6 text-left align-middle shadow-xl transition-all">
                    <Dialog.Title
                      as="h3"
                      className="text-lg font-medium leading-6 text-gray-900"
                    >
                      Delete Item
                    </Dialog.Title>
                    <div className="mt-2">
                      <p className="text-sm text-gray-500">
                        Are you sure you want to delete this product?
                      </p>
                    </div>

                    <div className="mt-4">
                      <button
                        type="button"
                        className="inline-flex justify-center rounded-md border border-transparent bg-blue-100 px-4 py-2 text-sm font-medium text-blue-900 hover:bg-blue-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2 mr-2"
                        onClick={() => {
                          closeModal();
                          deleteGRN(grnToBeDeleted);
                        }}
                      >
                        Delete
                      </button>

                      <button
                        type="button"
                        className="inline-flex justify-center rounded-md border border-transparent bg-blue-100 px-4 py-2 text-sm font-medium text-blue-900 hover:bg-blue-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2"
                        onClick={closeModal}
                      >
                        Cancel
                      </button>
                    </div>
                  </Dialog.Panel>
                </Transition.Child>
              </div>
            </div>
          </Dialog>
        </Transition>
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
                  ID
                </th>
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
                  Price (Rs)
                </th>
                <th className="whitespace-nowrap px-4 py-2 text-left font-medium text-gray-900">
                  Warehouse
                </th>
                <th className="whitespace-nowrap px-4 py-2 text-left font-medium text-gray-900">
                  Production Date
                </th>
                <th className="whitespace-nowrap px-4 py-2 text-left font-medium text-gray-900">
                  Expiration Date
                </th>
                <th className="whitespace-nowrap px-4 py-2 text-left font-medium text-gray-900">
                  Supplier
                </th>
                <th className="whitespace-nowrap px-4 py-2 text-left font-medium text-gray-900">
                  Transport Cost (Rs)
                </th>
                <th className="whitespace-nowrap px-4 py-2 text-left font-medium text-gray-900">
                  Labor Cost (Rs)
                </th>
                <th className="whitespace-nowrap px-4 py-2 text-left font-medium text-gray-900">
                  Total (Rs)
                </th>
                <th className="whitespace-nowrap px-4 py-2 text-left font-medium text-gray-900">
                  Purchase Date
                </th>
                <th className="whitespace-nowrap px-4 py-2 text-left font-medium text-gray-900">
                  More
                </th>
              </tr>
            </thead>

            <tbody className="divide-y divide-gray-200">
              {grn.map((element, index) => {
                return (
                  <tr key={element._id}>
                    <td className="whitespace-nowrap px-4 py-2 text-gray-700">
                      {element.code}
                    </td>
                    <td className="whitespace-nowrap px-4 py-2  text-gray-900">
                      {element.items.map((item) => {
                        return <p>{item.item.name}</p>;
                      })}
                    </td>
                    <td className="whitespace-nowrap px-4 py-2  text-gray-900">
                      {element.items.map((item) => {
                        return (
                          <p>
                            {item.packSize.packSize}
                            {item.packSize.units}
                          </p>
                        );
                      })}
                    </td>
                    <td className="whitespace-nowrap px-4 py-2  text-gray-900">
                      {element.items.map((item) => {
                        return <p>{item.stock}</p>;
                      })}
                    </td>
                    <td className="whitespace-nowrap px-4 py-2 text-gray-700">
                      {element.items.map((item) => {
                        return <p>{item.price}</p>;
                      })}
                    </td>
                    <td className="whitespace-nowrap px-4 py-2 text-gray-700">
                      {element.items.map((item) => {
                        return (
                          <p>
                            {item.city}, {item.area}, Warehouse{" "}
                            {item.warehouseNumber}
                          </p>
                        );
                      })}
                    </td>
                    <td className="whitespace-nowrap px-4 py-2 text-gray-700">
                      {element.items.map((item) => {
                        return <p>{item.production}</p>;
                      })}
                    </td>
                    <td className="whitespace-nowrap px-4 py-2 text-gray-700">
                      {element.items.map((item) => {
                        return <p>{item.expirationDate}</p>;
                      })}
                    </td>
                    <td className="whitespace-nowrap px-4 py-2 text-gray-700">
                      <LineBreak text={element.supplier} n={1} />
                    </td>
                    <td className="whitespace-nowrap px-4 py-2 text-gray-700">
                      {element.transportCost}
                    </td>
                    <td className="whitespace-nowrap px-4 py-2 text-gray-700">
                      {element.laborCost}
                    </td>
                    <td className="whitespace-nowrap px-4 py-2 text-gray-700">
                      {element.total}
                    </td>

                    <td className="whitespace-nowrap px-4 py-2 text-gray-700">
                      {element.purchaseDate}
                    </td>
                    <td className="whitespace-nowrap px-4 py-2 text-gray-700">
                      <span
                        className="text-red-600 px-2 cursor-pointer"
                        onClick={() => openModal(element._id)}
                      >
                        {localStorageData.firstName === "Azhar" ? "Delete" : ""}
                      </span>
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
