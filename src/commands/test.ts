import { ApplicationCommand } from "../core/bot";

export = new ApplicationCommand("hello", "This is a test command", null, function () {
  console.log("Hello World");
});
