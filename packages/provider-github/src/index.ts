import type {OAuthProvider, OAuthProfile} from '@shinki/core';

type GitHubOptions = Readonly<{
    clientId: string;
    clientSecret: string;
}>

export function github(opts: GitHubOptions): OAuthProvider {
     const authorizeUrl = 'https://github.com/login/oauth/authorize';

     return {
        id: 'github',
        name: 'GitHub',
        getAuthorizationUrl(state: string, redirectUrl: string) {
            const url = new URLSearchParams({
                client_id: opts.clientId,
                redirect_uri: redirectUrl,
                scope: 'read:user user:email',
                state
            });

            return `${authorizeUrl}?${url.toString()}`;
        },

        async exchangeCode(code: string, redirectUrl: string) {
            return {access_token: '', scope: undefined};
        },

        async getProfile(accessToken: string): Promise<OAuthProfile> {
             return { id: '', email: '' };
        }
     }
}