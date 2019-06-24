import React from "react";
import { parseTime } from './restaurant_helper';
import ReviewIndexItem from '../reviews/review_index_item';
import { Link } from 'react-router-dom';

class RestaurantShow extends React.Component {
    componentDidMount() {
        this.props.fetchRestaurant(this.props.match.params.id);
    }

    overallReviews() {
        const { restaurant } = this.props;
        const stars = `${Math.round((restaurant.rating / 5) * 100)}%`;
        
        return (
            <div className="ratings-summary">
                <div className="title-header">Overall Ratings and Reviews</div>
                <div>
                    <div className="restaurant-stars-outer">
                        <div className="restaurant-stars-inner" style={{width: `${stars}`}}></div>
                    </div>
                    <p id="restaurant-overall">{ Math.round(restaurant.rating * 100) / 100 } &nbsp; based on recent ratings</p>
                </div>
                <ul>
                    <li>
                        <p id="rating-number">{ restaurant.food_rating }</p>
                        <p>Food</p>
                    </li>
                    <li>
                        <p id="rating-number">{ restaurant.service_rating }</p>
                        <p>Service</p>
                    </li>
                    <li>
                        <p id="rating-number">{restaurant.ambience_rating}</p>
                        <p>Ambience</p>
                    </li>
                    <li id="last-rating">
                        <p id="rating-number">{restaurant.value_rating}</p>
                        <p>Value</p>
                    </li>
                </ul>
            </div>
        )
    }

    reviewDetails() {
        const { reviews, authors, reviewed } = this.props;
        const reviewList = reviews.map(review => {
            return (
                <ul>
                    <ReviewIndexItem
                        key={review.id}
                        review={review}
                        authors={authors}
                    />
                </ul>
            )
        })

        if (reviewed) {
            return (
                <div className="reviews-container">
                    <button className="edit-review-button"
                        onClick={ editModal }>Edit your review</button>
                    {reviewList}
                </div>
            )
        } else {
            return (
                <div className="reviews-container">
                    <button className="create-review-button"
                        onClick={craeteModal}>Write a review</button>
                    {reviewList}
                </div>
            )
        }
    }

    render() {
        const { restaurant } = this.props;
        if (!restaurant) return null;

        return (
            <div className="show">
                <div className="cover-photo">Photo Here</div>
                <div className="show-details-container">
                    <div className="overview-details">
                        <div className="restaurant-overview">
                            <h1 className="restaurant-name">{ restaurant.name }</h1>
                            <ul className="restaurant-overview-list">
                                <li key="1">
                                    <i className="far fa-money-bill-alt"></i>
                                    &nbsp; { restaurant.price_range }
                                </li>
                                <li key="2">
                                    <i className="fas fa-utensils"></i>
                                    &nbsp; { restaurant.cuisine }
                                </li>
                            </ul>
                            <p className="restaurant-descr">{ restaurant.description }</p>
                            { this.overallReviews() }
                            { this.reviewDetails() }
                        </div>
                        <div className="restaurant-details">
                            <ul className="restaurant-details-list">
                                <li key="3">
                                    <i id="map-icon" className="far fa-map"></i>
                                    <div className="restaurant-detail-item">
                                        <h3>Address</h3>
                                        { restaurant.address }
                                    </div>
                                </li>
                                <br />
                                <li key="4">
                                    <i id="phone-icon" className="fas fa-phone"></i>
                                    <div className="restaurant-detail-item">
                                        <h3>Phone Number</h3>
                                        { restaurant.phone_number }
                                    </div>
                                </li>
                                <br />
                                <li key="5">
                                    <i id="clock-icon" className="far fa-clock"></i>
                                    <div className="restaurant-detail-item">
                                        <h3>Hours of Operation</h3>
                                        Dinner: {`${parseTime(restaurant.open_time)}PM - ${parseTime(restaurant.close_time)}PM`}
                                    </div>
                                </li>
                            </ul>
                        </div>
                    </div>
                </div>
            </div>
        );

    }
}

export default RestaurantShow;