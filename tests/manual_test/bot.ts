import arg from "arg";
import { Client, MessageEmbed, Message } from "discord.js";
import { botPrefix, botTestToken } from "../../corde.config.js";

export const bot = new Client();

export const embedMsg = new MessageEmbed()
  .setColor("#0099ff")
  .setTitle("Some title")
  .setURL("https://discord.js.org/")
  .setAuthor("Some name", "https://i.imgur.com/wSTFkRM.png", "https://discord.js.org")
  .setDescription("Some description here")
  .setThumbnail("https://i.imgur.com/wSTFkRM.png")
  .addFields(
    { name: "Regular field title", value: "Some value here" },
    { name: "\u200B", value: "\u200B" },
    { name: "Inline field title", value: "Some value here", inline: true },
    { name: "Inline field title", value: "Some value here", inline: true },
  )
  .addField("Inline field title", "Some value here", true)
  .setImage("https://i.imgur.com/wSTFkRM.png");

bot.on("message", async (message) => {
  if (message.content.indexOf("") !== 0) return;
  const args = message.content.slice(botPrefix.length).trim().split(" ");
  const command = args.shift().toLowerCase();
  if (command === "hello" || command === "h") {
    hello(message);
  } else if (command === "hey") {
    hey(message);
  } else if (command === "embed") {
    embed(message);
  } else if (command === "emoji") {
    emoji(message);
  } else if (command === "emojis") {
    emojis(message);
  } else if (command === "removemessagereactionbyid") {
    await removeMessageReactionById(message, args[0], args[1]);
  } else if (command === "removemessagereactionbycontent") {
    await removeMessageReactionByContent(message, args[0], args[1]);
  } else if (command === "setrolecolor") {
    await changeColorForRole(message, args[0]);
  } else if (command === "deleterole") {
    deleteRole(message, args[0]);
  } else if (command === "addrole") {
    addRole(message, args[0]);
  } else if (command === "rename-role") {
    renameRole(message, args[0], args[1]);
  } else if (command === "set-role-position") {
    setRolePosition(message, args[0], +args[1]);
  } else if (command === "change-role-permission") {
    changeRolePermission(message, args[0]);
  } else if (command === "pin") {
    pinMessage(message, args[0]);
  } else {
    console.log("No command found");
  }

  // if (message.content.indexOf("") !== 0) return;
  // const command = message.content.slice(botPrefix.length).trim();
  // if (command === "hel") {
  //   message.channel.send("Pong?");
  // } else if (command.includes("remove-role")) {
  //   const roleName = command.split(" ")[1];
  //   const role = message.guild?.roles.cache.find((r) => r.name === roleName);
  //   await role?.delete();
  // } else if (command.includes("rename-role")) {
  //   const split = command.split(" ");
  //   const oldName = split[1];
  //   const newName = split[2];
  //   const role = message.guild?.roles.cache.find((r) => r.name === oldName);
  //   await role.setName(newName);
  // } else if (command.includes("change-role-color")) {
  //   const split = command.split(" ");
  //   const roleName = split[1];
  //   const color = split[2];
  //   const role = message.guild?.roles.cache.find((r) => r.name === roleName);
  //   await role?.setColor(color);
  // } else if (command.includes("change-role-permission")) {
  //   const split = command.split(" ");
  //   const roleId = split[1];
  //   const permission = split[2];
  //   const role = message.guild?.roles.cache.find((r) => r.id === roleId);
  //   await role?.setPermissions(permission);
  // }
});

function hello(msg: Message) {
  msg.channel.send("hello!!");
}

function hey(msg: Message) {
  msg.channel.send("hey!!");
}

function embed(msg: Message) {
  msg.channel.send(embedMsg);
}

function emoji(msg: Message) {
  msg.react("😄");
}

async function removeMessageReactionById(msg: Message, messageId: string, reaction: string) {
  try {
    const msgFound = await msg.channel.messages.fetch(messageId.trim());
    msgFound.reactions.cache.get(reaction).remove();
  } catch (error) {
    console.log("Fail: " + error);
  }
}

async function removeMessageReactionByContent(
  msg: Message,
  messagecontent: string,
  reaction: string,
) {
  try {
    const msgFound = (await msg.channel.messages.fetch()).find(
      (message: { content: any }) => message.content === messagecontent,
    );
    msgFound.reactions.cache.get(reaction).remove();
  } catch (error) {
    console.log("Fail: " + error);
  }
}

/**
 * @param {Message} msg
 */
async function changeColorForRole(msg: Message, roleName: string) {
  await msg.guild.roles.cache.find((r: { name: any }) => r.name === roleName).setColor("BLUE");
}

/**
 * @param {Message} msg
 */
async function deleteRole(msg: Message, roleName: string) {
  const data = msg.guild.roles.cache.find((r: { name: any }) => r.name === roleName);
  await data.delete();
}

/**
 * @param {Message} msg
 */
async function addRole(msg: Message, roleName: string) {
  await msg.guild.roles.create({
    data: {
      name: roleName,
    },
  });
}

/**
 * @param {Message} msg
 * @param {string} roleName
 * @param {string} newName
 */
async function renameRole(msg: Message, roleName: string, newName: string) {
  const role = msg.guild.roles.cache.find((r: { name: any }) => r.name === roleName);
  await role.setName(newName);
}

function emojis(msg: Message) {
  Promise.all([msg.react("😄"), msg.react("🍊")]);
}

/**
 * @param {Message} msg
 * @param {string} roleName
 * @param {number} newName
 */
async function setRolePosition(msg: Message, roleName: string, newPosition: number) {
  const role = msg.guild.roles.cache.find((r: { name: any }) => r.name === roleName);
  await role.setPosition(newPosition);
}

/**
 * @param {Message} msg
 * @param {string} roleId
 */
async function changeRolePermission(msg: Message, roleId: string) {
  const role = msg.guild.roles.cache.get(roleId);
  await role.setPermissions(["ADMINISTRATOR"]);
}

/**
 * @param {Message} msg
 * @param {string} msgId
 */
async function pinMessage(msg: Message, msgId: string) {
  await msg.channel.messages.fetch();
  const toPinMessage = msg.channel.messages.cache.get(msgId);
  await toPinMessage.pin();
}

export async function loginBot() {
  await bot.login(botTestToken);
}
