'use strict'

function getVidget(event, method, url, fields, Vid, callback) {
    var orientation = event.target.form.elements.orientation.value,
        rangeofdates = event.target.form.elements.rangeofdates.value,
        cityId = event.target.form.elements.city.value


    requestNew(event, method, url, fields, orientation, Vid, callback)
    displayScript(cityId, rangeofdates, orientation)
        // let form = document.forms.createVidget,
        //     cityId = form.city.value,
        //     rangeofdates = form.rangeofdates.value,
        //     orientation = form.orientation.value
        // console.log(form.elements)
        // getWeather(cityId, rangeofdates, orientation)
        // displayScript(cityId, rangeofdates, orientation)

    // console.log('cityId->', cityId, '\n rangeofdates->', rangeofdates, '\n orientation->', orientation)
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


function vidget(resp, orientation, Vid) {
    console.log('resp->', resp, '<-->', typeof(resp));
    var obj = JSON.parse(resp).forecast;
    // var obj=resp;
    console.log('obj->', obj, '<-->', typeof(obj));
    var body = document.body;
    var vidgetwrapper = document.createElement('div')
    var cityName = document.createElement('p');
    var daylist = document.createElement('ul');
    if (location.pathname === '/vidgets/all') {

        var vidget = document.createElement('a');
        vidget.href = '/vidget/' + Vid

        vidget.style.cssText = "display:block;right: 50px;top: 20px;background:rgba(182, 182, 251, 0.73);border: 1px solid white;padding: 21px;border-radius:20px;"
    } else {
        var vidget = document.createElement('div');

        vidget.style.cssText = "right: 50px;top: 20px;background:rgba(182, 182, 251, 0.73);border: 1px solid white;padding: 21px;border-radius:20px;"
    }

    vidgetwrapper.classList.add('well', 'col-md-8', 'col-md-offset-2', 'clearfix')
    vidgetwrapper.style.cssText = "clear:both"


    cityName.textContent = obj.city.name;
    if (orientation === 'horizontal') {
        daylist.style.cssText = "display:flex; margin: 10px 0"
    }

    obj.list.forEach(function(dayItem) {
        let li = document.createElement('li');
        let data = document.createElement('p');
        let temperature = document.createElement('p');
        li.style.cssText = "height: 50px";
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

function getWeather(cityid, daysr, Vid, orientation) {
    let weatherreq = new XMLHttpRequest();
    weatherreq.open('GET', '/forecast/' + cityid);
    weatherreq.onreadystatechange = function() {
        if (weatherreq.readyState === 4) {
            console.log(JSON.parse(weatherreq.responseText))
            console.log(weatherreq.responseText)
            console.log(typeof(weatherreq.responseText))
            vidget(weatherreq.responseText, orientation, Vid);
        };
    };
    weatherreq.send(null);
};
