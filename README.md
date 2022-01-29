# Soar App 
    
- Soar is a yelp inspired application for people to write airline reviews. This fullstack web application designed with backend routes implents CRUD functionality.

# Technologies 

* Backend
    * Ruby on Rails - MVC framework
    * PostgreSQL - database

* Frontend
    * React js/React-axios - Javascript library for reusable UI components and frontend state management 
    * HTML/CSS - style and formattting
    * Styled Components - additional responsive formatting and style

## Features 

## Models - Our app will have an airlines model and each airline in our app will have many reviews.
* airlines 
    * name for each airline
    * unique url-safe slug
    * image_url
* reviews
    * title
    * description
    * score - star rating system that ranges from 1 to 5 stars; 1 being the worsts and 5 being the best
    * airline_id

### Serializers - to build our JSON API
* using gem 'fast_jsonapi' created by Netflix engineering team to help create the exact structure for the data we want to expose in our api then use that when we render json from our controllers.

## Three Controllers 
* airlines/reviews controller - 'api/v1' to manage routing from react side and rails side using react-router
* pages controller - single index action that acts as our root path 


## Future Directions
    
* Improve styling 
* Integrate User Authentication
* Integrate functionality like yelp to add friends
    