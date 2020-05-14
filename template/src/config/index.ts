interface IConfig {
  authKey: string
  baseUrl: string
}

const config: IConfig = {
  baseUrl: '/api',
  authKey: 'Authorization'
}
const env = process.env.REACT_APP_CONFIG_ENV || 'prod'
const envConfig = require(`./config.${env}`).default || {}
export default Object.assign({}, config, envConfig) as IConfig
