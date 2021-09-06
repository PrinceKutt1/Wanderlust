const clientId ='BVIWHMZGLXPB3RT0YCK5XAFDC2CSF2OXY5NPFSOHLYN5AHA5';
const clientSecret = 'A3R20TESEOFNE4NEN2SS4GOAELOJSP2Q0R4NHZSB0AFNJWFY';
const url =  'https://api.foursquare.com/v2/venues/explore?near=';

// Weather Api
const openWeatherKey ='0f92ffcdfb080970778d98927d1c14d8';
const weatherUrl = 'https://api.openweathermap.org/data/2.5/weather';


// Page Elements
const $input = $('#city');
const $submit = $('#button');
const $destination = $('#destination');
const $container = $('.container');
const $venueDivs = [$("#venue1"), $("#venue2"), $("#venue3"), $("#venue4")];
const $weatherDiv = $("#weather1");
const weekDays = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];

// Add AJAX functions here:
const getVenues = async () => {
  const city = $input.val();
  const urlToFetch = `${url}${city}&limit=10&client_id=${clientId}&client_secret=${clientSecret}&v=20210907`;
  try {
    const response = await fetch(urlToFetch);
    if(response.ok) {
      const jsonResponse = await response.json();
      const venues = jsonResponse.response.groups[0].items.map(item => item.venue);
      //const venues = jsonResponse.response.groups[0].items;
      //venues = venues.map(item => item.venue);
      console.log(venues);
      return venues;
    }
  } catch(error) {
    console.log(error);
  }
}
const getForecast = async () => {
  const urlToFetch = `${weatherUrl}?q=${$input.val()}&appid=${openWeatherKey}`;
  try {
    const response = await fetch(urlToFetch);
    if(response.ok) {
      const jsonResponse = await response.json();
      console.log(jsonResponse);
      return jsonResponse;
    }
  } catch(error) {
    console.log(error);
  }
}
// Render functions
const renderVenues = (venues) => {
  $venueDivs.forEach(($venue, index) => {
    const venue = venues[index];
    const venueIcon = venue.categories[0].icon;
    // console.log(venueIcon);
    const venueImgSrc = `${venueIcon.prefix}bg_64${venueIcon.suffix}`;
    const venueContent = createVenueHTML(venue.name, venue.location, venueImgSrc);
    $venue.append(venueContent);
  });
  $destination.append(`<h2>${venues[0].location.city}</h2>`);
}


const renderForecast = (day) => {
  const weatherContent = createWeatherHTML(day);
  //Using HTML template: 
  $weatherDiv.append(weatherContent);
};

const executeSearch = () => {
  $venueDivs.forEach(venue => venue.empty());
  $weatherDiv.empty();
  $destination.empty();
  $container.css('visibility', 'visible');
  getVenues().then(venues => renderVenues(venues));
  getForecast().then(forecast => renderForecast(forecast));
  return false;
};

$submit.click(executeSearch);
