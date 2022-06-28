"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const discord_js_1 = __importDefault(require("discord.js"));
const fs_1 = __importDefault(require("fs"));
class ExtendedClient extends discord_js_1.default.Client {
    constructor(options) {
        super(options);
        this.commands = new Map();
        this.options = options;
        this.login(options.token);
        this.setCommands();
        this.on("ready", () => {
            var _a;
            console.log(`${(_a = this.user) === null || _a === void 0 ? void 0 : _a.tag} is online`);
            this.set_activity();
        });
        this.on("messageCreate", this.onMessage);
    }
    set_activity() {
        var _a;
        (_a = this.user) === null || _a === void 0 ? void 0 : _a.setActivity(this.options.activity_message, {
            type: this.options.activity_type,
        });
    }
    setCommands() {
        const commands = fs_1.default.readdirSync("./dist/commands");
        for (const file of commands) {
            const command = require(`${process.cwd()}/dist/commands/${file}`);
            console.log(command);
            this.commands.set(command.name, command);
            for (const alias of command.aliases) {
                this.commands.set(alias, command);
            }
        }
    }
    onMessage(message) {
        if (message.author.bot)
            return;
        if (!message.content.startsWith(this.options.prefix))
            return;
        const args = message.content
            .slice(this.options.prefix.length)
            .split(/ +/);
        const commandName = args.shift().toLowerCase();
        console.log(commandName);
        const command = this.commands.get(commandName);
        if (!command)
            return;
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
