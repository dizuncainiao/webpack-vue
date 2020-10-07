module.exports = {
  "presets": [
    [
      "@babel/preset-env",
      {"corejs": {version: 3, proposals: true}, "useBuiltIns": "entry"}
    ]
  ],
  plugins: [
    [
      "import",
      {libraryName: "ant-design-vue", libraryDirectory: "es", style: true}
    ]
  ]
}
