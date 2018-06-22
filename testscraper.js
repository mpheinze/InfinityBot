///// -----     Next Upcoming Event Scraper     ----- /////

var request = require('request');

// Calculating current year and month for dynamic url
var current_date = new Date();
var month = ('0' + (current_date.getMonth() + 1)).slice(-2);
var year = current_date.getFullYear();
var url = `https://superinfinityfriends.shivtr.com/events?date=${year}-${month}-01`

// Scraping event calendar
request({
    url: url,
    json: true
}, function (error, response, body) {
    if (!error && response.statusCode === 200) {
        var date_now = Date.now();
        var event_date_list = [];
        for (event of body.events) {
            let date = new Date(event.date);
            event_date_list.push(date - date_now);
        }

        // Getting ID for next event in the calendar
        upcoming_list = event_date_list.filter(function(i) {return i > -1} );
        var next_event = body.events[event_date_list.length - upcoming_list.length];
        var next_event_id = next_event.id;
        var next_event_url = `https://superinfinityfriends.shivtr.com/events/869326?event_instance_id=${next_event_id}`;
        console.log(next_event_url);

        // Sracping next event page
        request({
            url: next_event_url,
            json: true
        }, function (error, response, event_info) {
            if (!error && response.statusCode === 200) {

                console.log(event_info);

            }
        })

    }
})




