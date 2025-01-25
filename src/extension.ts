import * as vscode from 'vscode';

export function activate(context: vscode.ExtensionContext) {
	console.log('Congratulations, your extension "local-ogp-checker" is now active!');

	const disposable = vscode.commands.registerCommand('local-ogp-checker.helloWorld', () => {
		vscode.window.showInformationMessage('Hello World from local-ogp-checker!');
	});

	context.subscriptions.push(disposable);
}

export function deactivate() {}
