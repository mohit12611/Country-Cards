var data = fetch("https://restcountries.eu/rest/v2/all");
console.log(typeof data);
console.log(data);

data
  .then(function (res) {
    return res.json();
  })
  .then(function (res) {
    var allCountryData = res;
    console.log(allCountryData);

    let apiKey = "8422a4b2ef4477c65826b8093af600e3";

    let container = document.querySelector(".container");

    let count = 3;
    for (let i of allCountryData) {
        
        if(count%3 ===0){
            var row = document.createElement("div");
            row.setAttribute("class","row");
            row.setAttribute("id",`r${count}`);
            var setCount = count;
        }

        let col = document.createElement("div");
        col.setAttribute("class","col-lg-4 col-md-4 col-sm-12");

        let card = document.createElement("div");
        card.setAttribute("class", "card");

        let cardHeader = document.createElement("div");
        cardHeader.setAttribute("class","card-header");
        cardHeader.innerHTML = "<h5>"+ i.name+"</h5>";

        let image = document.createElement("img");
        image.setAttribute("class", "card-img-top");
        image.setAttribute("src", i.flag);

        let cardBody = document.createElement("div");
        cardBody.setAttribute("class", "card-body");

        let p1 = document.createElement("p");
        p1.innerHTML = "<b>Capital</b> "+ i.capital ;

        let p2 = document.createElement("p");
        p2.innerHTML = "<b>Region : </b>" + i.region;

        let p3 = document.createElement("p");
        p3.innerHTML = "<b>Country Code : </b>" + i.alpha3Code;



        let button = document.createElement("a");
        button.setAttribute("class", "btn btn -primary");
        button.innerHTML = "<b>Wheather Report</b>";
        button.addEventListener("click",getWeatherData);

        function getWeatherData(){
          let weatherData = fetch("https://api.openweathermap.org/data/2.5/weather?q="+i.capital+"&appid="+apiKey)
          weatherData.then(data => data.json()).then( data => {
            console.log(data);
            console.log(typeof data);
            alert("Longitude : "+ data.coord.lon+"\nLatitude : "+data.coord.lat+"\nMinimum Temperature : "+data.main.temp_min+"\nMaximum Temperature : "+data.main.temp_max+"\nPreasure : "+data.main.pressure+"\nHumidity : "+data.main.humidity);
          }).catch(err=> console.log(err));
        }


        cardBody.append(p1, p2, p3, button);
        card.append(cardHeader, image, cardBody);
        col.append(card);
        row.append(col);
        container.append(row);
      
        count++;
    }
  })
  .catch(function (err) {
    console.log(err);
  });



  