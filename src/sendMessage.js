require("dotenv").config();
const {
  Client,
  IntentsBitField,
  ActionRowBuilder,
  ButtonBuilder,
  ButtonStyle,
} = require("discord.js");

const client = new Client({
  intents: [
    IntentsBitField.Flags.Guilds,
    IntentsBitField.Flags.GuildMembers,
    IntentsBitField.Flags.GuildMessages,
    IntentsBitField.Flags.MessageContent,
  ],
});

const roles = [
  {
    id: "1115625066311467139",
    label: "Red",
  },
  {
    id: "1115625281366007889",
    label: "Blue",
  },
  {
    id: "1115625456729849876",
    label: "Green",
  },
];

client.on("ready", async (c) => {
  try {
    const channel = await client.channels.cache.get("1115601901120143381");
    if (!channel) return;

    const row = new ActionRowBuilder();

    roles.forEach((role) => {
      row.components.push(
        new ButtonBuilder()
          .setCustomId(role.id)
          .setLabel(role.label)
          .setStyle(ButtonStyle.Primary)
      );
    });
    await channel.send({
      content: "Claim or remove the role below",
      components: [row],
    });
    process.exit();
  } catch (error) {
    console.log(`There is an error!`, error);
  }
});

client.login(process.env.TOKEN);
