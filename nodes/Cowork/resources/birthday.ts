import type { INodeProperties } from 'n8n-workflow';

const showOnlyForBirthdays = { resource: ['birthday'] };
const showOnlyForGetUpcoming = { resource: ['birthday'], operation: ['getUpcoming'] };

export const birthdayDescription: INodeProperties[] = [
	{
		displayName: 'Operation',
		name: 'operation',
		type: 'options',
		noDataExpression: true,
		displayOptions: { show: showOnlyForBirthdays },
		options: [
			{
				name: 'Get Upcoming',
				value: 'getUpcoming',
				action: 'Get upcoming birthdays',
				description:
					'Get people whose birthday falls within the next N days (counted in Vietnam time), with job title, bio and profile highlights',
				routing: {
					request: {
						method: 'POST',
						url: '/api/mcp/query',
						body: { queryName: 'upcoming_birthday_profiles' },
					},
					output: {
						postReceive: [{ type: 'rootProperty', properties: { property: 'data.data' } }],
					},
				},
			},
		],
		default: 'getUpcoming',
	},
	{
		displayName: 'Scope',
		name: 'scope',
		type: 'options',
		displayOptions: { show: showOnlyForGetUpcoming },
		options: [
			{ name: 'Company', value: 'company', description: 'Members of your companies' },
			{ name: 'Direct Reports', value: 'direct_reports', description: 'People who report to you' },
			{ name: 'Project', value: 'project', description: 'Members of one project' },
		],
		default: 'company',
		routing: { send: { type: 'body', property: 'params.scope' } },
	},
	{
		displayName: 'Project ID',
		name: 'projectId',
		type: 'string',
		required: true,
		default: '',
		displayOptions: { show: { ...showOnlyForGetUpcoming, scope: ['project'] } },
		routing: { send: { type: 'body', property: 'params.projectId' } },
	},
	{
		displayName: 'Within Days',
		name: 'windowDays',
		type: 'number',
		typeOptions: { minValue: 0, maxValue: 366 },
		default: 0,
		description: '0 returns only today’s birthdays; 366 returns the whole year',
		displayOptions: { show: showOnlyForGetUpcoming },
		routing: { send: { type: 'body', property: 'params.windowDays' } },
	},
	{
		displayName: 'Employment Types',
		name: 'employmentTypes',
		type: 'multiOptions',
		options: [
			{ name: 'Contract', value: 'CONTRACT' },
			{ name: 'Freelance', value: 'FREELANCE' },
			{ name: 'Full Time', value: 'FULL_TIME' },
			{ name: 'Intern', value: 'INTERN' },
			{ name: 'Part Time', value: 'PART_TIME' },
		],
		default: ['FULL_TIME'],
		displayOptions: { show: showOnlyForGetUpcoming },
		routing: { send: { type: 'body', property: 'params.employmentTypes' } },
	},
	{
		displayName: 'Limit',
		name: 'limit',
		type: 'number',
		typeOptions: { minValue: 1, maxValue: 50 },
		default: 50,
		description: 'Max number of results to return',
		displayOptions: { show: showOnlyForGetUpcoming },
		routing: { send: { type: 'body', property: 'params.limit' } },
	},
	{
		displayName: 'Additional Fields',
		name: 'additionalFields',
		type: 'collection',
		placeholder: 'Add Field',
		default: {},
		displayOptions: { show: showOnlyForGetUpcoming },
		options: [
			{
				displayName: 'Company IDs',
				name: 'companyIds',
				type: 'string',
				default: '',
				description: 'Comma-separated company IDs to narrow the Company scope',
				routing: {
					send: {
						type: 'body',
						property: 'params.companyIds',
						value: '={{ $value.split(",").map((id) => id.trim()).filter(Boolean) }}',
					},
				},
			},
			{
				displayName: 'Team ID',
				name: 'teamId',
				type: 'string',
				default: '',
				description: 'Only people in this team (honored for admins with full read scope)',
				routing: { send: { type: 'body', property: 'params.teamId' } },
			},
			{
				displayName: 'Cursor',
				name: 'cursor',
				type: 'string',
				default: '',
				description: 'Value of page.nextCursor from a previous call, to fetch the next page',
				routing: { send: { type: 'body', property: 'params.cursor' } },
			},
		],
	},
];
