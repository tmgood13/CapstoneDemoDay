import { Component, OnInit, Input } from '@angular/core';
import { Menu } from '../menu/menu.class';
import { SystemService } from '../system/system.service';

@Component({
  selector: 'app-menuitem',
  templateUrl: './menuitem.component.html',
  styleUrls: ['./menuitem.component.css']
})
export class MenuitemComponent implements OnInit {
  
  @Input() menu: Menu;
  constructor(
    private systemsvc: SystemService
    ) { }
    
  ngOnInit() {
  }

}