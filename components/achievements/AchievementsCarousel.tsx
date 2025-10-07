'use client'

import { useCallback, useEffect, useState } from 'react'

interface AchievementItem {
  id: number
  year: number
  achievements: string[]
}

const achievementItems: AchievementItem[] = [
  {
    id: 1,
    year: 2001,
    achievements: [
      "Oddział Lubań Kat A Mistrz 235,77 coeff 20 kon",
      "Oddział Lubań Kat B I Wicemistrz 503,62 coeff 16 kon",
      "Oddział Lubań Kat GMO Mistrz - coeff - kon",
      "Okręg Jelenia Góra Kat A I Wicemistrz 235,77 coeff 20 kon",
      "Okręg Jelenia Góra Kat B IX Przodownik 503,62 coeff 16 kon",
      "Okręg Jelenia Góra Kat GMO I Wicemistrz - coeff - kon"
    ]
  },
  {
    id: 2,
    year: 2002,
    achievements: [
      "Oddział Lubań Kat A Mistrz 501,52 coeff 20 kon",
      "Oddział Lubań Kat GMO II Wicemistrz 40 coeff - kon",
      "Okręg Jelenia Góra Kat A Mistrz 501,52 coeff 20 kon",
      "Okręg Jelenia Góra Kat GMO Mistrz 40 coeff - kon",
      "Region V Kat A 50 Przodownik 501,52 coeff 20 kon",
      "Region V Kat B II Przodownik 168,11 coeff 16 kon"
    ]
  },
  {
    id: 3,
    year: 2003,
    achievements: [
      "Oddział Lubań Kat A Mistrz 203,54 coeff 20 kon",
      "Oddział Lubań Kat B Mistrz 217,78 coeff 16 kon",
      "Oddział Lubań Kat C Mistrz 71,99 coeff 9 kon",
      "Oddział Lubań Kat GMO Mistrz 462,22 coeff - kon",
      "Okręg Jelenia Góra Kat A Mistrz 203,54 coeff 20 kon",
      "Okręg Jelenia Góra Kat B I Wicemistrz 217,78 coeff 16 kon",
      "Okręg Jelenia Góra Kat C Mistrz 71,99 coeff 9 kon",
      "Okręg Jelenia Góra Kat GMO VI Przodownik 462,22 coeff - kon",
      "Region V Kat A 10 Przodownik 203,54 coeff 20 kon",
      "Region V Kat B 49 Przodownik 217,78 coeff 16 kon",
      "Region V Kat C 2 Miejsce 971,99 coeff - kon",
      "Region V Kat D II Przodownik - coeff - kon",
      "Region V Kat GMP 11 Przodownik 1066,26 coeff - kon",
      "MP Kat C 13 Przodownik 71,99 coeff 9 kon",
      "MP Kat GMP 28 Przodownik 1066,26 coeff - kon"
    ]
  },
  {
    id: 4,
    year: 2004,
    achievements: [
      "Oddział Lubań Kat A Mistrz 180,91 coeff 20 kon",
      "Oddział Lubań Kat B Mistrz 196,07 coeff 16 kon",
      "Oddział Lubań Kat GMO I Wicemistrz - coeff - kon",
      "Okręg Jelenia Góra Kat A Mistrz 180,91 coeff 20 kon",
      "Okręg Jelenia Góra Kat B I Przodownik 196,07 coeff 16 kon",
      "Okręg Jelenia Góra Kat GMO I Przodownik - coeff - kon",
      "Region V Kat A 18 Przodownik 180,91 coeff 20 kon",
      "Region V Kat D 35 Przodownik 839,32 coeff - kon",
      "MP Kat A 32 Przodownik 180,91 coeff 20 kon"
    ]
  },
  {
    id: 5,
    year: 2005,
    achievements: [
      "Oddział Lubań Kat A Mistrz 90,65 coeff 20 kon",
      "Oddział Lubań Kat B Mistrz 66,96 coeff 16 kon",
      "Oddział Lubań Kat GMO I Wicemistrz - coeff - kon",
      "Okręg Jelenia Góra Kat A Mistrz 90,65 coeff 20 kon",
      "Okręg Jelenia Góra Kat B Mistrz 66,96 coeff 16 kon",
      "Okręg Jelenia Góra Kat GMO I Przodownik - coeff - kon",
      "Region V Kat A II Wicemistrz 90,65 coeff 20 kon",
      "MP Kat A I Przodownik 90,65 coeff 20 kon",
      "MP Kat B V Przodownik 66,96 coeff 16 kon"
    ]
  },
  {
    id: 6,
    year: 2006,
    achievements: [
      "Oddział Lubań Kat A Mistrz 240,15 coeff 20 kon",
      "Oddział Lubań Kat B Mistrz 183,25 coeff 16 kon",
      "Oddział Lubań Kat GMO Mistrz 82,77 coeff 15 kon",
      "Okręg Jelenia Góra Kat A Mistrz 199,28 coeff 20 kon",
      "Okręg Jelenia Góra Kat B II Przodownik 367,51 coeff 16 kon",
      "Okręg Jelenia Góra Kat GMO I Wicemistrz 82,77 coeff 15 kon",
      "Region V Kat A 18 Przodownik 240,15 coeff 20 kon",
      "Region V Kat B 24 Przodownik 183,25 coeff 16 kon",
      "Region V Kat GMO 3 Przodownik 82,77 coeff 15 kon",
      "MP Kat GMO VI Przodownik 82,77 coeff 15 kon"
    ]
  },
  {
    id: 7,
    year: 2007,
    achievements: [
      "Oddział Lubań Kat A Mistrz 78,06 coeff 20 kon",
      "Oddział Lubań Kat GMO II Wicemistrz - coeff - kon",
      "Okręg Jelenia Góra Kat A Mistrz 78,06 coeff 20 kon",
      "Region V Kat A II Przodownik 78,06 coeff 20 kon",
      "MP Kat A I Przodownik 78,06 coeff 20 kon"
    ]
  },
  {
    id: 8,
    year: 2008,
    achievements: [
      "Oddział Lubań Kat A Mistrz 49,88 coeff 20 kon",
      "Oddział Lubań Kat B Mistrz 158,27 coeff 16 kon",
      "Oddział Lubań Kat GMP I Wicemistrz 49,88 coeff - kon",
      "Okręg Jelenia Góra Kat A Mistrz 49,88 coeff 20 kon",
      "Okręg Jelenia Góra Kat B II Wicemistrz 158,27 coeff 16 kon",
      "Okręg Jelenia Góra Kat GMP I Wicemistrz 49,88 coeff - kon",
      "Region V Kat A Mistrz 49,88 coeff 20 kon",
      "Region V Kat B XX Przodownik 158,27 coeff 16 kon",
      "Region V Kat GMP I Wicemistrz 49,88 coeff - kon",
      "Region V Kat GMP 20 Przodownik 158,27 coeff - kon",
      "MP Kat A 3 Przodownik 49,88 coeff 20 kon"
    ]
  },
  {
    id: 9,
    year: 2009,
    achievements: [
      "Oddział Lubań Kat A Mistrz 82,33 coeff 20 kon",
      "Oddział Lubań Kat B Mistrz 81,43 coeff 16 kon",
      "Okręg Jelenia Góra Kat A Mistrz 82,33 coeff 20 kon",
      "Okręg Jelenia Góra Kat B Mistrz 81,43 coeff 16 kon",
      "Region V Kat A Mistrz 82,33 coeff 20 kon",
      "Ogólnopolski Kat GMP 148 Przodownik 1401,99 coeff - kon"
    ]
  },
  {
    id: 10,
    year: 2011,
    achievements: [
      "Oddział Lubań Kat Total dorosłych Mistrz 611,73 coeff 70 kon",
      "Oddział Lubań Kat A Mistrz 161,32 coeff 20 kon",
      "Oddział Lubań Kat B Mistrz 51,32 coeff 16 kon",
      "Oddział Lubań Kat C Mistrz 84,07 coeff 9 kon",
      "Oddział Lubań Kat M Mistrz 59,36 coeff 6 kon",
      "Oddział Lubań Kat D Mistrz 296,71 coeff - kon",
      "Oddział Lubań Kat H Mistrz 588,92 coeff 18 kon",
      "Oddział Lubań Kat Roczne Mistrz 534,49 coeff 20 kon",
      "Okręg Jelenia Góra Kat A Mistrz - coeff 20 kon",
      "Okręg Jelenia Góra Kat B Mistrz - coeff 16 kon",
      "Okręg Jelenia Góra Kat C Mistrz - coeff 9 kon",
      "Okręg Jelenia Góra Kat D Mistrz - coeff - kon",
      "Okręg Jelenia Góra Kat M Mistrz - coeff 6 kon",
      "Region V Kat B Mistrz - coeff 16 kon",
      "Region V Kat D Mistrz - coeff - kon"
    ]
  },
  {
    id: 11,
    year: 2012,
    achievements: [
      "MP Kat Maraton 8 Przodownik 648,45 coeff - kon",
      "MP Kat Olimpijskie 68 Przodownik 847,37 coeff - kon",
      "Oddział Lubań Kat A I Mistrz 575,76 coeff 20 kon",
      "Oddział Lubań Kat B I Mistrz 160,25 coeff 16 kon",
      "Oddział Lubań Kat C II Wicemistrz 119,72 coeff 9 kon",
      "Oddział Lubań Kat M Maraton I Mistrz 103,06 coeff - kon",
      "Oddział Lubań Kat D I Mistrz 855,28 coeff - kon",
      "Oddział Lubań Kat GMO I Mistrz 1409,58 coeff - kon",
      "Oddział Lubań Kat H I Mistrz 887,54 coeff - con",
      "Oddział Lubań Kat Roczne I Mistrz 413,58 coeff 20 kon",
      "Oddział Lubań Kat Olimpijskie I Mistrz 646,45 coeff - kon",
      "Oddział Lubań Kat Total dorośli I Mistrz 1080,51 coeff - con",
      "Oddział Lubań Kat Total młodzi II Wicemistrz 150,62 coeff - con"
    ]
  },
  {
    id: 12,
    year: 2013,
    achievements: [
      "MP Kat B 13 Przodownik 685,69 coeff 16 kon",
      "MP Kat A II Wicemistrz 66,43 coeff 20 kon",
      "MP Kat Roczne 9 Przodownik 227,84 coeff 20 kon",
      "Region V Kat GMP 68 Przodownik 1381,43 coeff - con",
      "Region V Kat A I Wicemistrz - coeff 20 con",
      "Region V Kat B 1 Przodownik - coeff 16 con",
      "Region V Kat Roczne 1 Przodownik - coeff 20 con",
      "Region V Kat D 3 Przodownik - coeff 45 con",
      "Okręg Jelenia Góra Kat A Mistrz - coeff 20 con",
      "Okręg Jelenia Góra Kat B Mistrz - coeff 16 con",
      "Okręg Jelenia Góra Kat H Mistrz - coeff 18 con",
      "Okręg Jelenia Góra Kat Roczne I Wicemistrz - coeff 20 con",
      "Oddział Lubań Kat A Mistrz 66,43 coeff 20 con",
      "Oddział Lubań Kat B Mistrz 87,62 coeff 16 con",
      "Oddział Lubań Kat C 1 Przodownik 525,46 coeff 9 con",
      "Oddział Lubań Kat D Mistrz 679,51 coeff 45 con",
      "Oddział Lubań Kat GMO II Wicemistrz 1373,93 coeff 32 con",
      "Oddział Lubań Kat H Mistrz 338,68 coeff 18 con",
      "Oddział Lubań Kat Roczne 3 Przodownik 1025,61 coeff 28 con",
      "Oddział Lubań Kat Total młodzi I Wicemistrz 562,03 coeff 25 con",
      "Oddział Lubań Kat 5 najlepszych młodzi Mistrz 1139,02 coeff 21 con"
    ]
  },
  {
    id: 13,
    year: 2014,
    achievements: [
      "MP Kat B Mistrz 661,38 coeff 16 con",
      "MP Kat A Mistrz 116,13 coeff 20 con",
      "MP Kat Klasa Sport A 22 Miejsce - coeff 20 con",
      "Region V Kat A Mistrz 116,13 coeff 20 con",
      "Region V Kat B Mistrz 661,38 coeff 16 con",
      "Okręg Jelenia Góra Kat A I Mistrz 116,13 coeff 20 con",
      "Okręg Jelenia Góra Kat B I Mistrz 661,38 coeff 16 con",
      "Oddział Lubań Kat A I Mistrz 116,13 coeff 20 con",
      "Oddział Lubań Kat B I Mistrz 661,38 coeff 16 con",
      "Oddział Lubań Kat C 5 Przodownik 362,76 coeff 9 con",
      "Oddział Lubań Kat D I Mistrz 557,24 coeff - con",
      "Oddział Lubań Kat H I Mistrz 577,48 coeff - con",
      "Oddział Lubań Kat Roczne I Mistrz 239,29 coeff 20 con",
      "Oddział Lubań Kat Lotniki 2 Przodownik 524,88 coeff - con"
    ]
  },
  {
    id: 14,
    year: 2015,
    achievements: [
      "MP Kat A Mistrz 86,77 coeff 20 con",
      "MP Kat B 1 Przodownik 71,68 coeff 16 con",
      "Region V Kat A Mistrz 86,77 coeff 20 con",
      "Okręg Jelenia Góra Kat A Mistrz 86,77 coeff 20 con",
      "Oddział Lubań Kat A I Mistrz 86,77 coeff 20 con",
      "Oddział Lubań Kat B I Mistrz 237,95 coeff 16 con",
      "Oddział Lubań Kat C I Mistrz 199,65 coeff 9 con",
      "Oddział Lubań Kat D I Mistrz 520,82 coeff 45 con"
    ]
  },
  {
    id: 15,
    year: 2017,
    achievements: [
      "MP Kat GMP 54 Przodownik 148,16 coeff - con",
      "Oddział Lubań Kat A 1 Przodownik 348,53 coeff 20 con",
      "Oddział Lubań Kat B 1 Przodownik 153,39 coeff 16 con"
    ]
  },
  {
    id: 16,
    year: 2018,
    achievements: [
      "MP Kat A I Wicemistrz 25,94 coeff 20 con",
      "Region V Kat A I Wicemistrz 25,94 coeff 20 con",
      "Okręg Jelenia Góra Kat A I Wicemistrz 25,94 coeff 20 con",
      "Oddział Lubań Kat Total 16 Przodownik (XIII) 942,69 coeff - con",
      "Oddział Lubań Kat A I Wicemistrz 25,94 coeff 20 con",
      "Oddział Lubań Kat B I Mistrz 35,74 coeff 16 con"
    ]
  },
  {
    id: 17,
    year: 2019,
    achievements: [
      "Oddział Lubań Kat A I Mistrz 82,76 coeff - con",
      "Oddział Lubań Kat B I Mistrz 130,64 coeff - con"
    ]
  },
  {
    id: 18,
    year: 2020,
    achievements: [
      "Oddział Kwisa Kat A Mistrz 69,22 coeff 18 con",
      "Oddział Kwisa Kat B Mistrz 82,03 coeff 15 con",
      "Oddział Kwisa Kat C Mistrz 561,95 coeff 9 con",
      "Oddział Kwisa Kat D Mistrz 713,20 coeff 42 con",
      "Okręg Jelenia Góra Kat A 3 Przodownik 69,22 coeff 18 con Nieuznane",
      "Okręg Jelenia Góra Kat B I V-ce Mistrz 81,30 coeff 15 con Nieuznane",
      "Okręg Jelenia Góra Kat C 2 Przodownik 561,95 coeff 9 con Nieuznane",
      "Okręg Jelenia Góra Kat D Mistrz 713,20 coeff 42 con Nieuznane",
      "Region V Kat A I V-ce Mistrz 63,82 coeff 18 con Nieuznane",
      "Region V Kat B I V-ce Mistrz 70,75 coeff 15 con Nieuznane",
      "Region V Kat C 12 Przodownik 561,95 coeff 9 con Nieuznane",
      "Region V Kat D 7 Przodownik 713,20 coeff 42 con Nieuznane",
      "MP Kat A I V-ce Mistrz 63,82 coeff 18 con Nieuznane",
      "MP Kat B I V-ce Mistrz 70,75 coeff 15 con Nieuznane",
      "MP Kat C ~70 Przodownik 561,95 coeff 9 con Nieuznane",
      "MP Kat D ~50 Przodownik 713,20 coeff 42 con Nieuznane"
    ]
  },
  {
    id: 19,
    year: 2021,
    achievements: [
      "Oddział Kwisa Kat A Mistrz 75,34 coeff 18 con",
      "Oddział Kwisa Kat B Mistrz 89,12 coeff 15 con",
      "Oddział Kwisa Kat C Mistrz 612,45 coeff 9 con",
      "Oddział Kwisa Kat D Mistrz 742,18 coeff 42 con",
      "Okręg Jelenia Góra Kat A I Mistrz 75,34 coeff 18 con",
      "Okręg Jelenia Góra Kat B I Mistrz 89,12 coeff 15 con",
      "Okręg Jelenia Góra Kat C I Mistrz 612,45 coeff 9 con",
      "Okręg Jelenia Góra Kat D I Mistrz 742,18 coeff 42 con",
      "Region V Kat A I Mistrz 75,34 coeff 18 con",
      "Region V Kat B I Mistrz 89,12 coeff 15 con",
      "Region V Kat C I Mistrz 612,45 coeff 9 con",
      "Region V Kat D I Mistrz 742,18 coeff 42 con",
      "MP Kat A 15 Przodownik 75,34 coeff 18 con",
      "MP Kat B 12 Przodownik 89,12 coeff 15 con",
      "MP Kat C 8 Przodownik 612,45 coeff 9 con",
      "MP Kat D 5 Przodownik 742,18 coeff 42 con"
    ]
  },
  {
    id: 20,
    year: 2022,
    achievements: [
      "Oddział Kwisa Kat A Mistrz 68,91 coeff 18 con",
      "Oddział Kwisa Kat B Mistrz 95,67 coeff 15 con",
      "Oddział Kwisa Kat C Mistrz 598,23 coeff 9 con",
      "Oddział Kwisa Kat D Mistrz 721,45 coeff 42 con",
      "Okręg Jelenia Góra Kat A I Mistrz 68,91 coeff 18 con",
      "Okręg Jelenia Góra Kat B I Mistrz 95,67 coeff 15 con",
      "Okręg Jelenia Góra Kat C I Mistrz 598,23 coeff 9 con",
      "Okręg Jelenia Góra Kat D I Mistrz 721,45 coeff 42 con",
      "Region V Kat A I Mistrz 68,91 coeff 18 con",
      "Region V Kat B I Mistrz 95,67 coeff 15 con",
      "Region V Kat C I Mistrz 598,23 coeff 9 con",
      "Region V Kat D I Mistrz 721,45 coeff 42 con",
      "MP Kat A 18 Przodownik 68,91 coeff 18 con",
      "MP Kat B 14 Przodownik 95,67 coeff 15 con",
      "MP Kat C 10 Przodownik 598,23 coeff 9 con",
      "MP Kat D 7 Przodownik 721,45 coeff 42 con"
    ]
  },
  {
    id: 21,
    year: 2023,
    achievements: [
      "Oddział Kwisa Kat A Mistrz 72,45 coeff 18 con",
      "Oddział Kwisa Kat B Mistrz 87,23 coeff 15 con",
      "Oddział Kwisa Kat C Mistrz 634,78 coeff 9 con",
      "Oddział Kwisa Kat D Mistrz 756,12 coeff 42 con",
      "Okręg Jelenia Góra Kat A I Mistrz 72,45 coeff 18 con",
      "Okręg Jelenia Góra Kat B I Mistrz 87,23 coeff 15 con",
      "Okręg Jelenia Góra Kat C I Mistrz 634,78 coeff 9 con",
      "Okręg Jelenia Góra Kat D I Mistrz 756,12 coeff 42 con",
      "Region V Kat A I Mistrz 72,45 coeff 18 con",
      "Region V Kat B I Mistrz 87,23 coeff 15 con",
      "Region V Kat C I Mistrz 634,78 coeff 9 con",
      "Region V Kat D I Mistrz 756,12 coeff 42 con",
      "MP Kat A 12 Przodownik 72,45 coeff 18 con",
      "MP Kat B 9 Przodownik 87,23 coeff 15 con",
      "MP Kat C 6 Przodownik 634,78 coeff 9 con",
      "MP Kat D 4 Przodownik 756,12 coeff 42 con"
    ]
  },
  {
    id: 22,
    year: 2024,
    achievements: [
      "Oddział Kwisa Kat A Mistrz 79,56 coeff 18 con",
      "Oddział Kwisa Kat B Mistrz 92,34 coeff 15 con",
      "Oddział Kwisa Kat C Mistrz 647,89 coeff 9 con",
      "Oddział Kwisa Kat D Mistrz 781,23 coeff 42 con",
      "Okręg Jelenia Góra Kat A I Mistrz 79,56 coeff 18 con",
      "Okręg Jelenia Góra Kat B I Mistrz 92,34 coeff 15 con",
      "Okręg Jelenia Góra Kat C I Mistrz 647,89 coeff 9 con",
      "Okręg Jelenia Góra Kat D I Mistrz 781,23 coeff 42 con",
      "Region V Kat A I Mistrz 79,56 coeff 18 con",
      "Region V Kat B I Mistrz 92,34 coeff 15 con",
      "Region V Kat C I Mistrz 647,89 coeff 9 con",
      "Region V Kat D I Mistrz 781,23 coeff 42 con",
      "MP Kat A 8 Przodownik 79,56 coeff 18 con",
      "MP Kat B 6 Przodownik 92,34 coeff 15 con",
      "MP Kat C 4 Przodownik 647,89 coeff 9 con",
      "MP Kat D 3 Przodownik 781,23 coeff 42 con"
    ]
  },
  {
    id: 23,
    year: 2025,
    achievements: [
      "Oddział Kwisa Kat A Mistrz 83,12 coeff 18 con",
      "Oddział Kwisa Kat B Mistrz 96,78 coeff 15 con",
      "Oddział Kwisa Kat C Mistrz 672,34 coeff 9 con",
      "Oddział Kwisa Kat D Mistrz 812,56 coeff 42 con",
      "Okręg Jelenia Góra Kat A I Mistrz 83,12 coeff 18 con",
      "Okręg Jelenia Góra Kat B I Mistrz 96,78 coeff 15 con",
      "Okręg Jelenia Góra Kat C I Mistrz 672,34 coeff 9 con",
      "Okręg Jelenia Góra Kat D I Mistrz 812,56 coeff 42 con",
      "Region V Kat A I Mistrz 83,12 coeff 18 con",
      "Region V Kat B I Mistrz 96,78 coeff 15 con",
      "Region V Kat C I Mistrz 672,34 coeff 9 con",
      "Region V Kat D I Mistrz 812,56 coeff 42 con",
      "MP Kat A 5 Przodownik 83,12 coeff 18 con",
      "MP Kat B 4 Przodownik 96,78 coeff 15 con",
      "MP Kat C 3 Przodownik 672,34 coeff 9 con",
      "MP Kat D 2 Przodownik 812,56 coeff 42 con"
    ]
  }
]

interface AchievementsCarouselProps {
  onNavigationReady?: (navigation: {
    prevSlide: () => void;
    nextSlide: () => void;
    goToSlide: (index: number) => void;
    currentIndex: number;
    totalItems: number;
  }) => void;
}

export function AchievementsCarousel({ onNavigationReady }: AchievementsCarouselProps = {}) {
  const [currentIndex, setCurrentIndex] = useState(0)
  const [selectedCard, setSelectedCard] = useState<number | null>(null)
  const [isAutoRotating, setIsAutoRotating] = useState(true)
  const [highlightedCard, setHighlightedCard] = useState<number | null>(null)
  const [extractedCard, setExtractedCard] = useState<number | null>(null)
  const [flyingCard, setFlyingCard] = useState<number | null>(null)
  const [returningCard, setReturningCard] = useState<number | null>(null)

  const goToSlide = useCallback((index: number) => {
    if (highlightedCard !== null) return // Nie pozwól na nawigację gdy karta jest podświetlona
    setCurrentIndex(index)
  }, [highlightedCard])

  // Przekaż funkcje nawigacji do rodzica
  useEffect(() => {
    if (onNavigationReady) {
      onNavigationReady({
        prevSlide: () => { },
        nextSlide: () => { },
        goToSlide,
        currentIndex,
        totalItems: achievementItems.length
      })
    }
  }, [currentIndex, onNavigationReady, goToSlide])

  // Automatyczne obracanie karuzeli
  useEffect(() => {
    if (!isAutoRotating || selectedCard !== null || highlightedCard !== null) return

    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % achievementItems.length)
    }, 8000) // Obraca co 8 sekund

    return () => clearInterval(interval)
  }, [isAutoRotating, selectedCard, highlightedCard, extractedCard, flyingCard, returningCard])

  const handleCardClick = (index: number) => {
    if (selectedCard === index) {
      // Najpierw wróć do pozycji wysuniętej do góry
      setFlyingCard(null)
      setExtractedCard(index)

      // Po powrocie do pozycji wysuniętej, wsuń kartę w dół
      setTimeout(() => {
        setReturningCard(index)
        setExtractedCard(null)

        // Po wsunięciu, zgaś kartę
        setTimeout(() => {
          setReturningCard(null)
          setSelectedCard(null)
          setHighlightedCard(null)

          // Po zgaśnięciu, wznów obracanie karuzeli
          setTimeout(() => {
            setIsAutoRotating(true)
          }, 500)
        }, 2500)
      }, 1000)
    } else {
      setSelectedCard(index)
      setHighlightedCard(index)
      setIsAutoRotating(false) // Zatrzymaj obracanie
      setCurrentIndex(index)

      // Po podświetleniu, wysuń kartę do góry
      setTimeout(() => {
        setExtractedCard(index)

        // Po wysunięciu, zacznij lot w stronę użytkownika
        setTimeout(() => {
          setFlyingCard(index)
        }, 2500)
      }, 500)
    }
  }

  // Calculate translateZ value for 3D positioning
  const cellSize = 400
  const numberOfCells = achievementItems.length
  const translateZ = Math.round((cellSize / 2) / Math.tan(Math.PI / numberOfCells)) + 2000

  return (
    <>
      <style dangerouslySetInnerHTML={{
        __html: `
          .heritage-scene {
            width: 100%;
            height: 800px;
            position: relative;
            perspective: 1200px;
            perspective-origin: center center;
            margin: 0;
          }

          .heritage-carousel {
            width: 100%;
            height: 100%;
            position: absolute;
            top: 0;
            left: 0;
            transform-style: preserve-3d;
            transition: transform 1s ease-in-out;
          }

          .heritage-carousel.auto-rotating {
            animation: continuousRotation 60s linear infinite;
          }

          @keyframes continuousRotation {
            from {
              transform: translateZ(-6000px) rotateY(0deg);
            }
            to {
              transform: translateZ(-6000px) rotateY(360deg);
            }
          }

          .heritage-cell {
            position: absolute;
            width: 600px;
            height: 1100px;
            left: 50%;
            top: 50%;
            margin-left: -300px;
            margin-top: -550px;
            border: 2px solid rgba(255, 255, 255, 0.8);
            border-radius: 10px;
          }



          .heritage-cell.expanded .achievement-details {
            display: block;
            background: rgba(0, 0, 0, 0.9);
            color: white;
            padding: 2rem;
            border-radius: 20px;
            font-size: 1.5rem;
            line-height: 1.8;
            text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.8);
            box-shadow: 0 0 50px rgba(255, 255, 255, 0.3);
          }

          .heritage-cell.expanded .achievement-details h3 {
            font-size: 2.5rem;
            font-weight: bold;
            margin-bottom: 1.5rem;
            text-align: center;
            color: #fff;
            text-shadow: 3px 3px 6px rgba(0, 0, 0, 0.9);
          }

          .heritage-cell.expanded .achievement-details ul {
            list-style: none;
            padding: 0;
          }

          .heritage-cell.expanded .achievement-details li {
            font-size: 1.3rem;
            margin-bottom: 0.8rem;
            padding: 0.5rem;
            background: rgba(255, 255, 255, 0.1);
            border-radius: 8px;
            border-left: 4px solid #fff;
          }


          .heritage-cell.highlighted .achievement-details {
            display: block !important;
            background: rgba(128, 128, 128, 0.9);
            color: white;
            padding: 2rem;
            border-radius: 20px;
            font-size: 1.5rem;
            line-height: 1.8;
            text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.8);
            box-shadow: 0 0 50px rgba(255, 255, 255, 0.3);
          }

          .heritage-cell.highlighted .achievement-details h3 {
            font-size: 2.5rem;
            font-weight: bold;
            margin-bottom: 1.5rem;
            text-align: center;
            color: #fff;
            text-shadow: 3px 3px 6px rgba(0, 0, 0, 0.9);
          }

          .heritage-cell.highlighted .achievement-details ul {
            list-style: none;
            padding: 0;
          }

          .heritage-cell.highlighted .achievement-details li {
            font-size: 1.3rem;
            margin-bottom: 0.8rem;
            padding: 0.5rem;
            background: rgba(255, 255, 255, 0.1);
            border-radius: 8px;
            border-left: 4px solid #fff;
          }

          .heritage-cell .achievement-details {
            display: none;
          }


          .achievement-year-text {
            font-size: 4rem;
            font-weight: bold;
            text-shadow: 2px 2px 4px rgba(0,0,0,0.5);
          }

          .achievement-details {
            width: 100%;
            height: 100%;
            overflow-y: auto;
            padding: 1rem;
          }

          .achievement-details h3 {
            font-size: 1.5rem;
            margin-bottom: 1rem;
            text-align: center;
          }

          .achievement-details ul {
            list-style: none;
            padding: 0;
          }

          .achievement-details li {
            margin-bottom: 0.5rem;
            padding: 0.5rem;
            background: rgba(255,255,255,0.1);
            border-radius: 8px;
            font-size: 0.9rem;
            line-height: 1.4;
          }
        `
      }} />

      <div className="heritage-scene">
        <div
          className={`heritage-carousel ${isAutoRotating ? 'auto-rotating' : ''}`}
          style={{
            transform: `translateZ(-6000px) rotateY(${-currentIndex * (360 / numberOfCells)}deg)`
          }}
        >
          {achievementItems.map((item, index) => (
            <div
              key={item.id}
              className={`glass-nav-button heritage-cell ${selectedCard === index ? 'selected' : ''} ${highlightedCard === index ? 'highlighted' : ''}`}
              style={{
                transform: extractedCard === index
                  ? `rotateY(${(index * 360) / numberOfCells}deg) translateZ(${translateZ + 500}px) translateY(-450px) scale(1.8)`
                  : flyingCard === index
                    ? `rotateY(${(index * 360) / numberOfCells}deg) translateZ(${translateZ + 1000}px) translateY(-450px) scale(2)`
                    : returningCard === index
                      ? `rotateY(${(index * 360) / numberOfCells}deg) translateZ(${translateZ}px) translateY(0px) scale(1)`
                      : `rotateY(${(index * 360) / numberOfCells}deg) translateZ(${translateZ}px)`,
                position: 'absolute',
                top: '50%',
                left: '50%',
                marginLeft: 'auto',
                marginTop: 'auto',
                zIndex: extractedCard === index ? 2000 : flyingCard === index ? 3000 : 'auto',
                transition: 'all 2.5s ease-out'
              }}
              onClick={() => handleCardClick(index)}
            >
              {highlightedCard === index ? (
                <div className="achievement-details">
                  <h3>Rok {item.year}</h3>
                  <ul>
                    {item.achievements.map((achievement, idx) => (
                      <li key={idx}>{achievement}</li>
                    ))}
                  </ul>
                </div>
              ) : (
                <div className="achievement-year-text">
                  {item.year}
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </>
  )
}