import React from 'react';
import { Link } from 'react-router-dom';    
// We replace REST?? with GraphQL
// import useFetch from '../hooks/useFetch';
import { useQuery, gql } from '@apollo/client'; // gql is used by Apollo to convert query string into a format it can use

const REVIEWS = gql`
    query GetReviews {
        reviews {
            data {
                id,
                attributes {
                    title,
                    rating
                    body,
                    categories {
                        data {
                            id,
                            attributes {
                                name
                            }
                        }
                    }
                }
            }
        }
    }
` // REVIEWS with capital letters only due to convention

export default function Homepage() {
    // We replace API endpoint?? with GraphQL
    // const { loading, error, data } = useFetch('http://localhost:1337/api/reviews');
    const { loading, error, data } = useQuery(REVIEWS);

    if (loading) return <p>Loading...</p>
    if (error) return <p>Error!!!</p>

    {/* VARIANT I: Using GraphQL we must:
        - use data.reviews.data.map instead of data.map below
        - remove [1] in four places 
    */}
    return (
        <div>
            {data.reviews.data.map(review => (
                <div key={review.id} className="review-card">
                    <div className="rating">{review.attributes.rating}</div>
                    <h2>{review.attributes.title}</h2>

                    {review.attributes.categories.data.map(category => (
                        <small key={category.id}>{category.attributes.name}</small>
                    ))}
                    
                    <p>{review.attributes.body.substring(0, 200)}...</p>
                    <Link to={`/details/${review.id}`}>Read more</Link>
                </div>
            ))}
        </div>
    )
    {/* VARIANT II: Using useFetch */}
    // return (
    //     <div>
    //         {data.map(review => (
    //             <div key={review[0]} className="review-card">
    //                 <div className="rating">{review[1].attributes.rating}</div>
    //                 <h2>{review[1].attributes.title}</h2>

    //                 <small>console list</small>
                    
    //                 <p>{review[1].attributes.body.substring(0, 200)}...</p>
    //                 <Link to={`/details/${review[1].id}`}>Read more</Link>
    //             </div>
    //         ))}
    //     </div>
    // )
}