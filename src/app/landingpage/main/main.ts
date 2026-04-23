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
interface Wave {
  freq: number;
  amp: number;
  speed: number;
  phase: number;
}
@Component({
  selector: 'app-main',
  imports: [About, Divider, Repertoire, Musicians],
  templateUrl: './main.html',
  styleUrl: './main.scss',
})
export class Main implements OnInit, AfterViewInit, OnDestroy {
  // ── Wave Canvas ──
  @ViewChild('waveCanvas') waveCanvasRef!: ElementRef<HTMLCanvasElement>;
  private ctx!: CanvasRenderingContext2D;
  private animFrameId!: number;
  private t = 0;
  private observer!: IntersectionObserver;
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

  // ── Nav highlight ──
  ngOnInit(): void {
    if (this.isBrowser) {
      this.initScrollObserver();
    }
  }

  ngAfterViewInit(): void {
    if (this.isBrowser) {
      this.initCanvas();
      this.animate();
    }
  }

  ngOnDestroy(): void {
    if (this.isBrowser) {
      cancelAnimationFrame(this.animFrameId);
      this.observer?.disconnect();
    }
  }

  // ── Canvas Setup ──
  private initCanvas(): void {
    const canvas = this.waveCanvasRef.nativeElement;
    this.ctx = canvas.getContext('2d')!;
    this.resizeCanvas();
  }

  private resizeCanvas(): void {
    const canvas = this.waveCanvasRef.nativeElement;
    canvas.width = canvas.offsetWidth;
    canvas.height = canvas.offsetHeight;
  }

  @HostListener('window:resize')
  onResize(): void {
    this.resizeCanvas();
  }

  // ── Wave Animation ──
  private animate(): void {
    const canvas = this.waveCanvasRef.nativeElement;
    const ctx = this.ctx;
    const W = canvas.width;
    const H = canvas.height;

    ctx.clearRect(0, 0, W, H);

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
    H: number,
  ): void {
    const ctx = this.ctx;
    const grad = ctx.createLinearGradient(0, 0, W, 0);
    grad.addColorStop(0, colorStop1);
    grad.addColorStop(0.5, colorStop2);
    grad.addColorStop(1, colorStop1);

    ctx.beginPath();
    ctx.strokeStyle = grad;
    ctx.globalAlpha = alpha;
    ctx.lineWidth = 2.5;

    for (let x = 0; x <= W; x++) {
      const y =
        H / 2 +
        Math.sin((x / W) * Math.PI * 2 * wave.freq + this.t * wave.speed * 10 + wave.phase) *
          wave.amp *
          Math.sin((x / W) * Math.PI); // edge envelope
      x === 0 ? ctx.moveTo(x, y) : ctx.lineTo(x, y);
    }

    ctx.stroke();
    ctx.globalAlpha = 1;
  }

  // ── Scroll Fade IntersectionObserver ──
  private initScrollObserver(): void {
    this.observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('visible');
          } else {
            entry.target.classList.remove('visible');
          }
        });
      },
      { threshold: 0.15, rootMargin: '0px 0px -60px 0px' },
    );

    // Observer wird nach dem View-Init angehängt – siehe ngAfterViewInit
    setTimeout(() => {
      document.querySelectorAll('.fade-in').forEach((el) => {
        this.observer.observe(el);
      });
    }, 0);
  }

  // ── Nav active section on scroll ──
  @HostListener('window:scroll')
  onScroll(): void {
    const sections = document.querySelectorAll<HTMLElement>('section[id]');
    let current = '';
    sections.forEach((s) => {
      if (window.scrollY >= s.offsetTop - 200) {
        current = s.id;
      }
    });
    this.activeSectionId = current;
  }
}
