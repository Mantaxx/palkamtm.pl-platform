'use client'

import { motion } from 'framer-motion'
import {
  Flame,
  GraduationCap,
  Home,
  Sparkles,
  Star,
  Trophy
} from 'lucide-react'
import React from 'react'


const timelineEvents = [
  {
    year: 2000,
    title: 'Budowa Gołębnika',
    description: 'Rozpoczęcie budowy profesjonalnego gołębnika',
    color: 'from-gray-500 to-gray-600',
    icon: Home,
    details: [
      'Budowa nowoczesnego gołębnika w Lubaniu',
      'Przygotowanie infrastruktury do hodowli',
      'Planowanie przyszłych sukcesów w sporcie gołębiarskim'
    ]
  },
  {
    year: 2002,
    title: 'Pierwsze Sukcesy - Oddział Lubań',
    description: 'Pierwsze znaczące osiągnięcia w oddziale lubańskim',
    color: 'from-green-500 to-green-600',
    icon: Star,
    details: [
      'ODDZIAŁ LUBAŃ - Kat. A: I Wicemistrz (235,77 coef.)',
      'ODDZIAŁ LUBAŃ - Kat. B: I Wicemistrz (503,62 coef.)',
      'ODDZIAŁ LUBAŃ - Gołębie Młode: I Wicemistrz',
      'OKRĘG JELENIA GÓRA - Kat. A: I Przodownik (235,77 coef.)',
      'OKRĘG JELENIA GÓRA - Kat. B: IV Przodownik (503,62 coef.)',
      'OKRĘG JELENIA GÓRA - Gołębie Młode: I Wicemistrz'
    ]
  },
  {
    year: 2003,
    title: 'Mistrzostwo Oddziału i Okręgu',
    description: 'Pierwsze mistrzostwa w kategorii A i gołębi młodych',
    color: 'from-blue-500 to-blue-600',
    icon: Trophy,
    details: [
      'ODDZIAŁ LUBAŃ - Kat. A: Mistrz (501,55 coef.)',
      'ODDZIAŁ LUBAŃ - Gołębie Młode: Mistrz (40 coef.)',
      'OKRĘG JELENIA GÓRA - Kat. A: Mistrz (501,55 coef.)',
      'OKRĘG JELENIA GÓRA - Gołębie Młode: Mistrz (40 coef.)',
      'REGION V - Kat. A: III Przodownik (501,52 coef.)',
      'REGION V - Kat. B: II Przodownik (168,11 coef.)'
    ]
  },
  {
    year: 2004,
    title: 'Kompletne Mistrzostwo - Oddział i Okręg',
    description: 'Mistrzostwo we wszystkich kategoriach oddziałowych i okręgowych',
    color: 'from-purple-500 to-purple-600',
    icon: Trophy,
    details: [
      'ODDZIAŁ LUBAŃ - Kat. A: Mistrz (203,54 coef.)',
      'ODDZIAŁ LUBAŃ - Kat. B: Mistrz (71,99 coef.)',
      'ODDZIAŁ LUBAŃ - Kat. C: Mistrz (217,78 coef.)',
      'ODDZIAŁ LUBAŃ - Gołębie Młode: Mistrz (462,22 coef.)',
      'OKRĘG JELENIA GÓRA - Kat. A: Mistrz (203,54 coef.)',
      'OKRĘG JELENIA GÓRA - Gołębie Młode: I Wicemistrz (462,22 coef.)',
      'OKRĘG JELENIA GÓRA - Kat. C: Mistrz (71,99 coef.)',
      'OKRĘG JELENIA GÓRA - Gołębie Młode: I Przodownik (462,22 coef.)',
      'REGION V (Mistrz GMP) - Kat. A: 10. Przodownik (203,54 coef.)',
      'REGION V (Mistrz GMP) - Kat. B: 49. Przodownik (217,78 coef.)',
      'REGION V (Mistrz GMP) - Kat. C: I Wicemistrz (71,99 coef.)',
      'REGION V (Mistrz GMP) - Kat. D: II Przodownik',
      'REGION V (Mistrz GMP) - GMP: II Przodownik',
      'MISTRZOSTWO POLSKI - Kat. C: 13. Przodownik (71,99 coef.)',
      'MISTRZOSTWO POLSKI - GMP: 28. Przodownik'
    ]
  },
  {
    year: 2005,
    title: 'Wyniki Tadeusza i Mariusza Pałki',
    description: 'Mistrzostwo Polski i dominacja w okręgu lubańskim',
    color: 'from-yellow-500 to-yellow-600',
    icon: Trophy,
    details: [
      'ŁUBNA - Kat. A: 1. Przodownik (180,91 coef.)',
      'ŁUBNA - Gołębie Młode: 8. Przodownik',
      'OKRĘG LUBAŃ - Kat. A: 1. Przodownik (66,96 coef.)',
      'OKRĘG LUBAŃ - Gołębie Młode: 1. Wicemistrz',
      'MISTRZOSTWO POLSKI - Kat. A: 1. Przodownik (90,65 coef.)',
      'MISTRZOSTWO POLSKI - Gołębie Młode: 1. Mistrzostwo Polski (90,65 coef.)',
      'ŁUBNA - Kat. A: 1. Przodownik (90,65 coef.)'
    ]
  },
  {
    year: 2006,
    title: 'Wyniki Tadeusza i Mariusza Pałki',
    description: 'Mistrzostwo w kategorii B i gołębi młodych',
    color: 'from-purple-500 to-purple-600',
    icon: Sparkles,
    details: [
      'OKRĘG LUBAŃ - Kat. B: 1. Przodownik (240,15 coef.)',
      'OKRĘG LUBAŃ - Gołębie Młode: 1. Mistrz',
      'OKRĘG JELENIA GÓRA - Kat. B: 2. Przodownik Okręgu (199,28 coef.)',
      'OKRĘG LUBAŃ - Kat. B: 2. Przodownik (240,15 coef.)',
      'OKRĘG LUBAŃ - Gołębie Młode: 2. Przodownik'
    ]
  },
  {
    year: 2007,
    title: 'Wysokie Osiągnięcia Kat. A',
    description: 'Drugie miejsce w kategorii A',
    color: 'from-red-500 to-red-600',
    icon: Flame,
    details: [
      'MP - Kat. A: 2. przodownik - 78,06 coef'
    ]
  },
  {
    year: 2008,
    title: 'Wicemistrzostwo GMP',
    description: 'Drugie miejsce w Generalnych Mistrzostwach Polski',
    color: 'from-indigo-500 to-indigo-600',
    icon: GraduationCap,
    details: [
      'REGION - GMP: 20. przodownik - 158,27 pkt',
      'REGION - GMP: I Wicemistrz - 49,88 pkt',
      'Ranking GMP Mistrzostwa Regionów'
    ]
  },
  {
    year: 2009,
    title: 'Ogólnopolski Ranking',
    description: 'Wysokie miejsce w ogólnopolskim rankingu GMP',
    color: 'from-pink-500 to-pink-600',
    icon: Star,
    details: [
      'OGÓLNOPOLSKI - GMP: 148. przodownik - 1 401,99 pkt',
      'Ogólnopolski ranking GMP'
    ]
  },
  {
    year: 2011,
    title: 'Kompletne Mistrzostwo - Oddział',
    description: 'Mistrzostwo we wszystkich kategoriach oddziałowych',
    color: 'from-purple-500 to-purple-600',
    icon: Trophy,
    details: [
      'ODDZIAŁ - Kat. TOTAL gołębi dorosłych: Mistrz - 611,73 coef (70 konkursów)',
      'ODDZIAŁ - Kat. A: Mistrz - 161,32 coef (20 konkursów)',
      'ODDZIAŁ - Kat. B: Mistrz - 51,32 coef (16 konkursów)',
      'ODDZIAŁ - Kat. C: Mistrz - 84,07 coef (9 konkursów)',
      'ODDZIAŁ - Kat. M: Mistrz - 59,36 coef (6 konkursów)',
      'ODDZIAŁ - Kat. D: Mistrz - 296,71 coef',
      'ODDZIAŁ - Kat. H: Mistrz - 588,92 coef (18 konkursów)',
      'ODDZIAŁ - Kat. Roczne: Mistrz - 534,49 coef (20 konkursów)'
    ]
  },
  {
    year: 2012,
    title: 'Rok Dominacji - MP i Oddział',
    description: 'Wysokie osiągnięcia w Mistrzostwach Polski i dominacja w oddziale',
    color: 'from-teal-500 to-teal-600',
    icon: Trophy,
    details: [
      'MP - Kat. Maraton: 8. przodownik - 648,45 pkt',
      'MP - Kat. Olimpijskie: 68. przodownik - 847,37 pkt',
      'ODDZIAŁ - Kat. A: I Mistrz - 575,76 coef',
      'ODDZIAŁ - Kat. B: I Mistrz - 160,25 coef',
      'ODDZIAŁ - Kat. C: II V-ce Mistrz - 119,72 coef',
      'ODDZIAŁ - Kat. M Maraton: I Mistrz - 103,06 coef',
      'ODDZIAŁ - Kat. D (A+B+C): I Mistrz - 855,28 coef',
      'ODDZIAŁ - Kat. GMO: I Mistrz - 1 409,58 pkt',
      'ODDZIAŁ - Kat. H: I Mistrz - 887,54 coef',
      'ODDZIAŁ - Kat. Roczne: I Mistrz - 413,58 coef',
      'ODDZIAŁ - Kat. Olimpijskie: I Mistrz - 646,45 coef',
      'ODDZIAŁ - Kat. Total gołębie dorosłe: I Mistrz - 1 080,51 coef',
      'ODDZIAŁ - Kat. Total gołębie młode: II V-ce Mistrz - 150,62 coef'
    ]
  },
  {
    year: 2013,
    title: 'Rok Dominacji - MP, Region i Oddział',
    description: 'Wysokie osiągnięcia w Mistrzostwach Polski, regionie i kompletna dominacja w oddziale',
    color: 'from-orange-500 to-orange-600',
    icon: Sparkles,
    details: [
      'MP - Kat. B: 13. przodownik - 685,69 pkt',
      'MP - Kat. A: 2. wicemistrz - 66,43 pkt',
      'MP - Gołębie Roczne: 9. przodownik - 227,84 pkt',
      'REGION - GMP: 68. przodownik - 1 381,43 coef',
      'ODDZIAŁ - Kat. A: Mistrz - 66,43 coef (20 konkursów)',
      'ODDZIAŁ - Kat. B: Mistrz - 87,62 coef (16 konkursów)',
      'ODDZIAŁ - Kat. C: Przodownik 1 - 525,46 coef (9 konkursów)',
      'ODDZIAŁ - Kat. D (A+B+C): Mistrz - 679,51 coef (45 konkursów)',
      'ODDZIAŁ - Kat. GMO: II V-ce Mistrz - 1 373,93 pkt (32 konkursy)',
      'ODDZIAŁ - Kat. H: Mistrz - 338,68 coef (18 konkursów)',
      'ODDZIAŁ - Kat. Roczne: Przodownik 3 - 1 025,61 coef (28 konkursów)',
      'ODDZIAŁ - Kat. Total gołębie młode: I V-ce Mistrz - 562,03 coef (25 konkursów)',
      'ODDZIAŁ - Kat. gołębie młode (5 najlepszych): Mistrz - 1 139,02 coef (21 konkursów)'
    ]
  },
  {
    year: 2014,
    title: 'Rok Mistrzostw - MP i Oddział',
    description: 'Mistrzostwo Polski w kategoriach A i B oraz dominacja w oddziale',
    color: 'from-cyan-500 to-cyan-600',
    icon: Flame,
    details: [
      'MP - Kat. B: Mistrz - 661,38 pkt',
      'MP - Kat. A: Mistrz - 116,13 pkt',
      'MP - Klasa Sport - A: 22. miejsce',
      'ODDZIAŁ - Kat. A: I Mistrz - 116,13 coef',
      'ODDZIAŁ - Kat. B: I Mistrz - 78,35 coef',
      'ODDZIAŁ - Kat. C: 5. przodownik - 362,76 coef',
      'ODDZIAŁ - Kat. D (A+B+C): I Mistrz - 557,24 coef',
      'ODDZIAŁ - Kat. H: I Mistrz - 577,48 coef',
      'ODDZIAŁ - Kat. Roczne: I Mistrz - 239,29 coef',
      'ODDZIAŁ - Kat. Lotniki: 2. przodownik - 524,88 coef'
    ]
  },
  {
    year: 2015,
    title: 'Rok Weryfikacji - MP i Oddział',
    description: 'Potwierdzenie mistrzostw po weryfikacji oraz kompletne mistrzostwo w oddziale',
    color: 'from-emerald-500 to-emerald-600',
    icon: GraduationCap,
    details: [
      'MP - Kat. A: Mistrz - 86,77 pkt (po weryfikacji)',
      'MP - Kat. B: 1. przodownik - 71,68 pkt (po weryfikacji)',
      'ODDZIAŁ - Kat. A: I Mistrz - 83,22 coef',
      'ODDZIAŁ - Kat. B: I Mistrz - 237,95 coef',
      'ODDZIAŁ - Kat. C: I Mistrz - 199,65 coef',
      'ODDZIAŁ - Kat. D: I Mistrz - 520,82 coef (45 konkursów)'
    ]
  },
  {
    year: 2017,
    title: 'Rok Osiągnięć - GMP i Oddział',
    description: 'Wysokie miejsce w GMP oraz pierwsze miejsca w oddziale',
    color: 'from-violet-500 to-violet-600',
    icon: Trophy,
    details: [
      'MP - GMP: 54. przodownik - 148,16 pkt',
      'ODDZIAŁ - Kat. A: 1. przodownik - 348,53 coef',
      'ODDZIAŁ - Kat. B: 1. przodownik - 153,39 coef'
    ]
  },
  {
    year: 2018,
    title: 'Rok Sukcesów - MP i Oddział',
    description: 'Wicemistrzostwo w MP oraz mistrzostwo TOTAL w oddziale',
    color: 'from-rose-500 to-rose-600',
    icon: Star,
    details: [
      'MP - Kat. A: I Wicemistrz (1. wicemistrz) - 25,94 pkt',
      'ODDZIAŁ - TOTAL: 16. przodownik (XIII Przodownik) - 942,69 coef',
      'ODDZIAŁ - Kat. A: I Mistrz - 29,38 coef',
      'ODDZIAŁ - Kat. B: I Mistrz - 35,74 coef'
    ]
  },
  {
    year: 2021,
    title: 'Powrót do Formy - MP',
    description: 'Wysokie miejsce w kategorii A - Mistrzostwa Polski',
    color: 'from-lime-500 to-lime-600',
    icon: Sparkles,
    details: [
      'MP - Kat. A: 61. przodownik - 249,85 pkt'
    ]
  },
  {
    year: 2019,
    title: 'Podwójne Mistrzostwo - Oddział',
    description: 'Mistrzostwo w Kategoriach A i B - szczebel oddziałowy',
    color: 'from-blue-500 to-blue-600',
    icon: Trophy,
    details: [
      'ODDZIAŁ - Kat. A: I Mistrz - 82,76 coef',
      'ODDZIAŁ - Kat. B: I Mistrz - 130,64 coef'
    ]
  },
  {
    year: 2024,
    title: 'Najnowsze Osiągnięcia - MP',
    description: 'Aktualne sukcesy w hodowli - Mistrzostwa Polski',
    color: 'from-sky-500 to-sky-600',
    icon: Flame,
    details: [
      'MP - Kat. A: 13. przodownik - 85,05 coef'
    ]
  }
]

export default function TimelineSection() {
  // CSS dla timeline z efektami 3D
  React.useEffect(() => {
    const style = document.createElement('style')
    style.textContent = `
      @import url('https://fonts.googleapis.com/css?family=Montserrat');
      
      #timeline {
        width: 100%;
        min-height: 1120px;
        background-color: #222223;
        padding: 20px 1%;
        overflow: hidden;
        font-family: 'Montserrat', sans-serif;
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
      }
      
      #timeline ul {
        min-height: auto;
        border-top: 0;
        border-left: 4px solid transparent;
        border-left-color: #7ab800;
        -webkit-border-image: -webkit-linear-gradient( 
          top, 
          #7ab800 0%,
          #0085c3 35%,
          #f2af00 50%,
          #ce1126 65%,
          #6e2585 100%);
        -moz-border-image: -moz-linear-gradient( 
          top, 
          #7ab800 0%,
          #0085c3 35%,
          #f2af00 50%,
          #ce1126 65%,
          #6e2585 100%);
        -ms-border-image: -ms-linear-gradient( 
          top, 
          #7ab800 0%,
          #0085c3 35%,
          #f2af00 50%,
          #ce1126 65%,
          #6e2585 100%);
        -o-border-image: -o-linear-gradient( 
          top, 
          #7ab800 0%,
          #0085c3 35%,
          #f2af00 50%,
          #ce1126 65%,
          #6e2585 100%);
        border-image: linear-gradient(
          to bottom, 
          #7ab800 0%, 
          #0085c3 35%, 
          #f2af00 50%, 
          #ce1126 65%, 
          #6e2585 100%);
        border-image-slice: 1;
        position: relative;
        top: 0;
        left: 70%;
        transform: translateX(-50%);
        perspective: 2000px;
        list-style: none;
        padding: 50px 0;
        margin: 0 auto;
        max-width: 1000px;
        width: 100%;
      }
      
      #timeline ul li {
        position: relative;
        margin: 0;
        opacity: 0;
        transform: translateY(50px);
        transition: all 0.8s cubic-bezier(0.25, 0.46, 0.45, 0.94);
        height: 100px;
        margin-bottom: 0;
      }
      
      #timeline ul li.animated {
        opacity: 1;
        transform: translateY(0);
      }
      
      #timeline ul li:after {
        content: "✓";
        display: block;
        width: 35px;
        height: 35px;
        border-radius: 50%;
        font-weight: 100;
        font-size: 90%;
        line-height: 35px;
        text-align: center;
        background-color: #7ab800;
        color: #fff;
        position: absolute;
        left: -18px;
        -webkit-transition: transform 1s linear;
        transition: transform 1s linear;
        z-index: 10;
      }
      
      #timeline ul li:nth-child(2):after {
        background-color: #0085c3;
      }
      
      #timeline ul li:nth-child(3):after {
        content: "★";
        background-color: #f2af00;
      }
      
      #timeline ul li:nth-child(4):after {
        content: "★";
        background-color: #ce1126;
      }
      
      #timeline ul li:nth-child(5):after {
        content: "★";
        background-color: #6e2585;
      }
      
      #timeline ul li .cont {
        width: auto;
        min-width: 500px;
        max-width: 800px;
        min-height: 250px;
        padding: 40px;
        border: 2px solid transparent;
        border-radius: 8px;
        transform: translate(0, -125px);
        text-transform: none;
        line-height: 1.8;
        font-size: 16px;
        font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
        font-weight: 400;
        position: absolute;
        top: 50px;
        background: #222223;
        color: #e8e8e8;
        display: flex;
        flex-direction: column;
        justify-content: space-between;
        word-wrap: break-word;
        overflow-wrap: break-word;
        text-align: left;
        letter-spacing: 0.3px;
      }
      
      #timeline ul li:nth-child(odd) .cont {
        transform-origin: left center;
        left: -11px;
        transition: transform 1.5s linear;
      }
      
      #timeline ul li:nth-child(even) .cont {
        transform-origin: right center;
        left: -439px;
        transition: transform 1.5s linear;
      }
      
      #timeline ul li:nth-child(1) .cont {
        color: #7ab800;
        border-color: #7ab800;
      }
      
      #timeline ul li:nth-child(1) .cont h3 {
        color: #7ab800;
        border-bottom-color: #7ab800;
      }
      
      #timeline ul li:nth-child(2) .cont {
        color: #0085c3;
        border-color: #0085c3;
      }
      
      #timeline ul li:nth-child(2) .cont h3 {
        color: #0085c3;
        border-bottom-color: #0085c3;
      }
      
      #timeline ul li:nth-child(3) .cont {
        color: #f2af00;
        border-color: #f2af00;
      }
      
      #timeline ul li:nth-child(3) .cont h3 {
        color: #f2af00;
        border-bottom-color: #f2af00;
      }
      
      #timeline ul li:nth-child(4) .cont {
        color: #ce1126;
        border-color: #ce1126;
      }
      
      #timeline ul li:nth-child(4) .cont h3 {
        color: #ce1126;
        border-bottom-color: #ce1126;
      }
      
      #timeline ul li:nth-child(5) .cont {
        color: #6e2585;
        border-color: #6e2585;
      }
      
      #timeline ul li:nth-child(5) .cont h3 {
        color: #6e2585;
        border-bottom-color: #6e2585;
      }
      
      #timeline ul li:nth-child(1):after {
        top: 50px;
      }
      
      #timeline ul li:nth-child(2):after {
        top: 50px;
      }
      
      #timeline ul li:nth-child(3):after {
        top: 50px;
      }
      
      #timeline ul li:nth-child(4):after {
        top: 50px;
      }
      
      #timeline ul li:nth-child(5):after {
        top: 50px;
      }
      
      #timeline ul li:nth-child(odd):hover .cont {
        text-align: left;
        transform: rotateY(-175deg) translate3d(30px, -30px, 5px);
        transition: transform 1.5s linear;
      }
      
      #timeline ul li:nth-child(even):hover .cont {
        text-align: left;
        transform: rotateY(175deg) translate3d(-30px, -30px, 5px);
        transition: transform 1.5s linear;
      }
      
      #timeline ul li:nth-child(odd):hover .cont p,
      #timeline ul li:nth-child(odd):hover .cont h3 {
        transform: rotateY(-175deg);
      }
      
      #timeline ul li:nth-child(even):hover .cont p,
      #timeline ul li:nth-child(even):hover .cont h3 {
        transform: rotateY(175deg);
      }
      
      #timeline ul li:nth-child(2) .cont time {
        background-color: #0085C3;
      }
      
      #timeline ul li:nth-child(3) .cont time {
        background-color: #F2AF00;
      }
      
      #timeline ul li:nth-child(4) .cont time {
        background-color: #CE1126;
      }
      
      #timeline ul li:nth-child(5) .cont time {
        background-color: #6E2585;
      }
      
      #timeline ul li:nth-child(odd):hover .cont time {
        transform: rotateY(-175deg);
      }
      
      #timeline ul li:nth-child(even):hover .cont time {
        transform: rotateY(175deg);
      }
      
      #timeline ul li .cont p {
        display: block;
        margin: 0 0 10px 0;
      }
      
      #timeline ul li:nth-child(n+1):hover:after {
        transform: rotateZ(360deg);
        transition: transform 1s linear;
      }
      
      #timeline ul li .cont:before,
      #timeline ul li .cont:after {
        content: "";
        display: block;
        width: 0;
        height: 0;
        position: absolute;
        border-style: solid;
      }
      
      #timeline ul li:nth-child(odd) .cont:before {
        border-width: 11px 11px 11px 0;
        top: 50%;
        left: -11px;
        transform: translate(0, -50%);
      }
      
      #timeline ul li:nth-child(even) .cont:before {
        border-width: 11px 0 11px 11px;
        top: 50%;
        right: -11px;
        transform: translate(0, -50%);
      }
      
      #timeline ul li:nth-child(1) .cont:before {
        border-color: transparent #7ab800 transparent transparent;
      }
      
      #timeline ul li:nth-child(2) .cont:before {
        border-color: transparent transparent transparent #0085c3;
      }
      
      #timeline ul li:nth-child(3) .cont:before {
        border-color: transparent #f2af00 transparent transparent;
      }
      
      #timeline ul li:nth-child(4) .cont:before {
        border-color: transparent transparent transparent #ce1126;
      }
      
      #timeline ul li:nth-child(5) .cont:before {
        border-color: transparent #6e2585 transparent transparent;
      }
      
      #timeline ul li:nth-child(odd) .cont:after {
        border-width: 10px 10px 10px 0;
        border-color: transparent #222223;
        top: 50%;
        left: -9px;
        transform: translate(0, -50%);
      }
      
      #timeline ul li:nth-child(even) .cont:after {
        border-width: 10px 0 10px 10px;
        border-color: transparent #222223;
        top: 50%;
        right: -9px;
        transform: translate(0, -50%);
      }
      
      #timeline ul li .cont h3 {
        font-size: 20px;
        font-weight: 600;
        color: #ffffff;
        margin: 0 0 15px 0;
        line-height: 1.4;
        letter-spacing: 0.5px;
        text-transform: uppercase;
        border-bottom: 2px solid currentColor;
        padding-bottom: 8px;
        display: inline-block;
      }
      
      #timeline ul li .cont p {
        font-size: 15px;
        line-height: 1.7;
        color: #d0d0d0;
        margin: 0 0 20px 0;
        text-align: justify;
        hyphens: auto;
        word-spacing: 0.1em;
      }
      
      #timeline ul li .cont time {
        width: auto;
        min-width: 200px;
        max-width: 400px;
        height: 45px;
        position: absolute;
        top: -22px;
        left: calc(100%/2 - 100px);
        background-color: #7AB800;
        color: #f5f5f5;
        line-height: 45px;
        text-align: center;
        border-radius: 5px;
        font-size: 14px;
        font-weight: 600;
        letter-spacing: 0.5px;
        text-transform: uppercase;
        box-shadow: 0 2px 8px rgba(0, 0, 0, 0.3);
        padding: 0 15px;
        white-space: nowrap;
        overflow: hidden;
        text-overflow: ellipsis;
      }
      
      #timeline ul li:nth-child(2) .cont time {
        background-color: #0085C3;
      }
      
      #timeline ul li:nth-child(3) .cont time {
        background-color: #F2AF00;
      }
      
      #timeline ul li:nth-child(4) .cont time {
        background-color: #CE1126;
      }
      
      #timeline ul li:nth-child(5) .cont time {
        background-color: #6E2585;
      }
      
      .copy-right {
        color: #7AB800;
        text-align: center;
        text-transform: uppercase;
        padding: 130px 0 20px;
        font-size: 14px;
      }
      
      .copy-right a {
        color: #0085C3;
        text-transform: capitalize;
        text-decoration: none;
      }
      
      .copy-right a:hover {
        text-decoration: underline;
      }
      
      @media screen and (max-width: 600px) {
        #timeline ul li .cont {
          width: auto;
          min-width: 300px;
          max-width: 400px;
          min-height: 200px;
          line-height: 1.6;
          padding: 25px;
          font-size: 14px;
        }
        
        #timeline ul li:nth-child(even) .cont {
          left: -320px;
        }
        
        #timeline ul li .cont h3 {
          font-size: 18px;
          margin-bottom: 12px;
          padding-bottom: 6px;
        }
        
        #timeline ul li .cont p {
          font-size: 13px;
          line-height: 1.6;
          margin-bottom: 15px;
        }
        
        #timeline ul li .cont time {
          width: auto;
          min-width: 150px;
          max-width: 300px;
          height: 40px;
          left: calc(100%/2 - 75px);
          font-size: 12px;
          line-height: 40px;
          padding: 0 10px;
        }
      }
    `
    document.head.appendChild(style)
    return () => {
      if (document.head.contains(style)) {
        document.head.removeChild(style)
      }
    }
  }, [])

  return (
    <section id="timeline">
      <div style={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        minHeight: '100vh',
        padding: '40px 20px'
      }}>
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 2.0 }}
          viewport={{ once: true }}
          style={{
            textAlign: 'center',
            width: '100%',
            maxWidth: '800px',
            margin: '0 auto 60px auto'
          }}
        >
          <h2 style={{
            color: '#7ab800',
            fontSize: '2rem',
            fontWeight: '100',
            marginBottom: '20px',
            textTransform: 'uppercase',
            letterSpacing: '2px'
          }}>
            Nasze Osiągnięcia
          </h2>
          <p style={{
            color: '#f5f5f5',
            fontSize: '1.1rem',
            maxWidth: '600px',
            margin: '0 auto',
            lineHeight: '1.6'
          }}>
            Ponad 20 lat sukcesów w hodowli gołębi pocztowych. Od pierwszych startów w 2003 roku po najnowsze mistrzostwa Polski
          </p>
        </motion.div>

        <ul className="line">
          {timelineEvents
            .sort((a, b) => a.year - b.year)
            .slice(0, 5)
            .map((event, index) => (
              <motion.li
                key={event.year}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: index * 0.2 }}
                viewport={{ once: true }}
                className="animated"
              >
                <div className="cont">
                  <time>{event.year} - {event.title}</time>
                  <p>{event.description}</p>
                </div>
              </motion.li>
            ))}
        </ul>

        <p className="copy-right">
          Timeline by <a href="https://twitter.com/Hamadafayyad">@Hamadafayad</a>
        </p>
      </div>
    </section>
  )
}
