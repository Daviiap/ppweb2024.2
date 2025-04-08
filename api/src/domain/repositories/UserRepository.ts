import User from "../User";

export default interface UserRepository {
    save(user: User): Promise<void>;
    exists(email: string): Promise<boolean>;
    findByEmail(email: string): Promise<User>;
}
