/*
 * @Copyright (c): Knowdee All rights reserved.
 * @Description: Type your file description
 * @Author: Type your email address
 * @LastEditors: wangwz@knowdee.com
 * @Date: 2024-01-12 11:19:36
 * @LastEditTime: 2024-01-13 14:35:48
 * @FilePath: /my-electron-app/forge.config.js
 */
module.exports = {
  packagerConfig: {
    asar: true,
  },
  rebuildConfig: {},
  makers: [
    {
      name: '@electron-forge/maker-squirrel',
      config: {},
    },
    {
      name: '@electron-forge/maker-zip',
      platforms: ['darwin'],
    },
    {
      name: '@electron-forge/maker-deb',
      config: {},
    },
    {
      name: '@electron-forge/maker-rpm',
      config: {},
    },
  ],
  plugins: [
    {
      name: '@electron-forge/plugin-auto-unpack-natives',
      config: {},
    },
  ],
  // 发布到github配置
  publishers: [
    {
      name: '@electron-forge/publisher-github',
      config: {
        repository: {
          owner: 'DeveloperWeizhang',
          name: 'electron-program'
        },
        prerelease: false,
        draft: true
      }
    }
  ]
};
