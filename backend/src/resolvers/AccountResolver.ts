import {
  Arg,
  Field,
  Mutation,
  ObjectType,
  Query,
  Resolver,
} from "type-graphql";
import Accounts, { AccountsInstance } from "../entities/Account";

@ObjectType()
class Account {
  @Field()
  email!: string;
}

@Resolver()
export class AccountResolver {
  @Query(() => [Account])
  async accounts(): Promise<Account[]> {
    return await Accounts.findMany();
  }

  @Mutation(() => Boolean)
  async reigsiter(
    @Arg("email") email: string,
    @Arg("password") password: string
  ) {
    try {
      const existingAccount = await Accounts.findOne({ where: { email } });
      if (existingAccount) throw Error("Account already exists");

      await Accounts.createOne({
        email,
        password,
      });
      return true;
    } catch (error) {
      console.log(error);
      throw error;
    }
  }
}
