import React, { useState, useEffect, useContext } from "react";
import AddOrderDetails from "../components/AddOrderDetails";
import AuthContext from "../AuthContext";

function StockHistory() {
  const [showOrderModal, setOrderModal] = useState(false);
  const [stockHistory, setAllStockHistoryData] = useState([]);
  const [products, setAllProducts] = useState([]);
  const [updatePage, setUpdatePage] = useState(true);

  const authContext = useContext(AuthContext);

  useEffect(() => {
    fetchStockHistoryData();
    fetchProductsData();
  }, [updatePage]);

  // Fetching Data of All Order History items
  const fetchStockHistoryData = () => {
    fetch(`http://localhost:4000/api/stockHistory/get/${authContext.user}`)
      .then((response) => response.json())
      .then((data) => {
        setAllStockHistoryData(data);
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

  // Modal for Sale Add
  const addSaleModalSetting = () => {
    setOrderModal(!showOrderModal);
  };

  
  // Handle Page Update
  const handlePageUpdate = () => {
    setUpdatePage(!updatePage);
  };

  return (
    <div className="col-span-12 lg:col-span-10  flex justify-center">
      <div className=" flex flex-col gap-5 w-11/12">
        {showOrderModal && (
          <AddOrderDetails
            addSaleModalSetting={addSaleModalSetting}
            products={products}
            handlePageUpdate={handlePageUpdate}
            authContext = {authContext}
          />
        )}
        {/* Table  */}
        <div className="overflow-x-auto rounded-lg border bg-white border-gray-200 ">
          <div className="flex justify-between pt-5 pb-3 px-3">
            <div className="flex gap-4 justify-center items-center ">
              <span className="font-bold">Stock History</span>
            </div>
          </div>
          <table className="min-w-full divide-y-2 divide-gray-200 text-sm">
            <thead>
              <tr>
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
                  Total Amount in Rs
                </th>
                <th className="whitespace-nowrap px-4 py-2 text-left font-medium text-gray-900">
                  Rider's Name
                </th>
                <th className="whitespace-nowrap px-4 py-2 text-left font-medium text-gray-900">
                  More
                </th>
              </tr>
            </thead>

            <tbody className="divide-y divide-gray-200">
              {stockHistory.map((element, index) => {
                return (
                  <tr key={element._id}>
                    <td className="whitespace-nowrap px-4 py-2  text-gray-900">
                      {element.ProductID?.name}
                    </td>
                    <td className="whitespace-nowrap px-4 py-2 text-gray-700">
                      {element.stockOrdered}
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

export default StockHistory;
