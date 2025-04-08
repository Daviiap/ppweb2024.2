import e from "cors";
import Member from "../../src/domain/Member";
import User from "../../src/domain/User";
import ValidationError from "../../src/domain/errors/ValidationError";

describe('Member', () => {
    const user = new User(crypto.randomUUID(), 'Jonh Doe', 'jonhdoe@example.org'); 
    test('should be able to create a member', () => {
        const member = new Member(user, 'OWNER');
        expect(member).toBeTruthy();
        expect(member.getUser()).toBe(user);
        expect(member.getRole()).toBe('OWNER');
    });

    test('should be able to set the role', () => {
        const member = new Member(user, 'OWNER');
        member.setRole('manager');
        expect(member.getRole()).toBe('manager');
    });

    test('should throw an error if the role is missing required fields', () => {
        expect(() => {
            new Member(user, '');
        }).toThrow(ValidationError);
    });
});
