class DataStructure {
    constructor(data) {
      this.data = data
      this.dependencyRules = []
      this.exclusiveRules = []
    }
  
    addDep(dep) {
      if (!this.dependencyRules.includes(dep)) {
        this.dependencyRules.push(dep)
      }
    }
  
    addConflict(conflict) {
      if (!this.exclusiveRules.includes(conflict)) {
        this.exclusiveRules.push(conflict)
      }
    }
  }

  module.exports = {
    DataStructure
  }