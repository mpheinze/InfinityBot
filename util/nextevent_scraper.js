///// ----- HTML Scraper for Next Event ----- /////

const request = require('request');
const cheerio = require('cheerio');

exports.event_scraper = (callback) => {

    // Calculating current year and month for dynamic url
    var current_date = new Date();
    var month = ('0' + (current_date.getMonth() + 1)).slice(-2);
    var year = current_date.getFullYear();
    var url = `https://superinfinityfriends.shivtr.com/events?date=${year}-${month}-01`


    // Scraping event calendar to find the next upcoming event
    request({
        url: url,
        json: true
    }, function (error, response, body) {
        
        if (!error && response.statusCode === 200) {
            
            var date_now = Date.now();
            var event_date_list = [];
            var event_diff_list = [];
            
            for (event of body.events) {
                var date = new Date(event.date);
                event_date_list.push(date);
                event_diff_list.push(date - date_now);
            }

            // Getting index of next event and ID for event specific url
            var date_index = event_diff_list.length - event_diff_list.filter(function(i) {return i > -1} ).length;
            var next_event = body.events[date_index];
            var event_id = next_event.event_id;
            var instance_id = next_event.id;
            var event_url = `https://superinfinityfriends.shivtr.com/events/${event_id}?event_instance_id=${instance_id}`;

            // Creating empty arrays for indicies, names, classes, and role counts
            var role_counts = [];

            // Calling 'request' to access the html on the site
            request(event_url, function (error, response, body) {
                if (!error && response.statusCode == 200) {
                    
                    // Invoking 'cheerio' to help parse the html
                    var $ = cheerio.load(body); // not sure why, but $ seems to be used as the variable name in cherrio by convention



                    ///// --------------------          Scraping participants array          -------------------- /////

                    // Getting role counts (i.e. number of tanks, dps, and healers) signed up
                    $('.table_box_pad').each(function(){ // here 'table_box_pad' is not the exact html element, but the one after what we want, thus the .prev() method in the next line
                        var item = $(this).prev();
                        role_counts.push(parseInt(item.text().split('\n')[2].trim().slice(1, -1)));
                    });

                    // Generating auxiliary array of length equal to participants with role indicies matching tank, damage, or healer
                    var j = 1;
                    var aux_role_index = [];
                    for (var item of role_counts) {
                        var temp_array = new Array(item + 1).join(`${j}`).split('').map(parseFloat);
                        aux_role_index = aux_role_index.concat(temp_array);
                        j++;
                    };
                    
                    // Scraping sign-up index, name, and class. Mainly using native js string functions like split(), trim(), and slice() to get the right format of the text in the html
                    var participants = [];
                    var i = 0;
                    $('.ellipsis').each(function(i){ // 'ellipsis' is the relevant html object to look for
                        var item = $(this);
                        var temp_data_object = {};

                        // Selecting role based on index number from 
                        switch (aux_role_index[i]) {
                            case 1:
                                var role = 'Tank';
                                break;
                            case 2:
                                var role = 'Damage';
                                break;
                            case 3:
                                var role = 'Healer';
                                break;
                        };

                        // Populating data object with participants
                        temp_data_object['index']   = parseInt(item.text().split('\n')[1].trim().slice(0, -1));
                        temp_data_object['name']    = item.text().split('\n')[3].trim();
                        temp_data_object['class']   = item.text().split('\n')[5].trim();
                        temp_data_object['role']    = role;
                        participants.push(temp_data_object);
                        i++;
                    });
                    
                    ///// --------------------------------------------------------------------------------------- /////



                    ///// --------------------           Scraping event meta data            -------------------- /////

                    var meta_data = [];
                    var temp_meta_data = {};
                    
                    // Getting event description
                    var description = $('.pad_top').attr('id', 'event_description').text();
                    description = description.replace(/\./i, '. ');

                    // Creating role count array
                    var role_count_array = {};
                    role_count_array['tank']    = role_counts[0];
                    role_count_array['damage']  = role_counts[1];
                    role_count_array['healer']  = role_counts[2];

                    // Getting number of people signed as maybe
                    var signup_maybe = participants.filter(function(element){
                        return isNaN(element.index);
                    }).length;

                    // Getting URL for event avatar
                    var avatar_html = $('#shown_event img')[0];
                    avatar_url = avatar_html.attribs.style.substring(23, avatar_html.attribs.style.length - 2);

                    // Populating meta data object
                    meta_data['title']          = $('.inline').text();
                    meta_data['url']            = event_url;
                    meta_data['avatar_url']     = avatar_url;
                    meta_data['date']           = next_event.date;
                    meta_data['host']           = $('.member_link').first().text();
                    meta_data['description']    = description;
                    meta_data['signup_total']   = role_counts.reduce((a, b) => (a + b));
                    meta_data['signup_maybe']   = signup_maybe;
                    meta_data['role_count']     = role_count_array;
                    
                    ///// --------------------------------------------------------------------------------------- /////
                    
                    // Merging meta data and participants into the same array
                    var event_data = {};
                    event_data['meta_data'] = meta_data;
                    event_data['raiders'] = participants;
                    callback(event_data);

                };

            });

        };
    });

};