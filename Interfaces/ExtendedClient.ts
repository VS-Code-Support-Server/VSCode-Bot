import Discord from "discord.js";

export default interface ExtendedClientOptions extends Discord.ClientOptions {
	prefix: string;
	token: string;
	activity_message: string;
	activity_type: "PLAYING" | "WATCHING" | "LISTENING" | "STREAMING";
}
