console.log('testlog');

var url = 'db.json';

$(document).ready(function(){
    let currentDate = new Date();
    let currentHour = currentDate.getHours();
    let currentMins = currentDate.getMinutes();

      /* Here I'm seeing whether currentMins is less that 10, if it is pop a "0" at the start of it same with the
      currentHour. This is because it was writing this to the page (when I decided to code this at midnight...)
      "0:6" for example when it should have been "00:06" - these two conditionals fix this issue.
      */
      if (currentMins < 10) {
       currentMins = "0" + currentMins};

      if (currentHour < 10) {
      currentHour = "0" + currentHour};

      // needed to then declare the currentTime down here, so that it gets the updates to currentMins and currentHour if needed.

let currentTime = currentHour + ':' + currentMins;

$('.current-time').text(currentTime);

    /* Here I'm seeing if the currentHour is less that 12, if so the div I made with the class
    of "greeting gets the text " good morning", then further conditioning to see if it's less than 5 then "good afternoon"
    then anything else it's going to be good evening*/

    if(currentHour < 12 ){
    $('.greeting').text("- good morning!");
   }
   else if (currentHour > 12 && currentHour < 17) {$('.greeting').text("- good afternoon!");}

   else { $('.greeting').text("- good evening!");}
});



function getNews(url) {
    console.log('getNews');

    return new Promise((resolve, reject) =>
    {

        fetch(url, {
            method: 'get',
//                mode: "no-cors",
        }).then((response) => {
            return response.json();
        }).then((json) => {

          let news = json;


/* Here I thought I'd try what you asked and put the info retrived from the array of objects in date order :)
 finding this link on ye ol' Google helped a bunch! https://en.proft.me/2015/11/14/sorting-array-objects-number-string-date-javascrip/

*/

  news.news.sort(function(a, b) {
    let dateA = new Date(a.date), dateB = new Date(b.date);
    return dateB - dateA;
})


        news.news.forEach((info) => {

// some simple conditioning to only return the objects and their data from the array if their published is = to 1
        if(info.published == 1){

 /*getting the date to show in a more readable format of dd-mm-yyyy instead of yyyy-mm-dd,
storing all the date info in a variable call dates, splitting each part of the date up reversing the items then joinging them back together*/

          let dates = info.date;
          dates = dates.split("-").reverse().join("-");
          console.log(dates)

         $("#newsItems").append(`<div class ="items"> <span> ${dates} </span> ${info.story} </div>`);
        $("items").append("<hr>")}

      });
        }).catch(function(error) {
            console.log('Error: ' + error);
        })
    })
}

$(".close").click(() => {
  $(".notice").hide();
})



getNews(url);
