
interface TechObject {
  title: string;
  experience: number;
}

interface CreateUserData {
  name?: string; //No typescript ?: indica que o termo é opcional!
  email: string;
  password: string;

  //Aplicando informação mista: 
  techs: Array<string | TechObject>;
}


export default function createUser({ name, email, password }: CreateUserData) {
  const user = {
    name, 
    email, 
    password
  }

  return user;
}