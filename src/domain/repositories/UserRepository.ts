import User from "../User";

export default interface UserRepository {
    createUser(user: User): Promise<User>;
    exists(email: string): Promise<boolean>;
}
