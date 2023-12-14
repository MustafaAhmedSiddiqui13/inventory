import { Fragment, useContext, useRef, useState } from "react";
import { Dialog, Transition } from "@headlessui/react";
import { PlusIcon } from "@heroicons/react/24/outline";
import AuthContext from "../AuthContext";

export default function AddProduct({
  suppliers,
  cities,
  warehouses,
  products,
  items,
  addProductModalSetting,
  handlePageUpdate,
}) {
  console.log("warehouses: ", warehouses);

  const authContext = useContext(AuthContext);
  const [item, setItem] = useState({});
  const [currentProduct, setCurrentProduct] = useState({});
  const [packSize, setPackSize] = useState({});
  const [supplier, setSupplier] = useState({});
  const [warehouse, setWarehouse] = useState({});

  const [city, setCity] = useState({});
  const [sameCityWarehouses, setSameCityWarehouses] = useState({});

  const [product, setProduct] = useState({
    userId: authContext.user,
    items: "",
    packSize: "",
    stock: "",
    supplier: "",
    production: "",
    expirationDate: "",
    city: "",
    area: "",
    warehouseNumber: "",
  });
  console.log("----", product);
  const [open, setOpen] = useState(true);
  const cancelButtonRef = useRef(null);

  const handleInputChange = (key, value) => {
    setProduct({ ...product, [key]: value });
  };

  const addProduct = () => {
    if (
      product.expirationDate === "" ||
      product.production === "" ||
      product.stock === "" ||
      product.supplier === "" ||
      product.items === "" ||
      product.packSize === "" ||
      product.city === "" ||
      product.area === "" ||
      product.warehouseNumber === ""
    ) {
      return alert("Fields cannot be left Empty");
    }
    fetch("http://localhost:4000/api/product/add", {
      method: "POST",
      headers: {
        "Content-type": "application/json",
      },
      body: JSON.stringify(product),
    })
      .then((result) => {
        alert("Product Added");
        handlePageUpdate();
        addProductModalSetting();
      })
      .catch((err) => console.log(err));
  };

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
          <div className="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0">
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0 scale-95"
              enterTo="opacity-100 scale-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100 scale-100"
              leaveTo="opacity-0 scale-95"
            >
              <Dialog.Panel className="relative transform overflow-hidden rounded-lg bg-white text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-lg">
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
                        className="text-lg font-semibold leading-6 text-gray-900 "
                      >
                        Add Product
                      </Dialog.Title>
                      <form action="#">
                        <div className="grid gap-4 mb-4 sm:grid-cols-2">
                          <div>
                            <label
                              htmlFor="storeID"
                              className="block mb-2 text-sm font-medium text-gray-900"
                            >
                              Item
                            </label>
                            <select
                              id="items"
                              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                              name="items"
                              value={item?._id}
                              onChange={(e) => {
                                const item = items.find(
                                  (i) => i._id === e.target.value
                                );
                                const currentProd = products.find(
                                  (product) => product.items._id === item._id
                                );
                                setCurrentProduct(currentProd || {});
                                setItem(item || {});
                                handleInputChange(e.target.name, item);
                              }}
                            >
                              <option>Select Item</option>
                              {items.map((element, index) => {
                                return (
                                  <option key={element._id} value={element._id}>
                                    {element.name}
                                  </option>
                                );
                              })}
                            </select>
                          </div>
                          <div>
                            <label
                              htmlFor="storeID"
                              className="block mb-2 text-sm font-medium text-gray-900"
                            >
                              Pack Size
                            </label>
                            <select
                              id="packSize"
                              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                              name="packSize"
                              value={packSize?.id}
                              onChange={(e) => {
                                const packSizeSelected = item.packSize?.find(
                                  (i) => i.id === e.target.value
                                );

                                setPackSize(packSizeSelected || {});
                                handleInputChange(
                                  e.target.name,
                                  packSizeSelected
                                );
                              }}
                            >
                              <option>Select Pack Size</option>
                              {item.packSize?.map((element, index) => {
                                {
                                  /* if (
                                  currentProduct.packSize?.id !== element.id
                                ) {
                                  
                                } */
                                }
                                return (
                                  <option key={element.id} value={element.id}>
                                    {element.packSize}
                                    {item?.units}
                                  </option>
                                );
                              })}
                            </select>
                          </div>
                          <div>
                            <label
                              htmlFor="stock"
                              className="block mb-2 text-sm font-medium text-gray-900 "
                            >
                              Stock
                            </label>
                            <input
                              type="number"
                              name="stock"
                              id="stock"
                              value={product.stock}
                              onChange={(e) =>
                                handleInputChange(e.target.name, e.target.value)
                              }
                              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                              placeholder="Stock Amount"
                            />
                          </div>
                          <div>
                            <label
                              htmlFor="supplier"
                              className="block mb-2 text-sm font-medium text-gray-900"
                            >
                              Suppliers's Name
                            </label>
                            <select
                              id="supplier"
                              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                              name="supplier"
                              value={supplier?._id}
                              onChange={(e) => {
                                const supplier = suppliers.find(
                                  (s) => s._id === e.target.value
                                );
                                setSupplier(supplier || {});
                                handleInputChange(e.target.name, supplier.name);
                              }}
                            >
                              <option>Select Supplier</option>
                              {suppliers.map((element, index) => {
                                return (
                                  <option key={element._id} value={element._id}>
                                    {element.name}
                                  </option>
                                );
                              })}
                            </select>
                          </div>
                          <div>
                            <label
                              htmlFor="city"
                              className="block mb-2 text-sm font-medium text-gray-900"
                            >
                              Warehouse City
                            </label>
                            <select
                              id="city"
                              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                              name="city"
                              value={city?._id}
                              onChange={(e) => {
                                const currentCity = cities.find(
                                  (c) => c._id === e.target.value
                                );

                                setCity(currentCity || {});
                                handleInputChange(
                                  e.target.name,
                                  currentCity.city
                                );
                              }}
                            >
                              <option>Select City</option>
                              {cities.map((element, index) => {
                                return (
                                  <option key={element._id} value={element._id}>
                                    {element.city}
                                  </option>
                                );
                              })}
                            </select>
                          </div>
                          <div>
                            <label
                              htmlFor="area"
                              className="block mb-2 text-sm font-medium text-gray-900"
                            >
                              Warehouse Area
                            </label>
                            <select
                              id="area"
                              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                              name="area"
                              value={warehouse?.area}
                              onChange={(e) => {
                                const sameCityWarehouse = warehouses.find(
                                  (i) => i.area === e.target.value
                                );
                                console.log(
                                  "Same City Warehouses: ",
                                  sameCityWarehouse
                                );
                                setSameCityWarehouses(sameCityWarehouse || {});

                                handleInputChange(
                                  e.target.name,
                                  sameCityWarehouse.area
                                );
                              }}
                            >
                              <option>Select Area</option>
                              {warehouses.map((element, index) => {
                                if (element.city === city?.city) {
                                  return (
                                    <option
                                      key={element._id}
                                      value={element.area}
                                    >
                                      {element.area}
                                    </option>
                                  );
                                }
                              })}
                            </select>
                          </div>
                          <div>
                            <label
                              htmlFor="warehouseNumber"
                              className="block mb-2 text-sm font-medium text-gray-900"
                            >
                              Warehouse #
                            </label>
                            <select
                              id="warehouseNumber"
                              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                              name="warehouseNumber"
                              value={sameCityWarehouses.warehouseNumber?.id}
                              onChange={(e) => {
                                const currWarehouse =
                                  sameCityWarehouses.warehouseNumber?.find(
                                    (w) => w.id === e.target.value
                                  );
                                handleInputChange(
                                  e.target.name,
                                  currWarehouse.warehouseNumber
                                );
                              }}
                            >
                              <option>Select Warehouse #</option>
                              {sameCityWarehouses.warehouseNumber?.map(
                                (element, index) => {
                                  return (
                                    <option key={element.id} value={element.id}>
                                      {element.warehouseNumber}
                                    </option>
                                  );
                                }
                              )}
                            </select>
                          </div>
                          <div>
                            <label
                              htmlFor="production"
                              className="block mb-2 text-sm font-medium text-gray-900 "
                            >
                              Production Date
                            </label>
                            <input
                              type="date"
                              name="production"
                              id="production"
                              value={product.production}
                              onChange={(e) =>
                                handleInputChange(e.target.name, e.target.value)
                              }
                              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                              placeholder="Enter Product's Production Date"
                            />
                          </div>
                          <div>
                            <label
                              htmlFor="expirationDate"
                              className="block mb-2 text-sm font-medium text-gray-900 "
                            >
                              Expiration Date
                            </label>
                            <input
                              type="date"
                              name="expirationDate"
                              id="expirationDate"
                              value={product.expirationDate}
                              onChange={(e) =>
                                handleInputChange(e.target.name, e.target.value)
                              }
                              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                              placeholder="Enter Product's Expiration Date"
                            />
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
                    onClick={addProduct}
                  >
                    Add Product
                  </button>
                  <button
                    type="button"
                    className="mt-3 inline-flex w-full justify-center rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50 sm:mt-0 sm:w-auto"
                    onClick={() => addProductModalSetting()}
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
