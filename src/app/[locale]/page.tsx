import {Locale, useTranslations} from 'next-intl';
import {setRequestLocale} from 'next-intl/server';
import {use} from 'react';
import PageLayout from '@/components/PageLayout';

/**
 * 页面组件的属性类型定义
 * @property {Promise<{locale: Locale}>} params - 包含语言环境信息的Promise对象
 */
type Props = {
  params: Promise<{locale: Locale}>;
};

/**
 * 首页组件
 * @param {Props} props - 组件属性
 * @param {Promise<{locale: Locale}>} props.params - 包含语言环境信息的Promise对象
 * @returns {JSX.Element} 返回渲染的页面内容
 */
export default function IndexPage({params}: Props) {
  // 从params中获取当前语言环境
  const {locale} = use(params);

  // 启用静态渲染
  setRequestLocale(locale);

  // 获取翻译函数
  const t = useTranslations('IndexPage');

  return (
    <PageLayout title={t('title')}>
      <p className="max-w-[590px]">
        {t.rich('description', {
          code: (chunks) => (
            <code className="font-mono text-white">{chunks}</code>
          )
        })}
      </p>
    </PageLayout>
  );
}
