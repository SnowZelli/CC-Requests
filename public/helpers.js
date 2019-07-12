const createVenueHTML = (name, location, state, postalCode, iconSource) => {
    return `<h2>${name}</h2>
    <img class="venueimage" src="${iconSource}"/>
    <h3>Address:</h3>
    <p>${location.address}</p>
    <p>${location.city}, ${state}, ${postalCode}</p>
    <p>${location.country}</p>`;
  }
  
  const createWeatherHTML = (currentDay) => {
    return `<h2> High: ${currentDay.day.maxtemp_f}</h2>
      <h2> Low: ${currentDay.day.mintemp_f}</h2>
      <img src="https://${currentDay.day.condition.icon}" class="weathericon" />
      <h2>${weekDays[(new Date(currentDay.date)).getDay()]}</h2>
      <p>Humidity: ${currentDay.day.avghumidity}%</p>`;
  }