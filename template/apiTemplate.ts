import { CodeGenerator, Interface } from 'pont-engine'

const noLoadingApis = ['/order/create', '/share/image', '/agent_order/new/page/count']

function formatPath(rawPath: string) {
  const reg = /\{(\w+)\}/ // 匹配{something}
  const res = reg.exec(rawPath)
  if (res) {
    const index = res.index
    const params = res[1]
    return [rawPath.substr(0, index) + '$' + rawPath.substr(index), params]
  }
  return [rawPath, '']
}

function getRequestParams(params: string) {
  if (!params) {
    return ''
  }
  return `, ${params}: string | number`
}

// const noTipsApis = ['/share/image']
export default class MyGenerator extends CodeGenerator {
  getInterfaceContent(inter: Interface) {
    // const requestBodyParams = inter.parameters.find(it => it.in === 'body')
    const bodyParmas = inter.getBodyParamsCode()

    const queryParamsType = 'IQueryParams'
    const queryParamsTmp = `queryParams:${queryParamsType}`
    const bodyParamsTmp = `bodyParams:${bodyParmas}`
    const paramsInterfaceTmp = `
    interface IParams{
      ${queryParamsTmp}
      ${bodyParmas ? bodyParamsTmp : ''}
    }
    `
    const requestParams = bodyParmas ? `{queryParams,bodyParams}` : `{queryParams}`
    // const judgeIsNeedImportBaseClass = `${
    //   bodyParmas ? "\n import * as defs from '../../baseClass' " : ''
    // }`
    const noLoading = Boolean(noLoadingApis.find(it => it === inter.path))
    const [path, params] = formatPath(inter.path)
    return `
    /**
     * @desc ${inter.description}
     */
    import request from '@/utils/request'
    export ${inter.getParamsCode(queryParamsType)}
    export ${paramsInterfaceTmp}
    export function ${inter.name}(${requestParams}:IParams = {} as IParams${getRequestParams(params)}) {
      return request({
        url: \`${path}\`,
        method: '${inter.method}',
        noLoading:${noLoading},
        ${bodyParmas ? 'body: bodyParams' : 'params: queryParams'}
      });
    }
   `
  }
}
