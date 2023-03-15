import React, { useEffect, useState } from "react";
import Jumbotron from "../components/cards/Jumbotron";
import { getProductsByFilter } from "../functions/product";
import NewArrivals from "../components/home/NewArrivals";
import BestSellers from "../components/home/BestSellers";
import CategoryList from "../components/category/CategoryList";


const Home = () => {

    // useEffect(() => {
    //     loadAllProducts();
    // }, []);

    // const loadAllProducts = () => {
    //     setLoading(true);
    //     // getProductsByFilter(sort, order, limit)
    //     getProductsByFilter("createdAt", "desc", "3").then((res) => {
    //         setProducts(res.data);
    //         setLoading(false);
    //     });
    // };

    return (
        <>
            <div className="jumbotron h1 font-weight-bold text-primary text-center">
                <Jumbotron text={["The best in tech", "Buy online"]} />
            </div>

            <h4 className="text-center p-3 mt-5 mb-5 display-4 jumbotron">
                New Arrivals
            </h4>

            <NewArrivals />
            
            <h4 className="text-center p-3 mt-5 mb-5 display-4 jumbotron">
                Best Sellers
            </h4>

            <BestSellers />
            
            <h4 className="text-center p-3 mt-5 mb-5 display-4 jumbotron">
                Categories
            </h4>

            <CategoryList />

            <br />
            <br />
            <br />
        </>
    );
};

export default Home;
