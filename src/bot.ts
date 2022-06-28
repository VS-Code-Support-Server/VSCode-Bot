import dotenv from "dotenv";
dotenv.config();

import Discord from "discord.js";
import fs from "fs";
import Command from "./Interfaces/Command";
import ExtendedClientOptions from "./Interfaces/ExtendedClient";

class ExtendedClient extends Discord.Client {
	options: ExtendedClientOptions;
	commands: Map<string, Command>;
	constructor(options: ExtendedClientOptions) {
		super(options);
		this.commands = new Map();
		this.options = options;
		this.login(options.token);
		this.setCommands();
		this.on("ready", (): void => {
			console.log(`${this.user?.tag} is online`);
			this.set_activity();
		});

		this.on("messageCreate", this.onMessage);
	}

	public set_activity() {
		this.user?.setActivity(this.options.activity_message, {
			type: this.options.activity_type,
		});
	}

	public setCommands() {
		const commands = fs.readdirSync("./dist/commands");
		for (const file of commands) {
			const command: Command = require(`${process.cwd()}/dist/commands/${file}`);
			console.log(command);
			this.commands.set(command.name, command);

			for (const alias of command.aliases) {
				this.commands.set(alias, command);
			}
		}
	}

	public onMessage(message: Discord.Message): void {
		if (message.author.bot) return;
		if (!message.content.startsWith(this.options.prefix)) return;

		const args = message.content
			.slice(this.options.prefix.length)
			.split(/ +/);
		const commandName = args.shift()!.toLowerCase();
		console.log(commandName);
		const command = this.commands.get(commandName);
		if (!command) return;
		command.execute(message, args);
	}
}

const client = new ExtendedClient({
	prefix: "code!",
	token: process.env.TOKEN || "",
	activity_message: "Test",
	activity_type: "WATCHING",
	intents: [
		"GUILDS",
		"GUILD_MEMBERS",
		"GUILD_MESSAGES",
		"GUILD_MESSAGE_REACTIONS",
	],
});

process.on("SIGINT", () => {
	client.destroy();
	process.exit(0);
});

process.on("exit", () => {
	client.destroy();
	process.exit(0);
});
