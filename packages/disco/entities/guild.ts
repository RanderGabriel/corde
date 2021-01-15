/**
 * Management data of Discord **Guild**
 * Guilds in Discord represent an isolated collection of users and channels,
 * and are often referred to as "servers" in the UI.
 *
 * @see https://discord.com/developers/docs/resources/guild
 */
export class Guild {
  /**
   * guild id
   */
  public id: string;
  /**
   * guild name (2-100 characters, excluding trailing and leading whitespace)
   */
  public name: string;

  /**
   * Icon hash
   * @see https://discord.com/developers/docs/reference#image-formatting
   */
  public icon?: string;
  /**
   * Icon hash, returned when in the template object
   * @see https://discord.com/developers/docs/reference#image-formatting
   */
  public icon_hash?: string;
  /**
   * Splash hash
   * @see https://discord.com/developers/docs/reference#image-formatting
   */
  public splash?: string;
  /**
   * Discovery splash hash; only present for guilds with the "DISCOVERABLE" feature
   */
  public discovery_splash?: string;
  /**
   * True if the user is the owner of the guild
   */
  public owner: boolean;
  /**
   * Id of owner
   */
  public owner_id: string;
  /**
   * Total permissions for the user in the guild (excludes overrides)
   */
  public permissions: string;
  /**
   * Voice region id for the guild
   */
  public region: string;
  /**
   * Id of afk channel
   */
  public afk_channel_id: string;
  /**
   * Afk timeout in seconds
   */
  public afk_timeout: number;
  /**
   * True if the server widget is enabled
   */
  public widget_enabled?: string;
  /**
   * The channel id that the widget will generate an invite to, or null if set to no invite
   */
  public widget_channel_id?: string;
  /**
   * Verification level required for the guild
   */
  public verification_level: string;
  /**
   * Default message notifications level
   */
  public default_message_notifications;
  /**
   * Explicit content filter level
   */
  public explicit_content_filter;
  /**
   * Roles in the guild
   */
  public roles: object[];
  /**
   * Custom guild emojis
   */
  public emojis: object[];
  /**
   * Enabled guild features
   */
  public features: object[];
  /**
   * Required MFA level for the guild
   */
  public mfa_level: number;
  /**
   * Application id of the guild creator if it is bot-created
   */
  public application_id: string;
  /**
   * The id of the channel where guild notices such as welcome messages and boost events are posted
   */
  public system_channel_id: string;
  /**
   * System channel flags
   */
  public system_channel_flags: number;
  /**
   * The id of the channel where Community guilds can display rules and/or guidelines
   */
  public rules_channel_id: string;
  /**
   * When this guild was joined at
   */
  public joined_at: string;
  /**
   * True if this is considered a large guild
   */
  public large?: boolean;
  /**
   * True if this guild is unavailable due to an outage
   */
  public unavailable: boolean;
  /**
   * Total number of members in this guild
   */
  public member_count: number;
  /**
   * States of members currently in voice channels; lacks the guild_id key
   */
  public voice_states: object[];
  /**
   * Users in the guild
   */
  public members: object[];
  /**
   * Channels in the guild
   */
  public channels: object[];
  /**
   * Presences of the members in the guild, will only include non-offline members
   * if the size is greater than large threshold
   */
  public presences: object[];
  /**
   * The maximum number of presences for the guild (the default value,
   *  currently 25000, is in effect when null is returned)
   */
  public max_presences?: number;
  /**
   * The maximum number of members for the guild
   */
  public max_members?: number;
  /**
   * The vanity url code for the guild
   */
  public vanity_url_code: string;
  /**
   * The description for the guild, if the guild is discoverable
   */
  public description?: string;
  /**
   * Banner hash
   */
  public banner?: string;
  /**
   * Premium tier (Server Boost level)
   */
  public premium_tier: number;
  /**
   * The number of boosts this guild currently has
   */
  public premium_subscription_count?: number;
  /**
   * The preferred locale of a Community guild; used in server
   * discovery and notices from Discord; defaults to "en-US"
   */
  public preferred_locale: string;
  /**
   * The id of the channel where admins and moderators of Community guilds receive notices from Discord
   */
  public public_updates_channel_id?: string;
  /**
   * The maximum amount of users in a video channel
   */
  public max_video_channel_users?: number;
  /**
   * Approximate number of members in this guild, returned
   * from the GET /guilds/<id> endpoint when with_counts is true
   */
  public approximate_member_count?: number;
  /**
   * Approximate number of non-offline members in this guild,
   * returned from the GET /guilds/<id> endpoint when with_counts is true
   */
  public approximate_presence_count?: number;
}
