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
    const accounts = await Accounts.findMany();
    return accounts.map((account: AccountsInstance) => ({
      email: account.email,
    }));
  }

  @Mutation(() => Boolean)
  async reigsiter(
    @Arg("email") email: string,
    @Arg("password") password: string
  ) {
    try {
      await Accounts.createOne({
        email,
        password,
      });
      return true;
    } catch (error) {
      console.log(error);
      return false;
    }
  }
}
