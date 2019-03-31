import { Component, OnInit, OnDestroy } from '@angular/core';
import { Observable, Subscription, Observer, interval } from 'rxjs';
import { map } from 'rxjs/operators';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit, OnDestroy {
  numberObsSubscription: Subscription
  customObsSubscription: Subscription
  
  constructor() { }

  ngOnInit() {
    const myNumbers = interval(1000).pipe(
      map(
        (data) => {
          return data * 2;
        }
      )
    );
    this.numberObsSubscription = myNumbers.subscribe(
      (number: Number) => {
        console.log(number);
      }
    );

    const myObserver = Observable.create((observer: Observer<String>) => {
      setTimeout(() => {
        observer.next('First Data');
      }, 2000);
      setTimeout(() => {
        observer.next('First Data');
      }, 4000);
      // setTimeout(() => {
      //   observer.error('Error');
      // }, 5000);
      setTimeout(() => {
        observer.complete();
      }, 5000);
    });
    this.customObsSubscription = myObserver.subscribe(
      (data: String) => { console.log(data); },
      (error: String) => { console.log(error); },
      () => { console.log('Completed'); }
    );
  }

  ngOnDestroy() {
    this.customObsSubscription.unsubscribe();
    this.numberObsSubscription.unsubscribe();
  }
}
