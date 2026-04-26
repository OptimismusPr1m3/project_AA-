import { gsap } from 'gsap/gsap-core';
import { Component, Inject, PLATFORM_ID } from '@angular/core';
import { CommonModule, isPlatformBrowser } from '@angular/common';
@Component({
  selector: 'app-musicians',
  imports: [CommonModule],
  templateUrl: './musicians.html',
  styleUrl: './musicians.scss',
})
export class Musicians {
  private readonly isBrowser: boolean;

  constructor(@Inject(PLATFORM_ID) platformId: object) {
    this.isBrowser = isPlatformBrowser(platformId);
  }

  private initScrollanimations(): void {
    gsap.fromTo(
      '.musicians-inner .section-label',
      { opacity: 0, x: -40 },
      {
        scrollTrigger: {
          trigger: '.musicians-inner .section-label',
          start: 'top 80%',
          toggleActions: 'play reverse play reverse',
        },
        opacity: 1,
        x: 0,
        duration: 1.4,
        ease: 'back',
      },
    );

    gsap.fromTo(
      '.musicians-inner .section-title',
      { opacity: 0, x: -40 },
      {
        scrollTrigger: {
          trigger: '.musicians-inner .section-label',
          start: 'top 75%',
          toggleActions: 'play reverse play reverse',
        },
        opacity: 1,
        x: 0,
        duration: 0.8,
        ease: 'back',
      },
    );

    gsap.fromTo(
      '.musicians-grid .musician-card:nth-child(-n+5)',
      { opacity: 0, x: +60 },
      {
        scrollTrigger: {
          trigger: '.musicians-grid .musician-card:nth-child(1)',
          start: 'top 80%',
          toggleActions: 'play reverse play reverse',
        },
        opacity: 1,
        x: 0,
        duration: 0.6,
        stagger: 0.4,
      },
    );

    // gsap.fromTo(
    //   '.rep-grid .rep-item:nth-child(-n+3)',
    //   { opacity: 0, x: -60 },
    //   {
    //     scrollTrigger: {
    //       trigger: '.rep-grid .rep-item:nth-child(1)',
    //       start: 'top 80%',
    //       toggleActions: 'play reverse play reverse',
    //     },
    //     opacity: 1,
    //     y: 0,
    //     duration: 0.6,
    //     stagger: 0.4,
    //   },
    // );
  }

  ngAfterViewInit(): void {
    if (!this.isBrowser) return;
    setTimeout(() => {
      console.log('rep-items found:', document.querySelectorAll('.rep-grid .rep-item').length);
      this.initScrollanimations();
    }, 200);
  }
}
