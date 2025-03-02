import Card from "../../src/domain/Card";
import ValidationError from "../../src/domain/errors/ValidationError";
import Member from "../../src/domain/Member";
import Organization from "../../src/domain/Organization";
import User from "../../src/domain/User";

describe('Card', () => {
    const organizationOwner = new User(crypto.randomUUID(), 'example owner', 'owner@example.org');
    const organization = new Organization(
        crypto.randomUUID(),
        'example org',
        [new Member(organizationOwner, 'OWNER')]
    );

    test('should be able to create a card with new', () => {
        const cardId = crypto.randomUUID();
        const card = new Card(
            cardId,
            'https://www.example.org/card-test-image',
            'card test',
            organization,
            'private'
        );
        expect(card).toBeTruthy();
        expect(card.getId()).toBe(cardId);
        expect(card.getImage()).toBe('https://www.example.org/card-test-image');
        expect(card.getName()).toBe('card test');
        expect(card.getOwner()).toBe(organization);
        expect(card.getVisibility()).toBe('private');
    });

    test('should be able to create a card with create function', () => {
        const card = Card.create(
            'https://www.example.org/card-test-image',
            'card test',
            organization,
            'private'
        );
        expect(card).toBeTruthy();
        expect(card.getImage()).toBe('https://www.example.org/card-test-image');
        expect(card.getName()).toBe('card test');
        expect(card.getOwner()).toBe(organization);
        expect(card.getVisibility()).toBe('private');
    });

    test('should be able to set the image', () => {
        const card = new Card(
            crypto.randomUUID(),
            'https://www.example.org/card-test-image',
            'card test',
            organization,
            'private'
        );
        card.setImage('https://www.example.org/card-test-image-2');
        expect(card.getImage()).toBe('https://www.example.org/card-test-image-2');
    });

    test('should be able to set the name', () => {
        const card = new Card(
            crypto.randomUUID(),
            'https://www.example.org/card-test-image',
            'card test',
            organization,
            'private'
        );
        card.setName('card test 2');
        expect(card.getName()).toBe('card test 2');
    });

    test('should be able to set the visibility', () => {
        const card = new Card(
            crypto.randomUUID(),
            'https://www.example.org/card-test-image',
            'card test',
            organization,
            'private'
        );
        card.setVisibility('public');
        expect(card.getVisibility()).toBe('public');
    });

    test('should throw an error if the image is missing required fields', () => {
        expect(() => {
            Card.create(
                '',
                'card test',
                organization,
                'public'
            );
        }).toThrow(ValidationError);
    });

    test('should throw an error if the name is missing required fields', () => {
        expect(() => {
            Card.create(
                'https://www.example.org/card-test-image',
                '',
                organization,
                'public'
            );
        }).toThrow(ValidationError);
    });

    test('should throw an error if set an void image', () => {
        expect(() => {
            const card = Card.create(
                '',
                'card test',
                organization,
                'public'
            );
            card.setImage('');
        }).toThrow(ValidationError);
    });

    test('should throw an error if set an void name', () => {
        expect(() => {
            const card = Card.create(
                'https://www.example.org/card-test-image',
                '',
                organization,
                'public'
            );
            card.setName('');
        }).toThrow(ValidationError);
    });
});
