import {useLocale, useTranslations} from 'next-intl';
import {routing} from '@/i18n/routing';
import LocaleSwitcherSelect from './LocaleSwitcherSelect';

/**
 * 语言切换器组件
 * 
 * 该组件用于在应用中进行语言切换，支持多语言环境。
 * 使用 next-intl 进行国际化处理，从 i18n 配置中获取可用语言列表。
 * 
 * @returns {JSX.Element} 返回一个语言选择器组件，包含所有支持的语言选项
 * 
 * @example
 * <LocaleSwitcher />
 */
export default function LocaleSwitcher() {
  // 获取当前语言的翻译函数
  const t = useTranslations('LocaleSwitcher');
  // 获取当前语言环境
  const locale = useLocale();

  return (
    <LocaleSwitcherSelect defaultValue={locale} label={t('label')}>
      {routing.locales.map((cur) => (
        <option key={cur} value={cur}>
          {t('locale', {locale: cur})}
        </option>
      ))}
    </LocaleSwitcherSelect>
  );
}
