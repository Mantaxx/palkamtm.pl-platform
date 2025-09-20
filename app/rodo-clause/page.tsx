export const metadata = {
  title: 'Klauzula Informacyjna RODO - Gołębie Pocztowe',
  description: 'Klauzula Informacyjna RODO - informacje o przetwarzaniu danych osobowych w Serwisie Aukcyjnym Gołębie Pocztowe.',
}

import { UnifiedLayout } from '@/components/layout/UnifiedLayout'

export default function RodoClausePage() {
  return (
    <UnifiedLayout>
      <div className="relative z-10 pt-32 pb-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto">
          {/* Header */}
          <div className="text-center mb-12">
            <h1 className="text-4xl font-bold text-gray-900 mb-4">Klauzula Informacyjna RODO</h1>
            <p className="text-xl text-gray-600">
              Informacje o przetwarzaniu danych osobowych
            </p>
            <p className="text-sm text-gray-500 mt-2">
              Zgodnie z art. 13 Rozporządzenia Parlamentu Europejskiego i Rady (UE) 2016/679
            </p>
          </div>

          {/* RODO Clause Content */}
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-8">
            <div className="prose prose-lg max-w-none">
              <div className="bg-slate-50 border-l-4 border-slate-400 p-4 mb-8">
                <div className="flex">
                  <div className="flex-shrink-0">
                    <svg className="h-5 w-5 text-slate-400" viewBox="0 0 20 20" fill="currentColor">
                      <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
                    </svg>
                  </div>
                  <div className="ml-3">
                    <p className="text-sm text-slate-700 font-medium">
                      <strong>Informacja:</strong> Niniejsza klauzula stanowi skrócone podsumowanie
                      zasad przetwarzania danych osobowych. Pełne informacje znajdziesz w
                      <a href="/privacy" className="text-slate-800 underline ml-1">Polityce Prywatności</a>.
                    </p>
                  </div>
                </div>
              </div>

              <p className="mb-6">
                Zgodnie z art. 13 Rozporządzenia Parlamentu Europejskiego i Rady (UE) 2016/679 z dnia 27 kwietnia 2016 r.
                w sprawie ochrony osób fizycznych w związku z przetwarzaniem danych osobowych i w sprawie swobodnego przepływu
                takich danych oraz uchylenia dyrektywy 95/46/WE (ogólne rozporządzenie o ochronie danych, dalej: RODO), informujemy, że:
              </p>

              <h2 className="text-2xl font-bold text-gray-900 mb-4">Administrator Danych Osobowych</h2>
              <p className="mb-6">
                Administratorem Pani/Pana danych osobowych jest <strong>Pałka MTM</strong>, z siedzibą w <strong>Lubaniu</strong>,
                adres: <strong>ul. Stawowa 6, 59-800 Lubań</strong>, e-mail: <strong>kontakt@golebiepocztowe.pl</strong>.
              </p>

              <h2 className="text-2xl font-bold text-gray-900 mb-4">Cele i Podstawy Prawne Przetwarzania</h2>
              <p className="mb-4">Pani/Pana dane osobowe będą przetwarzane w celu:</p>
              <ul className="space-y-3 mb-6">
                <li>
                  <strong>świadczenia usług drogą elektroniczną</strong>, w tym założenia i prowadzenia konta w Serwisie oraz
                  umożliwienia udziału w aukcjach (podstawa: <strong>art. 6 ust. 1 lit. b RODO</strong> – wykonanie umowy);
                </li>
                <li>
                  <strong>umożliwienia finalizacji transakcji</strong> poprzez udostępnienie danych kontaktowych stronom umowy
                  kupna-sprzedaży (podstawa: <strong>art. 6 ust. 1 lit. f RODO</strong> – uzasadniony interes administratora);
                </li>
                <li>
                  <strong>wypełnienia obowiązków prawnych</strong>, np. podatkowych i rachunkowych (podstawa:
                  <strong>art. 6 ust. 1 lit. c RODO</strong>);
                </li>
                <li>
                  <strong>ewentualnego ustalenia, dochodzenia lub obrony przed roszczeniami</strong> (podstawa:
                  <strong>art. 6 ust. 1 lit. f RODO</strong> – uzasadniony interes administratora).
                </li>
              </ul>

              <h2 className="text-2xl font-bold text-gray-900 mb-4">Odbiorcy Danych</h2>
              <p className="mb-6">
                Pani/Pana dane mogą być udostępniane podmiotom przetwarzającym dane na nasze zlecenie (np. dostawcom usług IT,
                firmie hostingowej) oraz innym Użytkownikom Serwisu (drugiej stronie transakcji) w celu realizacji umowy sprzedaży.
              </p>

              <h2 className="text-2xl font-bold text-gray-900 mb-4">Okres Przechowywania Danych</h2>
              <p className="mb-6">
                Dane będą przechowywane przez okres posiadania konta w Serwisie, a po jego usunięciu – przez czas niezbędny
                do wypełnienia obowiązków prawnych lub dochodzenia roszczeń (zgodnie z obowiązującymi przepisami o przedawnieniu).
              </p>

              <h2 className="text-2xl font-bold text-gray-900 mb-4">Prawa Osoby, Której Dane Dotyczą</h2>
              <p className="mb-4">Posiada Pani/Pan prawo do:</p>
              <ul className="space-y-2 mb-6">
                <li>dostępu do swoich danych,</li>
                <li>sprostowania (poprawiania) danych,</li>
                <li>usunięcia danych,</li>
                <li>ograniczenia ich przetwarzania,</li>
                <li>wniesienia sprzeciwu wobec przetwarzania,</li>
                <li>przenoszenia danych.</li>
              </ul>

              <h2 className="text-2xl font-bold text-gray-900 mb-4">Prawo do Wniesienia Skargi</h2>
              <p className="mb-6">
                Ma Pani/Pan prawo wniesienia skargi do organu nadzorczego –
                <strong>Prezesa Urzędu Ochrony Danych Osobowych</strong> (ul. Stawki 2, 00-193 Warszawa).
              </p>

              <h2 className="text-2xl font-bold text-gray-900 mb-4">Informacja o Wymogu Podania Danych</h2>
              <p className="mb-6">
                Podanie danych osobowych jest dobrowolne, ale niezbędne do założenia konta i korzystania z pełnej funkcjonalności
                Serwisu, w tym do udziału w aukcjach.
              </p>

              <h2 className="text-2xl font-bold text-gray-900 mb-4">Zautomatyzowane Podejmowanie Decyzji</h2>
              <p className="mb-8">
                Pani/Pana dane osobowe nie będą wykorzystywane do zautomatyzowanego podejmowania decyzji, w tym do profilowania.
              </p>

              <div className="bg-green-50 border-l-4 border-green-400 p-4 mb-8">
                <div className="flex">
                  <div className="flex-shrink-0">
                    <svg className="h-5 w-5 text-green-400" viewBox="0 0 20 20" fill="currentColor">
                      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                    </svg>
                  </div>
                  <div className="ml-3">
                    <p className="text-sm text-green-700 font-medium">
                      <strong>Więcej informacji:</strong> Szczegółowe informacje na temat przetwarzania danych osobowych
                      znajdzie Pani/Pan w naszej
                      <a href="/privacy" className="text-green-800 underline ml-1">Polityce Prywatności</a>.
                    </p>
                  </div>
                </div>
              </div>

              <div className="mt-12 p-6 bg-gray-50 rounded-lg border border-gray-200">
                <p className="text-sm text-gray-600 text-center">
                  <strong>Ostatnia aktualizacja:</strong> {new Date().toLocaleDateString('pl-PL')}
                </p>
              </div>
            </div>
          </div>
        </div>
    </UnifiedLayout>
  )
}
