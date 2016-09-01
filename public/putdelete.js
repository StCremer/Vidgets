function requestNew(event, method, url, fields, orientation, Vid, callback) {
    if (method === 'put' || method === 'post') {
        var form = event.target.form,
            data = {};
        console.log('fields->', fields)
        fields.forEach(function(formElName, ind, arr) {
            console.log('formElName->', formElName.value)
            data[formElName] = form.elements[formElName].value;
            if (ind + 1 === arr.length) {
                console.log('data->', data)
            };
        })

    }
    var cityId = (event.target.form.elements.city) ? event.target.form.elements.city.value : ''

    var newrequest = new XMLHttpRequest();
    // console.log('url->', url + cityId + cnt, method)
    if (method === 'put' || method === 'delete') { newrequest.open(method, url + ((Vid) ? Vid + '/' : '')) } else {
        newrequest.open(method, url + ((Vid) ? Vid + '/' : '') + ((cityId) ? cityId + '/' : ''))
    }
    newrequest.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
    newrequest.onreadystatechange = function() {
        if (newrequest.readyState === 4) {
            console.log('newrequest.responseText->', newrequest.responseText, 'type->', typeof(newrequest.responseText))
            if (!Array.isArray(callback)) {
                console.log('callback option')
                return
            }
            callback.forEach(function(func) {
                eval(func)
            })
        }
    }
    newrequest.send(encodeFormData(data));
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
