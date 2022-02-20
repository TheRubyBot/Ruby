export class RubyError extends Error {
  constructor(...message: any[]) {
    super(...message);

    this.name = `RUBY:ERROR`;
  }
}
