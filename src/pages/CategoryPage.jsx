import React from "react";
import { useParams } from "react-router-dom";
import ServiceList from "./ServiceList.jsx";

const CategoryPage = () => {
  const { category } = useParams();

  return (
    <div>
      <h1>{category} Services</h1>
      <ServiceList />
    </div>
  );
};

export default CategoryPage;