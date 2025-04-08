import Card from "../../src/domain/Card";
import ValidationError from "../../src/domain/errors/ValidationError";
import Member from "../../src/domain/Member";
import Organization from "../../src/domain/Organization";
import User from "../../src/domain/User";

describe('User', () => {
    test('should be able to create a user', () => {
        const user = User.create('example owner', 'owner@example.org', 'securePassword123');
        expect(user).toBeTruthy();
        expect(user.getId()).toBeTruthy();
        expect(user.getName()).toBe('example owner');
        expect(user.getEmail()).toBe('owner@example.org');
        expect(user.getPassword()).toBe('securePassword123');
    });

    test('should be able to set the name', () => {
        const user = User.create('example owner', 'owner@example.org', 'securePassword123');
        user.setName('example owner 2');
        expect(user.getName()).toBe('example owner 2');
    });

    test('should be able to set the password', () => {
        const user = User.create('example owner', 'owner@example.org', 'securePassword123');
        user.setPassword('securePassword1234');
        expect(user.getPassword()).toBe('securePassword1234');
    });

    test('should throw an error if the user is missing required fields', () => {
        expect(() => {
            User.create(
                '',
                'owner@example.org',
                'securePassword123'
            );
        }).toThrow(ValidationError);
    });

    test('should throw an error if set an void name', () => {
        expect(() => {
            const user = User.create('example owner', 'owner@example.org', 'securePassword123');
            user.setName('');
        }).toThrow(ValidationError);
    });

    test('should throw an error if set an void password', () => {
        expect(() => {
            const user = User.create('example owner', 'owner@example.org', 'securePassword123');
            user.setPassword('');
        }).toThrow(ValidationError);
    });
});
