import {
  Arg,
  Authorized,
  Field,
  Mutation,
  ObjectType,
  Query,
  Resolver,
} from "type-graphql";
import Accounts from "../entities/Account";
import { hash, compare } from "bcryptjs";
import { getSessionToken } from "../authentication/authTokens";

@ObjectType()
class Account {
  @Field()
  email!: string;
}

@Resolver()
export class AccountResolver {
  @Query(() => [Account])
  @Authorized()
  async accounts(): Promise<Account[]> {
    return await Accounts.findMany();
  }

  @Mutation(() => String)
  async login(@Arg("email") email: string, @Arg("password") password: string) {
    const account = await Accounts.findOne({ where: { email } });
    if (!account) throw new Error("Account not found");

    const valid = await compare(password, account.password);
    if (!valid) throw new Error("Invalid password");

    return getSessionToken(account.email);
  }

  @Mutation(() => String)
  async register(
    @Arg("email") email: string,
    @Arg("password") password: string
  ) {
    const existingAccount = await Accounts.findOne({ where: { email } });
    if (existingAccount) throw Error("Account already exists");

    const hashedPassword = await hash(password, 12);
    const createdAccount = await Accounts.createOne({
      email,
      password: hashedPassword,
    });

    return "Account created";
  }
}
