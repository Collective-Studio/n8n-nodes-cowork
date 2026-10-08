import { NodeConnectionTypes, type INodeType, type INodeTypeDescription } from 'n8n-workflow';
import { actionDescription } from './resources/action';
import { birthdayDescription } from './resources/birthday';
import { queryDescription } from './resources/query';

export class Cowork implements INodeType {
	description: INodeTypeDescription = {
		displayName: 'Cowork',
		name: 'cowork',
		icon: { light: 'file:../../icons/cowork.svg', dark: 'file:../../icons/cowork.svg' },
		group: ['transform'],
		version: 1,
		subtitle: '={{$parameter["operation"] + ": " + $parameter["resource"]}}',
		description: 'Read and act on your Cowork (CSMS) workspace',
		defaults: {
			name: 'Cowork',
		},
		usableAsTool: true,
		inputs: [NodeConnectionTypes.Main],
		outputs: [NodeConnectionTypes.Main],
		credentials: [{ name: 'coworkApi', required: true }],
		requestDefaults: {
			baseURL: '={{$credentials.baseUrl.replace(/\\/+$/, "")}}',
			headers: {
				Accept: 'application/json',
				'Content-Type': 'application/json',
			},
		},
		properties: [
			{
				displayName: 'Resource',
				name: 'resource',
				type: 'options',
				noDataExpression: true,
				options: [
					{ name: 'Action', value: 'action' },
					{ name: 'Birthday', value: 'birthday' },
					{ name: 'Query', value: 'query' },
				],
				default: 'birthday',
			},
			...birthdayDescription,
			...queryDescription,
			...actionDescription,
		],
	};
}
