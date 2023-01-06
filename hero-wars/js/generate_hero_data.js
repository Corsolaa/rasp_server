createHeros();

let outputString = "";

function Hero(name, roles, main_stat, attack_type, arti_team_buff, skins) {
    this.name = name;
    this.roles = roles;
    this.main_stat = main_stat;
    this.attack_type = attack_type;
    this.arti_team_buff = arti_team_buff;
    this.skins = skins;
}

function createJsonData(array) {
    for (let i = 0; i < array.length; i++) {
        // Name input:
        outputString += '{"name" : "' + array[i].name + '", ';

        // Role input:
        outputString += '"role": [';
        for (let y = 0; y < array[i].roles.length; y++) {
            outputString += '"' + array[i].roles[y] + '"';
            if (y < array[i].roles.length - 1) {
                outputString += ", ";
            }
            else {
                outputString += "], ";
            }
        }

        // Main_stat input:
        outputString += '"main_stat": "' + array[i].main_stat + '", ';

        // Attack_type input:
        outputString += '"attack_type": [';
        for (let z = 0; z < array[i].attack_type.length; z++) {
            outputString += '"' + array[i].attack_type[z] + '"';
            if (z < array[i].attack_type.length - 1) {
                outputString += ", ";
            }
            else {
                outputString += "], ";
            }
        }

        // Arti_team_buff input:
        outputString += '"arti_team_buff": "' + array[i].arti_team_buff + '", ';

        // Skins input:
        outputString += '"skin": {';
        let keys = Object.keys(array[i].skins);
        keys.forEach(function (key) {
            outputString += '"' + key + '": ' + '"' + array[i].skins[key] + '",'
        });
        outputString += '}';

        // End token of string.
        outputString += "}";

        // When more hero's add separator.
        if (array.length - 1 > i) {
            outputString += ", ";
        }
    }
}

function createHeros() {
    let heroArray = [];
    heroArray.push(new Hero(
        "isaac",
        ["support"],
        "agility",
        ["physical"],
        "magic defense",
        {
            "default": "agility",
            "lunar": "physical attack"
        }));
    heroArray.push(new Hero(
        "ishmael",
        ["warrior"],
        "agility",
        ["physical"],
        "crit hit chance",
        {
            "default": "agility",
            "romantic": "crit hit chance",
            "champion": "physical attack",
            "masquerade": "health",
            "solar": "physical attack"
        }));
    heroArray.push(new Hero(
        "jet",
        ["support", "healer"],
        "intelligence",
        ["physical"],
        "armor",
        {
            "default": "intelligence",
            "barbarian": "magic attack",
            "lunar": "health",
            "romantic": "dodge"
        }));
    heroArray.push(new Hero(
        "jhu",
        ["marksman"],
        "strength",
        ["physical"],
        "crit hit chance",
        {
            "default": "strength",
            "winter": "armor penetration",
            "champion": "magic defense",
            "solar": "crit hit chance",
            "masquerade": "physical attack"
        }));
    heroArray.push(new Hero(
        "jorgen",
        ["control", "support"],
        "strength",
        ["magic"],
        "magic attack",
        {
            "default": "strength",
            "champion": "health",
            "devil": "magic defence",
            "winter": "magic defence"
        }));

    createJsonData(heroArray);
}