export const SelectTravelesList=[
    {   
        id:'1',
        title:'Just Me',
        desc:'A sole traveles in world exploration',
        icon:'✈️',
        people:'1'
    },
    {   
        id:'2',
        title:'A Couple',
        desc:'Two traveles in tandom',
        icon:'🥂',
        people:'2'
    },
    {   
        id:'3',
        title:'Family',
        desc:'A group of fun loving adventure',
        icon:'🏡',
        people:'4-10'
    },
    {   
        id:'4',
        title:'Friends',
        desc:'A bunch of thrill-seeks',
        icon:'⛵',
        people:'4-10'
    },
]
export const SelectBudgetOptions=[
    {
        id:'1',
        title:'Economy',
        desc:'Stay Conscious of costs',
        icon:'💰'
    },
    {
        id:'2',
        title:'Standard',
        desc:'Keep cost on average side',    
        icon:'💵'

    },
    {
        id:'3',
        title:'Luxury',
        desc:'Don\'t mind spending a little extra',
        icon:'💎'
    }]

    export const AI_PROMPT = 'Generate a travel plan for location: {location}, for {totalDays} days and {totalNight} nights for {traveler} with a {budget} budget. Include the following: flight details (flight pricing, booking URL), hotel options (hotel name, address, price, image URL, geo coordinates, rating, description), and a detailed itinerary for each day (places to visit with name, description, image URL, geo coordinates, ticket pricing, time travel, and best time to visit). The plan should include places to visit for each day with specific information for each of the {totalDays} days. Please format the places to visit as an array of objects for each day, ensuring correct structure for each day:';

