"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class Command {
    constructor(options) {
        this.name = options.name;
        this.aliases = options.aliases;
        this.description = options.description;
        this.execute = options.execute;
        return this;
    }
}
exports.default = Command;
