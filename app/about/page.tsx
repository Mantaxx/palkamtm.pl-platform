import { Award, Heart, Target, Users, Zap } from 'lucide-react'

export const metadata = {
  title: 'O nas - Pałka MTM | Mistrzowie Sprintu',
  description: 'Poznaj historię hodowli Pałka MTM - tandem ojca i syna z Lubania, który od 2008 roku kształtuje polski sport gołębiarski.',
}

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-primary-600 to-primary-800 text-white py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl lg:text-5xl font-bold mb-6">
            O nas
          </h1>
          <p className="text-xl text-primary-100 max-w-3xl mx-auto">
            Tandem ojca i syna, który od 2008 roku kształtuje polski sport gołębiarski
          </p>
        </div>
      </section>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        {/* Historia */}
        <section className="mb-16">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl font-bold text-gray-900 mb-6">
                Nasza Historia
              </h2>
              <div className="space-y-4 text-gray-600 leading-relaxed">
                <p>
                  Hodowla Pałka MTM to historia pasji, determinacji i nieustannego dążenia do doskonałości. 
                  Tadeusz i Mariusz Pałka - tandem ojca i syna z Lubania - od 2008 roku konsekwentnie 
                  budują swoją pozycję w polskim sporcie gołębiarskim.
                </p>
                <p>
                  Co zaczęło się jako rodzinna pasja, szybko przekształciło się w profesjonalną hodowlę, 
                  która stała się "hodowlą-matką" dla setek hodowli w całej Polsce. Nasze gołębie 
                  noszą w sobie geny, które przekazywane są z pokolenia na pokolenie.
                </p>
                <p>
                  Każdy gołąb w naszej hodowli to nie tylko zwierzę, ale żywa historia sukcesów, 
                  triumfów i nieustannego dążenia do osiągnięcia najwyższych standardów w sporcie gołębiarskim.
                </p>
              </div>
            </div>
            <div className="relative">
              <div className="aspect-[4/3] rounded-2xl overflow-hidden bg-gradient-to-br from-primary-100 to-primary-200">
                <img
                  src="/champions/thunder-storm/gallery/Złota-Para.jpg"
                  alt="Tadeusz i Mariusz Pałka"
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="absolute -bottom-6 -right-6 bg-white p-6 rounded-xl shadow-lg">
                <div className="text-center">
                  <div className="text-2xl font-bold text-primary-600">2008</div>
                  <div className="text-sm text-gray-600">Rok założenia hodowli</div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Filozofia */}
        <section className="mb-16">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              Nasza Filozofia
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              W hodowli gołębi pocztowych łączymy tradycję z nowoczesnością, 
              pasję z profesjonalizmem
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="text-center p-6 bg-white rounded-xl shadow-sm border border-gray-100">
              <div className="w-16 h-16 bg-primary-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Heart className="w-8 h-8 text-primary-600" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-3">Pasja</h3>
              <p className="text-gray-600">
                Każdy gołąb to dla nas nie tylko zwierzę, ale żywa historia miłości do sportu gołębiarskiego
              </p>
            </div>

            <div className="text-center p-6 bg-white rounded-xl shadow-sm border border-gray-100">
              <div className="w-16 h-16 bg-primary-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Target className="w-8 h-8 text-primary-600" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-3">Precyzja</h3>
              <p className="text-gray-600">
                Dążymy do doskonałości w każdym aspekcie hodowli - od selekcji po trening
              </p>
            </div>

            <div className="text-center p-6 bg-white rounded-xl shadow-sm border border-gray-100">
              <div className="w-16 h-16 bg-primary-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Award className="w-8 h-8 text-primary-600" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-3">Dziedzictwo</h3>
              <p className="text-gray-600">
                Przekazujemy wiedzę i doświadczenie kolejnym pokoleniom hodowców
              </p>
            </div>

            <div className="text-center p-6 bg-white rounded-xl shadow-sm border border-gray-100">
              <div className="w-16 h-16 bg-primary-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Zap className="w-8 h-8 text-primary-600" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-3">Innowacja</h3>
              <p className="text-gray-600">
                Wykorzystujemy najnowsze metody hodowli i treningu dla osiągnięcia najlepszych wyników
              </p>
            </div>
          </div>
        </section>

        {/* Osiągnięcia */}
        <section className="mb-16">
          <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-8 lg:p-12">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold text-gray-900 mb-4">
                Nasze Osiągnięcia
              </h2>
              <p className="text-xl text-gray-600">
                Liczby, które mówią same za siebie
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="text-center">
                <div className="text-4xl font-bold text-primary-600 mb-2">500+</div>
                <div className="text-gray-600">Hodowli w Polsce</div>
                <div className="text-sm text-gray-500 mt-1">z naszymi genami</div>
              </div>
              <div className="text-center">
                <div className="text-4xl font-bold text-primary-600 mb-2">15+</div>
                <div className="text-gray-600">Lat doświadczenia</div>
                <div className="text-sm text-gray-500 mt-1">w hodowli gołębi</div>
              </div>
              <div className="text-center">
                <div className="text-4xl font-bold text-primary-600 mb-2">1000+</div>
                <div className="text-gray-600">Championów</div>
                <div className="text-sm text-gray-500 mt-1">wyhodowanych przez nas</div>
              </div>
            </div>
          </div>
        </section>

        {/* Zespół */}
        <section className="mb-16">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              Nasz Zespół
            </h2>
            <p className="text-xl text-gray-600">
              Tandem, który tworzy historię
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-8 text-center">
              <div className="w-24 h-24 bg-gradient-to-br from-primary-100 to-primary-200 rounded-full mx-auto mb-6 flex items-center justify-center">
                <Users className="w-12 h-12 text-primary-600" />
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-2">Tadeusz Pałka</h3>
              <p className="text-primary-600 font-medium mb-4">Ojciec - Założyciel hodowli</p>
              <p className="text-gray-600">
                Doświadczony hodowca z wieloletnim stażem. Jego wiedza i intuicja w selekcji 
                gołębi stały się fundamentem sukcesu całej hodowli.
              </p>
            </div>

            <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-8 text-center">
              <div className="w-24 h-24 bg-gradient-to-br from-primary-100 to-primary-200 rounded-full mx-auto mb-6 flex items-center justify-center">
                <Users className="w-12 h-12 text-primary-600" />
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-2">Mariusz Pałka</h3>
              <p className="text-primary-600 font-medium mb-4">Syn - Współwłaściciel</p>
              <p className="text-gray-600">
                Młode pokolenie, które wnosi świeże spojrzenie i nowoczesne metody hodowli. 
                Jego energia i determinacja napędzają rozwój hodowli.
              </p>
            </div>
          </div>
        </section>

        {/* Misja */}
        <section className="bg-gradient-to-r from-primary-600 to-primary-800 text-white rounded-2xl p-8 lg:p-12">
          <div className="text-center">
            <h2 className="text-3xl font-bold mb-6">Nasza Misja</h2>
            <p className="text-xl text-primary-100 max-w-4xl mx-auto leading-relaxed">
              Dążymy do tego, aby każdy gołąb z naszej hodowli był nie tylko doskonałym sportowcem, 
              ale także nosicielem najlepszych genów, które będą przekazywane kolejnym pokoleniom. 
              Naszym celem jest kształtowanie przyszłości polskiego sportu gołębiarskiego poprzez 
              hodowlę gołębi o najwyższej jakości i osiągnięciach.
            </p>
          </div>
        </section>
      </div>
    </div>
  )
}
