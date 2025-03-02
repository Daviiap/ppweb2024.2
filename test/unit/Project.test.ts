import ValidationError from "../../src/domain/errors/ValidationError";
import Member from "../../src/domain/Member";
import Project from "../../src/domain/Project";
import User from "../../src/domain/User";

describe('Project', () => {
    const userMember = new User(crypto.randomUUID(), 'example owner', 'owner@example.org');

    test('should be able to create a project', () => {
        const project = Project.create(
            'example project',
            'exapmle project description',
            [new Member(userMember, 'MANAGER')]
        );
        expect(project).toBeTruthy();
        expect(project.getId()).toBeTruthy();
        expect(project.getName()).toBe('example project');
        expect(project.getDescription()).toBe('exapmle project description');
        expect(project.getMembers().length).toBe(1);
    });

        test('should be able to create a project with new', () => {
        const project = new Project(
            crypto.randomUUID(),
            'example project',
            'exapmle project description',
            [new Member(userMember, 'MANAGER')]
        );
        expect(project).toBeTruthy();
        expect(project.getId()).toBeTruthy();
        expect(project.getName()).toBe('example project');
        expect(project.getDescription()).toBe('exapmle project description');
        expect(project.getMembers().length).toBe(1);
    });

    test('should be able to create a project without a description using create', () => {
        const project = Project.create(
            'example project',
        );
        expect(project).toBeTruthy();
        expect(project.getId()).toBeTruthy();
        expect(project.getName()).toBe('example project');
        expect(project.getDescription()).toBe('');
        expect(project.getMembers().length).toBe(0);
    });

    test('should be able to create a project without a description', () => {
        const project = new Project(
            crypto.randomUUID(),
            'example project',
        );
        expect(project).toBeTruthy();
        expect(project.getId()).toBeTruthy();
        expect(project.getName()).toBe('example project');
        expect(project.getDescription()).toBe('');
        expect(project.getMembers().length).toBe(0);
    });

    test('should be able to create a project without a description', () => {
        const project = new Project(
            crypto.randomUUID(),
            'example project',
        );
        expect(project).toBeTruthy();
        expect(project.getId()).toBeTruthy();
        expect(project.getName()).toBe('example project');
        expect(project.getDescription()).toBe('');
        expect(project.getMembers().length).toBe(0);
    });

    test('should be able to set the name', () => {
        const member = new Member(userMember, 'MANAGER');
        const project = Project.create(
            'example project',
            'exapmle project description',
            [member]
        );
        project.setName('example project 2');
        expect(project.getName()).toBe('example project 2');
    });

    test('should be able to set the description', () => {
        const member = new Member(userMember, 'MANAGER');
        const project = Project.create(
            'example project',
            'exapmle project description',
            [member]
        );
        project.setDescription('exapmle project description 2');
        expect(project.getDescription()).toBe('exapmle project description 2');
    });
    
    test('should add a member to the project', () => {
        const member = new Member(userMember, 'MANAGER');
        const project = Project.create(
            'example project',
            'exapmle project description',
            [member]
        );
        project.addMember(userMember, 'MANAGER');
        expect(project.getMembers().length).toBe(2);
    });

    test('should throw an error if the project member has an invalid role', () => {
        expect(() => {
            const member = new Member(userMember, 'INVALID');
            Project.create(
                'example project',
                'exapmle project description',
                [member]
            );
        }).toThrow(ValidationError);
    });

    test('should throw an error if the project is missing required fields', () => {
        expect(() => {
            new Project( 
                '',
                'example project',
                'exapmle project description',
                []
            );
        }).toThrow(ValidationError);
    });

    test('should throw an error if set an void name', () => {
        expect(() => {
            const member = new Member(userMember, 'MANAGER');
            const project = Project.create(
                'example project',
                'exapmle project description',
                [member]
            );
            project.setName('');
        }).toThrow(ValidationError);
    });
});
