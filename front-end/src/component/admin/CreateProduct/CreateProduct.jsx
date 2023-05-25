import React, { useEffect, useState } from "react";
import { AiOutlinePlusCircle } from "react-icons/ai";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { createProduct, loadProduct } from "../../../redux/actions/product";

const CreateProduct = () => {
  // const { user } = useSelector((state) => state.user);
  const { error, success } = useSelector((state) => state.productData);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { categoriesData } = useSelector((state) => state.categoriesData);
  const { suppilerData } = useSelector((state) => state.suppilerData);

  const [images, setImages] = useState([]);
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");
  const [discount_price, setDiscount_price] = useState("");
  const [quantity, setQuantity] = useState("");
  const [category, setCategory] = useState("");
  const [suppiler, setSuppiler] = useState("");
  const [total_sell, setTotal_sell] = useState(0);

  // useEffect(() => {
  //   if (error) {
  //     toast.error(error);
  //   }
  //   if (success) {
  //     toast.success("Product created successfully!");
  //     navigate("/admin/dashboard");
  //     // window.location.reload();
  //   }
  // }, [dispatch, error, success]);

  const handleSubmit = (e) => {
    e.preventDefault();
    const formData = new FormData();

    formData.append("name", name);
    formData.append("description", description);
    formData.append("price", price);
    formData.append("discount_price", discount_price);
    formData.append("quantity", quantity);
    formData.append("category", category);
    formData.append("suppiler", suppiler);
    images.forEach((img) => {
      formData.append("images", img);
    });

    for (const entry of formData.entries()) {
      console.log(entry[0], entry[1]);
    }
    dispatch(createProduct(formData));
    if (error) {
      toast.error("Don't create supplier ");
    }

    if (success) {
      dispatch(loadProduct());
      toast.success("Created new supplier ");
      setImages(null);
      setName("");
      setDescription("");
      setPrice("");
      setDiscount_price("");
      setQuantity("");
      setCategory("");
      setSuppiler("");
      setTotal_sell(0);
      // navigate("/admin/supplier");
      // navigate("/admin/supplier");
    }
  };

  const handleImageChange = (e) => {
    e.preventDefault();
    let files = Array.from(e.target.files);
    setImages((prevImages) => [...prevImages, ...files]);
  };
  return (
    <div className="w-[90%] 800px:w-[70%] bg-white  shadow h-[80vh] rounded-[4px] p-3 overflow-y-scroll">
      <h5 className="text-[30px] font-Poppins text-center">
        Thêm sản phẩm mới
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
            Giá bản ra của sản phẩm <span className="text-red-500">*</span>
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
          <label className="pb-2">
            Tải ảnh <span className="text-red-500">*</span>
          </label>
          <input
            type="file"
            name=""
            id="upload"
            className="hidden"
            multiple
            onChange={(e) => handleImageChange(e)}
          />
          <div className="w-full flex items-center flex-wrap">
            <label htmlFor="upload">
              <AiOutlinePlusCircle size={30} className="mt-3" color="#555" />
            </label>
            {images &&
              images.map((i) => (
                <img
                  src={URL.createObjectURL(i)}
                  key={i}
                  alt=""
                  className="h-[60px] w-[60px] object-cover m-2"
                />
              ))}
          </div>
          <br />
          <div>
            <input
              type="submit"
              value="Thêm"
              className="mt-2 cursor-pointer appearance-none text-center block w-full px-3 h-[35px] border border-gray-300 rounded-[3px] placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
            />
          </div>
        </div>
      </form>
    </div>
  );
};

export default CreateProduct;
