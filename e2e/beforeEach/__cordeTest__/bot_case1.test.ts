import corde from "../../../lib";
import { testCollector } from "../../../lib/src/common/testCollector";

corde.beforeEach(() => {
  console.log("test beforeEach");
});

corde.it("", () => {
  testCollector.addTestFunction(() => Promise.resolve({ pass: true }));
});
