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

var map
var rcArray = []
var stopFlag = true
var cloudId = 0
map = L.map('map', {
    zoomControl: false
});
L.control.scale({
    maxWidth: 150,
    position: 'bottomright',
    imperial: false
}).addTo(map);
map.setView([35.6, 139.8], 8);
map.locate({ setView: true, maxZoom: 9 });

function onLocationFound(e) {
    var radius = e.accuracy;
    L.circleMarker(e.latlng, { radius: 10, color: '#FF' }).addTo(map);
}
map.on('locationfound', onLocationFound);
var lineRain = map.createPane('lineRain');

// GeoJSONデータを最背面に追加
$.getJSON("../prefJson.geojson", function (data) {
    L.geoJson(data, {
        style: {
            "color": "#ffff4a",
            "weight": 2,
            "opacity": 1,
            "fillColor": "rgba(0, 0, 0, 0)",
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
    var hour_json = Number((data[0].basetime).slice(8,10)) + 9
    if(hour_json > 23){
      hour_json = hour_json - 24
    }
    document.getElementById("date").innerHTML = (data[0].basetime).slice(0,4) + "年" + (data[0].basetime).slice(4,6) + "月" + (data[0].basetime).slice(6,8) + "日 " + "<input id='inputTime1' class='timeInput' type='number' value='" + ("0" + hour_json).slice(-2) + "'>" + "時" + "<input id='inputTime2' class='timeInput' type='number' value='" + (data[0].basetime).slice(10,12) + "'>分"
    for(var i = 0;i<data.length + 12;i++){
      if(i>(data.length-1)){
        if(Number((data[0].basetime).slice(10,12)) + 5*(i - (data.length-1)) > 55){
          let baseTime = (data[0].basetime).slice(0,8) + "" + ("0" + (Number((data[0].basetime).slice(8,10))+1)).slice(-2) + ("0" + ((Number((data[0].basetime).slice(10,12)) + (5*(i - (data.length-1)))) - 60)).slice(-2) + "00"
          rcArray.push([baseTime2,baseTime])
        }else {
          let baseTime = (data[0].basetime).slice(0,8) + "" + ("0" + (data[0].basetime).slice(8,10)).slice(-2) + ("0" + (Number((data[0].basetime).slice(10,12)) + (5*(i - (data.length-1))))).slice(-2) + "00"
          rcArray.push([baseTime2,baseTime])
        }
      }else {
        rcArray.unshift([data[i].basetime,data[i].validtime])
      }
    }
    var nowCastLayer = L.tileLayer('https://www.jma.go.jp/bosai/jmatile/data/nowc/' + baseTime2 + '/none/' + validTime2 + '/surf/hrpns/{z}/{x}/{y}.png', {
        zIndex: 3,
        maxNativeZoom: 10,
        opacity: 0.85,
        attribution: "雨雲の動き",
        pane: "lineRain"
    });
    nowCastLayer.addTo(map);
});

function dateSend(){
  stopFlag = true
  stopFlag = false
  const interval = setInterval(function() {
    if(stopFlag === true){
      clearInterval(interval);
    }else {
      cloudId++
      if(cloudId >= rcArray.length){
        cloudId = 1
      }
      let data = [rcArray[cloudId-1][1]]
      var hour_json = Number((data[0]).slice(8,10)) + 9
      if(hour_json > 23){
        hour_json = hour_json - 24
      }
      document.getElementsByClassName("leaflet-pane leaflet-lineRain-pane")[0].textContent = ""
      document.getElementById("date").textContent = (data[0]).slice(0,4) + "年" + (data[0]).slice(4,6) + "月" + (data[0]).slice(6,8) + "日 " + ("0" + hour_json).slice(-2) + "時" + (data[0]).slice(10,12) + "分"
      var nowCastLayer = L.tileLayer('https://www.jma.go.jp/bosai/jmatile/data/nowc/' + rcArray[cloudId-1][0] + '/none/' + rcArray[cloudId-1][1] + '/surf/hrpns/{z}/{x}/{y}.png', {
        zIndex: 3,
        maxNativeZoom: 10,
        opacity: 0.85,
        attribution: "雨雲の動き",
        pane: "lineRain"
      });
      nowCastLayer.addTo(map);
    }
  }, 2000)
}

function dateStop(){
  stopFlag = true
}

function dateBack(){
  stopFlag = true
  stopFlag = false
  const interval = setInterval(function() {
    if(stopFlag === true){
      clearInterval(interval);
    }else {
      cloudId = cloudId - 1
      if(cloudId < 1){
        cloudId = rcArray.length + 1
      }
      let data = [rcArray[cloudId-1][1]]
      var hour_json = Number((data[0]).slice(8,10)) + 9
      if(hour_json > 23){
        hour_json = hour_json - 24
      }
      document.getElementsByClassName("leaflet-pane leaflet-lineRain-pane")[0].textContent = ""
      document.getElementById("date").textContent = (data[0]).slice(0,4) + "年" + (data[0]).slice(4,6) + "月" + (data[0]).slice(6,8) + "日 " + ("0" + hour_json).slice(-2) + "時" + (data[0]).slice(10,12) + "分"
      var nowCastLayer = L.tileLayer('https://www.jma.go.jp/bosai/jmatile/data/nowc/' + rcArray[cloudId-1][0] + '/none/' + rcArray[cloudId-1][1] + '/surf/hrpns/{z}/{x}/{y}.png', {
        zIndex: 3,
        maxNativeZoom: 10,
        opacity: 0.85,
        attribution: "雨雲の動き",
        pane: "lineRain"
      });
      nowCastLayer.addTo(map);
    }
  }, 2000)
}
