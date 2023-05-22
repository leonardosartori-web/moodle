const puppeteer = require("puppeteer");
const config = require("./moodle.json");
const fs = require("fs");

const login = async function (page, username, password) {
    const url = "https://moodle.unive.it/auth/mtsaml";
    await page.goto(url);

    await page.waitForSelector("#username");
    await page.type("#username", username, {delay:100});
    await page.type("#password", password, {delay:100});
    await page.click(".btn.btn-outline-dark");
    await page.waitForSelector("#page-site-index");
    return page;
}

const get_course_partecipants = async function (page, course_id) {
    const url = `https://moodle.unive.it/user/index.php?id=${course_id}`;
    await page.goto(url);

    //await page.waitForSelector("#participants");
    await page.waitForSelector('[data-action*="showcount"]');
    const element = (await page.$('[data-action*="showcount"]')).click({ clickCount: 1 });
    await page.waitForSelector(`#user-index-participants-${course_id}_r20`);

    //await page.setRequestInterception(true);
    const rawData = await page.evaluate(() => {
        let data = [];
        let table = document.querySelectorAll('#participants tbody tr th.cell.c1 a');
        console.log(table);

        for (const el of table) {
            data.push(el.childNodes[1].textContent);
        }

        return data
    });

    return rawData;
}

async function Search(course_id) {
    const browser = await puppeteer.launch({headless: false});
    let page = await browser.newPage();
    const username = config.username;
    const password = config.password;
    let partecipants = [];

    const save_people = function () {
        fs.writeFile(
            `./Reports/report${course_id}.json`,

            JSON.stringify(partecipants),

            function (err) {
                if (err) {
                    console.error('Crap happens');
                }
            }
        )
    }

    const process = async () => {
        // Login
        await login(page, username, password);

        // Partecipants
        partecipants = await get_course_partecipants(page, course_id);

        // Close browser
        await browser.close();
    }

    await process();
    const obj = Object.create({
        partecipants,
        save_people
    })
    return obj;
}

module.exports = Search;