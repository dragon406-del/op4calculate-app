/*=========================================
        LIVE CLOCK
=========================================*/

function updateClock(){

    const now = new Date();

    document.getElementById("liveClock").textContent =

        now.toLocaleTimeString();

    document.getElementById("liveDate").textContent =

        now.toDateString();

}

setInterval(updateClock,1000);

updateClock();
/*=========================================
            WORLD CLOCK
=========================================*/

function openWorldClock(){

    document.getElementById("worldClockModal").style.display = "block";

    updateWorldClock();

}

function closeWorldClock(){

    document.getElementById("worldClockModal").style.display = "none";

}

function updateWorldClock(){

    const cities = [

        {
            name:"🇮🇳 India",
            zone:"Asia/Kolkata"
        },

        {
            name:"🇬🇧 London",
            zone:"Europe/London"
        },

        {
            name:"🇺🇸 New York",
            zone:"America/New_York"
        },

        {
            name:"🇯🇵 Tokyo",
            zone:"Asia/Tokyo"
        },

        {
            name:"🇦🇺 Sydney",
            zone:"Australia/Sydney"
        }

    ];

    let html = "";

    cities.forEach(city=>{

        const time =
        new Date().toLocaleTimeString(
            [],
            {
                timeZone:city.zone
            }
        );

        html +=
        "<p><b>" +
        city.name +
        "</b><br>" +
        time +
        "</p><hr>";

    });

    document.getElementById("worldClockContent").innerHTML = html;

}
setInterval(function(){

    if(
        document.getElementById("worldClockModal").style.display === "block"
    ){

        updateWorldClock();

    }

},1000);
/*=========================================
            CALENDAR
=========================================*/

function openCalendar(){

    document.getElementById("calendarModal").style.display = "block";

    document.getElementById("calendarPicker").valueAsDate = new Date();

}

function closeCalendar(){

    document.getElementById("calendarModal").style.display = "none";

}