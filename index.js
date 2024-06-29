var map;

function mapDraw(num) {
    map = L.map('map', {
        zoomControl: false,
        minZoom: 7, // 最低ズームレベルを4に設定
        maxZoom: 9 // 最大ズームレベルを7に設定
    });

    var initialLatLng = L.latLng("35.39", "139.44");
    map.setView(initialLatLng, 7);

    L.control.scale({
        maxWidth: 150,
        position: 'bottomright',
        imperial: false
    }).addTo(map);

    // GeoJSON データを読み込んで地図に追加
    $.getJSON("./prefJson.geojson", function (data) {
        L.geoJson(data, {
            style: {
                "color": "#ffffff",
                "weight": 1.5,
                "opacity": 1,
                "fillColor": "#3a3a3a",
                "fillOpacity": 1
            }
        }).addTo(map);
        L.tileLayer(
                'https://www.jma.go.jp/bosai/himawari/data/nowc/20240528131000/none/20240528131500/surf/hrpns/{z}/{x}/{y}.png', {}).addTo(map);
        
        var currentTime = new Date();
        var currentMin = ('0' + currentTime.getMinutes()).slice(-2);
        var currentHour = currentTime.getHours();
        var currentYear = currentTime.getFullYear();
        var currentMonth = ('0' + (currentTime.getMonth() + 1)).slice(-2);
        var currentDay = ('0' + currentTime.getDate()).slice(-2);
        var min = 0
        if(currentMin.slice(0,1) === 0 || currentMin.slice(1,2) <= 7){
            currentHour -= 1
            min = currentMin.slice(0,1)-1
            if(min < 0){
                min = 5
            }
            if(currentHour < 0){
                currentHour += 23
                currentDay -= 1
                if(currentDay <= 0){
                    currentMonth -= 1
                    currentDay = new Date(currentYear, currentMonth, 0).getDate();
                    if(currentMonth <= 0){
                        currentMonth += 12
                        currentYear -= 1
                    }
                }
            }
        }else {
            min = currentMin.slice(0,1)
        }

        var forecastAreas = ["016000","014100","040000","130000","150000","170000","230000","270000","340000","390000","400000","460100","471000"]

        // AMeDAS データを読み込み、円を追加
        for(var a = 0;a<forecastAreas.length;a++){
            $.getJSON("https://www.jma.go.jp/bosai/forecast/data/forecast/" + forecastAreas[a] + ".json", function (data) {
                function formatDate(date) {
                    var year = date.getFullYear();
                    var month = ('0' + (date.getMonth() + 1)).slice(-2);
                    var day = ('0' + date.getDate()).slice(-2);
                    var hours = ('0' + date.getHours()).slice(-2);
                    var minutes = ('0' + date.getMinutes()).slice(-2);
                    var seconds = ('0' + date.getSeconds()).slice(-2);
                    return year + '年' + month + '月' + day + '日';
                }
            });
        }
    });
}

function changeMap(i) {
    console.log("C,"+i)
    map.remove();
    mapDraw(i);
}

function start() {
    mapDraw(1);
}

start();
