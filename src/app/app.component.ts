import { Component , OnInit} from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'SuneelAngular';
  suneel: any;
  sampledata: any;
  ngOnInit() {
    this.suneel = true;
    this.sampledata = true;
  }
}
