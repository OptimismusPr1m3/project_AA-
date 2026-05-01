import { Component, ChangeDetectionStrategy } from '@angular/core';
import { gsap } from 'gsap/gsap-core';
import { isPlatformBrowser } from '@angular/common';
import { Inject, PLATFORM_ID } from '@angular/core';
interface Appointment {
  day: string;
  month: string;
  year: string;
  datetime: string;
  title: string;
  location: string;
  type: 'Konzert' | 'Gottesdienst' | 'Sonstiges';
}

@Component({
  selector: 'app-appointments',
  templateUrl: './appointments.html',
  styleUrl: './appointments.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class Appointments {
  private readonly isBrowser: boolean;
  readonly appointments: Appointment[] = [
    // {
    //   day: '10',
    //   month: 'Mai',
    //   year: '2026',
    //   datetime: '2026-05-10',
    //   title: 'Frühlingskonzert',
    //   location: 'Stadthalle Musterstadt',
    //   type: 'Konzert',
    // },
    // {
    //   day: '07',
    //   month: 'Jun',
    //   year: '2026',
    //   datetime: '2026-06-07',
    //   title: 'Gottesdienst zu Pfingsten',
    //   location: 'St. Maria Kirche, Musterstadt',
    //   type: 'Gottesdienst',
    // },
    // {
    //   day: '19',
    //   month: 'Jul',
    //   year: '2026',
    //   datetime: '2026-07-19',
    //   title: 'Sommerfest der Gemeinde',
    //   location: 'Gemeindepark Musterstadt',
    //   type: 'Konzert',
    // },
    // {
    //   day: '14',
    //   month: 'Sep',
    //   year: '2026',
    //   datetime: '2026-09-14',
    //   title: 'Herbstkonzert',
    //   location: 'Kulturzentrum Mitte',
    //   type: 'Konzert',
    // },
  ];

  constructor(@Inject(PLATFORM_ID) platformId: object) {
    this.isBrowser = isPlatformBrowser(platformId);
  }

  ngAfterViewInit(): void {
    if (!this.isBrowser) return;
    if (this.appointments.length > 0) {
      this.initScrollAnimations();
    }
    
  }

  // ── Scroll Animationen für Sections ──
  private initScrollAnimations(): void {
    gsap.from('.appointments-header', {
      scrollTrigger: {
        trigger: '.appointments-inner',
        start: 'top 80%',
        toggleActions: 'play reverse play reverse',
      },
      opacity: 0,
      y: 30,
      duration: 0.8,
      ease: 'power3.out',
    });

    gsap.from('.apt-card', {
      scrollTrigger: {
        trigger: '.appointments-list',
        start: 'top 80%',
        toggleActions: 'play reverse play reverse',
      },
      opacity: 0,
      y: 40,
      duration: 0.7,
      ease: 'power3.out',
      stagger: 0.12,
    });
  }

}
