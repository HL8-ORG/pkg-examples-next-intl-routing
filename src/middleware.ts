import createMiddleware from 'next-intl/middleware';
import {routing} from './i18n/routing';

export default createMiddleware(routing);

/**
 * 中间件配置对象
 * 
 * @remarks
 * 该配置用于定义中间件的匹配规则，排除以下路径：
 * - 以 `/api`, `/trpc`, `/_next`, `/_vercel` 开头的路径
 * - 包含点号的文件路径（如 `favicon.ico`）
 * 
 * @example
 * 匹配路径：`/about`, `/products`
 * 不匹配路径：`/api/users`, `/_next/static`, `/favicon.ico`
 */
export const config = {
  matcher: '/((?!api|trpc|_next|_vercel|.*\\..*).*)'
};
