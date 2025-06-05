import {MetadataRoute} from 'next';
import {getTranslations} from 'next-intl/server';
import {routing} from '@/i18n/routing';

/**
 * 生成PWA应用的manifest文件
 * 
 * @async
 * @function manifest
 * @returns {Promise<MetadataRoute.Manifest>} 返回符合PWA规范的manifest对象
 * 
 * @example
 * // 返回的manifest对象示例
 * {
 *   name: "应用名称",
 *   start_url: "/",
 *   theme_color: "#101E33"
 * }
 */
export default async function manifest(): Promise<MetadataRoute.Manifest> {
  // 获取默认语言的翻译函数
  const t = await getTranslations({
    locale: routing.defaultLocale,
    namespace: 'Manifest'
  });

  // 返回manifest配置对象
  return {
    name: t('name'), // 应用名称，从翻译文件中获取
    start_url: '/', // 应用启动时的初始URL
    theme_color: '#101E33' // 应用的主题颜色
  };
}
