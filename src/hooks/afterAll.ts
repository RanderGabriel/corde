import { testCollector } from "../common";

/**
 * Declare a bunch of code that will be executed **after** tests begins
 *
 * More than one declaration of this code results in a list
 * of functions to run.
 *
 * They will be executed following a sequence of files
 * reads and the positions of each `afterAll` call.
 *
 * @example
 * // The main function of this is for start a bot if you haven't started it yet
 *
 * const bot = new Discord.Client();
 * afterAll(() => {
 *   bot.destroy();
 * });
 *
 * @param fn code that will be executed **after** tests start
 * @since 1.0
 */
export function afterAll(fn: () => void | Promise<void>) {
  if (fn) {
    testCollector.afterAllFunctions.enqueue(fn);
  }
}