export interface ILogin {
  email: string;
  senha: string;
}

export interface ILoginRetorno {
  codCliente: number;
  token: string;
}
