const Search = require("./search");
const Filter = require("./filter");
const Setup = require("./setup");
const fs = require("fs");

const load_people = function (filename) {
    const arr = fs.readFileSync(`./Reports/${filename}`, "utf-8");
    return JSON.parse(arr);
}

const { Command } = require('commander');

const program = new Command();

program
    .description('This is a program to scrape the participants of a Moodle course')
    .version('1.1.0');

program.option('--search <course_id>', "Search by a course id. You will get a report of that course!" +
    " Before searching, you need to follow the course")
    .option('--filter <course_id>', 'Filter by a course id. A report needed: you need to make the search before using it')
    .option('--no-female', "Optional for filter. By default it's female. Add it only for male partecipants.", true)
    .option('--config <username>:<password>', "You need to set up your Moodle credentials (username and password) using this format: <username>:<password>." +
        " For example, 123456:hello. The username is '123456' and the password is 'hello'");

program.parse();

const options = program.opts();

const main = async () => {

    if (options["search"]) {

        // Search by id

        try {
            const search = await Search(options["search"]);
            search.save_people();
            console.log(`Success! The data is saved in Reports/report${options["search"]}.json`);
        } catch (e) {
            console.error(e);
        }

    }
    else if (options["filter"]) {

        // Filter partecipants

        try {
            const people = load_people(`report${options["filter"]}.json`);
            const filter = new Filter(people);
            let partecipants = [];
            if (options["female"]) partecipants = filter.female_partecipants;
            else partecipants = filter.male_partecipants;
            console.table(partecipants);
        }
        catch (e) {
            console.error("Error: Can't find the report. Be sure you did the Search of this course!")
        }
    }

    else if (options["config"]) {

        try {
            const [username, password] = options["config"].split(":");
            Setup(username, password);
            console.log("Success! The configuration file is done!");
            console.log(`Username: ${username}`);
            console.log(`Password: ${password}`);
        }
        catch (e) {
            console.error(e);
        }
    }

    else {
        console.log("No function called! Run --help to get infos!");
    }
}

main();