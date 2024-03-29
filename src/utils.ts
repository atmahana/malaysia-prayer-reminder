import * as vscode from 'vscode';
import { POLL_INTERVAL } from './constants';

export function capitalizeFirstLetter(inputString: string) {
	if (typeof inputString !== 'string' || inputString.length === 0) return;

	const capitalizedString = inputString.charAt(0).toUpperCase() + inputString.slice(1);

	return capitalizedString;
}

export const getConfig = () => {
	const { timer, zone } = vscode.workspace.getConfiguration("myPrayerReminder");
	if (!timer || !zone) {
		vscode.window.showErrorMessage('Malaysia Prayer Reminder: Incomplete configuration. Fill in all fields.');
		throw new Error('Incomplete configuration');
	} else {
		return { timer, zone }
	}
};

export const getPrayerZone = (zone: string) => {
	const lines = zone.split('\n');

	let zoneCode = '';

	lines.forEach((line) => {
		if (line.trim().startsWith("===")) {
			return;
		}

		const [code, _] = line.split(" - ");

		zoneCode = code
	});

	return zoneCode.toLowerCase();
}

export const handleError = (error: string) => {
	vscode.window.showErrorMessage(
		`Malaysia Prayer Reminder: ${error}`
	);
};

export const showPrayerReminder = (prayerName: string) => {
	vscode.window.showInformationMessage(`It's time for ${capitalizeFirstLetter(prayerName)} prayer`, "Ok");
};

export const showNotificationReminder = (prayerName: string, timer: number) => {
	vscode.window.showInformationMessage(`${capitalizeFirstLetter(prayerName)} prayer in ${timer} minutes`, "Ok");
};

export const shouldShowNotification = (timeLeft: number, timer: number): boolean => {
	const timeLeftForReminder = timeLeft - timer * 60000;
	return timeLeftForReminder >= 0 && timeLeftForReminder < POLL_INTERVAL;
};