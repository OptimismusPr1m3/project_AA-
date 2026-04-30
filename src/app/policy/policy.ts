import { ChangeDetectionStrategy, Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { Footer } from '../landingpage/footer/footer';

@Component({
  selector: 'app-policy',
  imports: [RouterLink, Footer],
  templateUrl: './policy.html',
  styleUrl: './policy.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class Policy {}
