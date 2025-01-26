import * as vscode from 'vscode';
import { LocalOgpCheckerSideBarViewProvider } from './view/LocalOgpCheckerSideBarViewProvider';

export function activate(context: vscode.ExtensionContext) {
	console.log('Congratulations, your extension "local-ogp-checker" is now active!');

	const commandDisposable = vscode.commands.registerCommand('local-ogp-checker.helloWorld', () => {
		vscode.window.showInformationMessage('Hello World from local-ogp-checker!');
	});

	const sideBarViewProvider = new LocalOgpCheckerSideBarViewProvider(context.extensionUri);
	const sideBarProviderDisposable = vscode.window.registerWebviewViewProvider('local-ogp-checker.sidebar.view', sideBarViewProvider);


	context.subscriptions.push(commandDisposable);
	context.subscriptions.push(sideBarProviderDisposable);
}

export function deactivate() { }
