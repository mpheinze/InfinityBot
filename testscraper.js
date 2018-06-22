///// --------------------     Next Upcoming Event Scraper     -------------------- /////

let request = require('request');

// Calculating current year and month for dynamic url
let current_date = new Date();
let month = ('0' + (current_date.getMonth() + 1)).slice(-2);
let year = current_date.getFullYear();
let url = `https://superinfinityfriends.shivtr.com/events?date=${year}-${month}-01`

// Scraping event calendar
request({
    url: url,
    json: true
}, function (error, response, body) {
    if (!error && response.statusCode === 200) {
        
        let date_now = Date.now();
        let event_date_list = [];
        let event_diff_list = [];
        
        for (event of body.events) {
            let date = new Date(event.date);
            event_date_list.push(date);
            event_diff_list.push(date - date_now);
        }

        // Getting index of next event and ID for event specific url
        let date_index = event_diff_list.length - event_diff_list.filter(function(i) {return i > -1} ).length;
        let next_event = body.events[date_index];
        let event_id = next_event.event_id;
        let instance_id = next_event.id;
        let next_event_url = `https://superinfinityfriends.shivtr.com/events/${event_id}?event_instance_id=${instance_id}`;

        // Sracping event specific event page
        request({
            url: next_event_url,
            json: true
        }, function (error, response, event_info) {
            if (!error && response.statusCode === 200) {

                event_info.event.date = event_date_list[date_index];
                // console.log(event_info); // Print JSON with upcoming event data
                
            }
        })
    }
})