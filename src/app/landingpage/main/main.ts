import { Component } from '@angular/core';
import { About } from "../about/about";
import { Divider } from '../divider/divider';
import { Repertoire } from "../repertoire/repertoire";

@Component({
  selector: 'app-main',
  imports: [About, Divider, Repertoire],
  templateUrl: './main.html',
  styleUrl: './main.scss',
})
export class Main {}
