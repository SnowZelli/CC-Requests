// Foursquare API Info
const clientId = 'B0QUMJJQEUXLPHQ0MIQKJ5TZWYJQCD2YZ32BLFOTVTBHLHWR';
const clientSecret = '4AEMBYUIFDB0CN1EEDDTKFQOYD5N40AF1AIATAD5BLQ1N4GY';
const url = 'https://api.foursquare.com/v2/venues/explore?near=';

// APIXU Info
const apiKey = 'af1801df4dbc4e0ba95214443190907';
const forecastUrl = 'https://api.apixu.com/v1/forecast.json?key=';

// Page Elements
const $input = $('#city');
const $submit = $('#button');
const $destination = $('#destination');
const $container = $('.container');
const $venueDivs = [$("#venue1"), $("#venue2"), $("#venue3")];
const $weatherDivs = [$("#weather1"), $("#weather2"), $("#weather3"), $("#weather4")];
const weekDays = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];

// Add AJAX functions here:
const getVenues = async () => {
    const city = $input.val();
    const urlToFetch = `${url}${city}&limit=100&client_id=${clientId}&client_secret=${clientSecret}&v=20190710`;
    try {
      const response = await fetch(urlToFetch);
      //console.log(response);
      if(response.ok) {
        const jsonResponse = await response.json();
        const venues = jsonResponse.response.groups[0].items.map(item => item.venue);
        //console.log(venues);
        return venues;
      }
    }
    catch(error) {
        console.log(error);
    }
}

const getForecast = async () => {
  const urlToFetch = `${forecastUrl}${apiKey}&q=${$input.val()}&days=4&hour=11`;
  try {
    const response = await fetch(urlToFetch);
    //console.log(response);
    if(response.ok) {
      const jsonResponse = await response.json();
      //console.log(jsonResponse);
      const days = jsonResponse.forecast.forecastday;
      //console.log(days);
      return days;
    }
  } catch (error) {
    console.log(error);
  }
}

// Render functions
const renderVenues = (venues) => {
  $venueDivs.forEach(($venue) => {
    let randomNumber = Math.floor(Math.random() * 100);
    const venue = venues[randomNumber];
    const venueIcon = venue.categories[0].icon;
    const venueImgSrc = `${venueIcon.prefix}bg_64${venueIcon.suffix}`;
    let venueContent = createVenueHTML(venue.name, venue.location, venue.location.state, venue.location.postalCode, venueImgSrc);
    $venue.append(venueContent);
  });
  $destination.append(`<h2>${venues[0].location.city}</h2>`);
}

const renderForecast = (days) => {
  $weatherDivs.forEach(($day, index) => {
    const currentDay = days[index];
    let weatherContent = `${createWeatherHTML(currentDay)}`;
    $day.append(weatherContent);
  });
}

const executeSearch = () => {
  $venueDivs.forEach(venue => venue.empty());
  $weatherDivs.forEach(day => day.empty());
  $destination.empty();
  $container.css("visibility", "visible");
  getVenues()
    .then((venues) => {
      return renderVenues(venues);
    });
  getForecast()
    .then((days) => {
      return renderForecast(days);
    });
  return false;
}

$submit.click(executeSearch)
