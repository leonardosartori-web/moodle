const fs = require("fs");

module.exports = function setup(username, password) {
    const obj = {username, password};
    fs.writeFile(
        `./moodle.json`,

        JSON.stringify(obj, null, 2),

        function (err) {
            if (err) {
                console.error('Crap happens');
            }
        }
    )
}