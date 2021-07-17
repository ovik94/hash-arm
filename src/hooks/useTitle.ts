import { useEffect } from 'react';
import useLocale from './useLocale';

export default function useTitle(title?: string): void {
  const { defaultTitle } = useLocale();

  useEffect(() => {
    document.title = title ? `${title} - ${defaultTitle}` : defaultTitle;
  });
}
