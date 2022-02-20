// PLEASE NOTE
// THIS FILE IS NOT FINISHED AND LIKELY WILL NOT BE FOR A LITTLE WHILE
// AND THE WAY EVENTS WORK IS ALMOST CERTAINLY GOING TO CHANGE

type EventCallback = () => void;

export class Event {
  constructor(public name: string, public callback: EventCallback) {}
}
