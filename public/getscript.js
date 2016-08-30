'use strict'

function getScript() {
    let form = document.forms.createVidget,
        cityId = form.city.value,
        rangeofdates = form.rangeofdates.value,
        orientation = form.orientation.value
    console.log(form.elements)
        getWeather(cityId, rangeofdates, orientation)
    displayScript(cityId, rangeofdates, orientation)

    console.log('cityId->', cityId, '\n rangeofdates->', rangeofdates, '\n orientation->', orientation)
}

function displayScript(cityId, rangeofdates, orientation) {
    let codeWrapper = document.createElement('div'),
        code = document.createElement('p')

    codeWrapper.id = 'codeWrapper'
    codeWrapper.classList.add('well', 'col-md-8', 'col-md-offset-2', 'clearfix')
    code.textContent = "<script type='text/javascript'>'use strict';" + getWeather.valueOf() + vidget.valueOf() + "getWeather(" + cityId + "," + rangeofdates + ",'" + orientation + "')</script>"
    codeWrapper.appendChild(code)
    document.body.appendChild(codeWrapper)
}

function getWeather(cityid, daysr, direction) {
    let weatherreq = new XMLHttpRequest();
    weatherreq.open('GET', 'http://api.openweathermap.org/data/2.5/forecast/daily?id=' + cityid + '&cnt=' + daysr + '&units=metric&lang=ru&APPID=f2dadcd28fb0f97c3c249b050975a9d4');
    weatherreq.onreadystatechange = function() {
        if (weatherreq.readyState === 4) {
            vidget(JSON.parse(weatherreq.responseText), direction);
        };
    };
    weatherreq.send(null);
};

function vidget(obj, direction) {
    var body = document.body;
    var vidgetwrapper=document.createElement('div')
    var vidget = document.createElement('div');
    var cityName = document.createElement('p');
    var daylist = document.createElement('ul');

    vidgetwrapper.classList.add('well', 'col-md-8', 'col-md-offset-2', 'clearfix')
    vidgetwrapper.style.cssText="clear:both"

    vidget.style.cssText = "right: 50px;top: 20px;background:rgba(182, 182, 251, 0.73);border: 1px solid white;padding: 21px;border-radius:20px;"

    cityName.textContent = obj.city.name;
    if (direction === 'horizontal') {
        daylist.style.cssText = "display:flex; margin: 10px 0"
    }
    
    obj.list.forEach(function(dayItem) {
        let li = document.createElement('li');
        let data = document.createElement('p');
        let temperature = document.createElement('p');
        li.style.cssText = "height: 50px" ;
        temperature.textContent = (dayItem.temp.day + ' °C');
        data.textContent = new Date(dayItem.dt * 1000).toLocaleDateString('ru', {
            month: 'short',
            weekday: 'long',
            day: 'numeric'
        });
        data.style.cssText = "border-bottom:1px solid #99F" 
        li.appendChild(data);
        li.appendChild(temperature);
        daylist.appendChild(li);
    });
    vidget.appendChild(cityName);
    vidget.appendChild(daylist);
    vidgetwrapper.appendChild(vidget)
    body.appendChild(vidgetwrapper)
}
