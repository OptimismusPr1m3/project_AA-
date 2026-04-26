import {
  AfterViewInit,
  Component,
  ElementRef,
  HostListener,
  Inject,
  OnDestroy,
  OnInit,
  PLATFORM_ID,
  ViewChild,
} from '@angular/core';
import { About } from '../about/about';
import { Divider } from '../divider/divider';
import { Repertoire } from '../repertoire/repertoire';
import { Musicians } from '../musicians/musicians';
import { isPlatformBrowser } from '@angular/common';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Booking } from "../booking/booking";
import { Footer } from "../footer/footer";
import { RouterLink } from '@angular/router';
interface Wave {
  freq: number;
  amp: number;
  speed: number;
  phase: number;
}
@Component({
  selector: 'app-main',
  imports: [About, Divider, Repertoire, Musicians, Booking, Footer, RouterLink],
  templateUrl: './main.html',
  styleUrl: './main.scss',
})
export class Main implements OnInit, AfterViewInit, OnDestroy {
  // ── Wave Canvas ──
  @ViewChild('waveCanvas') waveCanvasRef!: ElementRef<HTMLCanvasElement>;
  private ctx!: CanvasRenderingContext2D;
  private animFrameId!: number;
  private t = 0;
  activeSectionId = '';
  private readonly isBrowser: boolean;

  private waves: Wave[] = [
    { freq: 1.8, amp: 28, speed: 0.004, phase: 0.0 },
    { freq: 2.4, amp: 20, speed: 0.003, phase: 1.2 },
    { freq: 1.2, amp: 36, speed: 0.0025, phase: 2.4 },
    { freq: 3.0, amp: 14, speed: 0.005, phase: 0.8 },
    { freq: 1.6, amp: 24, speed: 0.0035, phase: 3.6 },
  ];
  constructor(@Inject(PLATFORM_ID) platformId: object) {
    this.isBrowser = isPlatformBrowser(platformId);
  }

  ngOnInit(): void {}

  ngAfterViewInit(): void {
    if (!this.isBrowser) return;

    // GSAP ScrollTrigger registrieren – muss einmalig passieren
    // gsap.registerPlugin(ScrollTrigger);

    this.initCanvas();
    this.animate();
    //this.initHeroAnimations();
    //this.initScrollAnimations();

     setTimeout(() => {
    this.initScrollAnimations();
  }, 100);
  }

  ngOnDestroy(): void {
    if (!this.isBrowser) return;
    cancelAnimationFrame(this.animFrameId);
    // Alle ScrollTrigger aufräumen um Memory Leaks zu vermeiden
    ScrollTrigger.getAll().forEach(t => t.kill());
  }

  //── Hero Animationen (einmalig beim Laden) ──
  private initHeroAnimations(): void {
    const tl = gsap.timeline({ defaults: { ease: 'power3.out' } });

    tl.from('.hero-eyebrow', { opacity: 0, y: 20, duration: 0.8 })
      .from('.word-aero',    { opacity: 0, y: 60, duration: 1.0 }, '-=0.4')
      .from('.word-art',     { opacity: 0, y: 60, duration: 1.0 }, '-=0.8')
      .from('.hero-sub',     { opacity: 0, y: 20, duration: 0.8 }, '-=0.4')
      .from('.hero-tagline', { opacity: 0, y: 20, duration: 0.8 }, '-=0.4')
      .from('.hero-cta',     { opacity: 0, y: 20, duration: 0.8 }, '-=0.4');
  }

  // ── Scroll Animationen für Sections ──
  private initScrollAnimations(): void {

    // // Repertoire Cards – gestaffelt
    // gsap.from('.rep-item', {
    //   scrollTrigger: { trigger: '.rep-grid', start: 'top 80%', toggleActions: 'play reverse play reverse' },
    //   opacity: 0, y: 40, duration: 0.7, ease: 'power3.out',
    //   stagger: 0.12  // jede Karte 120ms nach der vorherigen
    // });

    // // Musiker Cards – gestaffelt
    // gsap.from('.musician-card', {
    //   scrollTrigger: { trigger: '.musicians-grid', start: 'top 80%', toggleActions: 'play reverse play reverse' },
    //   opacity: 0, y: 40, duration: 0.7, ease: 'power3.out',
    //   stagger: 0.1
    // });

    // Booking Section
    // gsap.from('.booking-inner .section-label, .booking-inner .section-title, .booking-inner .section-body', {
    //   scrollTrigger: { trigger: '.booking-inner', start: 'top 80%', toggleActions: 'play reverse play reverse' },
    //   opacity: 0, y: 30, duration: 0.8, ease: 'power3.out',
    //   stagger: 0.15
    // });
    // gsap.from('.booking-form', {
    //   scrollTrigger: { trigger: '.booking-form', start: 'top 85%', toggleActions: 'play reverse play reverse' },
    //   opacity: 0, y: 30, duration: 0.9, ease: 'power3.out', delay: 0.3
    // });
  }

  // ── Canvas Setup ──
  private initCanvas(): void {
    const canvas = this.waveCanvasRef.nativeElement;
    this.ctx = canvas.getContext('2d')!;
    this.resizeCanvas();
  }

  private resizeCanvas(): void {
    const canvas = this.waveCanvasRef.nativeElement;
    canvas.width  = canvas.offsetWidth;
    canvas.height = canvas.offsetHeight;
  }

  @HostListener('window:resize')
  onResize(): void {
    if (this.isBrowser) this.resizeCanvas();
  }

  // ── Wave Animation ──
  private animate(): void {
    const canvas = this.waveCanvasRef.nativeElement;
    const W = canvas.width;
    const H = canvas.height;

    this.ctx.clearRect(0, 0, W, H);
    this.drawWave(this.waves[0], '#f5d98b', '#e8b96a', 0.9, W, H);
    this.drawWave(this.waves[1], '#e8b96a', '#d0dae2', 0.7, W, H);
    this.drawWave(this.waves[2], '#c8963e', '#f5d98b', 0.5, W, H);
    this.drawWave(this.waves[3], '#d0dae2', '#a8b4c0', 0.6, W, H);
    this.drawWave(this.waves[4], '#e8b96a', '#c8963e', 0.4, W, H);

    this.t++;
    this.animFrameId = requestAnimationFrame(() => this.animate());
  }

  private drawWave(
    wave: Wave,
    colorStop1: string,
    colorStop2: string,
    alpha: number,
    W: number,
    H: number
  ): void {
    const grad = this.ctx.createLinearGradient(0, 0, W, 0);
    grad.addColorStop(0,   colorStop1);
    grad.addColorStop(0.5, colorStop2);
    grad.addColorStop(1,   colorStop1);

    this.ctx.beginPath();
    this.ctx.strokeStyle = grad;
    this.ctx.globalAlpha = alpha;
    this.ctx.lineWidth = 1.5;

    for (let x = 0; x <= W; x++) {
      const y =
        H / 2 +
        Math.sin(
          (x / W) * Math.PI * 2 * wave.freq +
          this.t * wave.speed * 10 +
          wave.phase
        ) * wave.amp * Math.sin((x / W) * Math.PI);
      x === 0 ? this.ctx.moveTo(x, y) : this.ctx.lineTo(x, y);
    }

    this.ctx.stroke();
    this.ctx.globalAlpha = 1;
  }

  // ── Nav active section on scroll ──
  @HostListener('window:scroll')
  onScroll(): void {
    if (!this.isBrowser) return;
    const sections = document.querySelectorAll<HTMLElement>('section[id]');
    let current = '';
    sections.forEach(s => {
      if (window.scrollY >= s.offsetTop - 200) current = s.id;
    });
    this.activeSectionId = current;
  }
}
