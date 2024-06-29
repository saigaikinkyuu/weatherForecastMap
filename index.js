var map;

function mapDraw(num) {
    // 地図が既に初期化されているか確認
    if (map !== undefined) {
        // 地図を削除
        map.off();
        map.remove();
    }

    map = L.map('map', {
        zoomControl: false,
        minZoom: 7,
        maxZoom: 9,
    });

    L.control.scale({
        maxWidth: 150,
        position: 'bottomright',
        imperial: false
    }).addTo(map);

    $.getJSON("./prefJson.geojson", function (data) {
        L.geoJson(data, {
            style: {
                "color": "#212192",
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
    map.setView(initialLatLng, 7);

    /*
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

    // AMeDAS データを読み込み、円を追加
    forecastAreas.forEach(function(area) {
        $.getJSON("https://www.jma.go.jp/bosai/forecast/data/forecast/" + area + ".json", function (data) {
            // Processing data
        }).fail(function() {
            console.error("Forecast data for area " + area + " could not be loaded.");
        });
    });
    */
}

function changeMap(i) {
    console.log("C," + i);
    mapDraw(i);
}

function start() {
    mapDraw(1);
}

start();
