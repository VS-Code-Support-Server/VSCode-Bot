import Discord from "discord.js";
import Command from "../Classes/Command";

module.exports = new Command({
	name: "ping",
	description: "Ping!",
	aliases: [],
	execute: (message: Discord.Message, args: string[]): void => {
		message.channel.send("Pong!");
	},
});
