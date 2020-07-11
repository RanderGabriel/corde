import { testCollector } from "../../src/common";
import { Group } from "../../src/interfaces";
import { group, test } from "../../src/api";

describe("Testing group function", () => {
  beforeEach(() => {
    testCollector.groups = [];
  });

  it("Should execute group function", () => {
    let a = 1;
    group("test group", () => {
      a = 2;
    });

    expect(a).toBe(2);
  });

  it("Should add a group", () => {
    const groupName = "test group";
    const groupObj: Group = {
      tests: [],
      name: groupName,
    };

    group(groupName, () => {});

    if (testCollector.groups && testCollector.groups.length === 0) {
      fail();
    } else {
      const gp = testCollector.groups[0];
      expect(gp).toEqual(groupObj);
    }
  });

  it("Should not add a group", () => {
    group(undefined, () => {});

    if (!testCollector.groups) {
      fail();
    } else {
      expect(testCollector.groups.length).toEqual(0);
    }
  });

  it("Should add group with test inside", () => {
    group("groupName", () => {
      test("testName", () => {});
    });

    const groupsObj: Group[] = [];
    groupsObj.push({
      name: "groupName",
      tests: [
        {
          testsFunctions: [],
          name: "testName",
        },
      ],
    });
    expect(testCollector.groups).toEqual(groupsObj);
  });
});