const DataStructure = require("../model/DataStructure");

class RuleSet {
  constructor() {
    this.dataStructures = {};
  }

  getStructure(data) {
    if (!this.dataStructures[data]) {
      this.dataStructures[data] = new DataStructure.DataStructure();
    }
    return this.dataStructures[data];
  }

  addDep(a, b) {
    this.getStructure(a).addDep(b);
    this.getStructure(b).addDep(a);
  }

  addConflict(a, b) {
    this.getStructure(a).addConflict(b);
    this.getStructure(b).addConflict(a);
  }

  isCoherent() {
    let dataStructures = Object.keys(this.dataStructures).map(
      (key) => this.dataStructures[key]
    );

    for (let data of dataStructures) {
      let { allDependencies, allExclusiveRules } = this.getAllRules(data);

      for (let dependency of allDependencies) {
        if (allExclusiveRules.includes(dependency)) {
          return false;
        }
      }
      return true;
    }
  }

  getAllRules(dataStructure) {
    let allRules = {
      dependencyRules: [],
      exclusiveRules: [],
    };

    this.extractFor(dataStructure, allRules);

    return {
      allDependencies: [...new Set(allRules.dependencyRules)],
      allExclusiveRules: [...new Set(allRules.exclusiveRules)],
    };
  }

  extractFor(dataStructure, allRules) {
    for (let dependency of dataStructure.dependencyRules) {
      this.joinRules(this.dataStructures[dependency], allRules);
    }
  }

  joinRules(data, allRules) {
    if (!data.checked) {
      data.checked = true;
      allRules.dependencyRules = [
        ...allRules.dependencyRules,
        ...data.dependencyRules,
      ];
      allRules.exclusiveRules = [
        ...allRules.exclusiveRules,
        ...data.exclusiveRules,
      ];

      this.extractFor(data, allRules);
    }
  }
}

module.exports = {
  RuleSet,
};
