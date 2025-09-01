
type User = {
    id: string;
    email: string;
    passwordHash: string | null;
}

type Session = {
    userId: string;
    token: string;
    expiresAt: Date;
}


export interface ShinkiAdapter {
    // User
    createUser(input: {email: string, passwordHash: string | null}): Promise<{id: string, email: string}>;
    getUserByEmail(email: string): Promise<User | null>;

    //Session
    createSession(input: Session): Promise<void>;
    getSessionByToken(token: string): Promise<Session | null>;
    deleteSession(token: string): Promise<void>;
}

export interface OAuthProfile {
    id: string;
    email: string;
    name?: string;
    avatarUrl?: string;
}

export interface OAuthProvider {
    id: string;
    name: string;
    getAuthorizationUrl(state: string, redirectUrl: string): string;
    exchangeCode(code: string, redirectUrl: string): Promise<{access_token: string, scope?: string}>;
    getProfile(accessToken: string): Promise<OAuthProfile>;
}

// Secure typed Shinki config (OWASP Cookie Guidance)
export interface ShinkiConfig {
    jwtSecret: string;
    cookieName: string;
    cookieSecure: boolean;
    cookieSameSite: 'lax' | 'strict' | 'none';
    bcryptSaltRounds: number;
}

export function loadConfig(env: NodeJS.ProcessEnv = process.env): ShinkiConfig {
    const isProduction = env.NODE_ENV === 'production';

    const jwtSecret = env.JWT_SECRET || (isProduction ? '' : "dev-secret-key");

    if (isProduction && !jwtSecret) {
        throw new Error("JWT_SECRET must be set in production");
    }

    const cookieSecure = isProduction ? true : false;
    const cookieName = env.COOKIE_NAME || 'shinki.sid';
    const cookieSameSite: 'lax' | 'strict' | 'none' = (env.COOKIE_SAME_SITE as any) || 'lax';
    const bcryptSaltRounds = env.BCRYPT_SALT_ROUNDS ? parseInt(env.BCRYPT_SALT_ROUNDS, 10) : 12;

    return {
        jwtSecret,
        cookieName,
        cookieSecure,
        cookieSameSite,
        bcryptSaltRounds,
    }
}