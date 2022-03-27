module.exports = {
  extends: ['@commitlint/config-conventional'],
  rules: {
    'subject-case': [2, 'never'],
    'type-empty': [2, 'never'],
    'subject-empty': [2, 'never'],
  },
  prompt: {
    questions: {
      subject: {
        description: 'Write a short, imperative tense description of the change',
      },
      body: {
        description: 'You must provide a longer description of the change',
      },
      type: {
        description: 'You must provide the type of the change',
      },
    },
  },
};
