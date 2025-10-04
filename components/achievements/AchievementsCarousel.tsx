'use client'

import { ChevronLeft, ChevronRight } from 'lucide-react'
import React, { useCallback, useState } from 'react'

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
  const [expandedCard, setExpandedCard] = useState<number | null>(null)
  const [collapsingCard, setCollapsingCard] = useState<number | null>(null)
  const [rotatingCard, setRotatingCard] = useState<number | null>(null)
  const [rotatingBackCard, setRotatingBackCard] = useState<number | null>(null)
  const [flyingCard, setFlyingCard] = useState<number | null>(null)
  const [flyingBackCard, setFlyingBackCard] = useState<number | null>(null)
  const [scaledCard, setScaledCard] = useState<number | null>(null)
  const [isAutoRotating, setIsAutoRotating] = useState(true)
  const [isAnimationPaused, setIsAnimationPaused] = useState(false)
  const [isManuallyStopped, setIsManuallyStopped] = useState(false)

  const nextSlide = useCallback(() => {
    setIsAutoRotating(false) // Zatrzymaj automatyczne obracanie
    setIsAnimationPaused(true) // Wstrzymaj animację CSS
    setIsManuallyStopped(true) // Oznacz jako ręcznie zatrzymane

    // Natychmiast zatrzymaj CSS animację przez manipulację DOM
    const carousel = document.querySelector('.heritage-carousel') as HTMLElement
    if (carousel) {
      carousel.style.setProperty('animation', 'none', 'important')
      carousel.style.setProperty('transition', 'none', 'important')
      carousel.style.animationPlayState = 'paused'
      carousel.classList.add('manual-stop')
    }

    setCurrentIndex((prev) => (prev + 1) % achievementItems.length)
  }, [])

  const prevSlide = useCallback(() => {
    setIsAutoRotating(false) // Zatrzymaj automatyczne obracanie
    setIsAnimationPaused(true) // Wstrzymaj animację CSS
    setIsManuallyStopped(true) // Oznacz jako ręcznie zatrzymane

    // Natychmiast zatrzymaj CSS animację przez manipulację DOM
    const carousel = document.querySelector('.heritage-carousel') as HTMLElement
    if (carousel) {
      carousel.style.setProperty('animation', 'none', 'important')
      carousel.style.setProperty('transition', 'none', 'important')
      carousel.style.animationPlayState = 'paused'
      carousel.classList.add('manual-stop')
    }

    setCurrentIndex((prev) => (prev - 1 + achievementItems.length) % achievementItems.length)
  }, [])

  const goToSlide = useCallback((index: number) => {
    setIsAutoRotating(false) // Zatrzymaj automatyczne obracanie
    setIsAnimationPaused(true) // Wstrzymaj animację CSS
    setIsManuallyStopped(true) // Oznacz jako ręcznie zatrzymane

    // Natychmiast zatrzymaj CSS animację przez manipulację DOM
    const carousel = document.querySelector('.heritage-carousel') as HTMLElement
    if (carousel) {
      carousel.style.setProperty('animation', 'none', 'important')
      carousel.style.setProperty('transition', 'none', 'important')
      carousel.style.animationPlayState = 'paused'
      carousel.classList.add('manual-stop')
    }

    setCurrentIndex(index)
  }, [])

  // Przekaż funkcje nawigacji do rodzica
  React.useEffect(() => {
    if (onNavigationReady) {
      onNavigationReady({
        prevSlide,
        nextSlide,
        goToSlide,
        currentIndex,
        totalItems: achievementItems.length
      })
    }
  }, [currentIndex, onNavigationReady, prevSlide, nextSlide, goToSlide])

  // Automatyczne obracanie karuzeli
  React.useEffect(() => {
    if (!isAutoRotating || isManuallyStopped) return

    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % achievementItems.length)
    }, 10000) // Obraca co 10 sekund

    return () => clearInterval(interval)
  }, [isAutoRotating, isManuallyStopped])

  const toggleAutoRotate = () => {
    setIsAutoRotating(!isAutoRotating)
    setIsAnimationPaused(!isAutoRotating) // Jeśli włączamy obracanie, wznowij animację
    setIsManuallyStopped(!isAutoRotating) // Jeśli włączamy obracanie, wyczyść stan ręcznego zatrzymania

    const carousel = document.querySelector('.heritage-carousel') as HTMLElement
    if (carousel) {
      if (!isAutoRotating) {
        // Włączamy obracanie
        carousel.classList.remove('manual-stop')
        carousel.style.removeProperty('animation')
        carousel.style.removeProperty('transition')
        carousel.style.animationPlayState = 'running'
      } else {
        // Wyłączamy obracanie
        carousel.classList.add('manual-stop')
        carousel.style.setProperty('animation', 'none', 'important')
        carousel.style.setProperty('transition', 'none', 'important')
        carousel.style.animationPlayState = 'paused'
      }
    }
  }

  const handleCardClick = (index: number) => {
    console.log('Kliknięto kartę:', index)

    // Natychmiast zatrzymaj automatyczne obracanie
    setIsAutoRotating(false)
    setIsAnimationPaused(true)
    setIsManuallyStopped(true)

    // Proste zatrzymanie karuzeli
    const carousel = document.querySelector('.heritage-carousel') as HTMLElement
    if (carousel) {
      carousel.style.animation = 'none'
      carousel.style.animationPlayState = 'paused'
      carousel.classList.add('manual-stop')

      // Zapisz aktualną pozycję karuzeli
      const computedStyle = window.getComputedStyle(carousel)
      const currentTransform = computedStyle.transform
      carousel.setAttribute('data-clicked-position', currentTransform)

      console.log('Karuzela zatrzymana')
      console.log('Zapisana pozycja:', currentTransform)
    }

    if (scaledCard === index) {
      // Karta jest w stanie końcowym - rozpocznij lot z powrotem z obracaniem
      setFlyingBackCard(index)
      setScaledCard(null)

      // Po locie wstecz z obrotem, zatrzymaj w pozycji wysuniętej
      setTimeout(() => {
        setExpandedCard(index)
        setFlyingBackCard(null)

        // Po 1 sekundzie w pozycji wysuniętej, wsuń do karuzeli
        setTimeout(() => {
          setCollapsingCard(index)
          setExpandedCard(null)

          // Po zakończeniu animacji zwijania, wyczyść stany i wznowij automatyczne obracanie
          setTimeout(() => {
            setCollapsingCard(null)
            setIsAutoRotating(true) // Wznów automatyczne obracanie
            setIsAnimationPaused(false) // Wznów animację CSS
            setIsManuallyStopped(false) // Wyczyść stan ręcznego zatrzymania

            // Wznów CSS animację przez manipulację DOM
            const carousel = document.querySelector('.heritage-carousel') as HTMLElement
            if (carousel) {
              carousel.classList.remove('manual-stop')
              carousel.style.removeProperty('animation')
              carousel.style.removeProperty('transition')
              carousel.style.animationPlayState = 'running'

              // Wyczyść zapisaną pozycję
              carousel.removeAttribute('data-clicked-position')
            }

            // Wyczyść style karty, żeby wróciła do normalnej pozycji w karuzeli
            const card = document.querySelector(`.heritage-cell[data-index="${index}"]`) as HTMLElement
            if (card) {
              // Wyczyść wszystkie style i klasy
              card.style.cssText = ''
              card.classList.remove('expanded', 'rotating', 'rotating-back', 'flying', 'flying-back', 'scaled', 'collapsing')

              // Przywróć normalną pozycję karty w karuzeli
              const numberOfCells = achievementItems.length
              const cardAngle = (index * 360) / numberOfCells
              const cellSize = 400
              const translateZ = Math.round((cellSize / 2) / Math.tan(Math.PI / numberOfCells)) + 1000

              // Ustaw normalną pozycję karty w karuzeli
              card.style.transform = `rotateY(${cardAngle}deg) translateZ(${translateZ}px)`

              console.log('Karta wróciła do karuzeli na pozycję:', `rotateY(${cardAngle}deg) translateZ(${translateZ}px)`)
            }
          }, 1500)
        }, 1000)
      }, 800)
    } else {
      // Pierwsze kliknięcie - rozpocznij pełną sekwencję
      setExpandedCard(index)
      setCollapsingCard(null)
      setRotatingCard(null)
      setRotatingBackCard(null)
      setFlyingCard(null)
      setFlyingBackCard(null)
      setScaledCard(null)

      // Po 1.5 sekundach wysuwania, rozpocznij obracanie
      setTimeout(() => {
        setRotatingCard(index)

        // Po 2 sekundach obracania, rozpocznij lecenie
        setTimeout(() => {
          setFlyingCard(index)
          setRotatingCard(null)

          // Po 1 sekundzie lotu z obrotem, zatrzymaj i powiększ na wprost
          setTimeout(() => {
            setScaledCard(index)
            setFlyingCard(null)

            // Użyj zapisanej pozycji karuzeli do pozycjonowania karty
            const carousel = document.querySelector('.heritage-carousel') as HTMLElement
            const card = document.querySelector(`.heritage-cell[data-index="${index}"]`) as HTMLElement

            if (carousel && card) {
              const clickedPosition = carousel.getAttribute('data-clicked-position')
              console.log('Odczytywana pozycja:', clickedPosition)

              if (clickedPosition && clickedPosition !== 'none') {
                console.log('Pozycja karuzeli to matrix3d, nie rotateY!')

                // Dla matrix3d, użyjmy prostszego podejścia - zawsze na wprost
                requestAnimationFrame(() => {
                  // Ustaw kartę zawsze na wprost ekranu, bliżej użytkownika i większą
                  const newTransform = `rotateY(0deg) translateZ(2500px) translateY(0px) scaleX(3.5) scaleY(2.8)`

                  // Usuń wszystkie klasy CSS które mogą interferować
                  card.classList.remove('expanded', 'rotating', 'rotating-back', 'flying', 'flying-back', 'collapsing')

                  // Ustaw pozycję bezpośrednio
                  card.style.cssText = `
                background: rgba(55, 65, 81, 0.9) !important;
                border: 3px solid white !important;
                transform-style: preserve-3d !important;
                transition: transform 1s ease-out !important;
                z-index: 1000 !important;
                backdrop-filter: none !important;
                box-shadow: 0 0 20px rgba(55, 65, 81, 0.8) !important;
                transform-origin: center center !important;
                transform: ${newTransform} !important;
              `

                  console.log('Ustawiona pozycja karty na wprost:', newTransform)
                })
              }
            }
          }, 1000)
        }, 2000)
      }, 1500)
    }
  }

  // Calculate translateZ value for 3D positioning
  const cellSize = 400
  const numberOfCells = achievementItems.length
  const translateZ = Math.round((cellSize / 2) / Math.tan(Math.PI / numberOfCells)) + 1000

  // Generate dynamic CSS for all cards
  const generateCardPositions = () => {
    let css = ''
    for (let i = 0; i < numberOfCells; i++) {
      const angle = (i * 360) / numberOfCells
      css += `.heritage-cell[data-index="${i}"] { transform: rotateY(${angle}deg) translateZ(${translateZ}px); }\n`
      css += `.heritage-cell[data-index="${i}"].expanded { transform: rotateY(${angle}deg) translateZ(${translateZ}px) translateY(-400px) !important; }\n`
      css += `.heritage-cell[data-index="${i}"].rotating { transform: rotateY(${angle}deg) translateZ(${translateZ}px) translateY(-400px) rotateX(360deg) !important; }\n`
      css += `.heritage-cell[data-index="${i}"].rotating-back { transform: rotateY(${angle}deg) translateZ(${translateZ}px) translateY(-400px) rotateX(360deg) !important; }\n`
      css += `.heritage-cell[data-index="${i}"].flying { transform: rotateY(${angle}deg) translateZ(${translateZ + 800}px) translateY(-400px) !important; }\n`
      css += `.heritage-cell[data-index="${i}"].flying-back { transform: rotateY(${angle}deg) translateZ(${translateZ}px) translateY(-400px) rotateX(360deg) !important; }\n`
      css += `.heritage-cell[data-index="${i}"].collapsing { transform: rotateY(${angle}deg) translateZ(${translateZ}px) translateY(0px) scale(1) !important; }\n`
    }
    return css
  }

  return (
    <>
      <style dangerouslySetInnerHTML={{
        __html: `
          .heritage-scene {
            width: 100%;
            height: 1000px;
            position: relative;
            perspective: 1200px;
            perspective-origin: center center;
            margin: -12rem 0 2rem 0;
          }

          .heritage-carousel {
            width: 100%;
            height: 100%;
            position: absolute;
            transform-style: preserve-3d;
            transition: transform 1s ease-in-out;
          }

          .heritage-carousel.auto-rotating {
            animation: continuousRotation 80s linear infinite;
          }

          .heritage-carousel.auto-rotating.paused {
            animation-play-state: paused;
          }

          .heritage-carousel.manual-stop {
            animation: none !important;
            transition: none !important;
          }

          @keyframes continuousRotation {
            from {
              transform: translateZ(-6000px) rotateY(0deg);
            }
            to {
              transform: translateZ(-6000px) rotateY(360deg);
            }
          }

          .heritage-carousel[data-current-index="0"] { transform: translateZ(-6000px) rotateY(0deg); }
          .heritage-carousel[data-current-index="1"] { transform: translateZ(-6000px) rotateY(-15deg); }
          .heritage-carousel[data-current-index="2"] { transform: translateZ(-6000px) rotateY(-30deg); }
          .heritage-carousel[data-current-index="3"] { transform: translateZ(-6000px) rotateY(-45deg); }
          .heritage-carousel[data-current-index="4"] { transform: translateZ(-6000px) rotateY(-60deg); }
          .heritage-carousel[data-current-index="5"] { transform: translateZ(-6000px) rotateY(-75deg); }
          .heritage-carousel[data-current-index="6"] { transform: translateZ(-6000px) rotateY(-90deg); }
          .heritage-carousel[data-current-index="7"] { transform: translateZ(-6000px) rotateY(-105deg); }
          .heritage-carousel[data-current-index="8"] { transform: translateZ(-6000px) rotateY(-120deg); }
          .heritage-carousel[data-current-index="9"] { transform: translateZ(-6000px) rotateY(-135deg); }
          .heritage-carousel[data-current-index="10"] { transform: translateZ(-6000px) rotateY(-150deg); }
          .heritage-carousel[data-current-index="11"] { transform: translateZ(-6000px) rotateY(-165deg); }
          .heritage-carousel[data-current-index="12"] { transform: translateZ(-6000px) rotateY(-180deg); }
          .heritage-carousel[data-current-index="13"] { transform: translateZ(-6000px) rotateY(-195deg); }
          .heritage-carousel[data-current-index="14"] { transform: translateZ(-6000px) rotateY(-210deg); }
          .heritage-carousel[data-current-index="15"] { transform: translateZ(-6000px) rotateY(-225deg); }
          .heritage-carousel[data-current-index="16"] { transform: translateZ(-6000px) rotateY(-240deg); }
          .heritage-carousel[data-current-index="17"] { transform: translateZ(-6000px) rotateY(-255deg); }
          .heritage-carousel[data-current-index="18"] { transform: translateZ(-6000px) rotateY(-270deg); }
          .heritage-carousel[data-current-index="19"] { transform: translateZ(-6000px) rotateY(-285deg); }
          .heritage-carousel[data-current-index="20"] { transform: translateZ(-6000px) rotateY(-300deg); }
          .heritage-carousel[data-current-index="21"] { transform: translateZ(-6000px) rotateY(-315deg); }
          .heritage-carousel[data-current-index="22"] { transform: translateZ(-6000px) rotateY(-330deg); }
          .heritage-carousel[data-current-index="23"] { transform: translateZ(-6000px) rotateY(-345deg); }

          .heritage-cell {
            position: absolute;
            width: 600px;
            height: 740px;
            left: 50%;
            top: 50%;
            margin-left: -300px;
            margin-top: -370px;
            background: linear-gradient(135deg, rgba(255,255,255,0.1), rgba(255,255,255,0.05));
            border: 2px solid rgba(255,255,255,1);
            border-radius: 20px;
            padding: 30px;
            box-shadow: 0 0 0 5px rgba(255,255,255,1);
            outline: 2px solid rgba(255,255,255,1);
            outline-offset: 10px;
            backdrop-filter: blur(10px);
            color: white;
            display: flex;
            flex-direction: column;
            justify-content: center;
            align-items: center;
            text-align: center;
            cursor: pointer;
            transition: all 0.3s ease;
          }

          .heritage-cell:hover {
            background: linear-gradient(135deg, rgba(255,255,255,0.2), rgba(255,255,255,0.1));
            border: 2px solid rgba(255,255,255,1);
            box-shadow: 0 0 20px rgba(255,255,255,0.5), 0 0 0 5px rgba(255,255,255,1);
            outline: 2px solid rgba(255,255,255,1);
            outline-offset: 10px;
            transform: scale(1.05);
          }


          ${generateCardPositions()}

          .heritage-cell.expanded {
            background: linear-gradient(135deg, rgba(255,255,255,0.1), rgba(255,255,255,0.05)) !important;
            border: 2px solid white !important;
            transform-style: preserve-3d !important;
            transition: transform 1.5s ease-out !important;
            z-index: 1000;
          }

          .heritage-cell.rotating {
            background: linear-gradient(135deg, rgba(255,255,255,0.1), rgba(255,255,255,0.05)) !important;
            border: 2px solid white !important;
            transform-style: preserve-3d !important;
            transition: transform 2s linear !important;
            z-index: 1000;
          }

          .heritage-cell.rotating-back {
            background: linear-gradient(135deg, rgba(255,255,255,0.1), rgba(255,255,255,0.05)) !important;
            border: 2px solid white !important;
            transform-style: preserve-3d !important;
            transition: transform 2s ease-in-out !important;
            z-index: 1000;
          }

          .heritage-cell.flying {
            background: linear-gradient(135deg, rgba(255,255,255,0.1), rgba(255,255,255,0.05)) !important;
            border: 2px solid white !important;
            transform-style: preserve-3d !important;
            transition: transform 0.2s ease-in !important;
            z-index: 1000;
          }

          .heritage-cell.flying-back {
            background: linear-gradient(135deg, rgba(255,255,255,0.1), rgba(255,255,255,0.05)) !important;
            border: 2px solid white !important;
            transform-style: preserve-3d !important;
            transition: transform 0.8s ease-in-out !important;
            z-index: 1000;
          }



          .heritage-cell.collapsing {
            background: linear-gradient(135deg, rgba(255,255,255,0.1), rgba(255,255,255,0.05)) !important;
            border: 2px solid white !important;
            transform-style: preserve-3d !important;
            transition: transform 1.5s ease-out !important;
            z-index: 1000;
          }

          .heritage-cell.scaled {
            background: rgba(55, 65, 81, 0.9) !important;
            border: 3px solid white !important;
            transform-style: preserve-3d !important;
            transition: transform 1s ease-out !important;
            z-index: 1000;
            backdrop-filter: none !important;
            box-shadow: 0 0 20px rgba(55, 65, 81, 0.8) !important;
            transform-origin: center center !important;
            transform: rotateY(var(--card-angle, 0deg)) translateZ(1000px) translateY(0px) scaleX(3) scaleY(2.5) !important;
          }





        `
      }} />

      <div className="heritage-scene">
        <div
          className={`heritage-carousel ${isAutoRotating && !isManuallyStopped ? 'auto-rotating' : ''} ${isAnimationPaused ? 'paused' : ''} ${isManuallyStopped ? 'manual-stop' : ''}`}
          data-current-index={currentIndex}
        >
          {achievementItems.map((item, index) => (
            <div
              key={item.id}
              className={`heritage-cell ${expandedCard === index ? 'expanded' : ''
                } ${collapsingCard === index ? 'collapsing' : ''
                } ${rotatingCard === index ? 'rotating' : ''
                } ${rotatingBackCard === index ? 'rotating-back' : ''
                } ${flyingCard === index ? 'flying' : ''
                } ${flyingBackCard === index ? 'flying-back' : ''
                } ${scaledCard === index ? 'scaled' : ''
                }`}
              data-index={index}
              onClick={() => handleCardClick(index)}
            >
              {scaledCard === index ? (
                <div className="w-full h-full overflow-y-auto p-8">
                  <h3 className="text-2xl font-bold mb-6 text-white text-center">
                    Rok {item.year}
                  </h3>
                  <div className="space-y-3">
                    {item.achievements.map((achievement, idx) => (
                      <div key={idx} className="text-sm text-white leading-relaxed">
                        {achievement}
                      </div>
                    ))}
                  </div>
                </div>
              ) : (
                <div className="flex items-center justify-center h-full">
                  <h3 className="font-bold text-white drop-shadow-2xl text-8xl achievement-year-text">
                    {item.year}
                  </h3>
                </div>
              )}
            </div>
          ))}
        </div>

        {/* Strzałki nawigacji */}
        <button
          onClick={prevSlide}
          className="absolute left-4 top-1/2 -translate-y-1/2 z-30 p-3 rounded-full bg-black/50 hover:bg-black/70 text-white transition-all duration-300 hover:scale-110"
          aria-label="Poprzedni rok"
        >
          <ChevronLeft className="w-6 h-6" />
        </button>

        <button
          onClick={nextSlide}
          className="absolute right-4 top-1/2 -translate-y-1/2 z-30 p-3 rounded-full bg-black/50 hover:bg-black/70 text-white transition-all duration-300 hover:scale-110"
          aria-label="Następny rok"
        >
          <ChevronRight className="w-6 h-6" />
        </button>

        {/* Przycisk kontroli automatycznego obracania - bezpośrednio pod karuzelą */}
        <button
          onClick={toggleAutoRotate}
          className="absolute top-[calc(100%-80px)] left-1/2 -translate-x-1/2 z-30 w-16 h-16 rounded-full bg-white/20 hover:bg-white/30 text-white transition-all duration-300 hover:scale-110 backdrop-blur-sm border border-white/30 flex items-center justify-center text-2xl"
          aria-label={isAutoRotating ? "Zatrzymaj obracanie" : "Włącz obracanie"}
        >
          {isAutoRotating ? "⏸️" : "▶️"}
        </button>

      </div>
    </>
  )
}