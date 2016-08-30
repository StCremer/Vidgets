'use strict'

function getWeather(cityid, daysr, Vid, direction) {
    let weatherreq = new XMLHttpRequest();
    weatherreq.open("GET", 'http://api.openweathermap.org/data/2.5/forecast/daily?id=' + cityid + '&cnt=' + daysr + '&units=metric&lang=ru&APPID=f2dadcd28fb0f97c3c249b050975a9d4');
    weatherreq.onreadystatechange = function() {
        if (weatherreq.readyState === 4) {
            console.log(JSON.parse(weatherreq.responseText))
            vidgetViewinsert(JSON.parse(weatherreq.responseText), Vid, direction);
        }
    }
    weatherreq.send(null);
}

// function vidgetViewinsert(obj, Vid, direction) {
//     console.log(direction)
//     let vidget = document.createElement('a'),
//         body = document.body,
//         cityName = document.createElement('p'),
//         daylist = document.createElement('ul')

//     vidget.classList.add('vidget', 'well', 'clearfix', 'col-md-8', 'col-md-offset-2')
//     vidget.href = '/vidget/' + Vid

//     daylist.classList.add('clearfix', 'list-group')
//     if (direction == 'horizontal') {
//         console.log('true')
//         daylist.style.cssText = "display:flex"
//     }

//     cityName.textContent = obj.city.name

//     obj.list.forEach(function(dayItem) {
//         let li = document.createElement('li'),
//             data = document.createElement('p'),
//             temperature = document.createElement('p')

//         li.classList.add('listItem', 'well')

//         temperature.textContent = dayItem.temp.day + ' °C'
//         console.log(new Date(dayItem.dt * 1000))
//         data.textContent = new Date(dayItem.dt * 1000).toLocaleDateString('ru', { month: 'short', weekday: 'long', day: 'numeric' })

//         li.appendChild(data)
//         li.appendChild(temperature)
//             // dayItem.dt.toLocaleTimeString('ru',{hour:'numeric',minute:'numeric'})

//         daylist.appendChild(li)
//     })
//     vidget.appendChild(cityName)
//     vidget.appendChild(daylist)

//     body.appendChild(vidget)

// }


function vidgetViewinsert(obj, Vid, direction) {
    console.log(direction)
    let vidget = document.createElement('a'),
        body = document.body,
        cityName = document.createElement('p'),
        daylist = document.createElement('ul')

    vidget.style.cssText = "display: table;background:rgba(182, 182, 251, 0.73);border: 1px solid white;padding: 21px;border-radius:20px;clear:both"
    vidget.classList.add('well','col-md-offset-2','clearfix')
    vidget.href = '/vidget/' + Vid

    daylist.classList.add('clearfix', 'list-group')
    if (direction == 'horizontal') {
        daylist.style.cssText = "display:flex"
    }

    cityName.textContent = obj.city.name

    obj.list.forEach(function(dayItem) {
            let li = document.createElement('li'),
                data = document.createElement('p'),
                temperature = document.createElement('p');
            li.style.cssText = "height: 50px";
            temperature.textContent = (dayItem.temp.day + ' °C')
            data.textContent = new Date(dayItem.dt * 1000).toLocaleDateString('ru', {
                month: 'short',
                weekday: 'long',
                day: 'numeric'
            })
            li.appendChild(data)
            li.appendChild(temperature)
            daylist.appendChild(li);
        });
    vidget.appendChild(cityName)
    vidget.appendChild(daylist)

    body.appendChild(vidget)

}