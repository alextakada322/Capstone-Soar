import React, {useState, useEffect, Fragment } from 'react'
import axios from 'axios'
import Header from './Header'
import ReviewForm from './ReviewForm'
import Review from './Review'
import styled from 'styled-components'

const Wrapper = styled.div`
    margin-left: auto;
    margin-right: auto;
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    
`
const Column = styled.div`
    background: #fff;
    height: 100vh;
    overflow: scroll;
    
    &:last-child {
        background: #000;
    }
`
const Main = styled.div`
    padding-left: 50px;
`


const Airline = (props) => {
    const [airline, setAirline] = useState({})
    const [review, setReview] = useState({})
    const [loaded, setLoaded] = useState(false)

    useEffect(()=>{
        const slug = props.match.params.slug
        const url = `/api/v1/airlines/${slug}`
        // api/v1/airlines/united-airlines
        // how to get slug value construct url for apiendpoint
        // airlines/united-airlines
        axios.get(url)
        .then( resp => {
            setAirline(resp.data)
            setLoaded(true)
            //boolean acts as switch to when we have our data to load in Header componennt
        })
        .catch( resp => console.log(resp))
        }, [])


        //Modify text in review form
        const handleChange = (e) => {
            e.preventDefault()

            setReview(Object.assign({}, review, {[e.target.name]: e.target.value}))

            console.log('review:', review)
        }
        //Create new review in our database
        //take review  object in the state combine with airline_id w airline object state combine together then submit to api with axios
        const handleSubmit = (e) => {
            e.preventDefault()
                       
            const csrfToken = document.querySelector('[name=csrf-token]').content
            axios.defaults.headers.common['X-CSRF-TOKEN'] = csrfToken

            //Get our airline id
            const airline_id = airline.data.id
            axios.post('/api/v1/reviews', {review, airline_id})
            .then(resp => {
            //take review we created then add to array of reviews under included key of airline so we dont have to make an additional request to airline endpoint to get updated state
              const included = [...airline.included, resp.data.data ]
              setAirline({...airline, included})
              setReview({title: '', description: '', score: 0})
            })
            .catch(resp => console.log(resp))
        }
        
        //set score
        const setRating = (score, e) => {
            e.preventDefault()
            setReview({...review, score})
        }

        let reviews
        if (loaded && airline.included) {        
            reviews = airline.included.map( (item, index) => {
              return (
                <Review
                key={index}
                attributes={item.attributes}
                />
            )
        })
        }

    return (
        <Wrapper> 
            { 
                loaded &&
            <Fragment>
                <Column>
                    <Main>
                        <Header
                    attributes={airline.data.attributes}
                    reviews={airline.included}
                    /> 
                
                    {reviews}
                    </Main>
                </Column>
                <Column>
                    <ReviewForm
                        handleChange={handleChange}
                        handleSubmit={handleSubmit}
                        setRating={setRating}
                        attributes={airline.data.attributes}
                        review={review}
                    />
                </Column>
            </Fragment>
            }
        </Wrapper>
    )
}

export default Airline