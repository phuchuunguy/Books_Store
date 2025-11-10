import { Injectable } from '@nestjs/common';

@Injectable()
export class AppService {
  getRoot(): any {
    return {
      message: 'Welcome to the Bookstore API! 🚀',
      docs: 'api/docs',
      books: '/books',
      categories: '/categories',
      users: '/users',
      auth: '/auth',
    };
  }
}
