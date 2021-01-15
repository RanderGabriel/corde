export interface Guild {
  id: string;
  name: string;
  icon: string;
  description: string;
  splash?: any;
  discovery_splash?: any;
  features: string[];
  emojis: any[];
  banner: string;
  owner_id: string;
  application_id?: any;
  region: string;
  afk_channel_id?: any;
  afk_timeout: number;
  system_channel_id?: any;
  widget_enabled: boolean;
  widget_channel_id?: any;
  verification_level: number;
  roles: any[];
  default_message_notifications: number;
  mfa_level: number;
  explicit_content_filter: number;
  max_presences: number;
  max_members: number;
  vanity_url_code: string;
  premium_tier: number;
  premium_subscription_count: number;
  system_channel_flags: number;
  preferred_locale: string;
  rules_channel_id: string;
  public_updates_channel_id: string;
}

export interface User {
  id: string;
  username: string;
  discriminator: string;
  avatar: string;
  verified: boolean;
  email: string;
  flags: number;
  premium_type: number;
  public_flags: number;
}

export interface Role {
  id: string;
  name: string;
  color: number;
  hoist: boolean;
  position: number;
  permissions: string;
  managed: boolean;
  mentionable: boolean;
}

export interface Emoji {
  id: string;
  name: string;
  roles: string[];
  user: User;
  require_colons: boolean;
  managed: boolean;
  animated: boolean;
}

export interface VoiceState {
  channel_id: string;
  user_id: string;
  session_id: string;
  deaf: boolean;
  mute: boolean;
  self_deaf: boolean;
  self_mute: boolean;
  suppress: boolean;
}
