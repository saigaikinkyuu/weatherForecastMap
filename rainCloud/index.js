/*var map = L.map('map').fitWorld();
　map.setView([35.6,139.8], 8);
　map.locate({setView: true, maxZoom: 9});
　function onLocationFound(e) {
    var radius = e.accuracy;
    L.circleMarker(e.latlng,{radius:10,color:'#FF'}).addTo(map);
}
map.on('locationfound', onLocationFound);
// 地図を地理院タイルに設定
$.getJSON("../prefJson.geojson", function (data) {
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
var seamLessPhotoLayer = L.tileLayer('https://cyberjapandata.gsi.go.jp/xyz/seamlessphoto/{z}/{x}/{y}.jpg', {
  attribution: "地理院タイル"
})
seamLessPhotoLayer.addTo(map);
$.getJSON("https://www.jma.go.jp/bosai/jmatile/data/nowc/targetTimes_N1.json", function (data) {
    console.log(data[0].basetime)
    // ナウキャスト雨雲レーダーを地図へ追加
    var baseTime2 = data[0].basetime;
    var validTime2 = data[0].validtime;
    var nowCastLayer = L.tileLayer('https://www.jma.go.jp/bosai/jmatile/data/nowc/' + baseTime2 + '/none/' + validTime2 + '/surf/hrpns/{z}/{x}/{y}.png', {zIndex:20,maxNativeZoom:10,opacity:0.85,
attribution:"雨雲の動き"});
    nowCastLayer.addTo(map);
})
$.getJSON("https://www.jma.go.jp/bosai/himawari/data/satimg/targetTimes_jp.json", function (data) {
    let n = data.length-1
    // 気象衛星ひまわり可視光画像を地図へ追加
    var baseTime3 = data[n].basetime;
    var validTime3 = data[n].validtime;
    var himawariLayer = L.tileLayer('https://www.jma.go.jp/bosai/himawari/data/satimg/' + baseTime3 + '/jp/' + validTime3 + '/REP/ETC/{z}/{x}/{y}.jpg', {zIndex:10,maxNativeZoom:6,maxNativeZoom:6,opacity:0.7,
attribution:"気象衛星ひまわりトゥルーカラー再現画像"});
    himawariLayer.addTo(map);
})
以上が以前のコード*/

var map = L.map('map').fitWorld();
map.setView([35.6, 139.8], 8);
map.locate({ setView: true, maxZoom: 9 });

function onLocationFound(e) {
    var radius = e.accuracy;
    L.circleMarker(e.latlng, { radius: 10, color: '#FF' }).addTo(map);
}
map.on('locationfound', onLocationFound);

// GeoJSONデータを最背面に追加
$.getJSON("../prefJson.geojson", function (data) {
    L.geoJson(data, {
        style: {
            "color": "white",
            "weight": 1.5,
            "opacity": 1,
            "fillColor": "#239423",
            "fillOpacity": 1
        }
    }).addTo(map).setZIndex(1);
}).fail(function() {
    console.error("GeoJSON data could not be loaded.");
});

$.getJSON("https://www.jma.go.jp/bosai/himawari/data/satimg/targetTimes_jp.json", function (data) {
    let n = data.length - 1;
    var baseTime3 = data[n].basetime;
    var validTime3 = data[n].validtime;
    var himawariLayer = L.tileLayer('https://www.jma.go.jp/bosai/himawari/data/satimg/' + baseTime3 + '/jp/' + validTime3 + '/REP/ETC/{z}/{x}/{y}.jpg', {
        zIndex: 2,
        maxNativeZoom: 6,
        opacity: 0.7,
        attribution: "気象衛星ひまわりトゥルーカラー再現画像"
    });
    himawariLayer.addTo(map);
});

$.getJSON("https://www.jma.go.jp/bosai/jmatile/data/nowc/targetTimes_N1.json", function (data) {
    console.log(data[0].basetime);
    var baseTime2 = data[0].basetime;
    var validTime2 = data[0].validtime;
    var nowCastLayer = L.tileLayer('https://www.jma.go.jp/bosai/jmatile/data/nowc/' + baseTime2 + '/none/' + validTime2 + '/surf/hrpns/{z}/{x}/{y}.png', {
        zIndex: 3,
        maxNativeZoom: 10,
        opacity: 0.85,
        attribution: "雨雲の動き"
    });
    nowCastLayer.addTo(map);
});
