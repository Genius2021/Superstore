import React from 'react';
// import { FaStar, FaStarHalfAlt, FaRegStar} from "react-icons/fa";

function Rating(props) {
    const {rating, numReviews} = props;
    return (
        <div className="rating">
            {
                rating >= 1 ? <span><i className="fa fa-star"></i></span> : rating >= 0.5 ? <span><i className="fa fa-star-half-o" aria-hidden="true"></i></span> : <span><i className="fa fa-star-o"></i></span> 
            }
            {
                rating >= 2 ? <span><i className="fa fa-star"></i></span> : rating >= 1.5 ? <span><i className="fa fa-star-half-o" aria-hidden="true"></i></span> : <span><i className="fa fa-star-o"></i></span> 
            }
            {
                rating >= 3 ? <span><i className="fa fa-star"></i></span> : rating >= 2.5 ? <span><i className="fa fa-star-half-o" aria-hidden="true"></i></span> : <span><i className="fa fa-star-o"></i></span> 
            }
            {
                rating >= 4 ? <span><i className="fa fa-star"></i></span> : rating >= 3.5 ? <span><i className="fa fa-star-half-o" aria-hidden="true"></i></span> : <span><i className="fa fa-star-o"></i></span> 
            }
            {
                rating >= 5 ? <span><i className="fa fa-star"></i></span> : rating >= 4.5 ? <span><i className="fa fa-star-half-o" aria-hidden="true"></i></span> : <span><i className="fa fa-star-o"></i></span> 
            }
            <span style={{marginLeft: "4px"}}>{`${numReviews} reviews`}</span>
        </div>
    )
}

export default Rating;
