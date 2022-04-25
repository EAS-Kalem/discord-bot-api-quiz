// Bot API action constants
module.exports = Object.freeze({
  identifier: "quiz",
  actions: [
    "owner",
    "actions",
    "get",
    "searchTopic",
    "searchScores",
    "insertQuestion",
    "insertIndividual",
  ],
  schema: {
    searchTopic: {
      arg_count: 1,
      args: [
        {
          name: "name",
          type: "string",
          min: 3,
          max: 15,
          pattern: "alphanumeric"
        }
      ]
    },
    
    owner: {
      arg_count: 0,
      args: []
    },

    actions: {
      arg_count: 0,
      args: []
    },

    get: {
      arg_count: 0,
      args: []
    },

    insertQuestion: {
      arg_count: 4,
      args: [
        {
          name: "name",
          type: "string",
          min: 3,
          max: 15,
          pattern: "alphanumeric"
        }
      ]
    },

    insertIndividual: {
      arg_count: 1,
      args: [
        {
          name: "name",
          type: "string",
          min: 3,
          max: 15,
          pattern: "alphanumeric"
        }
      ]
    },

    searchScores: {
      arg_count: 1,
      args: [
        {
          name: "name",
          type: "string",
          min: 3,
          max: 15,
          pattern: "alphanumeric"
        }
      ]
    },

    searchIndividual: {
      arg_count: 1,
      args: [
        {
          name: "name",
          type: "string",
          min: 3,
          max: 15,
          pattern: "alphanumeric"
        }
      ]
    }
  }
});