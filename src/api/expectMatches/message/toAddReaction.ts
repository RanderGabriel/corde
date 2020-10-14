import { Message } from "discord.js";
import { TestReport } from "../../interfaces/testReport";
import { CordeBot } from "../../../core";

export async function toAddReaction(
  commandName: string,
  isNot: boolean,
  cordeBot: CordeBot,
  reactions: string[],
): Promise<TestReport> {
  let isEqual = false;
  let expectation = "";
  let output = "";

  expectation = reactions.join();

  try {
    const message = await cordeBot.sendTextMessage(commandName);
    await cordeBot.waitForAddedReactions(message, reactions);
    isEqual = isOutputEqualToExpect(message, reactions);
    output = message.reactions.cache.map((v) => v.emoji.name).join();

    if (isNot) {
      isEqual = !isEqual;
    }
  } catch (error) {
    isEqual = false;
    if (error instanceof Error) {
      output = error.message;
    } else {
      output = error;
    }
  }

  return new TestReport({
    commandName,
    expectation,
    output,
    hasPassed: isEqual,
    isNot,
    showExpectAndOutputValue: false,
  });
}

function isOutputEqualToExpect(message: Message, expectation: string | string[]) {
  if (typeof expectation === "string" && message.reactions.cache.has(expectation)) {
    return true;
  } else {
    for (const i in expectation as string[]) {
      if (message.reactions.cache.has(expectation[i])) {
        return true;
      } else {
        return false;
      }
    }
  }
  return false;
}