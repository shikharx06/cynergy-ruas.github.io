import { Component, OnInit, AfterViewInit, ViewChild, Inject } from '@angular/core';
import { DOCUMENT } from '@angular/common';

// import Quotes Service
import { QuotesService } from '../../services/quotes.service';

// Quote Model
import { Quote } from '../../models/quote';
import { Router } from '@angular/router';
import { EventsService } from 'src/app/services/events.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit, AfterViewInit {

  @ViewChild('videoPlayer') videoplayer: any;

  // Quote
  quote: Quote = new Quote();

  // Upcoming Event and the PastEvents [2]
  upcomingEvent: any;
  pastEvents: any[] = [];

  constructor(
    @Inject(DOCUMENT) private document: any,
    private quotesService: QuotesService,
    private router: Router,
    private eventsService: EventsService
    ) { }

  ngOnInit() {
    // Get a Random Quote from the Database
    this.quotesService.getRandomQuote()
      .then(data => {
        this.quote = new Quote(data.text, data.author);
      });

    this.getUpcomingEvent();
    this.getPastTwoEvents();
  }

  ngAfterViewInit(): void {
    // this.videoplayer.load();

    // this.videoplayer.nativeElement.pause();

    // setTimeout(() => {
    //   this.videoplayer.nativeElement.play();
    // }, 2000);
  }

  register() {
    // this.router.navigate(['/join314159265']);
    // this.document.location.href = 'https://goo.gl/forms/sKRxoNUuK5TLDS163';
  }

  getUpcomingEvent(): void {
    this.eventsService.getNextUpcomingEvent()
      .then(data => {
        this.upcomingEvent = data;
      });
  }

  getPastTwoEvents(): void {
    this.eventsService.getPastTwoEvents()
      .then(data => {
        this.pastEvents.push(data[0]);
        this.pastEvents.push(data[1]);
      });
  }

}
