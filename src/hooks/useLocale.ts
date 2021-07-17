import { useContext, useMemo } from 'react';
import { CoreContext } from '../core/CoreContext';

export default function useLocale(Locale = {}) {
  const { locale: globalLocale } = useContext(CoreContext);

  return useMemo(() => (
    // @ts-ignore
    Object.assign(globalLocale, Locale)
  ),
  [Locale, globalLocale]);
}
