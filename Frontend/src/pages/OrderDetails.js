import React, { useState, useEffect, useContext } from "react";
import AddOrderDetails from "../components/AddOrderDetails";
import AuthContext from "../AuthContext";

function OrderDetails() {
  const localStorageData = JSON.parse(localStorage.getItem("user"));
  const [showOrderModal, setOrderModal] = useState(false);
  const [order, setAllOrderData] = useState([]);
  const [products, setAllProducts] = useState([]);
  const [stores, setAllStores] = useState([]);
  const [updatePage, setUpdatePage] = useState(true);

  const authContext = useContext(AuthContext);

  useEffect(() => {
    fetchOrderData();
    fetchProductsData();
    fetchStoresData();
  }, [updatePage]);

  // Fetching Data of All Order items
  const fetchOrderData = () => {
    fetch(`http://localhost:4000/api/order/get/${authContext.user}`)
      .then((response) => response.json())
      .then((data) => {
        setAllOrderData(data);
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

  // Modal for Sale Add
  const addSaleModalSetting = () => {
    setOrderModal(!showOrderModal);
  };

  const resolveItem = (id) => {
    fetch(`http://localhost:4000/api/order/post/${id}`, {
      method: "POST",
      headers: {
        "Content-type": "application/json",
      },
    })
      .then((result) => {
        alert("Order Completed");
        handlePageUpdate();
      })
      .catch((err) => console.log(err));
  };

  const cancelOrder = (id) => {
    fetch(`http://localhost:4000/api/order/post/cancel/${id}`, {
      method: "POST",
      headers: {
        "Content-type": "application/json",
      },
    })
      .then((result) => {
        alert("Order Cancelled");
        handlePageUpdate();
      })
      .catch((err) => console.log(err));
  };

  return (
    <div className="col-span-12 lg:col-span-10  flex justify-center">
      <div className=" flex flex-col gap-5 w-11/12">
        {showOrderModal && (
          <AddOrderDetails
            addSaleModalSetting={addSaleModalSetting}
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
              <span className="font-bold">Order Details</span>
            </div>
            <div className="flex gap-4">
              <button
                className="bg-blue-500 hover:bg-blue-700 text-white font-bold p-2 text-xs  rounded"
                onClick={addSaleModalSetting}
              >
                Create Order
              </button>
            </div>
          </div>
          <table className="min-w-full divide-y-2 divide-gray-200 text-sm">
            <thead>
              <tr>
                <th className="whitespace-nowrap px-4 py-2 text-left font-medium text-gray-900">
                  Store Name
                </th>
                <th className="whitespace-nowrap px-4 py-2 text-left font-medium text-gray-900">
                  Product Name
                </th>
                <th className="whitespace-nowrap px-4 py-2 text-left font-medium text-gray-900">
                  Stock Ordered
                </th>
                <th className="whitespace-nowrap px-4 py-2 text-left font-medium text-gray-900">
                  Order Date
                </th>
                <th className="whitespace-nowrap px-4 py-2 text-left font-medium text-gray-900">
                  Total Amount (Rs)
                </th>
                <th className="whitespace-nowrap px-4 py-2 text-left font-medium text-gray-900">
                  Rider
                </th>
                <th className="whitespace-nowrap px-4 py-2 text-left font-medium text-gray-900">
                  Order Created By
                </th>
                <th className="whitespace-nowrap px-4 py-2 text-left font-medium text-gray-900">
                  More
                </th>
              </tr>
            </thead>

            <tbody className="divide-y divide-gray-200">
              {order.map((element, index) => {
                return (
                  <tr key={element._id}>
                    {console.log("Element: ", element)}
                    <td className="whitespace-nowrap px-4 py-2  text-gray-900">
                      {element.StoreID?.name}
                    </td>
                    <td className="whitespace-nowrap px-4 py-2  text-gray-900">
                      {element.products.map((product) => {
                        return <p>{product.product.name}</p>;
                      })}
                    </td>
                    <td className="whitespace-nowrap px-4 py-2 text-gray-700">
                      {element.products.map((product) => {
                        return <p>{product.stockOrdered}</p>;
                      })}
                    </td>
                    <td className="whitespace-nowrap px-4 py-2 text-gray-700">
                      {new Date(element.PurchaseDate).toLocaleDateString() ==
                      new Date().toLocaleDateString()
                        ? "Today"
                        : element.orderDate}
                    </td>
                    <td className="whitespace-nowrap px-4 py-2 text-gray-700">
                      {element.totalAmount}
                    </td>
                    <td className="whitespace-nowrap px-4 py-2 text-gray-700">
                      {element.riderName}
                    </td>
                    <td className="whitespace-nowrap px-4 py-2 text-gray-700">
                      {element.userID?.firstName} {element.userID?.lastName}
                    </td>
                    <td className="whitespace-nowrap px-4 py-2 text-gray-700">
                      <span
                        className="text-green-700 cursor-pointer"
                        onClick={() => resolveItem(element._id)}
                      >
                        Complete
                      </span>

                      <span
                        className="text-red-600 px-2 cursor-pointer"
                        onClick={() => cancelOrder(element._id)}
                      >
                        {localStorageData.firstName === "Azhar" ? "Cancel" : ""}
                      </span>
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

export default OrderDetails;
