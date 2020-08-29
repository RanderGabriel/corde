import { CordeBot } from "../../core";
import { TestReport } from "../interfaces";

/**
 * Entity helper for expectation assertions used for Corde tests
 *
 * @description Have 3 generic parameters that serves to define
 * what are the data that the test function will receive.
 *
 * These data will be used in action() command, witch will be implemented
 * by the inherated class.
 *
 */
export abstract class ExpectOperation<P1 = any, P2 = any, P3 = any> {
  protected isNot: boolean;
  protected command: string;
  protected cordeBot: CordeBot;
  protected isEqual: boolean;
  protected output: any;
  protected expectation: any;
  protected hasPassed: boolean;
  protected showExpectAndOutputValue: boolean;
  protected customReturnMessage?: string;

  /**
   * Initialize the match class with its default values.
   *
   * @param cordeBot The instance of CordeBot initialized by the runtime.
   * @param command The command to execute.
   * @param isNot Definition if this is a deny test.
   */
  public constructor(cordeBot: CordeBot, command: string, isNot: boolean) {
    this.isNot = isNot;
    this.command = command;
    this.cordeBot = cordeBot;
  }

  /**
   * Execute the test, checking if a command did what was proposed to do.
   *
   * @param p1 First parameter of the test.
   * @param p2 Second parameter of the test.
   * @param p3 Thirty parameter of the test.
   *
   * @returns A report of the runned command.
   */
  public abstract async action(p1: P1, p2: P2, p3: P3): Promise<TestReport>;

  protected catchExecutionError<T extends Error | unknown>(error: T) {
    this.isEqual = false;
    if (error instanceof Error) {
      this.output = error.message;
    } else {
      this.output = error;
    }
  }

  protected generateReport(showExpectAndOutputValue = false, customReturnMessage?: string) {
    return new TestReport({
      commandName: this.command,
      expectation: this.expectation,
      hasPassed: this.defineIsEqual(this.isEqual),
      isNot: this.isNot,
      output: this.output,
      showExpectAndOutputValue,
      customReturnMessage,
    });
  }

  private defineIsEqual(actualIsEqual: boolean) {
    if (this.isNot) {
      return !actualIsEqual;
    }
    return actualIsEqual;
  }
}