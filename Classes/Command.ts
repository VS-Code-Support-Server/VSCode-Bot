import Discord from "discord.js";
import CommandOptions from "../Interfaces/Command";

export default class Command {
	name: string;
	aliases: string[] | [];
	description: string;
	execute: (message: Discord.Message, args: string[]) => void;
	constructor(options: CommandOptions) {
		this.name = options.name;
		this.aliases = options.aliases;
		this.description = options.description;
		this.execute = options.execute;
		return this;
	}
}
