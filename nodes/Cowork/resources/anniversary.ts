import type { INodeProperties } from 'n8n-workflow';
import { upcomingPeopleDescription } from './upcoming-people';

export const anniversaryDescription: INodeProperties[] = upcomingPeopleDescription({
	resource: 'anniversary',
	queryName: 'upcoming_work_anniversaries',
	action: 'Get upcoming work anniversaries',
	description:
		'Get people whose work anniversary (HR company join date) falls within the next N days (counted in Vietnam time), with the year count, job title, bio and profile highlights',
	windowDescription: '0 returns only today’s anniversaries; 366 returns the whole year',
});
