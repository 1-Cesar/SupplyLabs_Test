const { RuleSet } = require("../src/service/RuleSet");

describe("Scenario Tests", () => {
  let ruleSet;

  beforeEach(() => {
    ruleSet = new RuleSet();
  });

  it("TestDependsAA - The result should be coherent", () => {
    ruleSet.addDep("a", "a");
    expect(ruleSet.isCoherent()).toEqual(true);
  });

  it("TestDependsAB_BA - The result should be coherent", () => {
    ruleSet.addDep("a", "b");
    ruleSet.addDep("b", "a");
    expect(ruleSet.isCoherent()).toEqual(true);
  });

  it("TestExclusiveAB - Be coherent should return an error", () => {
    ruleSet.addDep("a", "b");    
    ruleSet.addConflict("a", "b");
    expect(ruleSet.isCoherent()).toEqual(false);
  });

  it("TestExclusiveAB_BC - Be coherent should return an error", () => {
    ruleSet.addDep("a", "b");
    ruleSet.addDep("b", "c");
    ruleSet.addConflict("a", "c");
    expect(ruleSet.isCoherent()).toEqual(false);
  });

  it("TestDeepDeps - Be coherent should return an error", () => {
    ruleSet.addDep("a", "b");
    ruleSet.addDep("b", "c");
    ruleSet.addDep("c", "d");
    ruleSet.addDep("d", "e");
    ruleSet.addDep("a", "f");
    ruleSet.addConflict("e", "f");
    expect(ruleSet.isCoherent()).toEqual(false);
  });
});