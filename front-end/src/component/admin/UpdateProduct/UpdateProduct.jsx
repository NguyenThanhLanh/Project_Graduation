import React, { useEffect, useState } from "react";
import { AiOutlinePlusCircle } from "react-icons/ai";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";
import { createProduct, loadProduct } from "../../../redux/actions/product";
import axios from "axios";
import { server } from "../../../server";

const UpdateProduct = ({ product }) => {
  const { id } = useParams();
  const { productData } = useSelector((state) => state.productData);

  const { error, success } = useSelector((state) => state.productData);
  const dispatch = useDispatch();
  const { categoriesData } = useSelector((state) => state.categoriesData);
  const { suppilerData } = useSelector((state) => state.suppilerData);
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");
  const [discount_price, setDiscount_price] = useState("");
  const [quantity, setQuantity] = useState("");
  const [category, setCategory] = useState("");
  const [suppiler, setSuppiler] = useState("");
  const [total_sell, setTotal_sell] = useState("");

  useEffect(() => {
    window.scrollTo(0, 0);
    const data = productData.filter((item) => item._id === id);
    setName(data[0].name);
    setDescription(data[0].description);
    setPrice(data[0].price);
    setDiscount_price(data[0].discount_price);
    setQuantity(data[0].quantity);
    setCategory(data[0].category);
    setSuppiler(data[0].suppiler);
    setTotal_sell(data[0].total_sell);
  }, []);

  const handleSubmit = async (e) => {
    try {
      e.preventDefault();
      const dataUpdate = {
        name: name,
        description: description,
        price: price,
        discount_price: discount_price,
        quantity: quantity,
        category: category,
        suppiler: suppiler,
      };
      await axios.put(`${server}/product/${id}`, dataUpdate, {
        withCredentials: true,
      });
      dispatch(loadProduct());
      toast.success("Cập nhập sản phẩm thành công!");
    } catch (error) {
      toast.error("Không Cập nhập được sản phẩm ");
    }
  };
  return (
    <div className="w-[90%] 800px:w-[70%] bg-white  shadow h-[80vh] rounded-[4px] p-3 overflow-y-scroll">
      <h5 className="text-[30px] font-Poppins text-center">
        Cập nhật sản phẩm
      </h5>
      <form onSubmit={(e) => handleSubmit(e)}>
        <br />
        <div>
          <label className="pb-2">
            Tên sản phẩm <span className="text-red-500">*</span>
          </label>
          <input
            type="text"
            name="name"
            value={name}
            className="mt-2 appearance-none block w-full px-3 h-[35px] border border-gray-300 rounded-[3px] placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
            onChange={(e) => setName(e.target.value)}
            placeholder="Nhập tên sản phẩm..."
          />
        </div>
        <br />
        <div>
          <label className="pb-2">
            Mô tả sản phẩm <span className="text-red-500">*</span>
          </label>
          <textarea
            cols="30"
            required
            rows="8"
            type="text"
            name="description"
            value={description}
            className="mt-2 appearance-none block w-full pt-2 px-3 border border-gray-300 rounded-[3px] placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
            onChange={(e) => setDescription(e.target.value)}
            placeholder="Nhập mô tả chi tiết sản phẩm..."
          ></textarea>
        </div>
        <br />
        <div>
          <label className="pb-2">
            Loại sản phẩm <span className="text-red-500">*</span>
          </label>
          <select
            className="w-full mt-2 border h-[35px] rounded-[5px]"
            value={category}
            onChange={(e) => setCategory(e.target.value)}
          >
            <option value="Choose a category">Chọn loại sản phẩm</option>
            {categoriesData &&
              [...categoriesData].map((i) => (
                <option value={i.name} key={i._id}>
                  {i.name}
                </option>
              ))}
          </select>
        </div>
        <br />
        <div>
          <label className="pb-2">
            Nhà cung cấp <span className="text-red-500">*</span>
          </label>
          <select
            className="w-full mt-2 border h-[35px] rounded-[5px]"
            value={suppiler}
            onChange={(e) => setSuppiler(e.target.value)}
          >
            {suppilerData &&
              [...suppilerData].map((i) => (
                <option value={i.name} key={i._id}>
                  {i.name}
                </option>
              ))}
          </select>
        </div>
        <br />
        <div>
          <label className="pb-2">
            Giá sản phẩm <span className="text-red-500">*</span>
          </label>
          <input
            type="number"
            name="price"
            value={price}
            className="mt-2 appearance-none block w-full px-3 h-[35px] border border-gray-300 rounded-[3px] placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
            onChange={(e) => setPrice(e.target.value)}
            placeholder="Nhập giá của sản phẩm (number)..."
          />
        </div>
        <br />
        <div>
          <label className="pb-2">
            Giá bán ra của sản phẩm <span className="text-red-500">*</span>
          </label>
          <input
            type="number"
            name="price"
            value={discount_price}
            className="mt-2 appearance-none block w-full px-3 h-[35px] border border-gray-300 rounded-[3px] placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
            onChange={(e) => setDiscount_price(e.target.value)}
            placeholder="Nhập giá bán ra của sản phẩm (number)..."
          />
        </div>
        <br />
        <div>
          <label className="pb-2">
            Số lượng <span className="text-red-500">*</span>
          </label>
          <input
            type="number"
            name="quantity"
            value={quantity}
            className="mt-2 appearance-none block w-full px-3 h-[35px] border border-gray-300 rounded-[3px] placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
            onChange={(e) => setQuantity(e.target.value)}
            placeholder="Nhập số lượng sản phẩm (number)..."
          />
        </div>
        <br />
        <div>
          <div>
            <input
              type="submit"
              value="Chỉnh sửa"
              className="mt-2 cursor-pointer appearance-none text-center block w-full px-3 h-[35px] border border-gray-300 rounded-[3px] placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
            />
          </div>
        </div>
      </form>
    </div>
  );
};

export default UpdateProduct;
