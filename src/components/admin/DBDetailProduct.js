import React, { useContext } from 'react';
import { Link, useParams } from 'react-router-dom';
import { ProductContext } from '../../contexts/ProductContext';
import { BsArrowLeft } from 'react-icons/bs';

const DBDetailProduct = () => {
  const { id } = useParams();

  const { products } = useContext(ProductContext);

  const product = products.find((item) => {
    return item.id === id;
  });
  const { name, image, category, price } = product;

  return (
    <section className="h-screen flex">
      <div className="container mx-auto">
        <Link
          to={'/dashboard/product'}
          className="flex justify-center items-center py-2 px-4 my-10 bg-gray-500 text-white max-w-min rounded-full "
        >
          <BsArrowLeft className="text-xl mr-2" />
          <p className="text-xl">Back</p>
        </Link>
        <div className="flex flex-col lg:flex-row ">
          {/* image */}
          <div className="flex flex-1 mb-8 lg:mb-0">
            <img className="max-w-[200px] lg:max-w-sm" src={image} alt="" />
          </div>
          {/* text */}
          <div className="flex-1 text-center lg:text-left">
            <h1 className="text-[26px] font-medium mb-2 max-w-0[450px] mx-auto lg:mx-0">
              {name}
            </h1>
            <p className="mb-8">{category}</p>
            <div className="text-xl text-red-500 font-medium mb-6">
              ${price}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default DBDetailProduct;
