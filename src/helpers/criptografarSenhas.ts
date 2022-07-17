import { compare, hash } from 'bcryptjs';

class CriptografarSenhas {
  static async criptografar(senha: string): Promise<string> {
    const senhaCriptografada = await hash(senha, 8);
    return senhaCriptografada;
  }

  static async comparar(senha: string, hash: string): Promise<boolean> {
    const validado = await compare(senha, hash);
    return validado;
  }
}

export { CriptografarSenhas };
