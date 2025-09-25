import { PageHeader } from '@/components/layout/PageHeader';
import { UnifiedLayout } from '@/components/layout/UnifiedLayout';

export default function BreederVisitsPage() {
    return (
        <UnifiedLayout>
            <PageHeader title="Wizyty u hodowców" breadcrumbs={[{ name: 'Wizyty u hodowców' }]} />
            <div className="container mx-auto px-4 py-8">Strona w budowie...</div>
        </UnifiedLayout>
    );
}