require("dotenv").config();
const { Client, IntentsBitField, ActivityType } = require("discord.js");

const client = new Client({
  intents: [
    IntentsBitField.Flags.Guilds,
    IntentsBitField.Flags.GuildMembers,
    IntentsBitField.Flags.GuildMessages,
    IntentsBitField.Flags.MessageContent,
  ],
});

let status = [
  {
    name: "Manchester City",
    type: ActivityType.Listening,
    url: "https://www.youtube.com/watch?v=q1xpyUbUhmk",
  },
  {
    name: "De Bruyne City",
    type: ActivityType.Watching,
    url: "https://www.youtube.com/watch?v=q1xpyUbUhmk",
  },
  {
    name: "Haaland City",
    type: ActivityType.Streaming,
    url: "https://www.youtube.com/watch?v=q1xpyUbUhmk",
  },
  {
    name: "Pep City",
    type: ActivityType.Playing,
    url: "https://www.youtube.com/watch?v=q1xpyUbUhmk",
  },
];

client.on("ready", (c) => {
  console.log(`✅ ${c.user.tag} is running...`);

  setInterval(() => {
    let random = Math.floor(Math.random() * status.length);
    client.user.setActivity(status[random]);
  }, 10 * 1000);
});

client.on("interactionCreate", async (interaction) => {
  try {
    if (!interaction.isButton()) return;

    await interaction.deferReply({ ephemeral: true });

    const role = interaction.guild.roles.cache.get(interaction.customId);
    if (!role) {
      interaction.editReply({
        content: "I could not find that role",
      });
      return;
    }

    const hasRole = interaction.member.roles.cache.has(role.id);

    if (hasRole) {
      await interaction.member.roles.remove(role);
      await interaction.editReply(`The role ${role} has been removed`);
      return;
    }

    await interaction.member.roles.add(role);
    await interaction.editReply(`The role ${role} has been added`);
  } catch (error) {
    console.log(error);
  }
});

client.login(process.env.TOKEN);
