import * as vscode from 'vscode';
import { LocalOgpCheckerViewProvider } from './view/LocalOgpCheckerViewProvider';

export function activate(context: vscode.ExtensionContext) {
	console.log('Congratulations, your extension "local-ogp-checker" is now active!');

	const commandDisposable = vscode.commands.registerCommand('local-ogp-checker.helloWorld', () => {
		vscode.window.showInformationMessage('Hello World from local-ogp-checker!');
	});

	const localOgpCheckerViewProvider = new LocalOgpCheckerViewProvider(context.extensionUri);
	const providerDisposable = vscode.window.registerWebviewViewProvider('local-ogp-checker.view', localOgpCheckerViewProvider);


	context.subscriptions.push(commandDisposable);
	context.subscriptions.push(providerDisposable);
}

export function deactivate() { }
