var map = L.map('map').fitWorld();
　map.setView([35.6,139.8], 8);
　map.locate({setView: true, maxZoom: 9});
　function onLocationFound(e) {
    var radius = e.accuracy;
    L.circleMarker(e.latlng,{radius:10,color:'#FF'}).addTo(map);
}
map.on('locationfound', onLocationFound);
// 地図を地理院タイルに設定
var seamLessPhotoLayer = L.tileLayer('https://cyberjapandata.gsi.go.jp/xyz/seamlessphoto/{z}/{x}/{y}.jpg', {
  attribution: "地理院タイル"
})
seamLessPhotoLayer.addTo(map);
// ナウキャスト雨雲レーダーを地図へ追加
var baseTime2 = <?php echo $baseTime;?>;
var validTime2 = <?php echo $validTime;?>;
var nowCastLayer = L.tileLayer(`https://www.jma.go.jp/bosai/jmatile/data/nowc/${baseTime2}/none/${validTime2}/surf/hrpns/{z}/{x}/{y}.png`, {zIndex:20,maxNativeZoom:10,opacity:0.85,
attribution:"雨雲の動き"});
nowCastLayer.addTo(map);
// 気象衛星ひまわり画像を地図へ追加
var baseTime3 = <?php echo $baseTime1; ?>;
var validTime3 = <?php echo $validTime1; ?>;
var himawariLayer = L.tileLayer(`https://www.jma.go.jp/bosai/himawari/data/satimg/${baseTime3}/jp/${validTime3}/REP/ETC/{z}/{x}/{y}.jpg`, {zIndex:10,maxNativeZoom:6,maxNativeZoom:6,opacity:0.7,
attribution:"気象衛星ひまわりトゥルーカラー再現画像"});
himawariLayer.addTo(map);
