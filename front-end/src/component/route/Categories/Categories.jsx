import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { brandingData } from "../../../static/data";
import styles from "../../../styles/styles";
import { useSelector } from "react-redux";
import { server } from "../../../server";

const Categories = () => {
  const navigate = useNavigate();
  const { categoriesData } = useSelector((state) => state.categoriesData);

  return (
    <>
      <div className={`${styles.section} hidden sm:block`}>
        <div
          className={`branding my-12 flex justify-between w-full shadow-sm bg-white p-5 rounded-md`}
        >
          {brandingData &&
            brandingData.map((i, index) => (
              <div className="flex items-start" key={index}>
                {i.icon}
                <div className="px-3">
                  <h3 className="font-bold text-sm md:text-base">{i.title}</h3>
                  <p className="text-xs md:text-sm">{i.Description}</p>
                </div>
              </div>
            ))}
        </div>
      </div>

      <div
        className={`${styles.section} bg-white p-6 rounded-lg mb-12`}
        id="categories"
      >
        <div className="grid grid-cols-1 gap-[5px] md:grid-cols-2 md:gap-[10px] lg:grid-cols-4 lg:gap-[20px] xl:grid-cols-5 xl:gap-[30px]">
          {categoriesData &&
            [...categoriesData].map((i) => {
              const handleSubmit = (i) => {
                navigate(`/products?category=${i.name}`);
              };
              return (
                <div
                  className="w-full h-[100px] flex items-center  cursor-pointer overflow-hidden"
                  key={i._id}
                  onClick={() => handleSubmit(i)}
                >
                  <img
                    src={`${server}/${i.image_Url}`}
                    className="w-[60px] h-[60px] rounded-[4px] object-cover"
                    alt=""
                  />
                  <h5
                    className={`leading-[1.3] ml-5 font text-[15px] font-medium`}
                  >
                    {i.name}
                  </h5>
                </div>
              );
            })}
        </div>
      </div>
    </>
  );
};

export default Categories;
