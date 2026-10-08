import type { INodeProperties } from 'n8n-workflow';

const showOnlyForProjects = { resource: ['project'] };
const showOnlyForGetMany = { resource: ['project'], operation: ['getAll'] };

export const projectDescription: INodeProperties[] = [
	{
		displayName: 'Operation',
		name: 'operation',
		type: 'options',
		noDataExpression: true,
		displayOptions: { show: showOnlyForProjects },
		options: [
			{
				name: 'Get Many',
				value: 'getAll',
				action: 'Get many projects',
				description: 'List projects you can read, newest first, filtered by status (Active by default)',
				routing: {
					request: {
						method: 'POST',
						url: '/api/mcp/query',
						body: { queryName: 'project_list' },
					},
					operations: {
						pagination: {
							type: 'generic',
							properties: {
								continue: '={{ $response.body.data.hasMore === true }}',
								request: {
									body: {
										queryName: 'project_list',
										params: {
											statuses: '={{ $parameter.statuses }}',
											onlyMine: '={{ $parameter.onlyMine }}',
											companyId: '={{ $parameter.companyId || undefined }}',
											limit: 100,
											cursor: '={{ $response.body.data.nextCursor }}',
										},
									},
								},
							},
						},
					},
					output: {
						postReceive: [{ type: 'rootProperty', properties: { property: 'data.projects' } }],
					},
				},
			},
		],
		default: 'getAll',
	},
	{
		displayName: 'Statuses',
		name: 'statuses',
		type: 'multiOptions',
		options: [
			{ name: 'Active', value: 'ACTIVE' },
			{ name: 'Archived', value: 'ARCHIVED' },
			{ name: 'Completed', value: 'COMPLETED' },
			{ name: 'On Hold', value: 'ON_HOLD' },
		],
		default: ['ACTIVE'],
		description: 'Only return projects in these statuses',
		displayOptions: { show: showOnlyForGetMany },
		routing: { send: { type: 'body', property: 'params.statuses' } },
	},
	{
		displayName: 'Only Mine',
		name: 'onlyMine',
		type: 'boolean',
		default: false,
		description: 'Whether to return only projects you are a member of',
		displayOptions: { show: showOnlyForGetMany },
		routing: { send: { type: 'body', property: 'params.onlyMine' } },
	},
	{
		displayName: 'Company ID',
		name: 'companyId',
		type: 'string',
		default: '',
		description: 'Only projects of this company (leave empty for all companies you can read)',
		displayOptions: { show: showOnlyForGetMany },
		routing: {
			send: { type: 'body', property: 'params.companyId', value: '={{ $value || undefined }}' },
		},
	},
	{
		displayName: 'Return All',
		name: 'returnAll',
		type: 'boolean',
		default: true,
		description: 'Whether to return all results or only up to a given limit',
		displayOptions: { show: showOnlyForGetMany },
		routing: { send: { paginate: '={{ $value }}' } },
	},
	{
		displayName: 'Limit',
		name: 'limit',
		type: 'number',
		typeOptions: { minValue: 1, maxValue: 100 },
		default: 50,
		description: 'Max number of results to return',
		displayOptions: { show: { ...showOnlyForGetMany, returnAll: [false] } },
		routing: { send: { type: 'body', property: 'params.limit' } },
	},
];
