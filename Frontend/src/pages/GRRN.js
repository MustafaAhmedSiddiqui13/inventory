import React, { Fragment, useState, useEffect, useContext } from "react";
import { Dialog, Transition } from "@headlessui/react";
import CreateGRRN from "../components/CreateGRRN";
import AuthContext from "../AuthContext";

function GRRN() {
  const localStorageData = JSON.parse(localStorage.getItem("user"));
  const [showGRRNModal, setGRRNModal] = useState(false);
  const [grrn, setAllGRRNData] = useState([]);
  const [products, setAllProducts] = useState([]);
  const [stores, setAllStores] = useState([]);
  const [updatePage, setUpdatePage] = useState(true);
  let [isCompleteOpen, setIsCompleteOpen] = useState(false);
  let [isCancelOpen, setIsCancelOpen] = useState(false);
  const [grrnId, setGRRNId] = useState("");

  const authContext = useContext(AuthContext);

  useEffect(() => {
    fetchGRRNData();
    fetchProductsData();
    fetchStoresData();
  }, [updatePage]);

  // Fetching Data of All GRRN entries
  const fetchGRRNData = () => {
    fetch(`http://localhost:4000/api/grrn/get/${authContext.user}`)
      .then((response) => response.json())
      .then((data) => {
        setAllGRRNData(data);
      })
      .catch((err) => console.log(err));
  };

  // Fetching Data of All Products
  const fetchProductsData = () => {
    fetch(`http://localhost:4000/api/product/get/${authContext.user}`)
      .then((response) => response.json())
      .then((data) => {
        setAllProducts(data);
      })
      .catch((err) => console.log(err));
  };

  // Fetching Data of All Stores
  const fetchStoresData = () => {
    fetch(`http://localhost:4000/api/store/get/${authContext.user}`)
      .then((response) => response.json())
      .then((data) => {
        setAllStores(data);
      })
      .catch((err) => console.log(err));
  };

  // Handle Page Update
  const handlePageUpdate = () => {
    setUpdatePage(!updatePage);
  };

  // Modal for GRRN Add
  const addGRRNModalSetting = () => {
    setGRRNModal(!showGRRNModal);
  };

  function openCompleteModal(id) {
    setGRRNId(id);
    setIsCompleteOpen(true);
  }

  function openCancelModal(id) {
    setGRRNId(id);
    setIsCancelOpen(true);
  }

  return (
    <div className="col-span-12 lg:col-span-10  flex justify-center">
      <div className=" flex flex-col gap-5 w-11/12">
        {showGRRNModal && (
          <CreateGRRN
            addGRRNModalSetting={addGRRNModalSetting}
            products={products}
            stores={stores}
            handlePageUpdate={handlePageUpdate}
            authContext={authContext}
          />
        )}
        {/* Table  */}
        <div className="overflow-x-auto rounded-lg border bg-white border-gray-200 ">
          <div className="flex justify-between pt-5 pb-3 px-3">
            <div className="flex gap-4 justify-center items-center ">
              <span className="font-bold">GRRN</span>
            </div>
            <div className="flex gap-4">
              <button
                className="bg-blue-500 hover:bg-blue-700 text-white font-bold p-2 text-xs  rounded"
                onClick={addGRRNModalSetting}
              >
                Create GRRN
              </button>
            </div>
          </div>
          <table className="min-w-full divide-y-2 divide-gray-200 text-sm">
            <thead>
              <tr>
                <th className="whitespace-nowrap px-4 py-2 text-left font-medium text-gray-900">
                  Vendor
                </th>
                <th className="whitespace-nowrap px-4 py-2 text-left font-medium text-gray-900">
                  Name
                </th>
                <th className="whitespace-nowrap px-4 py-2 text-left font-medium text-gray-900">
                  Pack Size
                </th>
                <th className="whitespace-nowrap px-4 py-2 text-left font-medium text-gray-900">
                  Quantity
                </th>
                <th className="whitespace-nowrap px-4 py-2 text-left font-medium text-gray-900">
                  Warehouse
                </th>
                <th className="whitespace-nowrap px-4 py-2 text-left font-medium text-gray-900">
                  Date
                </th>
              </tr>
            </thead>

            <tbody className="divide-y divide-gray-200">
              {grrn.map((element, index) => {
                return (
                  <tr key={element._id}>
                    {console.log("Element: ", element)}
                    <td className="whitespace-nowrap px-4 py-2  text-gray-900">
                      {element.vendor?.name}
                    </td>
                    <td className="whitespace-nowrap px-4 py-2  text-gray-900">
                      {element.products.map((product) => {
                        return <p>{product.product.items.name}</p>;
                      })}
                    </td>
                    <td className="whitespace-nowrap px-4 py-2  text-gray-900">
                      {element.products.map((product) => {
                        return (
                          <p>
                            {product.product.packSize.packSize}
                            {product.product.items.units}
                          </p>
                        );
                      })}
                    </td>
                    <td className="whitespace-nowrap px-4 py-2 text-gray-700">
                      {element.products.map((product) => {
                        return <p>{product.stockOrdered}</p>;
                      })}
                    </td>
                    <td className="whitespace-nowrap px-4 py-2 text-gray-700">
                      {element.products.map((product) => {
                        return (
                          <p>
                            {product.product.city}, {product.product.area},
                            Warehouse {product.product.warehouseNumber}
                          </p>
                        );
                      })}
                    </td>
                    <td className="whitespace-nowrap px-4 py-2 text-gray-700">
                      {new Date(element.PurchaseDate).toLocaleDateString() ==
                      new Date().toLocaleDateString()
                        ? "Today"
                        : element.date}
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

export default GRRN;
