import React from "react";
import { useParams } from 'react-router-dom';
// import useFetch from '../hooks/useFetch';
import { useQuery, gql } from '@apollo/client';

const REVIEW = gql`
    query GetReview($id: ID!) {
        review(id: $id) {
            data {
                id,
                attributes {
                    title,
                    body, 
                    rating
                }
            }
        }
    }
`

export default function ReviewDetails() {
    const { id } = useParams(); // Here we get id of review we want to display

    // const { loading, error, data } = useFetch('http://localhost:1337/api/reviews/' + id);
    const { loading, error, data } = useQuery(REVIEW, {
        variables: { id: id }
    })

    if (loading) return <p>Loading...</p>
    if (error) return <p>Error!</p>
    
    // Varianty II
    return (
        <div>
            <div className="review-card">
                <div className="rating">{data.review.data.attributes.rating}</div>
                <h2>{data.review.data.attributes.title}</h2>

                <small>console list</small>
                
                <p>{data.review.data.attributes.body}</p>
            </div>
        </div>
    )

    // Varianty I: useFetch
    // return (
    //     <div>
    //         <div className="review-card">
    //             <div className="rating">{data[1][1].rating}</div>
    //             <h2>{data[1][1].title}</h2>

    //             <small>console list</small>
                
    //             <p>{data[1][1].body}</p>
    //         </div>
    //     </div>
    // )
}