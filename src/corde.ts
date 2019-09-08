import { logout } from "./bot";
import MissingTestNameError from "./erros/missingTestNameErro";
import { login } from "./init";
import { getConfig } from "./init";
import { logger } from "./logger";

/**
 * Defines which tests will be executed.
 * 
 * @example
 * 
 *  env(async () => {
 *      await it("should return Hello!!", async () => {
 *        await expect("hello").toBe("hello!!");
 *      });
 *     await it("should return Hey!!", async () => {
 *        await expect("hey").toBe("hey!!");
 *     });
 *  });
 * 
 * @deprecated Pay attention for the **await** operator in before the call
 * functions **it** and **expect**. Because Discord's messages send and return
 * are async, this operatior must be informed in order to allow the correctly
 * execution of tests.
 * 
 * @param tests a block of **it** tests
 */
export async function cases(tests: () => Promise<void> | void) {
  if (tests) {
    try {
      await login();
      return new Promise(async () => {
        try {
          await tests();
          console.log("TESTS PASSED!!!");
          process.exit(0);
        } catch (error) {
          logout();
          process.exit(1);
        }
      });
    } catch (error) {
      throw error;
    }
  } else {
    logout();
    throw new MissingTestNameError();
  }
}


/**
 * Initialize a new test to be executed
 * 
 * @param name name of the test (required)
 * @throws MissingTestNameError When the name isn't informed.
 * 
 * @example
 *  // Correct use
 *  await it("should return Hey!!", async () => {
 *      await expect("hey").toBe("hey!!");
 *  });
 *
 *  // Incorect use
 *  await it("should return Hey!! and Hello!!", async () => {
 *      await expect("hey").toBe("hey!!");
 *      await expect("hello").toBe("hello!!");
 *  });
 * 
 * @description this function is the container of a lack of tests
 * for a **single command test case**.In other words, this should be used
 * for test only one return of a command. Do not test more than i command
 * in the same it clausure.
 */
export default async function it(
  name: string,
  steps: (caseName: string) => Promise<void>
): Promise<void> {
  if (name && name.trim() !== "") {
    try {
      logger.info(name);
      return steps(name);
    } catch (error) {
      throw error;
    }
  } else {
    logout();
    throw new MissingTestNameError();
  }
}

/**
 * Container of 
 */
export class Compare {
  private input: string;
  private testName: string;

  constructor(input: string, testName: string) {
    this.input = input;
    this.testName = testName;
  }

  public async shouldRespond(expect: string): Promise<void> {
    return new Promise(async (resolve, reject) => {
      const config = getConfig();
      if (expect === undefined) {
        console.log("No testes were declared");
        process.exit(0);
      } else if (config.channel === undefined) {
        throw new Error("Channel not found");
      } else {
        const toSend = config.botPrefix + this.input;
        await config.channel.send(toSend);
        try {
          const answer = await config.channel.awaitMessages(
            responseName => responseName.author.id === config.botTestId,
            {
              max: 1,
              time: config.timeOut ? config.timeOut : 10000,
              errors: ["time"]
            }
          );

          const content = answer.first().content;

          if (content === expect) {
            logger.sucess(this.testName, expect, content);
          } else {
            logger.fail(this.testName, expect, content);
          }
          resolve();
        } catch {
          console.log("The bot do not send any message in the time informed.");
          reject();
        }
      }
    });
  }
}

/**
 * Receives wich command will be tested.
 * 
 * @param commandName Command name.
 * 
 * @description Do not inform the command prefix if
 * it's already informed in **configs**
 * 
 * @returns The **Compare** object, where will handle 
 * the type of response is expected.
 */
export function command(commandName: string) {
  return new Compare(commandName, this.testName);
}