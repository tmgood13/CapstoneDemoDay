import { Pipe, PipeTransform } from '@angular/core';
import { User } from '../../prs/user/user.class';

@Pipe({
  name: 'searchUsers'
})
export class SearchUserPipe implements PipeTransform {

  transform(users: User[], searchCriteria: string = ''): User[] {
    if(searchCriteria == '') { return users; }
    let substr = searchCriteria.toLowerCase();
    let selectedUsers: User[] = [];
    for(let user of users) {
      if(user.id.toString().includes(substr)
        || user.username.toLowerCase().includes(substr)
        || user.firstname.toLowerCase().includes(substr)
        || user.lastname.toLowerCase().includes(substr)
        || (user.phone != null && user.phone.includes(substr))
        || (user.email != null && user.email.toLowerCase().includes(substr))
        ) {
        selectedUsers.push(user);
        continue;
      }
    }
    return selectedUsers;
  }

}
