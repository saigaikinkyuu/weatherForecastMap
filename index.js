var map;

function mapDrawAll() {
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
    var iconPlace = [["札幌", 43.934122, 139.993943],["釧路", 42.042173, 144.786549],["仙台", 38.072153, 142.818724],["東京", 35.711801, 141.580899],["新潟", 38.122108, 137.359597],["石川", 36.79951118421221, 135.70916353413136],["名古屋", 34.50448441702661, 137.70872753134768],["大阪", 33.531133055984306, 136.0424242037967],["広島", 35.350192, 131.868731],["高知", 32.9204809735311, 132.88438265229934],["福岡", 33.213064, 128.361559],["鹿児島", 31.591914, 129.361341],["沖縄", 26.332519, 128.615472]]
    var a = 0

    // AMeDAS データを読み込み、円を追加
    forecastAreas.forEach(function(area) {
        $.getJSON("https://www.jma.go.jp/bosai/forecast/data/forecast/" + area + ".json", function (data) {
            var forecastLatLng = new L.LatLng(iconPlace[a][1], iconPlace[a][2]);
            var forecastIconImage = L.icon({
                iconUrl: 'png/place/' + iconPlace[a][0] + '.png',
                iconSize: [128, 72],//16:9
                iconAnchor: [80, 45],
                popupAnchor: [0, -40],
                zIndexOffset: 10000
            });
            var forecastIcon = L.marker(forecastLatLng, {icon: forecastIconImage }).addTo(map);
            a++
        }).fail(function() {
            console.error("Forecast data for area " + area + " could not be loaded.");
        });
    });
}

function changeMap(i) {
    console.log("C," + i);
    mapDraw(i);
}

function start() {
    mapDrawAll();
}

start();
