import {
  Arg,
  Authorized,
  Ctx,
  Field,
  Mutation,
  ObjectType,
  Query,
  Resolver,
} from "type-graphql";
import Accounts from "../entities/Account";
import { hash, compare } from "bcryptjs";
import {
  createSessionToken,
  fetchSessionToken,
  validateSessionToken,
} from "../authentication/authTokens";
import { Request } from "express";
import { ContextType } from "../routes/graphql";

@ObjectType()
class Account {
  @Field()
  email!: string;

  @Field({ nullable: true })
  name?: string;
}

@ObjectType()
class LoginResponse {
  @Field(() => Account)
  account!: Account;

  @Field()
  sessionToken!: string;
}

@ObjectType()
class RegisterResponse {
  @Field(() => Account)
  account!: Account;

  @Field()
  sessionToken!: string;
}

@Resolver()
export class AccountResolver {
  @Query(() => [Account])
  // @Authorized()
  async accounts(): Promise<Account[]> {
    return await Accounts.findMany();
  }

  @Query(() => Account)
  @Authorized()
  async me(@Ctx() { req }: ContextType): Promise<Account> {
    const token = await fetchSessionToken(req);
    const tokenPayload = await validateSessionToken(token);

    const account = await Accounts.findOne({
      where: { email: tokenPayload.email },
    });
    if (!account) throw new Error("Account not found");

    return account;
  }

  @Mutation(() => LoginResponse)
  async login(
    @Arg("email") email: string,
    @Arg("password") password: string
  ): Promise<LoginResponse> {
    const account = await Accounts.findOne({ where: { email } });
    if (!account) throw new Error("Account not found");

    const valid = await compare(password, account.password);
    if (!valid) throw new Error("Invalid password");

    return {
      account,
      sessionToken: createSessionToken(account.email),
    };
  }

  @Mutation(() => RegisterResponse)
  async register(
    @Arg("email") email: string,
    @Arg("password") password: string,
    @Arg("name") name: string
  ): Promise<RegisterResponse> {
    const existingAccount = await Accounts.findOne({ where: { email } });
    if (existingAccount) throw Error("Account already exists");

    const hashedPassword = await hash(password, 12);
    const account = await Accounts.createOne({
      email,
      password: hashedPassword,
      name,
    });

    return {
      account,
      sessionToken: createSessionToken(account.email),
    };
  }
}
