export default class UserRole {
    public readonly role: string;
    public readonly type: 'project' | 'organization';
    constructor(type: 'project' | 'organization', role: string) {
        this.type = type;
        this.role = role;
    }
}
