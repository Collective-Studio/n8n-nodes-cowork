import type { INodeProperties } from 'n8n-workflow';
import { upcomingPeopleDescription } from './upcoming-people';

export const birthdayDescription: INodeProperties[] = upcomingPeopleDescription({
	resource: 'birthday',
	queryName: 'upcoming_birthday_profiles',
	action: 'Get upcoming birthdays',
	description:
		'Get people whose birthday falls within the next N days (counted in Vietnam time), with job title, bio and profile highlights',
	windowDescription: '0 returns only today’s birthdays; 366 returns the whole year',
});
