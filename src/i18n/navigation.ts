import {createNavigation} from 'next-intl/navigation';
import {routing} from './routing';

/**
 * 从next-intl/navigation创建的多语言导航工具
 * 
 * @remarks
 * 该对象包含以下多语言导航相关的方法和组件：
 * - Link: 用于多语言路由的链接组件
 * - getPathname: 获取当前路径名
 * - redirect: 执行多语言重定向
 * - usePathname: React Hook，获取当前路径名
 * - useRouter: React Hook，获取路由对象
 */
export const {Link, getPathname, redirect, usePathname, useRouter} =
  createNavigation(routing);
