var i, j, k;
i=0;
j=0;
k=0;
document.getElementById('city').addEventListener('change', function(){
  async function getWeather() {
    var lon; var lat;
    try {
      console.log('You selected: ', city.value);
      console.log('You selected lon: ', city.selectedOptions[0].getAttribute('lon'));
      console.log('You selected lat: ', city.selectedOptions[0].getAttribute('lat'));
      lon = city.selectedOptions[0].getAttribute('lon');
      lat = city.selectedOptions[0].getAttribute('lat');
      const response = await fetch(
        'http://www.7timer.info/bin/api.pl?lon=' +lon+ '&lat=' +lat+ '&product=two&output=json',
        {
          method: 'GET',
        },
      );
      if (!response.ok) {
        throw new Error('Error! status: ${response.status}');
      }
      const data = await response.json();
      return data;
    } catch (error) {
      console.log(error);
    }
  }
  getWeather().then(data => {
    console.log(data);
    if(i==1){
      const elements = document.getElementsByClassName('list');
      while(elements.length > 0){
        elements[0].parentNode.removeChild(elements[0]);
      }
      const elem = document.getElementsByClassName('divclass');
      while(elem.length > 0){
        elem[0].parentNode.removeChild(elem[0]);
      }
      document.getElementById('pack').remove();
    }
    const pack = document.createElement('div');
    pack.setAttribute('id', 'pack');
    const dateObj = new Date();
    const month   = dateObj.getUTCMonth() + 1;
    const dayofmonth     = dateObj.getUTCDate();
    const year    = dateObj.getUTCFullYear();
    for(k; k<7; k++){
      const newDate = year + "/" + month + "/" + (dayofmonth+k);
      const day = data.dataseries[k];
      const include = document.createElement('div');
      include.setAttribute('id', j);
      include.setAttribute('class', 'divclass');
      const imagediv = document.createElement('div');
      imagediv.setAttribute('class', 'imagediv');
      const h2 = document.createElement('h2');
      h2.setAttribute('class', 'list');
      h2.innerHTML = newDate;
      const br = document.createElement('br');
      const image = document.createElement('img');
      image.setAttribute('class', 'image');
      const weather = document.createElement('p');
      weather.setAttribute('class', 'list');
      if(day.weather=='cloudy'){
        weather.innerHTML = '<b>Weather:</b> <br> Cloudy. Total cloud cover over 80%';
        image.setAttribute('src', 'images/cloudy.jpg');
      }
      else if(day.weather=='mcloudy'){
        weather.innerHTML = '<b>Weather:</b> <br> Partially cloudy. Total cloud cover between 20%-80%';
        image.setAttribute('src', 'images/pcloudy.jpg');
      }
      else if(day.weather=='clear'){
        weather.innerHTML = '<b>Weather:</b> <br> Clear sky. Total cloud cover less than 20%';
        image.setAttribute('src', 'images/clear.jpg');
      }
      else if(day.weather=='rain'){
        weather.innerHTML = '<b>Weather:</b> <br> Rain';
        image.setAttribute('src', 'images/rain.jpg');
      }
      else if(day.weather=='snow'){
        weather.innerHTML = '<b>Weather:</b> <br> Snow';
        image.setAttribute('src', 'images/snow.jpg');
      }
      else if(day.weather=='ts'){
        weather.innerHTML = '<b>Weather:</b> <br> Thunderstorm';
        image.setAttribute('src', 'images/ts.jpg');
      }
      else if(day.weather=='tsrain'){
        weather.innerHTML = '<b>Weather:</b> <br> Thunderstorm with rain';
        image.setAttribute('src', 'images/tsrain.jpg');
      }
      const clouds = document.createElement('p');
      clouds.setAttribute('class', 'list');
      if(day.cloudcover==1)
        clouds.innerHTML = '<b>Cloud coverage:</b> <br> 0%-6%';
      else if(day.cloudcover==2)
        clouds.innerHTML = '<b>Cloud coverage:</b> <br> 6%-19%';
      else if(day.cloudcover==3)
        clouds.innerHTML = '<b>Cloud coverage:</b> <br> 19%-31%';
      else if(day.cloudcover==4)
        clouds.innerHTML = '<b>Cloud coverage:</b> <br> 31%-44%';
      else if(day.cloudcover==5)
        clouds.innerHTML = '<b>Cloud coverage:</b> <br> 44%-56%';
      else if(day.cloudcover==6)
        clouds.innerHTML = '<b>Cloud coverage:</b> <br> 56%-69%';
      else if(day.cloudcover==7)
        clouds.innerHTML = '<b>Cloud coverage:</b> <br> 69%-81%';
      else if(day.cloudcover==8)
        clouds.innerHTML = '<b>Cloud coverage:</b> <br> 81%-94%';
      else if(day.cloudcover==9)
        clouds.innerHTML = '<b>Cloud coverage:</b> 94%-100%';
      const windSpeed = document.createElement('p');
      windSpeed.setAttribute('class', 'list');
      if(day.wind10m.speed==1)
        windSpeed.innerHTML = '<b>Maximum wind speed:</b> <br> Below 0.3m/s (calm)';
      else if(day.wind10m.speed==2)
        windSpeed.innerHTML = '<b>Maximum wind speed:</b> <br> 0.3-3.4m/s (light)';
      else if(day.wind10m.speed==3)
        windSpeed.innerHTML = '<b>Maximum wind speed:</b> <br> 3.4-8.0m/s (moderate)';
      else if(day.wind10m.speed==4)
        windSpeed.innerHTML = '<b>Maximum wind speed:</b> <br> 8.0-10.8m/s (fresh)';
      else if(day.wind10m.speed==5)
        windSpeed.innerHTML = '<b>Maximum wind speed:</b> <br> 10.8-17.2m/s (strong)';
      else if(day.wind10m.speed==6)
        windSpeed.innerHTML = '<b>Maximum wind speed:</b> <br> 17.2-24.5m/s (gale)';
      else if(day.wind10m.speed==7)
        windSpeed.innerHTML = '<b>Maximum wind speed:</b> <br> 24.5-32.6m/s (storm)';
      else if(day.wind10m.speed==8)
        windSpeed.innerHTML = '<b>Maximum wind speed:</b> <br> Over 32.6m/s (hurricane)';
      document.body.appendChild(include);
      document.body.appendChild(pack);
      const el = document.getElementById(j);
      const el2 = document.getElementById('pack');
      el2.appendChild(el);
      el.appendChild(imagediv);
      imagediv.appendChild(h2);
      imagediv.appendChild(br);
      imagediv.appendChild(image);
      el.appendChild(weather);
      el.appendChild(clouds);
      el.appendChild(windSpeed);
      j++;
    }
    j=0;
    i=1;
  });
  k=0;
});