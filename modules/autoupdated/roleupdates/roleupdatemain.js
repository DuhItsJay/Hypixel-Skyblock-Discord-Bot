const fetch = require("node-fetch");

var i = 0; //  set your counter to 1

function mainLoop(
  guild,
  redisClient,
  users,
  main_list,
  Pilot,
  Astronaut,
  Cadet,
  main_guild,
  cadet_guild,
  guest,
  roles
) {
  //  create a loop function
  setTimeout(function () {
    //  call a 3s setTimeout when the loop is called
    redisClient.GET(users[i], function (err, reply) {
      if (reply != null) {
        var json = JSON.parse(reply);
        var uuid = Object.keys(json).shift();

        if (Object.keys(main_list).includes(uuid)) {
          var tag = users[i];
          var rank = main_list[uuid];

          console.log(`${tag}: ${rank}`);

          var role = guild.roles.cache.find(
            (role) => role.name === `| ✧ | ${rank} | ✧ |`
          );

          guild.members.cache.get(tag).roles.remove(guest);
          guild.members.cache.get(tag).roles.remove(Astronaut);
          guild.members.cache.get(tag).roles.remove(Cadet);
          guild.members.cache.get(tag).roles.remove(Pilot);
          guild.members.cache.get(tag).roles.remove(cadet_guild);
          guild.members.cache.get(tag).roles.add(main_guild);
          guild.members.cache.get(tag).roles.add(role);
        } else if (
          !guild.members.cache
            .get(users[i])
            .roles.cache.some((r) =>
              [
                `| ✧ | Guild Master | ✧ |`,
                `| ✧ | Staff | ✧ |`,
                `| ✧ | Trusted | ✧ |`,
              ].includes(r.name)
            )
        ) {
          var tag = users[i];

          guild.members.cache.get(tag).roles.remove(Astronaut);
          guild.members.cache.get(tag).roles.remove(Cadet);
          guild.members.cache.get(tag).roles.remove(Pilot);
          guild.members.cache.get(tag).roles.remove(main_guild);
          guild.members.cache.get(tag).roles.remove(cadet_guild);
          guild.members.cache.get(tag).roles.add(guest);
        }
      }
      i++; //  increment the counter
      if (i < users.length) {
        //  if the counter < 10, call the loop function
        mainLoop(
          guild,
          redisClient,
          users,
          main_list,
          Pilot,
          Astronaut,
          Cadet,
          main_guild,
          cadet_guild,
          guest,
          roles
        ); //  ..  again which will trigger another
      } //  ..  setTimeout()
    });
  }, 5000);
}

module.exports = {
  name: "roleupdatemain",
  description: "updates roles for people in the main guild",
  execute(guild, redisClient) {
    var Pilot = guild.roles.cache.find(
      (role) => role.name === `| ✧ | Pilot | ✧ |`
    );
    var Astronaut = guild.roles.cache.find(
      (role) => role.name === `| ✧ | Astronaut | ✧ |`
    );
    var Cadet = guild.roles.cache.find(
      (role) => role.name === `| ✧ | Cadet | ✧ |`
    );
    var main_guild = guild.roles.cache.find(
      (role) => role.name === `| ✧ | The Astrals Guild Member | ✧ |`
    );
    var cadet_guild = guild.roles.cache.find(
      (role) => role.name === `| ✧ | TAC Academy Member | ✧ |`
    );
    var guest = guild.roles.cache.find(
      (role) => role.name === `| ✧ | Guest | ✧ |`
    );
    const roles = ["Guild Master", "Staff", "Trusted"];
    const main_list = {};
    const users = guild.roles.cache
      .find((role) => role.name === "Verified")
      .members.map((m) => m.user.id);
    fetch(
      "https://api.hypixel.net/guild?key=7d28e74a-5c39-40ed-a5a5-62a09067648d&name=The%20Astrals"
    )
      .then((data) => data.json())
      .then((json) => json.guild.members)
      .then((members) => {
        members.forEach((element) => {
          const uuid = element.uuid;
          const rank = element.rank;

          if (!roles.includes(rank)) {
            Object.assign(main_list, { [uuid]: rank });
          }
        });
      })
      .then((arg) => {
        mainLoop(
          guild,
          redisClient,
          users,
          main_list,
          Pilot,
          Astronaut,
          Cadet,
          main_guild,
          cadet_guild,
          guest,
          roles
        );
      });
  },
};
