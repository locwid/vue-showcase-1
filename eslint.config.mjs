import antfu from '@antfu/eslint-config'

export default antfu({}, {
  files: ['**/*.vue'],
  rules: {
    'vue/max-attributes-per-line': ['error', {
      singleline: {
        max: 1,
      },
      multiline: {
        max: 1,
      },
    }],
  },
})
