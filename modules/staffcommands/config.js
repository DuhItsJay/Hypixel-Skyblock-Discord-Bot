const apiKey = require("../settings/apiKey");
const logs = require("../settings/logs");
const channel = require("../settings/channel");
const fs = require("fs");

module.exports = {
  name: "config",
  description: "change the bot configuration",
  execute(msg, args) {
    var config = JSON.parse(fs.readFileSync("../../config.json"));
    //API Key
    if (args[0].toLowerCase() == "apikey") {
      args.shift();
      apiKey.execute(msg, args, config);
    }
    //Routing Channels
    else if (args[0].toLowerCase() == "logs") {
      args.shift();
      logs.execute(msg, args, config);
    } else if (args[0].toLowerCase() == "channel") {
      args.shift();
      channel.execute(msg, args, config);
    } else {
      msg.channel.send(
        "Error! Please check that you have entered the correct arguments :D."
      );
    }
  },
};
