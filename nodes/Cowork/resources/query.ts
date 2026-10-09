import type { INodeProperties } from 'n8n-workflow';

const showOnlyForQueries = { resource: ['query'] };
const showOnlyForRun = { resource: ['query'], operation: ['run'] };

const QUERY_NAMES = [
	['Achievement Progress', 'achievement_progress'],
	['Allocation Simulate', 'allocation_simulate'],
	['Get My Workday', 'get_my_workday'],
	['Get Proposal', 'get_proposal'],
	['Members', 'members'],
	['My Allocation', 'my_allocation'],
	['My Columns', 'my_columns'],
	['My Workload', 'my_workload'],
	['Personal Gamification Summary', 'personal_gamification_summary'],
	['Project Get', 'project_get'],
	['Project List', 'project_list'],
	['Search', 'search'],
	['Shop Catalog', 'shop_catalog'],
	['Shop Inventory', 'shop_inventory'],
	['Shop Purchase Preview', 'shop_purchase_preview'],
	['Story Get', 'story_get'],
	['Story List', 'story_list'],
	['Task Get', 'task_get'],
	['Task List', 'task_list'],
	['Team Capacity', 'team_capacity'],
	['Team Directory', 'team_directory'],
	['Upcoming Birthday Profiles', 'upcoming_birthday_profiles'],
	['Upcoming Birthdays', 'upcoming_birthdays'],
	['Upcoming Work Anniversaries', 'upcoming_work_anniversaries'],
	['Work Context', 'work_context'],
] as const;

export const queryDescription: INodeProperties[] = [
	{
		displayName: 'Operation',
		name: 'operation',
		type: 'options',
		noDataExpression: true,
		displayOptions: { show: showOnlyForQueries },
		options: [
			{
				name: 'Run',
				value: 'run',
				action: 'Run a query',
				description: 'Run a read-only Cowork query with your permissions',
				routing: {
					request: { method: 'POST', url: '/api/mcp/query' },
					output: {
						postReceive: [{ type: 'rootProperty', properties: { property: 'data' } }],
					},
				},
			},
		],
		default: 'run',
	},
	{
		displayName: 'Query Name or ID',
		name: 'queryName',
		type: 'options',
		required: true,
		description:
			'Choose from the list, or specify an ID using an <a href="https://docs.n8n.io/code/expressions/">expression</a>',
		options: QUERY_NAMES.map(([name, value]) => ({ name, value })),
		default: 'my_workload',
		displayOptions: { show: showOnlyForRun },
		routing: { send: { type: 'body', property: 'queryName' } },
	},
	{
		displayName: 'Params (JSON)',
		name: 'params',
		type: 'json',
		default: '{}',
		description: 'Query parameters, for example {"scope":"company","windowDays":7}',
		displayOptions: { show: showOnlyForRun },
		routing: {
			send: {
				type: 'body',
				property: 'params',
				value: '={{ typeof $value === "string" ? JSON.parse($value || "{}") : $value }}',
			},
		},
	},
];
