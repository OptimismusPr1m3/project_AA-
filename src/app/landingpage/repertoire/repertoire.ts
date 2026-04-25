import { gsap } from 'gsap/gsap-core';
import { Component, Inject, PLATFORM_ID } from '@angular/core';
import { CommonModule, isPlatformBrowser } from '@angular/common';

@Component({
  selector: 'app-repertoire',
  imports: [CommonModule],
  templateUrl: './repertoire.html',
  styleUrl: './repertoire.scss',
})
export class Repertoire {
  private readonly isBrowser: boolean;

  constructor(@Inject(PLATFORM_ID) platformId: object) {
    this.isBrowser = isPlatformBrowser(platformId);
  }

  titlesMoves: string = 'back'
  genreCards: string = 'circ.in'

  private initScrollanimations(): void {
    gsap.from('.repertoire-inner .section-label', {
      scrollTrigger: {
        trigger: '.repertoire-inner .section-label',
        start: 'top 80%',
        toggleActions: 'play reverse play reverse',
      },
      opacity: 0,
      x: -40,
      duration: 1.4,
      ease: this.titlesMoves,
    });
    gsap.from('.repertoire-inner .section-title', {
      scrollTrigger: {
        trigger: '.repertoire-inner .section-label',
        start: 'top 75%',
        toggleActions: 'play reverse play reverse',
      },
      opacity: 0,
      x: -40, 
      duration: 0.8,
      ease: this.titlesMoves,
    });

    gsap.from('.rep-item .rep-num', {
      scrollTrigger: {
        trigger: '.repertoire-inner .section-label',
        start: 'top 70%',
        toggleActions: 'play reverse play reverse',
      },
      opacity: 1.5,
      x: -40, 
      duration: 0.8,
      ease: this.genreCards ,
    });

  }

  ngAfterViewInit(): void {
    if (!this.isBrowser) return;
    this.initScrollanimations();
  }
}
