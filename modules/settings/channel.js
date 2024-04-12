const fs = require("fs");

module.exports = {
  name: "channel",
  description: "adds channel logs for each channel",
  execute(msg, args, config) {
    if (args[0] == "edit") {
      var logs = config["channels"];
      var channel_id = args[2].replace(/[&\/\\#,+()$~%.'":*?<>{}]/g, "");
      var type = args[1];

      if (
        logs.hasOwnProperty(type) &&
        msg.guild.channels.cache.some((c) => c.id === channel_id)
      ) {
        logs[type] = `${channel_id}`;

        fs.writeFileSync("../../config.json", JSON.stringify(config, null, 4));
        msg.channel.send(`You've set the ${type} log to <#${channel_id}>`);
      } else {
        msg.channel.send(
          "One of your arguments is incorrect! Please check and retype your query."
        );
      }
    } else {
      msg.channel.send(
        "Error! Please check that you have entered the correct arguments :D."
      );
    }
  },
};
