/**
 * Throws when a requried property was not informed
 *
 * @public
 * @constructor Erro message, if not set, returns default message
 */
export class MissingPropertyError extends Error {
  constructor(message?: string) {
    if (message) {
      super(message);
    } else {
      super('Required property not found');
      this.name = 'ERR_CORDE_MISSING_PROPERTY';
    }
  }
}