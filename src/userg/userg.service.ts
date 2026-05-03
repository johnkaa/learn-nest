import { Injectable } from '@nestjs/common';

@Injectable()
export class UsergService {
  private users = [
    { id: 1, username: 'Vlad', email: 'vlad@example.com' },
    { id: 2, username: 'John', email: 'john@example.com' },
    { id: 3, username: 'Bob', email: 'bob@example.com' },
  ];

  findAll() {
    return this.users;
  }
}
