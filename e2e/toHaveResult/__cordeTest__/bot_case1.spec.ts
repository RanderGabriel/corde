import corde from "../../../lib";

corde.describe("testing todoInCascade", () => {
  corde.it("test should pass", () => {
    corde
      .expect("sendMultiple 829873348309155851")
      .toHaveResult(
        corde.expect.toReturn("hello"),
        corde.expect.toReturnInChannel("hello2", "829873348309155851"),
      );
  });
});
