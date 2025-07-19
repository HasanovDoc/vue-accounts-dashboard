export interface AccountLabel {
  text: string;
}

export interface Account {
  id: string;
  label?: AccountLabel[];
  type: 'LDAP' | 'Локальная';
  login: string;
  password?: string;
}