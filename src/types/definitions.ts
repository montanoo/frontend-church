export type SessionPayload = {
    userId: string;
    username: string;
    role?: ['admin', 'normalUser'];
};