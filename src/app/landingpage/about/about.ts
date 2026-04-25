import { CommonModule } from '@angular/common';
import { Component, Inject, PLATFORM_ID } from '@angular/core';
import { gsap } from 'gsap/gsap-core';
import { isPlatformBrowser } from '@angular/common';

@Component({
  selector: 'app-about',
  imports: [CommonModule],
  templateUrl: './about.html',
  styleUrl: './about.scss',
})
export class About {
  private readonly isBrowser: boolean;

  animString: string = 'back'

  constructor(@Inject(PLATFORM_ID) platformId: object) {
    this.isBrowser = isPlatformBrowser(platformId);
    
  }

  private initScrollAnimations(): void {
    // About Section
    gsap.from('.about-text .section-label', {
      scrollTrigger: {
        trigger: '.about-text',
        start: 'top 80%',
        toggleActions: 'play reverse play reverse',
      },
      opacity: 0,
      x: -40,
      duration: 0.8,
      ease: 'back',
    });
    gsap.from('.about-text .section-title', {
      scrollTrigger: {
        trigger: '.about-text',
        start: 'top 75%',
        toggleActions: 'play reverse play reverse',
      },
      opacity: 0,
      x: -40,
      duration: 1.0,
      ease: this.animString,
      delay: 0.1,
    });
    gsap.from('.about-text .section-body', {
      scrollTrigger: {
        trigger: '.about-text',
        start: 'top 70%',
        toggleActions: 'play reverse play reverse',
      },
      opacity: 0,
      x: -40,
      duration: 1.0,
      ease: this.animString,
      delay: 0.2,
    });
    gsap.from('.about-visual', {
      scrollTrigger: {
        trigger: '.about-visual',
        start: 'top 80%',
        toggleActions: 'play reverse play reverse',
      },
      opacity: 0,
      x: 40,
      duration: 1.0,
      ease: this.animString,
    });
  }



  // moveSet1 = {scrollTrigger: {
  //       trigger: '.about-visual',
  //       start: 'top 80%',
  //       toggleActions: 'play reverse play reverse',
  //     },
  //     opacity: 0,
  //     x: 40,
  //     duration: 1.0,
  //     ease: 'power3.in',} 

  ngOnInit(): void {}

  ngAfterViewInit(): void {
    if (!this.isBrowser) return;
    this.initScrollAnimations();
    //gsap.registerPlugin(ScrollTrigger);
  }
}
