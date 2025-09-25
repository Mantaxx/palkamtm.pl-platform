const { PrismaClient } = require('@prisma/client')
const bcrypt = require('bcryptjs')

const prisma = new PrismaClient()

async function main() {
  console.log('🚀 Rozpoczynam migrację bazy danych...')

  try {
    // Utwórz użytkowników testowych
    console.log('👤 Tworzę użytkowników testowych...')

    const hashedPassword = await bcrypt.hash('test123', 12)

    const admin = await prisma.user.upsert({
      where: { email: 'admin@test.com' },
      update: {},
      create: {
        email: 'admin@test.com',
        password: hashedPassword,
        firstName: 'Admin',
        lastName: 'User',
        role: 'ADMIN',
        isActive: true,
        emailVerified: new Date()
      }
    })

    const seller = await prisma.user.upsert({
      where: { email: 'seller@test.com' },
      update: {},
      create: {
        email: 'seller@test.com',
        password: hashedPassword,
        firstName: 'Seller',
        lastName: 'User',
        role: 'SELLER',
        isActive: true,
        emailVerified: new Date()
      }
    })

    const buyer = await prisma.user.upsert({
      where: { email: 'buyer@test.com' },
      update: {},
      create: {
        email: 'buyer@test.com',
        password: hashedPassword,
        firstName: 'Buyer',
        lastName: 'User',
        role: 'BUYER',
        isActive: true,
        emailVerified: new Date()
      }
    })

    console.log('✅ Użytkownicy utworzeni:', { admin: admin.id, seller: seller.id, buyer: buyer.id })

    // Utwórz gołębie testowe
    console.log('🐦 Tworzę gołębie testowe...')

    const pigeon1 = await prisma.pigeon.upsert({
      where: { ringNumber: 'PL-2024-001' },
      update: {},
      create: {
        name: 'Thunder Storm',
        ringNumber: 'PL-2024-001',
        bloodline: 'Janssen x Van Loon',
        gender: 'MALE',
        birthDate: new Date('2023-01-15'),
        color: 'Blue',
        weight: 450,
        breeder: 'MTM Pałka',
        description: 'Wybitny champion z doskonałymi wynikami w konkursach krajowych i międzynarodowych.',
        images: JSON.stringify(['/champions/1/gallery/DV-02906-11-98t_OLIMP (1).jpg', '/champions/2/gallery/dv-0987-11-396_c.jpg']),
        videos: JSON.stringify(['/champions/thunder-storm/video1.mp4']),
        pedigree: JSON.stringify({
          father: 'Lightning Bolt',
          mother: 'Storm Queen',
          grandfather: 'Thunder King',
          grandmother: 'Wind Princess'
        }),
        achievements: JSON.stringify([
          '1. miejsce - Mistrzostwa Polski 2023',
          '2. miejsce - Puchar Europy 2023',
          '3. miejsce - Mistrzostwa Świata 2022'
        ]),
        isChampion: true
      }
    })

    const pigeon2 = await prisma.pigeon.upsert({
      where: { ringNumber: 'PL-2024-002' },
      update: {},
      create: {
        name: 'Lightning Bolt',
        ringNumber: 'PL-2024-002',
        bloodline: 'Janssen',
        gender: 'MALE',
        birthDate: new Date('2023-03-20'),
        color: 'Red',
        weight: 420,
        breeder: 'MTM Pałka',
        description: 'Szybki jak błyskawica, doskonały w krótkich dystansach.',
        images: JSON.stringify(['/champions/3/gallery/dv-07136-10-202_c.jpg']),
        videos: JSON.stringify([]),
        pedigree: JSON.stringify({
          father: 'Speed Demon',
          mother: 'Flash Queen'
        }),
        achievements: JSON.stringify([
          '1. miejsce - Sprint Cup 2023',
          '2. miejsce - Mistrzostwa Regionu 2023'
        ]),
        isChampion: true
      }
    })

    console.log('✅ Gołębie utworzone:', { pigeon1: pigeon1.id, pigeon2: pigeon2.id })

    // Utwórz aukcje testowe
    console.log('🏆 Tworzę aukcje testowe...')

    const auction1 = await prisma.auction.upsert({
      where: { id: 'auction-1' },
      update: {},
      create: {
        id: 'auction-1',
        title: 'Champion Thunder Storm - Elitarny Rodowód',
        description: 'Wybitny champion z doskonałymi wynikami w konkursach krajowych i międzynarodowych. Idealny do hodowli.',
        category: 'Champions',
        pigeonId: pigeon1.id,
        sellerId: seller.id,
        startingPrice: 5000,
        currentPrice: 5000,
        buyNowPrice: 10000,
        reservePrice: 6000,
        startTime: new Date(),
        endTime: new Date(Date.now() + 14 * 24 * 60 * 60 * 1000), // 14 dni
        status: 'ACTIVE',
        isApproved: true
      }
    })

    const auction2 = await prisma.auction.upsert({
      where: { id: 'auction-2' },
      update: {},
      create: {
        id: 'auction-2',
        title: 'Młode Gołębie - Linia Janssen',
        description: 'Młode gołębie z linii Janssen, gotowe do hodowli. Doskonałe geny.',
        category: 'Young Birds',
        pigeonId: pigeon2.id,
        sellerId: seller.id,
        startingPrice: 1500,
        currentPrice: 1500,
        buyNowPrice: 3000,
        startTime: new Date(),
        endTime: new Date(Date.now() + 10 * 24 * 60 * 60 * 1000), // 10 dni
        status: 'ACTIVE',
        isApproved: true
      }
    })

    // Utwórz zasoby aukcji
    await prisma.auctionAsset.createMany({
      data: [
        {
          auctionId: auction1.id,
          type: 'IMAGE',
          url: '/champions/thunder-storm/1.jpg'
        },
        {
          auctionId: auction1.id,
          type: 'IMAGE',
          url: '/champions/thunder-storm/2.jpg'
        },
        {
          auctionId: auction1.id,
          type: 'VIDEO',
          url: '/champions/thunder-storm/video1.mp4'
        },
        {
          auctionId: auction2.id,
          type: 'IMAGE',
          url: '/champions/lightning-bolt/1.jpg'
        }
      ]
    })

    console.log('✅ Aukcje utworzone:', { auction1: auction1.id, auction2: auction2.id })

    // Utwórz referencje testowe
    console.log('⭐ Tworzę referencje testowe...')

    await prisma.reference.createMany({
      data: [
        {
          breederName: 'Jan Kowalski',
          location: 'Warszawa',
          experience: 'Ponad 20 lat doświadczenia w hodowli gołębi pocztowych',
          testimonial: 'Doskonała jakość gołębi, profesjonalne podejście. Polecam!',
          rating: 5,
          achievements: JSON.stringify([
            'Mistrz Polski 2022',
            'Wicemistrz Europy 2021'
          ]),
          isApproved: true
        },
        {
          breederName: 'Anna Nowak',
          location: 'Kraków',
          experience: '15 lat w hodowli, specjalizacja w linii Janssen',
          testimonial: 'Najlepsze gołębie w regionie. Wysoka jakość i doskonałe wyniki.',
          rating: 5,
          achievements: JSON.stringify([
            'Mistrz Regionu 2023',
            'I Wicemistrz Polski 2022'
          ]),
          isApproved: true
        }
      ]
    })

    console.log('✅ Referencje utworzone')

    // Utwórz spotkania hodowców
    console.log('👥 Tworzę spotkania hodowców...')

    await prisma.breederMeeting.createMany({
      data: [
        {
          title: 'Spotkanie Hodowców - Wiosna 2024',
          description: 'Tradycyjne spotkanie hodowców gołębi pocztowych z regionu',
          location: 'Warszawa, Centrum Konferencyjne',
          date: new Date('2024-04-15'),
          images: JSON.stringify([
            '/meetings/spring-2024/1.jpg',
            '/meetings/spring-2024/2.jpg'
          ]),
          userId: admin.id
        }
      ]
    })

    console.log('✅ Spotkania hodowców utworzone')

    console.log('🎉 Migracja bazy danych zakończona pomyślnie!')
    console.log('\n📋 Dane testowe:')
    console.log('👤 Admin: admin@test.com / test123')
    console.log('👤 Seller: seller@test.com / test123')
    console.log('👤 Buyer: buyer@test.com / test123')

  } catch (error) {
    console.error('❌ Błąd podczas migracji:', error)
    throw error
  } finally {
    await prisma.$disconnect()
  }
}

main()
  .catch((e) => {
    console.error(e)
    process.exit(1)
  })