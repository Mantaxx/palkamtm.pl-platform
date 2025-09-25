'use client';

import Image from 'next/image';
import { useCallback, useEffect, useState } from 'react';

interface HeritageItem {
  year: string;
  title: string;
  description: string;
  image: string;
  achievements: {
    level: string;
    category: string;
    position: string;
    points: string;
    contests: string;
  }[];
}

const heritageItems: HeritageItem[] = [
  {
    year: "2000",
    title: "BUDOWA GOŁĘBNIKA",
    description: "Rozpoczęcie budowy profesjonalnego gołębnika\n\n• Budowa nowoczesnego gołębnika w Lubaniu\n• Przygotowanie infrastruktury do hodowli\n• Planowanie przyszłych sukcesów w sporcie gołębiarskim",
    image: "/heritage/Gemini_Generated_Image_c7f94sc7f94sc7f9.png",
    achievements: []
  },
  {
    year: "2001",
    title: "PIERWSZE SUKCESY",
    description: "Pierwsze znaczące osiągnięcia w hodowli",
    image: "/heritage/Gemini_Generated_Image_g29t5gg29t5gg29t.png",
    achievements: [
      { level: "Oddział Lubań", category: "A", position: "Mistrz", points: "235,77", contests: "20" },
      { level: "Oddział Lubań", category: "B", position: "I Wicemistrz", points: "503,62", contests: "16" },
      { level: "Oddział Lubań", category: "GMO", position: "Mistrz", points: "-", contests: "-" }
    ]
  },
  {
    year: "2002",
    title: "MISTRZOSTWO ODDZIAŁU I OKRĘGU",
    description: "Kontynuacja sukcesów na poziomie oddziału i okręgu",
    image: "/heritage/Gemini_Generated_Image_gqwni1gqwni1gqwn.png",
    achievements: [
      { level: "Oddział Lubań", category: "A", position: "Mistrz", points: "501,52", contests: "20" },
      { level: "Okręg Jelenia Góra", category: "A", position: "Mistrz", points: "501,52", contests: "20" },
      { level: "Region V", category: "A", position: "50 Przodownik", points: "501,52", contests: "20" }
    ]
  },
  {
    year: "2003",
    title: "PIERWSZE STARTY",
    description: "Rozpoczęcie przygody z hodowlą gołębi pocztowych",
    image: "/heritage/Gemini_Generated_Image_jk1obojk1obojk1o.png",
    achievements: [
      { level: "MP", category: "GMP", position: "28 Przodownik", points: "1066,26", contests: "-" },
      { level: "Region V", category: "A", position: "10 Przodownik", points: "203,54", contests: "20" },
      { level: "Region V", category: "B", position: "49 Przodownik", points: "217,78", contests: "16" }
    ]
  },
  {
    year: "2004",
    title: "PIERWSZE SUKCESY",
    description: "Zdobycie pierwszych znaczących osiągnięć",
    image: "/heritage/Gemini_Generated_Image_jlvhbrjlvhbrjlvh.png",
    achievements: [
      { level: "Region V", category: "A", position: "18 Przodownik", points: "180,91", contests: "20" },
      { level: "MP", category: "A", position: "2 Przodownik", points: "180,91", contests: "20" },
      { level: "Region V", category: "D", position: "36 Przodownik", points: "839,32", contests: "-" }
    ]
  },
  {
    year: "2005",
    title: "WICEMISTRZOSTWO REGIONU",
    description: "Drugie miejsce w Mistrzostwach Regionu V",
    image: "/heritage/Gemini_Generated_Image_kwzk4pkwzk4pkwzk.png",
    achievements: [
      { level: "Region V", category: "A", position: "II Wicemistrz", points: "90,65", contests: "20" },
      { level: "MP", category: "A", position: "I Przodownik", points: "90,65", contests: "20" },
      { level: "MP", category: "B", position: "V Przodownik", points: "66,96", contests: "16" }
    ]
  },
  {
    year: "2006",
    title: "MISTRZOSTWO POLSKI MŁODYCH",
    description: "Sukces w kategorii gołębi młodych",
    image: "/heritage/Gemini_Generated_Image_plbvxvplbvxvplbv.png",
    achievements: [
      { level: "MP", category: "GMO", position: "VI Przodownik", points: "82,77", contests: "15" },
      { level: "Region V", category: "GMO", position: "3 Przodownik", points: "82,77", contests: "15" },
      { level: "Oddział Lubań", category: "GMO", position: "Mistrz", points: "82,77", contests: "15" }
    ]
  },
  {
    year: "2007",
    title: "WYSOKIE OSIĄGNIĘCIA KAT. A",
    description: "Drugie miejsce w kategorii A",
    image: "/heritage/Gemini_Generated_Image_vrv4pbvrv4pbvrv4.png",
    achievements: [
      { level: "MP", category: "A", position: "I Przodownik", points: "78,06", contests: "20" },
      { level: "Region V", category: "A", position: "II Przodownik", points: "78,06", contests: "20" },
      { level: "Oddział Lubań", category: "A", position: "Mistrz", points: "78,06", contests: "20" }
    ]
  },
  {
    year: "2008-2010",
    title: "ZŁOTA ERA HODOWLI",
    description: "Najlepsze lata w historii hodowli\n\n• Wielokrotne mistrzostwa Polski\n• Sukcesy międzynarodowe\n• Rozwój linii hodowlanych",
    image: "/heritage/Gemini_Generated_Image_c7f94sc7f94sc7f9.png",
    achievements: [
      { level: "MP", category: "A", position: "Mistrz", points: "95,32", contests: "20" },
      { level: "MP", category: "B", position: "I Wicemistrz", points: "88,45", contests: "16" },
      { level: "Region V", category: "A", position: "Mistrz", points: "95,32", contests: "20" }
    ]
  },
  {
    year: "2011-2015",
    title: "MIĘDZYNARODOWE SUKCESY",
    description: "Rozszerzenie działalności na arenie międzynarodowej\n\n• Udział w mistrzostwach Europy\n• Współpraca z hodowcami z całego świata\n• Nowe techniki treningowe",
    image: "/heritage/Gemini_Generated_Image_g29t5gg29t5gg29t.png",
    achievements: [
      { level: "ME", category: "A", position: "5 Przodownik", points: "156,78", contests: "25" },
      { level: "MP", category: "A", position: "Mistrz", points: "142,33", contests: "20" },
      { level: "Region V", category: "A", position: "Mistrz", points: "142,33", contests: "20" }
    ]
  },
  {
    year: "2016-2020",
    title: "NOWOCZESNA HODOWLA",
    description: "Wprowadzenie nowoczesnych technologii\n\n• Systemy monitoringu GPS\n• Analiza genetyczna\n• Optymalizacja żywienia",
    image: "/heritage/Gemini_Generated_Image_gqwni1gqwni1gqwn.png",
    achievements: [
      { level: "MP", category: "A", position: "Mistrz", points: "168,45", contests: "20" },
      { level: "MP", category: "B", position: "Mistrz", points: "145,67", contests: "16" },
      { level: "Region V", category: "A", position: "Mistrz", points: "168,45", contests: "20" }
    ]
  },
  {
    year: "2021-2024",
    title: "DZISIAJ I PRZYSZŁOŚĆ",
    description: "Kontynuacja tradycji z nowoczesnym podejściem\n\n• Najnowsze osiągnięcia\n• Plany na przyszłość\n• Przekazywanie wiedzy młodym hodowcom",
    image: "/heritage/Gemini_Generated_Image_jk1obojk1obojk1o.png",
    achievements: [
      { level: "MP", category: "A", position: "Mistrz", points: "175,23", contests: "20" },
      { level: "MP", category: "B", position: "I Wicemistrz", points: "158,91", contests: "16" },
      { level: "Region V", category: "A", position: "Mistrz", points: "175,23", contests: "20" }
    ]
  }
];

export function HeritageScrollAnimation() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [scrollY, setScrollY] = useState(0);

  // Ustaw wysokość spaceru po załadowaniu i przy zmianie rozmiaru okna
  useEffect(() => {
    const updateSpacerHeight = () => {
      const spacer = document.querySelector('.heritage-spacer') as HTMLElement;
      if (spacer) {
        const newHeight = window.innerHeight * 12 * 2; // 200vh na element
        spacer.style.height = `${newHeight}px`;
        console.log('Spacer height set to:', newHeight);
        console.log('Window height:', window.innerHeight);
        console.log('Document height:', document.documentElement.scrollHeight);
      } else {
        console.error('Spacer not found!');
      }
    };

    // Opóźnij ustawienie wysokości, żeby spacer był już w DOM
    setTimeout(updateSpacerHeight, 100);
    window.addEventListener('resize', updateSpacerHeight);

    return () => window.removeEventListener('resize', updateSpacerHeight);
  }, []);

  const getItemStyle = useCallback((index: number) => {
    const sectionHeight = window.innerHeight * 2; // 200vh
    const currentScroll = scrollY;
    const itemStart = index * sectionHeight;

    // Oblicz postęp scrollowania dla tego elementu
    const progress = Math.max(0, Math.min(1, (currentScroll - itemStart) / sectionHeight));

    // Różne pozycje startowe dla każdego elementu - niżej
    const startPositions = [
      { x: -50, y: 10 },  // Lewo-środek
      { x: 50, y: 20 },   // Prawo-środek
      { x: -30, y: 40 },  // Lewo-dół
      { x: 30, y: 30 },   // Prawo-dół
      { x: -60, y: 25 },  // Lewo-dół
      { x: 60, y: 15 },   // Prawo-środek
      { x: 0, y: 5 },     // Środek-środek
      { x: -20, y: 50 },  // Lewo-dół
      { x: 40, y: 45 },   // Prawo-dół
      { x: -40, y: 20 },  // Lewo-środek
      { x: 20, y: 10 },   // Prawo-środek
      { x: 10, y: 55 }    // Środek-dół
    ];

    const startPos = startPositions[index % startPositions.length];

    if (progress === 0) {
      // Element jeszcze nie zaczął się animować
      if (index === 0) {
        // Pierwszy element pokazuj jako mały na początku
        return {
          transform: `translate(${startPos.x}%, ${startPos.y}%) scale(0.2) translateZ(-800px)`,
          opacity: 0.5,
          zIndex: 100
        };
      } else {
        return {
          transform: `translate(${startPos.x}%, ${startPos.y}%) scale(0.05) translateZ(-1500px)`,
          opacity: 0,
          zIndex: 10
        };
      }
    } else if (progress < 0.2) {
      // Element pojawia się i powiększa (0-20% scrollowania)
      // Responsywne skalowanie na podstawie rozmiaru okna
      const baseScale = Math.min(window.innerWidth / 1920, window.innerHeight / 1080, 1);
      const scale = (0.2 + (progress / 0.2) * 0.8) * baseScale; // 0.2 do 1.0 * baseScale
      const z = -1000 + (progress / 0.2) * 1200; // -1000 do 200
      const opacity = (progress / 0.2) * 1; // 0 do 1

      // Płynne przejście do centrum
      const currentX = startPos.x + (progress / 0.2) * (-50 - startPos.x);
      const currentY = startPos.y + (progress / 0.2) * (-50 - startPos.y);

      return {
        transform: `translate(${currentX}%, ${currentY}%) scale(${scale}) translateZ(${z}px)`,
        opacity: opacity,
        zIndex: 1000
      };
    } else if (progress < 0.6) {
      // Element jest w pełnym rozmiarze (20-60% scrollowania)
      const baseScale = Math.min(window.innerWidth / 1920, window.innerHeight / 1080, 1);
      const scale = 1.0 * baseScale; // Responsywne skalowanie - zwiększone z 0.5 do 1.0
      return {
        transform: `translate(-50%, -50%) scale(${scale}) translateZ(200px)`,
        opacity: 1,
        zIndex: 1000
      };
    } else {
      // Element zaczyna znikać i "wylatuje" (60-100% scrollowania)
      const fadeProgress = (progress - 0.6) / 0.4;
      const baseScale = Math.min(window.innerWidth / 1920, window.innerHeight / 1080, 1);
      const scale = (1.0 + fadeProgress * 1.0) * baseScale; // 1.0 do 2.0 * baseScale - zwiększone skalowanie
      const z = 200 + fadeProgress * 1200; // 200 do 1400 - głębiej
      const opacity = 1 - (fadeProgress * fadeProgress); // Wolniejsze zanikanie

      // Różne kierunki znikania - dalej poza ekran
      const exitDirections = [
        { x: -150, y: -100 }, // Lewo-góra - daleko poza ekran
        { x: 150, y: -100 },  // Prawo-góra - daleko poza ekran
        { x: -120, y: 120 },  // Lewo-dół - daleko poza ekran
        { x: 120, y: 120 },   // Prawo-dół - daleko poza ekran
        { x: -200, y: 0 },    // Lewo - daleko poza ekran
        { x: 200, y: 0 },     // Prawo - daleko poza ekran
        { x: 0, y: -150 },    // Góra - daleko poza ekran
        { x: 0, y: 150 },     // Dół - daleko poza ekran
        { x: -130, y: -130 }, // Lewo-góra - daleko poza ekran
        { x: 130, y: -130 },  // Prawo-góra - daleko poza ekran
        { x: -130, y: 130 },  // Lewo-dół - daleko poza ekran
        { x: 130, y: 130 }    // Prawo-dół - daleko poza ekran
      ];

      const exitDir = exitDirections[index % exitDirections.length];
      const currentX = -50 + fadeProgress * (exitDir.x - (-50));
      const currentY = -50 + fadeProgress * (exitDir.y - (-50));

      return {
        transform: `translate(${currentX}%, ${currentY}%) scale(${scale}) translateZ(${z}px)`,
        opacity: opacity,
        zIndex: 1000
      };
    }
  }, [scrollY]);

  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY;
      setScrollY(scrollY);

      // Oblicz który element powinien być aktualnie wyświetlany
      // Każdy element ma 200vh wysokości (2400vh / 12 elementów)
      const sectionHeight = window.innerHeight * 2; // 200vh
      const newIndex = Math.min(Math.floor(scrollY / sectionHeight), heritageItems.length - 1);
      setCurrentIndex(newIndex);

      // Debug: sprawdź czy spacer ma odpowiednią wysokość
      const spacer = document.querySelector('.heritage-spacer') as HTMLElement;
      if (spacer) {
        console.log('Spacer height:', spacer.offsetHeight);
        console.log('Expected height:', window.innerHeight * 12 * 1.5);
        console.log('Document height:', document.documentElement.scrollHeight);
      }

      // Aplikuj style do elementów
      const items = document.querySelectorAll('.heritage-item');
      items.forEach((item, index) => {
        const element = item as HTMLElement;
        const itemStyle = getItemStyle(index);
        element.style.transform = itemStyle.transform;
        element.style.opacity = itemStyle.opacity.toString();
        element.style.zIndex = itemStyle.zIndex.toString();
      });
    };

    const handleResize = () => {
      // Aktualizuj style po zmianie rozmiaru okna
      const items = document.querySelectorAll('.heritage-item');
      items.forEach((item, index) => {
        const element = item as HTMLElement;
        const itemStyle = getItemStyle(index);
        element.style.transform = itemStyle.transform;
        element.style.opacity = itemStyle.opacity.toString();
        element.style.zIndex = itemStyle.zIndex.toString();
      });
    };

    window.addEventListener('scroll', handleScroll);
    window.addEventListener('resize', handleResize);
    return () => {
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('resize', handleResize);
    };
  }, [scrollY, getItemStyle]);

  return (
    <div className="heritage-container relative w-full bg-gradient-to-br from-gray-900 via-gray-800 to-black">
      {/* Spacer dla scrollowania - każdy element ma swoją sekcję */}
      <div className="heritage-spacer heritageSpacer"></div>

      {/* Fixed Container - z marginesem dla nawigacji */}
      <div className="fixed inset-0 flex items-center justify-center heritage-container heritage-container-with-nav">
        {/* Heritage Items */}
        {heritageItems.map((item) => (
          <div
            key={item.year}
            className="heritage-item absolute w-80 h-96 bg-gradient-to-br from-gray-800 to-gray-900 rounded-2xl shadow-2xl border-2 border-white overflow-hidden heritage-item-3d heritage-item-positioned transition-all duration-1000 ease-out heritageItemShadow"
          >
            {/* Image */}
            <div className="w-full h-48 relative overflow-hidden">
              <Image
                src={item.image}
                alt={`Osiągnięcia z ${item.year}`}
                width={320}
                height={180}
                className="w-full h-full object-cover"
                onError={(e) => {
                  const target = e.currentTarget as HTMLImageElement;
                  target.src = '/heritage/Gemini_Generated_Image_c7f94sc7f94sc7f9.png';
                }}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent"></div>
              <div className="absolute bottom-4 left-4 text-white">
                <h2 className="text-3xl font-bold">{item.year}</h2>
                <p className="text-sm opacity-90">{item.title}</p>
              </div>
            </div>

            {/* Content */}
            <div className="p-6 text-white">
              <h3 className="text-xl font-bold mb-3 text-white">{item.title}</h3>
              <p className="text-sm text-gray-300 mb-4 leading-relaxed">
                {item.description.split('\n').map((line, i) => (
                  <span key={i}>
                    {line}
                    {i < item.description.split('\n').length - 1 && <br />}
                  </span>
                ))}
              </p>

              {/* Achievements */}
              {item.achievements.length > 0 && (
                <div className="space-y-2">
                  <h4 className="text-sm font-semibold text-white mb-2">Osiągnięcia:</h4>
                  {item.achievements.slice(0, 3).map((achievement, i) => (
                    <div key={i} className="text-xs bg-gray-700 p-2 rounded border border-white/20">
                      <div className="font-semibold text-white">{achievement.level} - {achievement.category}</div>
                      <div className="text-white">{achievement.position}</div>
                      <div className="text-gray-400">{achievement.points} pkt</div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        ))}

        {/* Progress Indicator */}
        <div className="fixed top-8 right-8 text-white z-50 bg-black/50 p-4 rounded-lg">
          <div className="text-sm opacity-70">
            Element: {currentIndex + 1} / {heritageItems.length}
          </div>
          <div className="text-xs opacity-50">
            Scroll: {Math.round(scrollY)}px
          </div>
          <div className="text-xs opacity-50">
            Rok: {heritageItems[currentIndex]?.year || '2000'}
          </div>
          <div className="text-xs opacity-50">
            Wysokość spaceru: {(() => {
              const spacer = document.querySelector('.heritage-spacer') as HTMLElement;
              return spacer ? Math.round(spacer.offsetHeight) : 'Nie znaleziono';
            })()}px
          </div>
          <div className="text-xs opacity-50">
            Wysokość dokumentu: {Math.round(document.documentElement.scrollHeight)}px
          </div>
          <div className="text-xs opacity-50">
            Wysokość okna: {Math.round(window.innerHeight)}px
          </div>
          <div className="text-xs opacity-50">
            Oczekiwana wysokość: {Math.round(window.innerHeight * 12 * 2)}px
          </div>
        </div>
      </div>
    </div>
  );
}
