export interface IUsersData {
    id: number;
    username: string;
    email: string;
    password: string;
    role: 'admin' | 'normalUser';  // Especificamos los roles posibles
  }
  