import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Request } from '../../prs/request/request.class';
import { RequestLine } from '../../prs/requestlines/requestline.class';
import { RequestLineService } from '../../prs/requestlines/requestline.service';
import { RequestService } from '../../prs/request/request.service';
import { UserService } from '../../prs/user/user.service';
import { SystemService } from '../system/system.service';

@Injectable({
  providedIn: 'root'
})
export class TabletestService {


  constructor(
  ) { }
}
