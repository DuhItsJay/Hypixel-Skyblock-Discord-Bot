const axios = require("axios");
const fs = require("fs");

function APICHECK(key) {
  axios
    .get(`https://api.hypixel.net/key?key=${key}`)
    .then((response) => {
      return response.data.success;
    })
    .catch((err) => {
      return false;
    });
}

module.exports = {
  name: "apikey",
  description: "gives the ability to change API key",
  execute(msg, args, config) {
    if (args[0] == "edit") {
      if (!APICHECK(args[1])) {
        msg.channel.send("The given API key is not valid!");
      } else {
        config.API["API Key"] = args[1];

        fs.writeFileSync("../../config.json", JSON.stringify(config, null, 4));
        msg.channel.send(`API key has been set to ${args[1]}`);
      }
    } else {
      msg.channel.send(
        "Error! Please check that you have entered the correct arguments :D."
      );
    }
  },
};
