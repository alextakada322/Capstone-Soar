import React, {useState, useEffect, Fragment } from 'react'
import axios from 'axios'
import Header from './Header'
import ReviewForm from './ReviewForm'
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
        const handleSubmit = (e) => {
            e.preventDefault()
            
            //take review  object in the state combine with airline_id w airline object state combine together then submit to api withaxios
            
            const csrfToken = document.querySelector('[name=csrf-token]').content
            axios.defaults.headers.common['X-CSRF-TOKEN'] = csrfToken

            const airline_id = airline.data.id
            axios.post('/api/v1/reviews', {review, airline_id})
            .then(resp => {
            //take review we created then add to array of reviews under included key of airline so we dont have to make an additional request to airline endpoint to get updated state
              const included = [...airline.included, resp.data]
              setAirline({...airline, included})
              setReview({title: '', description: '', score: 0})
            })
            .catch(resp => {})
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
                
                    <div className="reviews"></div>
                    </Main>
                </Column>
                <Column>
                    <ReviewForm
                        handleChange={handleChange}
                        handleSubmit={handleSubmit}
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