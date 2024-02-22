import { Component, HostListener, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { ActivatedRoute, NavigationEnd, Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
  title = 'Coupon Panel Web';
  showLoader = false;
  isDesktopScreen: boolean = true;
  constructor(private router: Router,
    private activatedRoute: ActivatedRoute, private titleService: Title) {}

  ngOnInit(): void {
    // window.innerWidth <= 1024 ? this.isDesktopScreen = false : this.isDesktopScreen = true;
    this.router.events.subscribe((event) => {
      if (event instanceof NavigationEnd) {
        this.setDynamicTitle();
      }
    })
  }
   /**
   * Method that sets dynamic title based on current route
   */
   setDynamicTitle() {
    const ar: ActivatedRoute = this.getChild(this.activatedRoute);

    // adding service from queryParams for routes of forms[i.e for 2 routes namely 'create-vendor' and 'view-vendor']
    const title = ar.snapshot.queryParams.service ? `[${ar.snapshot.queryParams.service}] ${ar.snapshot.data.title}` : ar.snapshot.data.title;
    this.titleService.setTitle(title);
  }

  /**
   * Method that returns last child of active route
   * @param activatedRoute 
   * @returns 
   */
  getChild(activatedRoute: ActivatedRoute) {
    if (activatedRoute.firstChild) return this.getChild(activatedRoute.firstChild);

    return activatedRoute;
  }

  // @HostListener('window:resize', ['$event'])
  // onResize(event) {
  //   window.innerWidth <= 1024 ? this.isDesktopScreen = false : this.isDesktopScreen = true;
  // }
}
