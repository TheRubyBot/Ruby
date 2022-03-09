import { ApplicationCommand, OptionBuilder } from "../core/bot";

export = new ApplicationCommand(
  "hello",
  "This is a test command",
  new OptionBuilder().string("helloworld", "eeee"),
  function () {
    console.log("Hello World");
  }
);
