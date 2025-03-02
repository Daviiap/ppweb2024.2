import Card from "../../src/domain/Card";
import ValidationError from "../../src/domain/errors/ValidationError";
import Member from "../../src/domain/Member";
import Organization, { OrganizationRoles } from "../../src/domain/Organization";
import Project, { ProjectRoles } from "../../src/domain/Project";
import User from "../../src/domain/User";

describe('Organization', () => {
    const organizationOwnerUser = new User(crypto.randomUUID(), 'example owner', 'owner@example.org');
    const organizationProject = Project.create('example project', 'exapmle project description', [new Member(organizationOwnerUser, ProjectRoles.MANAGER)]);
    test('should be able to create the organization', () => {
        const organization = Organization.create(
            'example org',
            [new Member(organizationOwnerUser, OrganizationRoles.OWNER)],
            'exapmle organization description',
            [organizationProject],
            []
        );

        expect(organization).toBeTruthy();
        expect(organization.getId()).toBeTruthy();
        expect(organization.getName()).toBe('example org');
        expect(organization.getDescription()).toBe('exapmle organization description');
        expect(organization.getOwner()).toBe(organizationOwnerUser);
        expect(organization.getMembers()).toStrictEqual([new Member(organizationOwnerUser, 'OWNER')]);
        expect(organization.getProjects()).toStrictEqual([organizationProject]);
        expect(organization.getCards()).toStrictEqual([]);
    });

    test('should be able to add a member', () => {
        const organization = new Organization(
            crypto.randomUUID(),
            'example org',
            [new Member(organizationOwnerUser, 'OWNER')]
        );
        organization.addMember(new User(crypto.randomUUID(), 'example member', 'member@example.org'), OrganizationRoles.MEMBER);
        expect(organization.getMembers().length).toBe(2);
    });

    test('should be able to add a project', () => {
        const organization = new Organization(
            crypto.randomUUID(),
            'example org',
            [new Member(organizationOwnerUser, 'OWNER')]
        );
        organization.addProject(organizationProject);
        expect(organization.getProjects().length).toBe(1);
    });

    test('should be able to add a card', () => {
        const organization = new Organization(
            crypto.randomUUID(),
            'example org',
            [new Member(organizationOwnerUser, 'OWNER')]
        );
        const card = Card.create(
            'https://www.example.org/card-test-image',
            'card test',
            organization,
            'private'
        );
        organization.addCard(card);
        expect(organization.getCards().length).toBe(1);
        expect(organization.getCards()[0].getId()).toBe(card.getId());
    });

    test('should be able to change the organization name', () => {
        const organization = new Organization(
            crypto.randomUUID(),
            'example org',
            [new Member(organizationOwnerUser, 'OWNER')]
        );
        organization.setName('example org 2');
        expect(organization.getName()).toBe('example org 2');
    });

    test('should be able to change the organization description', () => {
        const organization = new Organization(
            crypto.randomUUID(),
            'example org',
            [new Member(organizationOwnerUser, 'OWNER')]
        );
        organization.setDescription('example org description 2');
        expect(organization.getDescription()).toBe('example org description 2');
    });

    test('should throw an error if set an void name', () => {
        expect(() => {
            const organization = new Organization(
                crypto.randomUUID(),
                'example org',
                [new Member(organizationOwnerUser, 'OWNER')]
            );
            organization.setName('');
        }).toThrow(ValidationError);
    });

    test('should throw an error if the organization name is missing required fields', () => {
        expect(() => {
            new Organization(
                '',
                'example org',
                [new Member(organizationOwnerUser, 'OWNER')]
            );
        }).toThrow(ValidationError);
    });

    test('should throw an error if the organization description is missing required fields', () => {
        expect(() => {
            new Organization(
                crypto.randomUUID(),
                '',
                [new Member(organizationOwnerUser, 'OWNER')]
            );
        }).toThrow(ValidationError);
    });

    test('should throw an error if the organization members is missing required fields', () => {
        expect(() => {
            new Organization(
                crypto.randomUUID(),
                'example org',
                []
            );
        }).toThrow(ValidationError);
    });

    test('should throw an error if the organization has no owner', () => {
        expect(() => {
            Organization.create(
                'example org',
                [new Member(organizationOwnerUser, 'MANAGER')]
            );
        }).toThrow(ValidationError);
    });

    test('should throw an error if the organization has an invalid role', () => {
        expect(() => {
            Organization.create(
                'example org',
                [new Member(organizationOwnerUser, 'INVALID')]
            );
        }).toThrow(ValidationError);
    });
});
