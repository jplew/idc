import { Component, OnInit, ViewChild, Input } from '@angular/core'
import { UiService } from './services/ui.service';
import { DataService } from './services/data.service'

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  providers: [UiService, DataService]
})
export class AppComponent implements OnInit {

  ngOnInit(): void {
  }

}
