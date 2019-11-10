/**
 * Throws when a guild id isn't found in user's guild list
 * @constructor Erro message, if not set, returns default message
 * @default message Guild not found for informed user
 */
export default class GuildNotFoundError extends Error {
    constructor(message?: string) {
      if (message) {
        super(message);
      } else {
        super("Guild not found for informed user");
        this.name = "ERR_GUILD_NOT_FOUND";
      }
    }
  }
  