import { runtime } from "../../src/common/runtime";
import { DEFAULT_TEST_TIMEOUT } from "../../src/consts";

import { IConfigOptions } from "../../src/types";

const config: IConfigOptions = {
  botPrefix: "!",
  botTestId: "123",
  channelId: "1241241",
  cordeBotToken: "321",
  guildId: "123",
  testMatches: ["123"],
  timeOut: DEFAULT_TEST_TIMEOUT,
  botToken: "12412412123124",
};

describe("Testing runtime", () => {
  it("Should set configs", () => {
    runtime.setConfigs(config);
    expect(runtime.configs).toEqual(config);
  });

  it("Should throw an error", () => {
    try {
      runtime.setConfigs(undefined);
    } catch (error) {
      expect(error instanceof Error).toBe(true);
    }
  });

  it("Should create a new instance of config", () => {
    runtime.setConfigs(config);
    expect(runtime.configs).toEqual(config);
  });

  it("should call bot.logout", () => {
    runtime.setConfigs(config);
    const spy = jest.spyOn(runtime.bot, "logout");
    runtime.logoffBot();
    expect(spy).toBeCalledTimes(1);
  });

  it("should call bot.login", async (done) => {
    runtime.setConfigs(config);
    const spy = jest.spyOn(runtime.bot, "login");
    try {
      await runtime.loginBot("13");
    } catch (error) {
      expect(spy).toBeCalledTimes(1);
      done();
    }
  });

  it("should get cordeBotToken", () => {
    runtime.setConfigs(config);
    expect(runtime.cordeBotToken).toBe(config.cordeBotToken);
  });

  it("should get botTestId", () => {
    runtime.setConfigs(config);
    expect(runtime.botTestId).toBe(config.botTestId);
  });

  it("should get botToken", () => {
    runtime.setConfigs(config);
    expect(runtime.botToken).toBe(config.botToken);
  });

  it("should get channelId", () => {
    runtime.setConfigs(config);
    expect(runtime.channelId).toBe(config.channelId);
  });

  it("should get guildId", () => {
    runtime.setConfigs(config);
    expect(runtime.guildId).toBe(config.guildId);
  });

  it("should get timeOut", () => {
    runtime.setConfigs(config);
    expect(runtime.timeOut).toBe(config.timeOut);
  });

  it("should get botPrefix", () => {
    runtime.setConfigs(config);
    expect(runtime.botPrefix).toBe(config.botPrefix);
  });
});
