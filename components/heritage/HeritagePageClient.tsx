'use client';

import styles from '@/components/heritage/heritage.module.css';
import gsap from 'gsap';
import { DrawSVGPlugin } from 'gsap/dist/DrawSVGPlugin';
import { ScrollToPlugin } from 'gsap/dist/ScrollToPlugin';
import { ScrollTrigger } from 'gsap/dist/ScrollTrigger';
import Image from 'next/image';
import { useEffect, useRef } from 'react';

gsap.registerPlugin(ScrollTrigger, DrawSVGPlugin, ScrollToPlugin);

export function HeritagePageClient() {
  const appRef = useRef<HTMLDivElement>(null);
  const scrollDistRef = useRef<HTMLDivElement>(null);
  const cursorRef = useRef<SVGSVGElement>(null);
  const cursorCircleRef = useRef<SVGCircleElement>(null);
  const cursorCloseRef = useRef<SVGPathElement>(null);
  const detailRef = useRef<HTMLDivElement>(null);
  const detailImgRef = useRef<HTMLDivElement>(null);
  const detailTxtRef = useRef<HTMLDivElement>(null);
  const imgGroupRef = useRef<HTMLDivElement>(null);
  const txt1Ref = useRef<HTMLDivElement>(null);
  const txt2Ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!appRef.current || !scrollDistRef.current || !cursorRef.current || !cursorCircleRef.current || !cursorCloseRef.current || !detailRef.current || !detailImgRef.current || !detailTxtRef.current || !imgGroupRef.current || !txt1Ref.current || !txt2Ref.current) {
      return;
    }

    // GSAP animations setup
    gsap.set(appRef.current, { opacity: 1 });

    // Scroll distance animation
    gsap.to(scrollDistRef.current, {
      height: '100vh',
      ease: 'none',
      scrollTrigger: {
        trigger: appRef.current,
        start: 'top top',
        end: 'bottom bottom',
        scrub: 1
      }
    });

    // Cursor animations
    gsap.set(cursorRef.current, { opacity: 0 });
    gsap.set(cursorCloseRef.current, { opacity: 0 });

    // Detail panel animations
    gsap.set(detailRef.current, { y: '100%' });
    gsap.set(detailImgRef.current, { scale: 0.8, opacity: 0 });
    gsap.set(detailTxtRef.current, { y: 20, opacity: 0 });

    // Image group animations
    gsap.set(imgGroupRef.current, { opacity: 0, y: 20 });

    // Text animations
    gsap.set(txt1Ref.current, { opacity: 0, y: 20 });
    gsap.set(txt2Ref.current, { opacity: 0, y: 20 });

    // Scroll-triggered animations
    ScrollTrigger.create({
      trigger: appRef.current,
      start: 'top center',
      end: 'bottom center',
      onEnter: () => {
        gsap.to(imgGroupRef.current, { opacity: 1, y: 0, duration: 1, ease: 'power2.out' });
        gsap.to(txt1Ref.current, { opacity: 1, y: 0, duration: 1, ease: 'power2.out', delay: 0.2 });
        gsap.to(txt2Ref.current, { opacity: 1, y: 0, duration: 1, ease: 'power2.out', delay: 0.4 });
      }
    });

    // Mouse move handler for cursor
    const handleMouseMove = (e: MouseEvent) => {
      gsap.to(cursorRef.current, {
        x: e.clientX,
        y: e.clientY,
        duration: 0.1
      });
    };

    // Click handler for images
    const handleImageClick = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      if (target.tagName === 'IMG') {
        gsap.to(cursorRef.current, { opacity: 1, duration: 0.3 });
        gsap.to(cursorCloseRef.current, { opacity: 1, duration: 0.3 });
        gsap.to(detailRef.current, { y: '0%', duration: 0.5, ease: 'power2.out' });
        gsap.to(detailImgRef.current, { scale: 1, opacity: 1, duration: 0.5, ease: 'power2.out' });
        gsap.to(detailTxtRef.current, { y: 0, opacity: 1, duration: 0.5, ease: 'power2.out', delay: 0.2 });
      }
    };

    // Close detail handler
    const handleCloseDetail = () => {
      gsap.to(cursorRef.current, { opacity: 0, duration: 0.3 });
      gsap.to(cursorCloseRef.current, { opacity: 0, duration: 0.3 });
      gsap.to(detailRef.current, { y: '100%', duration: 0.5, ease: 'power2.out' });
      gsap.to(detailImgRef.current, { scale: 0.8, opacity: 0, duration: 0.5, ease: 'power2.out' });
      gsap.to(detailTxtRef.current, { y: 20, opacity: 0, duration: 0.5, ease: 'power2.out' });
    };

    // Event listeners
    window.addEventListener('mousemove', handleMouseMove);
    document.addEventListener('click', handleImageClick);
    const cursorClose = cursorCloseRef.current;
    cursorClose?.addEventListener('click', handleCloseDetail);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('click', handleImageClick);
      if (cursorClose) {
        cursorClose.removeEventListener('click', handleCloseDetail);
      }
      ScrollTrigger.getAll().forEach(trigger => trigger.kill());
    };
  }, []);

  return (
    <div id="app" ref={appRef} className={styles.app}>
      <div ref={scrollDistRef} className={styles.scrollDist}></div>
      {/* Cursor */}
      <svg ref={cursorRef} className={styles.cursor}>
        <circle ref={cursorCircleRef} cx="50" cy="50" r="50" fill="none" stroke="#fff" strokeWidth="2" />
        <path ref={cursorCloseRef} d="M30 30 L70 70 M70 30 L30 70" stroke="#fff" strokeWidth="2" fill="none" />
      </svg>
      {/* Detail Panel */}
      <div ref={detailRef} className={styles.detail}>
        <div ref={detailImgRef} id="detailImg"></div>
        <div ref={detailTxtRef} id="detailTxt">
          <h2>Historia Hodowli</h2>
          <p>Długoletnia tradycja hodowli gołębi pocztowych z doskonałymi wynikami w konkursach krajowych i międzynarodowych.</p>
        </div>
      </div>
      {/* Content */}
      <div className={styles.content}>
        <div ref={imgGroupRef} className={styles.imgGroup}>
          <Image src="/champions/1/gallery/DV-02906-11-98t_OLIMP (1).jpg" alt="Champion 1" width={300} height={200} />
          <Image src="/champions/2/gallery/dv-0987-11-396_c.jpg" alt="Champion 2" width={300} height={200} />
          <Image src="/champions/3/gallery/dv-07136-10-202_c.jpg" alt="Champion 3" width={300} height={200} />
        </div>
        <div ref={txt1Ref} className={styles.txt1}>
          <h1>Dziedzictwo Hodowli</h1>
          <p>Ponad 50 lat doświadczenia w hodowli gołębi pocztowych</p>
        </div>
        <div ref={txt2Ref} className={styles.txt2}>
          <h2>Osiągnięcia</h2>
          <p>Wielokrotni mistrzowie Polski i Europy</p>
        </div>
      </div>

      {/* Support Button */}
      <a id={styles.support} href="https://www.buymeacoffee.com/imstark202u" target="_blank" rel="noopener noreferrer">
        <Image
          src="https://cdn.buymeacoffee.com/buttons/v2/default-yellow.png"
          alt="Buy Me A Coffee"
          width={220}
          height={60}
          className={styles.buyMeCoffee}
          title="Buy Me A Coffee"
        />
        <span className="sr-only">Buy Me A Coffee</span>
      </a>
    </div>
  );
}
