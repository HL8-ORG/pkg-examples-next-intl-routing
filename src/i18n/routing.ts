import {defineRouting} from 'next-intl/routing';

/**
 * 应用的多语言路由配置
 * 
 * @remarks
 * 该配置定义了应用支持的语言、默认语言以及特定路径的多语言映射
 * 
 * @example
 * // 访问英文版首页
 * /en/
 * // 访问德文版路径页面
 * /de/pfadnamen
 */
export const routing = defineRouting({
  /**
   * 支持的语言列表
   */
  locales: ['en', 'de'],
  
  /**
   * 默认语言，当URL中没有指定语言时使用
   */
  defaultLocale: 'en',
  
  /**
   * 路径的多语言映射配置
   * 
   * @remarks
   * 可以为特定路径定义不同语言的URL路径
   */
  pathnames: {
    '/': '/',
    '/pathnames': {
      de: '/pfadnamen'
    }
  }
});
