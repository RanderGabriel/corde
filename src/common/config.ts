import ConfigOptions from "../interfaces";

/**
 * Default interface of json config
 *
 * @description `botTestToken` is not required.
 * only inform if is desired to start test bot with corde
 *
 */
export class Config implements ConfigOptions {
  public cordeTestToken: string;
  public botTestId: string;
  public botTestToken?: string;
  public channelId: string;
  public guildId: string;
  public timeOut?: number;
  public botPrefix: string;
  public testFiles: string[];
}