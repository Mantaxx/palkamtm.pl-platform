'use client';

import styles from '@/components/heritage/heritage.module.css';
import { gsap } from 'gsap';
import { DrawSVGPlugin } from 'gsap/dist/DrawSVGPlugin';
import { ScrollToPlugin } from 'gsap/dist/ScrollToPlugin';
import { ScrollTrigger } from 'gsap/dist/ScrollTrigger';
import React, { useCallback, useEffect, useRef } from 'react';

// Register GSAP plugins
gsap.registerPlugin(ScrollTrigger, DrawSVGPlugin, ScrollToPlugin);

interface HeritageData {
  // ...existing code...
}

interface HeritageData {
  [year: string]: {
    narrative: { title: string; description: string }[];
    details: {
      Rok: string;
      Poziom: string;
      Kategoria: string;
      'Miejsce/Tytuł': string;
      'Coeff/Punkty': string;
      'Liczba Konkursów': string;
    }[];
  };
}

interface HeritageContentClientProps {
  heritageData: HeritageData;
}

const HeritageContentClient: React.FC<HeritageContentClientProps> = ({ heritageData }) => {
  const scrollDistRef = useRef<HTMLDivElement>(null);
  const appRef = useRef<HTMLDivElement>(null);
  const headlinesRef = useRef<SVGSVGElement>(null);
  const detailRef = useRef<HTMLDivElement>(null);
  const detailTxtRef = useRef<HTMLDivElement>(null);
  const cursorRef = useRef<SVGGElement>(null);
  const cursorCircleRef = useRef<SVGCircleElement>(null);
  const cursorCloseRef = useRef<SVGPathElement>(null);

  // Handler to close detail modal
  const closeDetail = useCallback(() => {
    if (!detailRef.current || !detailTxtRef.current || !cursorCloseRef.current || !cursorCircleRef.current) {
      return;
    }
    const detail = detailRef.current;
    const detailTxt = detailTxtRef.current;
    const cursorClose = cursorCloseRef.current;
    const cursorCircle = cursorCircleRef.current;

    gsap
      .timeline()
      .to(detail, { duration: 0.4, opacity: 0, scale: 0.8, ease: "power2.inOut" })
      .to(cursorClose, { duration: 0.3, opacity: 0, scale: 0.8, ease: "power2.inOut" }, "-=0.2")
      .to(cursorCircle, { duration: 0.3, opacity: 0, scale: 0.8, ease: "power2.inOut" }, "-=0.2")
      .to(detailTxt, { duration: 0.3, opacity: 0, y: 20, ease: "power2.inOut" }, "-=0.2");
  }, []);

  // Handler to show detail modal
  const showDetail = useCallback(() => {
    if (!detailRef.current || !detailTxtRef.current || !cursorCloseRef.current || !cursorCircleRef.current) {
      return;
    }

    gsap
      .timeline()
      .to(detailRef.current, { duration: 0.4, opacity: 1, scale: 1, ease: "power2.inOut" })
      .to(cursorCloseRef.current, { duration: 0.3, opacity: 1, scale: 1, ease: "power2.inOut" }, "-=0.2")
      .to(cursorCircleRef.current, { duration: 0.3, opacity: 1, scale: 1, ease: "power2.inOut" }, "-=0.2")
      .to(detailTxtRef.current, { duration: 0.3, opacity: 1, y: 0, ease: "power2.inOut" }, "-=0.2");
  }, []);

  useEffect(() => {
    if (!scrollDistRef.current || !appRef.current || !headlinesRef.current || !detailRef.current || !detailTxtRef.current || !cursorRef.current || !cursorCircleRef.current || !cursorCloseRef.current) {
      return;
    }

    const scrollDist = scrollDistRef.current;
    const app = appRef.current;

    gsap.set(scrollDist, {
      width: "100%",
      height: app.scrollHeight, // Use scrollHeight for dynamic content
      onComplete: () => {
        gsap.set(app, {
          opacity: 1,
          position: "fixed",
          width: "100%",
          height: "100%",
          top: 0,
          left: 0,
          perspective: 300
        });
      }
    });

    gsap
      .timeline({
        defaults: { duration: 1 },
        onUpdate: () => {
          if (gsap.getProperty(cursorCloseRef.current, "opacity") === 1) closeDetail();
        },
        scrollTrigger: {
          trigger: scrollDist,
          start: "top top",
          end: "bottom bottom",
          scrub: 1
        }
      })
      .fromTo(
        "#txt1",
        { scale: 0.6, transformOrigin: "50%" },
        { scale: 2, ease: "power1.in" },
        0
      )
      .to(
        "#txt1 path",
        { duration: 0.3, drawSVG: 0, stagger: 0.05, ease: "power1.in" },
        0
      )
      .add("end")
      .fromTo(
        "#txt2",
        { scale: 0.1, transformOrigin: "50%" },
        { scale: 0.6, ease: "power3" },
        "end-=0.2"
      )
      .from(
        "#txt2 path",
        { duration: 0.4, drawSVG: 0, ease: "sine.inOut", stagger: 0.15 },
        "end-=0.2"
      );

    // intro animation
    gsap.from(window,
      {
        duration: 1.4,
        scrollTo: Number(gsap.getProperty(scrollDist, "height")) / 3,
        ease: "power2.in"
      }
    );
  }, [closeDetail]);

  // Mouse cursor handling
  useEffect(() => {
    if (!cursorRef.current) return;

    const cursor = cursorRef.current;
    if (ScrollTrigger.isTouch === 1) {
      gsap.set(cursor, { opacity: 0 });
    } else {
      const cursorX = gsap.quickTo(cursorRef.current, "x", { duration: 0.3, ease: "power2" });
      const cursorY = gsap.quickTo(cursorRef.current, "y", { duration: 0.3, ease: "power2" });

      window.onmousemove = (e) => {
        cursorX(e.clientX);
        cursorY(e.clientY);
      };
    }
  }, [closeDetail, showDetail]);

  const sortedYears = Object.keys(heritageData).filter(year => year !== "Summary").sort();

  return (
    <div className={styles.appContainer}>
      <div id="scrollDist" ref={scrollDistRef}></div>

      <div id="app" ref={appRef}>
        <svg id="headlines" fill="none" stroke="#fff" strokeWidth="3" viewBox="0 0 586 150" ref={headlinesRef}>
          <g id="txt1">
            <path d="M40.2,16.9c-5,0-9.1,1-12.3,3.1S23,25.1,23,29.3c0,4.1,1.6,7.3,4.8,9.5s10,4.6,20.5,7.1 c10.5,2.5,18.3,6.1,23.7,10.7c5.3,4.6,8,11.3,8,20.2c0,8.9-3.4,16.1-10.1,21.7c-6.7,5.5-15.5,8.3-26.4,8.3 c-16,0-30.1-5.5-42.5-16.5l10.8-13c10.3,9,21,13.4,32.1,13.4c5.5,0,10-1.2,13.2-3.6c3.3-2.4,4.9-5.5,4.9-9.5s-1.5-7-4.6-9.2 s-8.3-4.2-15.8-6c-7.5-1.8-13.2-3.5-17.1-5c-3.9-1.5-7.4-3.5-10.4-5.9c-6-4.6-9.1-11.6-9.1-21c0-9.4,3.4-16.7,10.3-21.8 C22.2,3.6,30.7,1,40.9,1c6.5,0,13,1.1,19.4,3.2c6.4,2.1,12,5.2,16.6,9.1l-9.2,13c-3-2.7-7.1-5-12.3-6.7 C50.3,17.8,45.2,16.9,40.2,16.9z" />
            <path d="M147.9,89.9c5.9,0,11-1,15.3-3c4.3-2,8.8-5.2,13.4-9.6l11.1,11.4c-10.8,12-23.9,18-39.3,18 c-15.4,0-28.2-5-38.4-14.9c-10.2-9.9-15.3-22.5-15.3-37.7s5.2-27.8,15.5-38C120.6,6.1,133.7,1,149.6,1c15.8,0,29,5.8,39.6,17.5 l-11,12c-4.9-4.7-9.5-7.9-13.8-9.8c-4.3-1.8-9.4-2.8-15.3-2.8c-10.3,0-19,3.3-26,10c-7,6.7-10.5,15.2-10.5,25.6 c0,10.4,3.5,19,10.4,26C130.1,86.4,138.3,89.9,147.9,89.9z" />
            <path d="M290.2,36.6c0,16.8-7.3,27.4-22,31.8l26.7,37.1H273l-24.4-34.3H226v34.3h-17.2V3.5h38 c15.6,0,26.7,2.6,33.4,7.9C286.9,16.6,290.2,25,290.2,36.6z M267.3,51.1c3.5-3,5.3-7.9,5.3-14.5c0-6.7-1.8-11.2-5.4-13.7 c-3.6-2.5-10-3.7-19.3-3.7H226v36.5h21.5C257.2,55.6,263.8,54.1,267.3,51.1z" />
            <path d="M400.5,91.4c-10.3,10.1-23.1,15.1-38.3,15.1c-15.2,0-27.9-5-38.3-15.1c-10.3-10.1-15.5-22.6-15.5-37.7 s5.2-27.6,15.5-37.7C334.3,6,347,1,362.2,1c15.2,0,27.9,5,38.3,15.1c10.3,10.1,15.5,22.6,15.5,37.7S410.8,81.4,400.5,91.4z  M387.8,27.6c-7-7.2-15.5-10.8-25.6-10.8c-10.1,0-18.7,3.6-25.6,10.8c-7,7.2-10.4,15.9-10.4,26.2c0,10.3,3.5,19,10.4,26.2 c7,7.2,15.5,10.8,25.6,10.8c10.1,0,18.7-3.6,25.6-10.8c7-7.2,10.4-15.9,10.4-26.2C398.3,43.5,394.8,34.8,387.8,27.6z" />
            <path d="M437.7,105.5V3.5h17.2v85.7h46.6v16.4H437.7z" />
            <path d="M520.3,105.5V3.5h17.2v85.7h46.6v16.4H520.3z" />
          </g>

          <g id="txt2">
            <path d="M210.7,1v16.2h-54.5v27h48.9v15.3h-48.9v27.3h56.2v16.2H139V1H210.7z" />
            <path d="M311,1h17.2v102.1h-18.7l-57.8-74.5v74.5h-17.2V1h17.2L311,77.2V1z" />
            <path d="M433.8,14.4c9.8,8.9,14.7,21.3,14.7,37.2c0,15.9-4.8,28.4-14.3,37.7c-9.5,9.2-24.1,13.9-43.8,13.9h-33.9V1h35 C409.9,1,423.9,5.5,433.8,14.4z M431.1,52c0-23.4-13.4-35-40.1-35h-17.2v69.9h19.1c12.4,0,21.8-2.9,28.4-8.8 C427.9,72.1,431.1,63.4,431.1,52z" />
          </g>
        </svg>

        <div id="yearContent" className={styles.yearContent}>
          {sortedYears.map(year => (
            <div key={year} className={styles.yearBlock} onClick={() => showDetail()}>
              <h2>{year}</h2>
              {heritageData[year].narrative.map((item) => (
                <div key={item.title}>
                  <h3>{item.title}</h3>
                  <p>{item.description.split('\n').map((line, i) => <span key={i}>{line}<br /></span>)}</p>
                </div>
              ))}
              {heritageData[year].details.length > 0 && (
                <p>Kliknij, aby zobaczyć szczegóły</p>
              )}
            </div>
          ))}
          {heritageData.Summary && heritageData.Summary.narrative.map((item) => (
            <div key="summary" className={styles.yearBlock} onClick={() => showDetail()}>
              <h2>{item.title}</h2>
              <p>{item.description.split('\n').map((line, i) => <span key={i}>{line}<br /></span>)}</p>
            </div>
          ))}
        </div>

        <div id="detail" className={styles.detail} ref={detailRef} onClick={closeDetail}>
          <div id="detailTxt" className={styles.detailTxt} ref={detailTxtRef}></div>
        </div>

        <svg width="100%" height="100%" fill="none" stroke="#fff" ref={cursorRef as React.RefObject<SVGSVGElement>}>
          <g id="cursor">
            <circle id="cursorCircle" cx="0" cy="0" r="12" strokeWidth="3" ref={cursorCircleRef} />
            <path id="cursorClose" d="M-25,-25 L25,25 M-25,25 L25,-25" opacity="0" strokeWidth="3.5" ref={cursorCloseRef} />
          </g>
        </svg>
      </div>
    </div>
  );
};

export default HeritageContentClient;
