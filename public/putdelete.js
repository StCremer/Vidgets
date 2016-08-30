function putdelete(event, method, url, Vid) {
    console.log(event.target.form)
    if (method === 'put' || method === 'post') {
        var formObj = event.target.form,
            rangeofdates = formObj.elements.rangeofdates.value,
            cityId = formObj.elements.city.value,
            orientation = formObj.elements.orientation.value,
            obj = {
                city: cityId,
                rangeofdates: rangeofdates,
                orientation: orientation
            }
        console.log('obj->', obj)

    }
    var putdeletereq = new XMLHttpRequest();
    putdeletereq.open(method, url + Vid)
    putdeletereq.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
    putdeletereq.onreadystatechange = function() {
        if (putdeletereq.readyState === 4) {
            alert(putdeletereq.responseText)
            getWeather(cityId, rangeofdates)
            displayScript(cityId, rangeofdates)
                // vidgetViewinsert(JSON.parse(putdelete.responseText),Vid);
        }
    }

    putdeletereq.send(encodeFormData(obj));
}


function encodeFormData(data) {
    if (!data) return "";
    var pairs = [];
    for (var name in data) {
        if (!data.hasOwnProperty(name)) continue;
        if (typeof data[name] === "function") continue;
        var value = data[name].toString();
        name = encodeURIComponent(name.replace("%20", "+"));
        value = encodeURIComponent(value.replace("%20", "+"));
        pairs.push(name + "=" + value);
    }
    return pairs.join('&');
}

function requestNew(event, method, url, fields, Vid, callback) {
    console.log('requestNew event.target.form->', event.target.form)
    console.log('document.forms.createVidget->',document.forms.createVidget) 
    if (method === 'put' || method === 'post') {
        var form = event.target.form,
            data = {};
            console.log('fields->',fields) 
        fields.forEach(function(formElName, ind, arr) {
        	console.log('formElName->',formElName.value) 
            data[formElName] = form.elements[formElName].value;
            if(ind+1 === arr.length){console.log('data->', data)};
        })

    }
    var newrequest = new XMLHttpRequest();
    console.log('url->',url)
    newrequest.open(method, url + ((Vid) ? Vid : ''))
    newrequest.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
    newrequest.onreadystatechange = function() {
        if (newrequest.readyState === 4) {
            alert(newrequest.responseText)
            if (!Array.isArray(callback)) {
                console.log('callback option')
                return
            }
            callback.forEach(function(func){
            	func()
            })
        }
    }
    newrequest.send(encodeFormData(data));
}
