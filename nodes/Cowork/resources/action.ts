import type { INodeProperties } from 'n8n-workflow';

const showOnlyForActions = { resource: ['action'] };

const ACTION_CODES = [
	'allocations.create',
	'allocations.update',
	'projects.create',
	'shop.purchase',
	'stories.assign',
	'stories.assign_batch',
	'stories.create',
	'stories.create_batch',
	'tasks.assign',
	'tasks.assign_batch',
	'tasks.create',
	'tasks.move',
	'tasks.move_batch',
	'tasks.update_batch',
] as const;

export const actionDescription: INodeProperties[] = [
	{
		displayName: 'Operation',
		name: 'operation',
		type: 'options',
		noDataExpression: true,
		displayOptions: { show: showOnlyForActions },
		options: [
			{
				name: 'Execute',
				value: 'execute',
				action: 'Execute an action',
				description:
					'Run a write action. Risky actions return status pending_confirmation or pending_approval instead of executing.',
				routing: { request: { method: 'POST', url: '/api/mcp/execute' } },
			},
			{
				name: 'Approve Pending',
				value: 'approvePending',
				action: 'Approve a pending action',
				description: 'Approve an action that returned pending_approval',
				routing: { request: { method: 'POST', url: '/api/mcp/approve' } },
			},
		],
		default: 'execute',
	},
	{
		displayName: 'Action Code Name or ID',
		name: 'actionCode',
		type: 'options',
		required: true,
		description:
			'Choose from the list, or specify an ID using an <a href="https://docs.n8n.io/code/expressions/">expression</a>',
		options: ACTION_CODES.map((code) => ({ name: code, value: code })),
		default: 'tasks.create',
		displayOptions: { show: { ...showOnlyForActions, operation: ['execute'] } },
		routing: { send: { type: 'body', property: 'actionCode' } },
	},
	{
		displayName: 'Payload (JSON)',
		name: 'payload',
		type: 'json',
		required: true,
		default: '{}',
		description: 'Action payload, validated by Cowork against the action schema',
		displayOptions: { show: { ...showOnlyForActions, operation: ['execute'] } },
		routing: {
			send: {
				type: 'body',
				property: 'payload',
				value: '={{ typeof $value === "string" ? JSON.parse($value || "{}") : $value }}',
			},
		},
	},
	{
		displayName: 'Pending Action ID',
		name: 'pendingActionId',
		type: 'string',
		required: true,
		default: '',
		displayOptions: { show: { ...showOnlyForActions, operation: ['approvePending'] } },
		routing: { send: { type: 'body', property: 'pendingActionId' } },
	},
	{
		displayName: 'Reason',
		name: 'reason',
		type: 'string',
		default: '',
		description: 'Optional note stored with the approval (max 500 characters)',
		displayOptions: { show: { ...showOnlyForActions, operation: ['approvePending'] } },
		routing: {
			send: { type: 'body', property: 'reason', value: '={{ $value || undefined }}' },
		},
	},
];
