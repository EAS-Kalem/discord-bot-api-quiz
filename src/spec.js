// Bot API action constants
module.exports = Object.freeze({
  identifier: "quiz",
  actions: [
    "actions",
    "start",
    "continue",
    "answer",
    "scores",
    "insert",
    "end",
    "stats",
    "owner",
    "topics"
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
    start: {
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

    topics:{
      arg_count: 0,
      args: []
    },
    insert: {
      arg_count: 3,
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
    stats: {
      arg_count: 0,
      args: []
    },
    scores: {
      arg_count: 1,
      args: [
      ]
    }
  }
});