var map;

function mapDrawAll(d) {
    // 地図が既に初期化されているか確認
    if (map !== undefined) {
        // 地図を削除
        map.off();
        map.remove();
    }

    map = L.map('map', {
        zoomControl: false,
        minZoom: 6,
        maxZoom: 6,
    });

    L.control.scale({
        maxWidth: 150,
        position: 'bottomright',
        imperial: false
    }).addTo(map);

    $.getJSON("./prefJson.geojson", function (data) {
        L.geoJson(data, {
            style: {
                "color": "white",
                "weight": 1.5,
                "opacity": 1,
                "fillColor": "#239423",
                "fillOpacity": 1
            }
        }).addTo(map);
    }).fail(function() {
        console.error("GeoJSON data could not be loaded.");
    });

    var initialLatLng = L.latLng(36.00, 137.59);
    map.setView(initialLatLng, 6);

    var currentTime = new Date();
    var currentMin = ('0' + currentTime.getMinutes()).slice(-2);
    var currentHour = currentTime.getHours();
    var currentYear = currentTime.getFullYear();
    var currentMonth = ('0' + (currentTime.getMonth() + 1)).slice(-2);
    var currentDay = ('0' + currentTime.getDate()).slice(-2);

    if (currentMin.slice(0,1) === "0" || currentMin.slice(1,2) <= 7) {
        currentHour -= 1;
        currentMin = "5";
        if (currentHour < 0) {
            currentHour = 23;
            currentDay -= 1;
            if (currentDay <= 0) {
                currentMonth -= 1;
                currentDay = new Date(currentYear, currentMonth, 0).getDate();
                if (currentMonth <= 0) {
                    currentMonth = 12;
                    currentYear -= 1;
                }
            }
        }
    } else {
        currentMin = currentMin.slice(0,1);
    }

    var forecastAreas = ["016000","014100","040000","130000","150000","170000","230000","270000","340000","390000","400000","460100","471000"];
    var iconPlace = [["札幌", 43.934122, 139.993943],["釧路", 42.042173, 144.786549],["仙台", 38.072153, 142.818724],["東京", 35.711801, 141.580899],["新潟", 38.122108, 137.359597],["石川", 36.79951118421221, 135.70916353413136],["名古屋", 34.40904120950989, 139.1211179431347],["大阪", 33.531133055984306, 136.0424242037967],["広島", 35.350192, 131.868731],["高知", 32.9204809735311, 132.88438265229934],["福岡", 33.213064, 128.361559],["鹿児島", 31.591914, 129.361341],["那覇", 25.332519, 128.615472]]
    var a = 0
    var dateSet = ""
    function date(newDate){
        let year = new Date(newDate).getFullYear()
        let month = ("0" + (new Date(newDate).getMonth() + 1)).slice(-2)
        let date = ("0" + new Date(newDate).getDate()).slice(-2)
        let hour = ("0" + new Date(newDate).getHours()).slice(-2)
        return year + "年" + month + "月" + date + "日 " + hour + "時"
    }

    // AMeDAS データを読み込み、円を追加
    forecastAreas.forEach(function(area) {
        $.getJSON("https://www.jma.go.jp/bosai/forecast/data/forecast/" + area + ".json", function (data) {
            document.getElementById('date').innerHTML = date(data[0].timeSeries[0].timeDefines[d]) + "の全国の天気"
            dateSet = date(data[0].timeSeries[0].timeDefines[d])
            if(date(data[0].timeSeries[0].timeDefines[d]) !== dateSet){
                alert("天気予報日が地域ごとに違います。")
            }
            var forecastLatLng = new L.LatLng(iconPlace[a][1], iconPlace[a][2]);
            var forecastIconImage = L.icon({
                iconUrl: 'png/place/' + iconPlace[a][0] + '.png',
                iconSize: [128, 72],//16:9
                iconAnchor: [80, 45],
                popupAnchor: [0, -40],
                zIndexOffset: 1000
            });
            var forecastIcon = L.marker(forecastLatLng, {icon: forecastIconImage }).addTo(map);
            let weatherCode = Number(data[0].timeSeries[0].areas[0].weatherCodes[d])
            let weatherIcon = ""
            if(weatherCode === 100){
                weatherIcon = "晴れ"
            }else if(weatherCode === 101){
                weatherIcon = "晴れ時々曇"
            }else if(weatherCode === 102){
                weatherIcon = "晴れ一時雨"
            }else if(weatherCode === 103){
                weatherIcon = "晴れ一時雨"
            }else if(weatherCode === 104){
                weatherIcon = "晴れ一時雪"
            }else if(weatherCode === 105){
                weatherIcon = "晴れ一時雪"
            }else if(weatherCode === 106){
                weatherIcon = "晴れ一時雨"
            }else if(weatherCode === 107){
                weatherIcon = "晴れ一時雨"
            }else if(weatherCode === 108){
                weatherIcon = "晴れ一時雨"
            }else if(weatherCode === 110){
                weatherIcon = "晴れのち時々曇"
            }else if(weatherCode === 111){
                weatherIcon = "晴れのち時々曇"
            }else if(weatherCode === 112){
                weatherIcon = "晴れのち時々雨"
            }else if(weatherCode === 113){
                weatherIcon = "晴れのち時々雨"
            }else if(weatherCode === 114){
                weatherIcon = "晴れのち時々雨"
            }else if(weatherCode === 115){
                weatherIcon = "晴れのち時々雪"
            }else if(weatherCode === 116){
                weatherIcon = "晴れのち時々雪"
            }else if(weatherCode === 117){
                weatherIcon = "晴れのち時々雪"
            }else if(weatherCode === 118){
                weatherIcon = "晴れのち時々雪"
            }else if(weatherCode === 119){
                weatherIcon = "晴れのち時々雨"
            }else if(weatherCode === 120){
                weatherIcon = "晴れ一時雨"
            }else if(weatherCode === 121){
                weatherIcon = "晴れ一時雨"
            }else if(weatherCode === 122){
                weatherIcon = "晴れ一時雨"
            }else if(weatherCode === 123){
                weatherIcon = "晴れ一時雨"
            }else if(weatherCode === 124){
                weatherIcon = "晴れ一時雪"
            }else if(weatherCode === 125){
                weatherIcon = "晴れのち時々雨"
            }else if(weatherCode === 126){
                weatherIcon = "晴れのち時々雨"
            }else if(weatherCode === 127){
                weatherIcon = "晴れのち時々雨"
            }else if(weatherCode === 128){
                weatherIcon = "晴れのち時々雨"
            }else if(weatherCode === 130){
                weatherIcon = "晴れ"
            }else if(weatherCode === 131){
                weatherIcon = "晴れ"
            }else if(weatherCode === 132){
                weatherIcon = "晴れのち時々曇"
            }else if(weatherCode === 140){
                weatherIcon = "晴れ一時雨"
            }else if(weatherCode === 160){
                weatherIcon = "晴れ一時雪"
            }else if(weatherCode === 170){
                weatherIcon = "晴れ一時雪"
            }else if(weatherCode === 181){
                weatherIcon = "晴れのち時々雪"
            }else if(weatherCode === 200){
                weatherIcon = "曇"
            }else if(weatherCode === 201){
                weatherIcon = "曇時々晴れ"
            }else if(weatherCode === 202){
                weatherIcon = "曇時々雨"
            }else if(weatherCode === 203){
                weatherIcon = "曇時々雨"
            }else if(weatherCode === 204){
                weatherIcon = "曇時々雪"
            }else if(weatherCode === 205){
                weatherIcon = "曇時々雪"
            }else if(weatherCode === 206){
                weatherIcon = "曇時々雪"
            }else if(weatherCode === 207){
                weatherIcon = "曇時々雪"
            }else if(weatherCode === 208){
                weatherIcon = "曇時々雨"
            }else if(weatherCode === 209){
                weatherIcon = "曇"
            }else if(weatherCode === 210){
                weatherIcon = "曇のち時々晴れ"
            }else if(weatherCode === 211){
                weatherIcon = "曇のち時々晴れ"
            }else if(weatherCode === 212){
                weatherIcon = "曇のち時々雨"
            }else if(weatherCode === 213){
                weatherIcon = "曇のち時々雨"
            }else if(weatherCode === 214){
                weatherIcon = "曇のち時々雨"
            }else if(weatherCode === 215){
                weatherIcon = "曇のち時々雪"
            }else if(weatherCode === 216){
                weatherIcon = "曇のち時々雪"
            }else if(weatherCode === 217){
                weatherIcon = "曇のち時々雪"
            }else if(weatherCode === 218){
                weatherIcon = "曇のち時々雪"
            }else if(weatherCode === 219){
                weatherIcon = "曇のち時々雨"
            }else if(weatherCode === 220){
                weatherIcon = "曇時々雨"
            }else if(weatherCode === 221){
                weatherIcon = "曇時々雨"
            }else if(weatherCode === 222){
                weatherIcon = "曇時々雨"
            }else if(weatherCode === 223){
                weatherIcon = "曇時々晴れ"
            }else if(weatherCode === 224){
                weatherIcon = "曇のち時々雨"
            }else if(weatherCode === 225){
                weatherIcon = "曇のち時々雨"
            }else if(weatherCode === 226){
                weatherIcon = "曇のち時々雨"
            }else if(weatherCode === 228){
                weatherIcon = "曇のち時々雪"
            }else if(weatherCode === 229){
                weatherIcon = "曇のち時々雪"
            }else if(weatherCode === 230){
                weatherIcon = "曇のち時々雪"
            }else if(weatherCode === 231){
                weatherIcon = "曇時々雨"
            }else if(weatherCode === 240){
                weatherIcon = "曇時々雨"
            }else if(weatherCode === 250){
                weatherIcon = "曇時々雪"
            }else if(weatherCode === 260){
                weatherIcon = "曇時々雪"
            }else if(weatherCode === 270){
                weatherIcon = "曇時々雪"
            }else if(weatherCode === 281){
                weatherIcon = "曇のち時々雪"
            }else if(weatherCode === 300){
                weatherIcon = "雨"
            }else if(weatherCode === 301){
                weatherIcon = "雨時々晴れ"
            }else if(weatherCode === 302){
                weatherIcon = "雨時々止む"
            }else if(weatherCode === 303){
                weatherIcon = "雨時々雪"
            }else if(weatherCode === 304){
                weatherIcon = "みぞれ"
            }else if(weatherCode === 306){
                weatherIcon = "大雨"
            }else if(weatherCode === 307){
                weatherIcon = "雨"
            }else if(weatherCode === 309){
                weatherIcon = "雨時々雪"
            }else if(weatherCode === 311){
                weatherIcon = "雨のち晴れ"
            }else if(weatherCode === 313){
                weatherIcon = "雨のち曇"
            }else if(weatherCode === 314){
                weatherIcon = "雨のち雪"
            }else if(weatherCode === 315){
                weatherIcon = "雨のち雪"
            }else if(weatherCode === 316){
                weatherIcon = "雨のち晴れ"
            }else if(weatherCode === 317){
                weatherIcon = "雨のち曇"
            }else if(weatherCode === 320){
                weatherIcon = "雨のち晴れ"
            }else if(weatherCode === 321){
                weatherIcon = "雨のち曇"
            }else if(weatherCode === 322){
                weatherIcon = "雨時々雪"
            }else if(weatherCode === 323){
                weatherIcon = "雨のち晴れ"
            }else if(weatherCode === 324){
                weatherIcon = "雨のち晴れ"
            }else if(weatherCode === 325){
                weatherIcon = "雨のち晴れ"
            }else if(weatherCode === 326){
                weatherIcon = "雨のち雪"
            }else if(weatherCode === 327){
                weatherIcon = "雨のち雪"
            }else if(weatherCode === 328){
                weatherIcon = "大雨"
            }else if(weatherCode === 329){
                weatherIcon = "みぞれ"
            }else if(weatherCode === 340){
                weatherIcon = "雪"
            }else if(weatherCode === 350){
                weatherIcon = "雨"
            }else if(weatherCode === 361){
                weatherIcon = "雨のち晴れ"
            }else if(weatherCode === 371){
                weatherIcon = "雨のち曇"
            }else if(weatherCode === 400){
                weatherIcon = "雪"
            }else if(weatherCode === 401){
                weatherIcon = "雪時々晴れ"
            }else if(weatherCode === 402){
                weatherIcon = "雪時々止む"
            }else if(weatherCode === 403){
                weatherIcon = "雪時々雨"
            }else if(weatherCode === 404){
                weatherIcon = "大雪"//後画像追加
            }else if(weatherCode === 406){
                weatherIcon = "大雪"
            }else if(weatherCode === 407){
                weatherIcon = "大雪"
            }else if(weatherCode === 409){
                weatherIcon = "雪時々雨"
            }else if(weatherCode === 411){
                weatherIcon = "雪のち晴れ"
            }else if(weatherCode === 413){
                weatherIcon = "雪のち曇"
            }else if(weatherCode === 414){
                weatherIcon = "雪のち雨"
            }else if(weatherCode === 420){
                weatherIcon = "雪のち晴れ"
            }else if(weatherCode === 421){
                weatherIcon = "雪のち曇"
            }else if(weatherCode === 422){
                weatherIcon = "雪のち雨"
            }else if(weatherCode === 423){
                weatherIcon = "雪のち雨"
            }else if(weatherCode === 425){
                weatherIcon = "大雪"
            }else if(weatherCode === 426){
                weatherIcon = "雪のちみぞれ"
            }else if(weatherCode === 427){
                weatherIcon = "雪時々みぞれ"
            }else if(weatherCode === 450){
                weatherIcon = "雪"
            }else {
                weatherIcon = "不明"
            }
            var weatherLatLng = new L.LatLng(iconPlace[a][1], iconPlace[a][2]);
            var weatherIconImage = L.icon({
                iconUrl: 'png/' + weatherIcon + '.png',
                iconSize: [91, 51.1],//16:9
                iconAnchor: [80, 24.1],
                popupAnchor: [0, -40],
                zIndexOffset: 10000
            });
            var temp1 = L.divIcon({
                html: data[1].tempAverage.areas[0].max,
                className: 'maxTemp',
                iconSize: [30,20],
                iconAnchor: [-12,22],
                popupAnchor: [0, -10]
            });
            var temp2 = L.divIcon({
                html: data[1].tempAverage.areas[0].min,
                className: 'minTemp',
                iconSize: [30,20],
                iconAnchor: [-12,-3],
                popupAnchor: [0, -10]
            });
            var weatherIconInMap = L.marker(weatherLatLng, {icon: weatherIconImage }).addTo(map);
            var temp1IconInMap = L.marker(weatherLatLng, {icon: temp1 }).addTo(map);
            var temp2IconInMap = L.marker(weatherLatLng, {icon: temp2 }).addTo(map);
            a++
        }).fail(function() {
            console.error("Forecast data for area " + area + " could not be loaded.");
        });
    });
}

function changeMap(i) {
    mapDrawAll(0);
}

function start() {
    mapDrawAll(0);
}

start();
