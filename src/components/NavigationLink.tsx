'use client';

import clsx from 'clsx';
import {useSelectedLayoutSegment} from 'next/navigation';
import {ComponentProps} from 'react';
import {Link} from '@/i18n/navigation';

/**
 * 导航链接组件
 * 
 * 该组件用于在导航栏中创建带有活动状态指示的链接。
 * 使用 next/navigation 的 useSelectedLayoutSegment 钩子来判断当前活动路径，
 * 并根据路径匹配情况设置链接的样式和 ARIA 属性。
 * 
 * @param {Object} props - 组件属性
 * @param {string} props.href - 链接的目标路径
 * @param {Object} rest - 传递给 Link 组件的其他属性
 * 
 * @returns {JSX.Element} 返回一个带有活动状态指示的导航链接
 * 
 * @example
 * <NavigationLink href="/pathnames">Pathnames</NavigationLink>
 */
export default function NavigationLink({
  href,
  ...rest
}: ComponentProps<typeof Link>) {
  const selectedLayoutSegment = useSelectedLayoutSegment();
  const pathname = selectedLayoutSegment ? `/${selectedLayoutSegment}` : '/';
  const isActive = pathname === href;

  return (
    <Link
      aria-current={isActive ? 'page' : undefined}
      className={clsx(
        'inline-block px-2 py-3 transition-colors',
        isActive ? 'text-white' : 'text-gray-400 hover:text-gray-200'
      )}
      href={href}
      {...rest}
    />
  );
}
