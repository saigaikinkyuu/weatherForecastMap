function dateChengeToNext() {
  $.getJSON("https://www.jma.go.jp/bosai/forecast/data/forecast/130000.json", function (data) {
    let times = data[0].timeSeries[0].timeDefines
    let number = times.length
    if(Number(document.getElementById("next").datest.now)+1 <= number-1){
      drawMapAll(Number(document.getElementById("next").datest.now)+1)
      document.getElementById("next").datest.now = Number(document.getElementById("next").datest.now)+1
      document.getElementById("back").datest.now = Number(document.getElementById("next").datest.now)+1
    }
  })
}
function dateChengeToBack() {
  $.getJSON("https://www.jma.go.jp/bosai/forecast/data/forecast/130000.json", function (data) {
    if(Number(document.getElementById("back").datest.now)-1 >= 0){
      drawMapAll(Number(document.getElementById("back").datest.now)-1)
      document.getElementById("back").datest.now = Number(document.getElementById("back").datest.now)-1
      document.getElementById("next").datest.now = Number(document.getElementById("back").datest.now)-1
    }
  })
}
