import fs from "fs";
import ora, { Color, Ora } from "ora";
import path from "path";
import { runtime } from "../common/runtime";
import { testCollector } from "../common/testCollector";
import reader from "../core/reader";
import { reporter } from "../core/reporter";
import { executeTestCases, executeTests, getTestsFromGroup } from "../core/runner";
import { Group, Test } from "../types";
import { validate } from "./validate";
import { FileError } from "../errors";

process.on("uncaughtException", () => {
  stopLoading();
});

declare module "ora" {
  interface Ora {
    _spinner: object;
  }
}

let spinner: Ora;

export async function go() {
  loadConfigs();
  const files = readDir(runtime.testFiles);
  if (!files || files.length === 0) {
    throw new FileError(`No test file was found in the path '${runtime.testFiles}'`);
  }
  await runTests(files);
}

function loadConfigs() {
  const configs = reader.loadConfig();
  runtime.setConfigs(configs);
  validate(runtime.configs);
}

async function runTests(files: string[]) {
  startLoading("login to corde bot");
  await runtime.loginBot(runtime.cordeTestToken);

  runtime.onBotStart().subscribe(async (isReady) => {
    if (isReady) {
      try {
        const groups = await reader.getTestsFromFiles(files);

        spinner.text = "starting bots";
        const tests = getTestsFromGroup(groups);
        if (!hasTestsToBeExecuted(tests)) {
          spinner.succeed();
          reporter.printNoTestFound();
          process.exit(0);
        }

        spinner.text = "running tests";
        await runTestsAndPrint(groups, tests);
      } catch (error) {
        spinner.stop();
        console.error(error);
        finishProcess(1);
      }
    }
  });
}

async function runTestsAndPrint(groups: Group[], tests: Test[]) {
  await executeTests(tests);
  spinner.succeed();
  const hasAllTestsPassed = reporter.outPutResult(groups);

  if (hasAllTestsPassed) {
    await finishProcess(0);
  } else {
    await finishProcess(1);
  }
}

async function finishProcess(code: number, error?: any) {
  try {
    if (error) {
      console.log(error);
    }

    if (testCollector.afterAllFunctions) {
      const exceptions = await testCollector.afterAllFunctions.executeWithCatchCollectAsync();
      if (exceptions.length) {
        console.log(exceptions);
        code = 1;
      }
    }

    runtime.logoffBot();
  } finally {
    process.exit(code);
  }
}

function startLoading(initialMessage: string) {
  spinner = ora(initialMessage).start();
  spinner._spinner = {
    interval: 80,
    frames: ["⠋", "⠙", "⠹", "⠸", "⠼", "⠴", "⠦", "⠧", "⠇", "⠏"],
  };
  spinner.color = getRandomSpinnerColor() as Color;
}

function getRandomSpinnerColor() {
  const colors = ["red", "green", "yellow", "blue", "magenta", "cyan"];
  let random = Math.random() * (colors.length - 1);
  random = Math.round(random);
  return colors[random];
}

function stopLoading() {
  if (spinner) {
    spinner.stop();
    spinner.clear();
  }
}

/**
 * Load tests files into configs
 */
function readDir(directories: string[]) {
  const files: string[] = [];
  for (const dir of directories) {
    const resolvedPath = path.resolve(process.cwd(), dir);

    if (fs.existsSync(resolvedPath)) {
      const stats = fs.lstatSync(resolvedPath);
      if (stats.isDirectory()) {
        const dirContent = fs.readdirSync(resolvedPath);
        const dirContentPaths = [];
        for (const singleDirContent of dirContent) {
          dirContentPaths.push(path.resolve(dir, singleDirContent));
        }
        files.push(...readDir(dirContentPaths));
      } else if (stats.isFile() && dir.includes(".test.")) {
        files.push(resolvedPath);
      }
    }
  }

  return files;
}

function hasTestsToBeExecuted(tests: Test[]) {
  if (!tests) {
    return false;
  }

  for (const test of tests) {
    if (test && test.testsFunctions) {
      for (const fn of test.testsFunctions) {
        if (fn) {
          return true;
        }
      }
    }
  }
  return false;
}
