module.exports = (api) => {
  api.cache(true)
  return {
    presets: [
      [
        '@babel/preset-env',
        {
          modules: false,
          useBuiltIns: 'usage',
          corejs: 3,
        },
      ],
      '@babel/preset-typescript',
      '@babel/preset-react',
    ],
    plugins: [
      ['@babel/plugin-proposal-decorators', { legacy: true }],
      ['@babel/plugin-proposal-class-properties', { loose: true }],
      [
        'import',
        {
          libraryName: 'antd',
          libraryDirectory: 'es',
          style: false,
        },
      ],
      [
        'emotion',
        {
          sourceMap: false,
        },
      ],
      [
        'import',
        {
          libraryName: 'esc-ui',
          style: true,
        },
        'esc-ui',
      ],
    ],
  }
}
