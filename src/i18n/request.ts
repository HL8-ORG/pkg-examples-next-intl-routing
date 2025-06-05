import {hasLocale} from 'next-intl';
import {getRequestConfig} from 'next-intl/server';
import {routing} from './routing';

/**
 * 获取请求配置
 * 
 * @remarks
 * 该函数用于处理多语言请求配置，根据请求的语言环境返回相应的语言配置和翻译消息
 * 
 * @param param0 - 包含请求语言环境的参数对象
 * @param param0.requestLocale - 请求的语言环境
 * 
 * @returns 返回包含语言环境和对应翻译消息的配置对象
 * 
 * @example
 * // 返回英文配置
 * {
 *   locale: 'en',
 *   messages: { ... }
 * }
 */
export default getRequestConfig(async ({requestLocale}) => {
  // 通常对应`[locale]`路径段
  const requested = await requestLocale;
  const locale = hasLocale(routing.locales, requested)
    ? requested
    : routing.defaultLocale;

  return {
    locale,
    messages: (await import(`../../messages/${locale}.json`)).default
  };
});
