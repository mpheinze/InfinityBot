///// ----- HTML Scraper - Events 2.0 ----- /////

var request = require('request');
var cheerio = require('cheerio');

var url = 'https://superinfinityfriends.shivtr.com/events/869324?event_instance_id=15194065';

// Creating empty arrays for indicies, names, classes, and role counts
var index_list = [];
var name_list = [];
var class_list = [];
var role_counts = [];

// Calling 'request' to access the html on the site
request(url, function (error, response, body) {
    if (!error && response.statusCode == 200) {

        // Invoking 'cheerio' to help parse the html
        var $ = cheerio.load(body); // not sure why, but $ seems to be used as the variable name in cherrio by convention
        
        // Scraping sign-up index, name, and class. Mainly using native js string functions like split(), trim(), and slice() to get the right format of the text in the html
        $('.ellipsis').each(function(i, element){ // ellipsis is the relevant html object to look for
            var item = $(this);
            index_list.push(parseInt(item.text().split('\n')[1].trim().slice(0, -1)));
            name_list.push(item.text().split('\n')[3].trim());
            class_list.push(item.text().split('\n')[5].trim());
        });

        // Getting role counts (i.e. number of tanks, dps, and healers) signed up
        $('.table_box_pad').each(function(i, element){ // here table_box_pad is not the exact heml element, but the one after what we want, thus the .prev() method in the next line
            var item = $(this).prev();
            role_counts.push(parseInt(item.text().split('\n')[2].trim().slice(1, -1)));
        });

        // Printing arrays
        console.log(role_counts);
        console.log(index_list);
        console.log(name_list);
        console.log(class_list);

  }
});
