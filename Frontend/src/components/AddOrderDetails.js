import { Fragment, useRef, useState } from "react";
import { Dialog, Transition } from "@headlessui/react";
import { PlusIcon } from "@heroicons/react/24/outline";

export default function AddOrderDetails({
  addSaleModalSetting,
  products,
  stores,
  handlePageUpdate,
  authContext,
}) {
  const [order, setOrder] = useState({
    userID: authContext.user,
    storeID: "",
    orderDate: "",
    totalAmount: "",
    riderName: "",
  });
  const [productAdded, setProductAdded] = useState([]);
  const [productName, setProductName] = useState({});
  const [stockOrdered, setStockOrdered] = useState(0);
  const [store, setStore] = useState({});
  const [open, setOpen] = useState(true);
  const cancelButtonRef = useRef(null);

  console.log("PPu: ", order);

  // Handling Input Change for input fields
  const handleInputChange = (key, value) => {
    setOrder({ ...order, [key]: value });
  };

  // POST Data
  const addOrder = () => {
    let myOrder = {
      ...order,
      products: productAdded,
    };
    if (
      myOrder.orderDate === "" ||
      myOrder.riderName === "" ||
      myOrder.storeID === "" ||
      myOrder.totalAmount === "" ||
      myOrder.userID === "" ||
      productAdded.length === 0
    ) {
      return alert("Fields cannot be left Empty");
    }

    fetch("http://localhost:4000/api/order/add", {
      method: "POST",
      headers: {
        "Content-type": "application/json",
      },
      body: JSON.stringify(myOrder),
    })
      .then((result) => {
        alert("Order has been Created");
        handlePageUpdate();
        addSaleModalSetting();
      })
      .catch((err) => {
        alert("Failed to Create Order");
        console.log(err);
      });
  };

  const addProduct = () => {
    if (JSON.stringify(productName) === "{}" || stockOrdered < 1) {
      return alert("Fields cannot be left Empty");
    }

    setProductAdded((prev) => {
      const isProductAdded = prev.find((product) => {
        return product.product._id === productName._id;
      });

      if (isProductAdded) {
        return prev.map((product) => {
          if (product.product._id === isProductAdded.product._id) {
            return {
              ...product,
              stockOrdered: Number(product.stockOrdered) + Number(stockOrdered),
            };
          }

          return product;
        });
      }

      return prev.concat({
        product: productName,
        stockOrdered: stockOrdered,
      });
    });
  };

  console.log(productAdded);

  return (
    // Modal
    <Transition.Root show={open} as={Fragment}>
      <Dialog
        as="div"
        className="relative z-10"
        initialFocus={cancelButtonRef}
        onClose={setOpen}
      >
        <Transition.Child
          as={Fragment}
          enter="ease-out duration-300"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in duration-200"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" />
        </Transition.Child>

        <div className="fixed inset-0 z-10 overflow-y-auto">
          <div className="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0 ">
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
              enterTo="opacity-100 translate-y-0 sm:scale-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100 translate-y-0 sm:scale-100"
              leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
            >
              <Dialog.Panel className="relative transform overflow-hidden rounded-lg bg-white text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-lg overflow-y-scroll">
                <div className="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
                  <div className="sm:flex sm:items-start">
                    <div className="mx-auto flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-full bg-blue-100 sm:mx-0 sm:h-10 sm:w-10">
                      <PlusIcon
                        className="h-6 w-6 text-blue-400"
                        aria-hidden="true"
                      />
                    </div>
                    <div className="mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left ">
                      <Dialog.Title
                        as="h3"
                        className="text-lg  py-4 font-semibold leading-6 text-gray-900 "
                      >
                        Create Order
                      </Dialog.Title>
                      <form action="#">
                        <div className="grid gap-4 mb-4 sm:grid-cols-2">
                          <div>
                            <label
                              htmlFor="productID"
                              className="block mb-2 text-sm font-medium text-gray-900"
                            >
                              Name & Pack Size
                            </label>
                            <select
                              id="productID"
                              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                              name="productID"
                              value={productName?._id}
                              onChange={(e) => {
                                const product = products.find(
                                  (prd) => prd._id === e.target.value
                                );
                                setProductName(product || {});
                              }}
                            >
                              <option>Select Products</option>
                              {products.map((element, index) => {
                                if (element.stock !== 0) {
                                  return (
                                    <option
                                      key={element._id}
                                      value={element._id}
                                    >
                                      {element.items.name} {" - "}
                                      {element.packSize.packSize}
                                      {element.items.units}
                                    </option>
                                  );
                                }
                              })}
                            </select>
                          </div>
                          <div>
                            <label
                              htmlFor="stockOrdered"
                              className="block mb-2 text-sm font-medium text-gray-900"
                            >
                              Quantity{" "}
                              {productName.stock &&
                                `(Current Stock: ${productName.stock})`}
                            </label>
                            <input
                              type="number"
                              name="stockOrdered"
                              id="stockOrdered"
                              value={stockOrdered}
                              onChange={(e) => setStockOrdered(e.target.value)}
                              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                              placeholder="1 - 999"
                            />
                          </div>
                          <table className="min-w-full divide-y-2 divide-gray-200 text-sm">
                            <thead>
                              <tr>
                                <th className="whitespace-nowrap px-4 py-2 text-left font-medium text-gray-900">
                                  Name & Pack Size
                                </th>
                                <th className="whitespace-nowrap px-4 py-2 text-left font-medium text-gray-900">
                                  Quantity
                                </th>
                              </tr>
                            </thead>
                            <tbody className="divide-y divide-gray-200">
                              {productAdded.map((productAdd) => {
                                return (
                                  <tr key={productAdd.product._id}>
                                    <td className="whitespace-nowrap px-4 py-2  text-gray-900">
                                      {productAdd.product.items.name}
                                      {" - "}
                                      {productAdd.product.packSize.packSize}
                                      {productAdd.product.items.units}
                                    </td>
                                    <td className="whitespace-nowrap px-4 py-2  text-gray-900">
                                      {productAdd.stockOrdered}
                                    </td>
                                  </tr>
                                );
                              })}
                            </tbody>
                          </table>
                          <div className="mx-auto flex h-8 w-8 items-center justify-center rounded-full bg-blue-400 ">
                            <button
                              type="button"
                              className="mx-auto flex h-8 w-8 items-center justify-center rounded-full bg-blue-400 hover:bg-blue-500 "
                              onClick={addProduct}
                            >
                              <PlusIcon
                                className="h-6 w-6 text-blue-50"
                                aria-hidden="true"
                              />
                            </button>
                          </div>
                          <div>
                            <label
                              htmlFor="totalAmount"
                              className="block mb-2 text-sm font-medium text-gray-900"
                            >
                              Total Amount (Rs)
                            </label>
                            <input
                              type="number"
                              name="totalAmount"
                              id="price"
                              value={order.totalAmount}
                              onChange={(e) =>
                                handleInputChange(e.target.name, e.target.value)
                              }
                              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                              placeholder="Total Amount in Rupees"
                            />
                          </div>
                          <div className="h-fit w-fit">
                            <label
                              className="block mb-2 text-sm font-medium text-gray-900"
                              htmlFor="orderDate"
                            >
                              Order Date
                            </label>
                            <input
                              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                              type="date"
                              id="orderDate"
                              name="orderDate"
                              value={order.orderDate}
                              onChange={(e) =>
                                handleInputChange(e.target.name, e.target.value)
                              }
                            />
                          </div>
                          <div>
                            <label
                              htmlFor="riderName"
                              className="block mb-2 text-sm font-medium text-gray-900"
                            >
                              Rider's Name
                            </label>
                            <input
                              type="text"
                              name="riderName"
                              id="riderName"
                              value={order.riderName}
                              onChange={(e) =>
                                handleInputChange(e.target.name, e.target.value)
                              }
                              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                              placeholder="Rider's Name here.."
                            />
                          </div>
                          <div>
                            <label
                              htmlFor="storeID"
                              className="block mb-2 text-sm font-medium text-gray-900"
                            >
                              Vendor's Name
                            </label>
                            <select
                              id="storeID"
                              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                              name="storeID"
                              value={store?._id}
                              onChange={(e) => {
                                const store = stores.find(
                                  (s) => s._id === e.target.value
                                );
                                setStore(store || {});
                                handleInputChange(e.target.name, store);
                              }}
                            >
                              <option>Select Vendor</option>
                              {stores.map((element, index) => {
                                return (
                                  <option key={element._id} value={element._id}>
                                    {element.name}
                                  </option>
                                );
                              })}
                            </select>
                          </div>
                        </div>
                        <div className="flex items-center space-x-4"></div>
                      </form>
                    </div>
                  </div>
                </div>
                <div className="bg-gray-50 px-4 py-3 sm:flex sm:flex-row-reverse sm:px-6">
                  <button
                    type="button"
                    className="inline-flex w-full justify-center rounded-md bg-blue-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-blue-500 sm:ml-3 sm:w-auto"
                    onClick={addOrder}
                  >
                    Add
                  </button>
                  <button
                    type="button"
                    className="mt-3 inline-flex w-full justify-center rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50 sm:mt-0 sm:w-auto"
                    onClick={() => addSaleModalSetting()}
                    ref={cancelButtonRef}
                  >
                    Cancel
                  </button>
                </div>
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition.Root>
  );
}
