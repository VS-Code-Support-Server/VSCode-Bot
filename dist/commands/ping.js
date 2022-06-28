"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const Command_1 = __importDefault(require("../Classes/Command"));
module.exports = new Command_1.default({
    name: "ping",
    description: "Ping!",
    aliases: [],
    execute: (message, args) => {
        message.channel.send("Pong!");
    },
});
