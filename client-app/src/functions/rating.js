import React from "react";
import StarRatings from "react-star-ratings";

export const showAverage = (p) => {
    if (p && p.ratings) {
        let ratingsArray = p && p.ratings;
        let total = [];
        let length = ratingsArray.length;

        ratingsArray.map((r) => total.push(r.star));
        let totalReduced = total.reduce((prev, next) => prev + next, 0);

        let highest = length * 5;
        let result = (totalReduced * 5) / highest;

        return (
            <div className="text-center">
                <span>
                    <StarRatings
                        rating={result}
                        starRatedColor="rgb(24, 144, 255)"
                        starDimension="22px"
                        starSpacing="4px" 
                    />{" "}
                    ({p.ratings.length})
                </span>
            </div>
        )
    } else {
        return (
            <div className="text-center">
                No rating yet
            </div>
        )
    }
}