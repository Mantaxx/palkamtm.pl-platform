import { HeritageFlyingPages } from '@/components/heritage/HeritageFlyingPages';
import { UnifiedLayout } from '@/components/layout/UnifiedLayout';

export const metadata = {
  title: 'Nasze Dziedzictwo - Gołębie Pocztowe',
  description: 'Poznaj bogatą historię naszej hodowli gołębi pocztowych i filozofię hodowli.',
}

export default function HeritagePage() {
  return (
    <UnifiedLayout showNavigation>
      <HeritageFlyingPages />
    </UnifiedLayout>
  );
}
