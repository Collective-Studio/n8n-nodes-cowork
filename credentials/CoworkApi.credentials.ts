import type {
	IAuthenticateGeneric,
	Icon,
	ICredentialTestRequest,
	ICredentialType,
	INodeProperties,
} from 'n8n-workflow';

export class CoworkApi implements ICredentialType {
	name = 'coworkApi';

	displayName = 'Cowork API';

	icon: Icon = { light: 'file:../icons/cowork.svg', dark: 'file:../icons/cowork.svg' };

	documentationUrl = 'https://github.com/Collective-Studio/n8n-nodes-cowork#credentials';

	properties: INodeProperties[] = [
		{
			displayName: 'Base URL',
			name: 'baseUrl',
			type: 'string',
			default: 'https://co-workspace.collect.vn',
			required: true,
			description: 'Address of your Cowork (CSMS) workspace, without a trailing slash',
		},
		{
			displayName: 'API Token',
			name: 'apiToken',
			type: 'string',
			typeOptions: { password: true },
			default: '',
			required: true,
			description:
				'Personal MCP token (starts with csms_mcp_). Create one in Cowork → Settings → Security → MCP Tokens. Every call runs with your own permissions.',
		},
	];

	authenticate: IAuthenticateGeneric = {
		type: 'generic',
		properties: {
			headers: {
				Authorization: '=Bearer {{$credentials.apiToken}}',
			},
		},
	};

	test: ICredentialTestRequest = {
		request: {
			baseURL: '={{$credentials.baseUrl.replace(/\\/+$/, "")}}',
			url: '/api/mcp/health',
			method: 'GET',
		},
	};
}
