function dateChengeToNext() {
  $.getJSON("https://www.jma.go.jp/bosai/forecast/data/forecast/130000.json", function (data) {
    let times = data[0].timeSeries[0].timeDefines
    let number = times.length
    if(Number(document.getElementById("next").dataset.now)+1 <= number-1){
      if(document.getElementById("back").classList.value === "on"){
        document.getElementById("back").classList.replace("on", "off")
      }
      if(Number(document.getElementById("next").dataset.now)+1 == number-1){
        document.getElementById("next").classList.replace("off", "on")
      }
      mapDrawAll(Number(document.getElementById("next").dataset.now)+1)
      document.getElementById("back").dataset.now = Number(document.getElementById("next").dataset.now)+1
      document.getElementById("next").dataset.now = Number(document.getElementById("next").dataset.now)+1
    }
  })
}
function dateChengeToBack() {
  $.getJSON("https://www.jma.go.jp/bosai/forecast/data/forecast/130000.json", function (data) {
    if(Number(document.getElementById("back").dataset.now)-1 >= 0){
      if(document.getElementById("next").classList.value === "on"){
        document.getElementById("next").classList.replace("on", "off")
      }
      if(Number(document.getElementById("back").dataset.now)-1 == 0){
        document.getElementById("back").classList.replace("off", "on")
      }
      mapDrawAll(Number(document.getElementById("back").dataset.now)-1)
      document.getElementById("next").dataset.now = Number(document.getElementById("back").dataset.now)-1
      document.getElementById("back").dataset.now = Number(document.getElementById("back").dataset.now)-1
    }
  })
}
