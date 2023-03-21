import React from "react";
import StarRatings from "react-star-ratings";

const StarFilter = ({ starClick, numberofStars }) => {
    return (
        <>
            <StarRatings
                changeRating={() => starClick(numberofStars)}
                starDimension="22px"
                starSpacing="4px"
                starRatedColor="rgb(24, 144, 255)"
                starHoverColor="rgb(24, 144, 255)"
                numberOfStars={numberofStars}
            />
            <br />
        </>
    );
};

export default StarFilter;
