const { getGender } = require('gender-detection-from-name');

const gender_partecipants = (partecipants, gender) => {
    let resp = [];
    for (const partecipant of partecipants) {
        const name = (partecipant.split(" "))[0];
        if (getGender(name, "it") === gender) resp.push(partecipant);
    }
    return resp;
}

class Filter {
    constructor(partecipants = [""]) {
        this.partecipants = partecipants;
    }

    get female_partecipants() {
        return gender_partecipants(this.partecipants, "female");
    }

    get male_partecipants() {
        return gender_partecipants(this.partecipants, "male");
    }

}
module.exports = Filter;