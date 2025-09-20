#!/usr/bin/env node

const { PrismaClient } = require('@prisma/client')
const fs = require('fs')
const path = require('path')

const prisma = new PrismaClient()

async function migrateDatabase() {
  console.log('🚀 Starting database migration...')

  try {
    // Check if we're migrating from SQLite to PostgreSQL
    const isMigration = process.env.DATABASE_URL && process.env.DEV_DATABASE_URL

    if (isMigration) {
      console.log('📦 Migrating from SQLite to PostgreSQL...')
      await migrateFromSQLite()
    } else {
      console.log('🔄 Running standard migration...')
      await runStandardMigration()
    }

    console.log('✅ Database migration completed successfully!')
  } catch (error) {
    console.error('❌ Migration failed:', error)
    process.exit(1)
  } finally {
    await prisma.$disconnect()
  }
}

async function migrateFromSQLite() {
  // This would be implemented if you have existing SQLite data
  // For now, we'll just run the standard migration
  console.log('⚠️  SQLite to PostgreSQL migration not implemented yet')
  console.log('   Please manually migrate your data if needed')
  await runStandardMigration()
}

async function runStandardMigration() {
  // Create initial data if database is empty
  const userCount = await prisma.user.count()
  
  if (userCount === 0) {
    console.log('📝 Creating initial data...')
    await createInitialData()
  } else {
    console.log('📊 Database already has data, skipping initial data creation')
  }
}

async function createInitialData() {
  // Create sample users
  const adminUser = await prisma.user.create({
    data: {
      email: 'admin@palkamtm.pl',
      firstName: 'Admin',
      lastName: 'System',
      role: 'ADMIN',
      isActive: true,
      emailVerified: new Date(),
    }
  })

  const sellerUser = await prisma.user.create({
    data: {
      email: 'seller@palkamtm.pl',
      firstName: 'Jan',
      lastName: 'Kowalski',
      role: 'SELLER',
      isActive: true,
      emailVerified: new Date(),
    }
  })

  const buyerUser = await prisma.user.create({
    data: {
      email: 'buyer@palkamtm.pl',
      firstName: 'Anna',
      lastName: 'Nowak',
      role: 'BUYER',
      isActive: true,
      emailVerified: new Date(),
    }
  })

  console.log('👥 Created sample users')

  // Create sample pigeons
  const pigeon1 = await prisma.pigeon.create({
    data: {
      name: 'Thunder Storm',
      ringNumber: 'PL-2023-001',
      bloodline: 'Janssen x Van Loon',
      gender: 'MALE',
      birthDate: new Date('2023-01-15'),
      color: 'Blue',
      weight: 450.5,
      breeder: 'Pałka MTM',
      description: 'Elitarny champion z doskonałymi wynikami',
      images: JSON.stringify(['/champions/thunder-storm/gallery/1.jpg']),
      videos: JSON.stringify([]),
      pedigree: JSON.stringify({
        father: 'Storm King',
        mother: 'Lightning Queen',
        grandfather: 'Thunder Bolt',
        grandmother: 'Storm Princess'
      }),
      achievements: JSON.stringify([
        '1. miejsce - Mistrzostwa Polski 2023',
        '2. miejsce - Puchar Europy 2023'
      ])
    }
  })

  const pigeon2 = await prisma.pigeon.create({
    data: {
      name: 'Lightning Bolt',
      ringNumber: 'PL-2023-002',
      bloodline: 'Janssen',
      gender: 'FEMALE',
      birthDate: new Date('2023-02-20'),
      color: 'Red',
      weight: 420.0,
      breeder: 'Pałka MTM',
      description: 'Szybka jak błyskawica, doskonała w krótkich dystansach',
      images: JSON.stringify(['/champions/lightning-bolt/gallery/1.jpg']),
      videos: JSON.stringify([]),
      pedigree: JSON.stringify({
        father: 'Speed Demon',
        mother: 'Lightning Flash',
        grandfather: 'Rocket Man',
        grandmother: 'Speed Queen'
      }),
      achievements: JSON.stringify([
        '1. miejsce - Sprint Cup 2023',
        '2. miejsce - Mistrzostwa Regionu 2023'
      ])
    }
  })

  console.log('🐦 Created sample pigeons')

  // Create sample auctions
  const auction1 = await prisma.auction.create({
    data: {
      title: 'Champion Thunder Storm - Elitarny Rodowód',
      description: 'Wybitny champion z doskonałymi wynikami w konkursach krajowych i międzynarodowych. Idealny do hodowli.',
      category: 'Champions',
      pigeonId: pigeon1.id,
      sellerId: sellerUser.id,
      startingPrice: 5000.00,
      currentPrice: 5000.00,
      buyNowPrice: 10000.00,
      reservePrice: 6000.00,
      startTime: new Date(),
      endTime: new Date(Date.now() + 14 * 24 * 60 * 60 * 1000), // 14 days from now
      status: 'ACTIVE',
      isApproved: true,
      images: JSON.stringify(['/champions/thunder-storm/gallery/1.jpg', '/champions/thunder-storm/gallery/2.jpg']),
      videos: JSON.stringify(['/champions/thunder-storm/videos/1.mp4']),
      documents: JSON.stringify(['/champions/thunder-storm/pedigree.pdf'])
    }
  })

  const auction2 = await prisma.auction.create({
    data: {
      title: 'Młode Gołębie - Linia Janssen',
      description: 'Młode gołębie z linii Janssen, gotowe do hodowli. Doskonałe geny.',
      category: 'Young Birds',
      sellerId: sellerUser.id,
      startingPrice: 1500.00,
      currentPrice: 1500.00,
      buyNowPrice: 3000.00,
      startTime: new Date(),
      endTime: new Date(Date.now() + 21 * 24 * 60 * 60 * 1000), // 21 days from now
      status: 'ACTIVE',
      isApproved: true,
      images: JSON.stringify(['/auctions/young-birds/1.jpg']),
      videos: JSON.stringify([]),
      documents: JSON.stringify([])
    }
  })

  console.log('🏷️  Created sample auctions')

  // Create sample references
  const reference1 = await prisma.reference.create({
    data: {
      breederName: 'Jan Kowalski',
      location: 'Warszawa, Polska',
      experience: 'Hodowca z 20-letnim doświadczeniem w hodowli gołębi pocztowych',
      testimonial: 'Doskonała współpraca, gołębie w świetnej kondycji. Polecam!',
      rating: 5,
      achievements: JSON.stringify([
        {
          pigeon: 'Storm King',
          ringNumber: 'PL-2022-001',
          results: [
            { competition: 'Mistrzostwa Polski 2022', place: 1, date: '2022-08-15' },
            { competition: 'Puchar Europy 2022', place: 2, date: '2022-09-20' }
          ]
        }
      ]),
      isApproved: true
    }
  })

  const reference2 = await prisma.reference.create({
    data: {
      breederName: 'Anna Nowak',
      location: 'Kraków, Polska',
      experience: 'Specjalistka od gołębi sprintowych, wieloletnia doświadczenie',
      testimonial: 'Profesjonalne podejście, gołębie najwyższej jakości.',
      rating: 5,
      achievements: JSON.stringify([
        {
          pigeon: 'Lightning Queen',
          ringNumber: 'PL-2022-002',
          results: [
            { competition: 'Sprint Cup 2022', place: 1, date: '2022-07-10' },
            { competition: 'Mistrzostwa Regionu 2022', place: 1, date: '2022-08-05' }
          ]
        }
      ]),
      isApproved: true
    }
  })

  console.log('⭐ Created sample references')

  console.log('🎉 Initial data creation completed!')
  console.log('📧 Admin login: admin@palkamtm.pl')
  console.log('📧 Seller login: seller@palkamtm.pl')
  console.log('📧 Buyer login: buyer@palkamtm.pl')
}

// Run migration
if (require.main === module) {
  migrateDatabase()
}

module.exports = { migrateDatabase }
