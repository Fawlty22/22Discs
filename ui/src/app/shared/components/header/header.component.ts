import { Component, Input } from '@angular/core';
import { MaterialModule } from '../../modules/material.module';
import { RouterModule } from '@angular/router';
import { DiscService } from '../../services/disc.service';

@Component({
  selector: 'app-header',
  imports: [MaterialModule, RouterModule],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss',
})
export class HeaderComponent {
  constructor(private discService: DiscService) {}

  @Input() title: string = '';
  logout() {
    this.discService.collection$.set([]);
    // this.authService.logout();
  }
}
