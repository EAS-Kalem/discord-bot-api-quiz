// Bot API action constants
module.exports = Object.freeze({
  identifier: "quiz",
  actions: [
    "actions",
    "create",
    "continue",
    "answer",
    "searchscores",
    "insertquestion",
    "insertindividual",
    "end",
    
    "owner"
  ],
  schema: {
    continue: {
      arg_count: 0,
      args: []
    },
    end: {
      arg_count: 0,
      args: []
    },
    create: {
      arg_count: 2,
      args: [
        {
          name: "topic",
          type: "string",
          pattern: "alphanumeric"
        },
        {
          name: "question_count",
          type: "number",
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

    insertquestion: {
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

    insertindividual: {
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
    answer: {
      arg_count: 1,
      args: [
        {
          name: "answer",
          type: "string",
          pattern: "alphanumeric"
        }
      ]
    },
    searchscores: {
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