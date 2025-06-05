import {redirect} from 'next/navigation';

/**
 * 根页面组件，仅在静态构建时渲染（output: 'export'）
 * 
 * @function RootPage
 * @returns {void} 无返回值，直接重定向到默认语言页面
 * 
 * @example
 * // 访问根路径 '/' 时会被重定向到 '/DE'
 */
export default function RootPage() {
  redirect('/DE');
}
