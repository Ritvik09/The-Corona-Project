//----------------navbar----------------
const navSlide = () => {
    const burger = document.querySelector('.burger');
    const nav = document.querySelector('nav ul');
    const navLinks = document.querySelectorAll('nav ul li');
    burger.addEventListener('click', () => {
    //Toggle Nav
        nav.classList.toggle('nav-active');
    //Animate Links
        navLinks.forEach((link, index)=>{
            if(link.style.animation){
                link.style.animation =''
            } else {
            link.style.animation = `navLinkFade 0.5s ease forwards ${index/7 + 0.5}s`;
            }
        });
        //Burger Animation
        burger.classList.toggle('toggle');
    });
}

navSlide();
//----------------navbar----------------

//---------------tracker----------------
let new_cases = document.getElementById("new_case");
let new_death = document.getElementById("new_death");
let total_death = document.getElementById("total_death");
let total_recovered = document.getElementById("total_recovered");
let total_cases = document.getElementById("total_cases");
let table = document.getElementById('countries_stat');

//Fetching the World Data
fetch("https://coronavirus-monitor.p.rapidapi.com/coronavirus/worldstat.php", {
    "method": "GET",
    "headers": {
        "x-rapidapi-host": "coronavirus-monitor.p.rapidapi.com",
        "x-rapidapi-key": "11bd4d1c11mshe279a6fb6cb5d8cp137989jsn76ab1f4c55ba"
    }
})

.then(response => response.json().then( data => {
    total_cases.innerHTML = data.total_cases;
    new_cases.innerHTML = data.new_cases;
    new_death.innerHTML = data.new_deaths;
    total_death.innerHTML = data.total_deaths;
    total_recovered.innerHTML = data.total_recovered;
}));

//Fetching The Case by Country Data
fetch("https://coronavirus-monitor.p.rapidapi.com/coronavirus/cases_by_country.php", {
    "method": "GET",
    "headers": {
        "x-rapidapi-host": "coronavirus-monitor.p.rapidapi.com",
        "x-rapidapi-key": "11bd4d1c11mshe279a6fb6cb5d8cp137989jsn76ab1f4c55ba"
    }
})

.then(response => response.json().then(data =>{
    let countries_stat = data.countries_stat;
    //Getting all the country statistic using a loop
    for(let i = 0; i<countries_stat.length; i++){
        //Insert new rows inside table
        let row = table.insertRow(i+1);
        let country_name = row.insertCell(0);
        let cases = row.insertCell(1);
        let deaths = row.insertCell(2);
        let serious_critical = row.insertCell(3);
        let recovered_per_country = row.insertCell(4);
        country_name.innerHTML = countries_stat[i].country_name;
        cases.innerHTML = countries_stat[i].cases;
        deaths.innerHTML = countries_stat[i].deaths;
        serious_critical.innerHTML = countries_stat[i].serious_critical;
        recovered_per_country.innerHTML = countries_stat[i].total_recovered;
    }
}));
//---------------tracker----------------

//-----------------news-----------------
$(document).ready(function() {
    $.getJSON(
      "https://cryptic-ravine-96718.herokuapp.com/",
      null,
      function(data) {
        var news = document.getElementById("news");
        var newcol = document.createElement("ul");
        newcol.setAttribute("class", "list-inline");
        news.appendChild(newcol);
        for (var i = 0; i < data.news.length-2; i++) {
            var li = document.createElement("li");
            li.setAttribute("class", "list-inline-item");
            var card = document.createElement("div");
            card.setAttribute("class", "card");
            var card_title = document.createElement("h5");
            card_title.innerHTML = data.news[i].title;
            card_title.setAttribute("classs", "card-title");
            var news_img = document.createElement("img");
            news_img.setAttribute("src", data.news[i].img);
            news_img.setAttribute("class", "card-img-top");
            var btntoart = document.createElement("a");
            btntoart.setAttribute("class", "btn btn-main");
            btntoart.setAttribute("href", data.news[i].link);
            btntoart.innerHTML = "Read More";
            var card_body = document.createElement("div");
            card_body.setAttribute("class", "card-body");
            card_body.appendChild(card_title);
            card_body.appendChild(btntoart);
            card.appendChild(news_img);
            card.appendChild(card_body);
            li.appendChild(card);
            newcol.appendChild(li);
        }
      }
    );
  });
//-----------------news------------------

//--------news-preloader--------
$(".loader").delay(4000).fadeOut(500);
$(".text-center").fadeOut(0);
$(".text-center").delay(4000).fadeIn(500);
$("footer").fadeOut(0);
$("footer").delay(4000).fadeIn(500);