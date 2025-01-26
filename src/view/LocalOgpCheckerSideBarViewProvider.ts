import * as vscode from 'vscode';

export class LocalOgpCheckerSideBarViewProvider implements vscode.WebviewViewProvider {
    private _view?: vscode.WebviewView;

    constructor(private readonly _extensionUri: vscode.Uri) { }

    resolveWebviewView(
        webviewView: vscode.WebviewView,
        context: vscode.WebviewViewResolveContext,
        token: vscode.CancellationToken
    ): Thenable<void> | void {
        this._view = webviewView;

        webviewView.webview.options = {
            enableScripts: true,
        };
        webviewView.webview.html = this.buildWebviewContent();

        webviewView.webview.onDidReceiveMessage(async (message) => {
            if (message.command === 'requestOgpCheckSignal') {
                const siteUrl = message.siteUrl;
                vscode.window.showInformationMessage(`OGP Check: ${siteUrl}`);

                const response = await fetch(siteUrl);
                vscode.window.showInformationMessage(`Response: ${response.status}`);
                vscode.window.showInformationMessage(`Data: ${await response.text()}`);
            }
        })
    }

    private buildWebviewContent(): string {
        return `
        <!DOCTYPE html>
        <html lang="en">
        <body>
            <input type="text" id="siteUrl" placeholder="site url" />
            <button id="button">OGP Check</button>

            <script>
                const vscode = acquireVsCodeApi();
                document.getElementById('button').addEventListener('click', () => {
                    const siteUrl = document.getElementById('siteUrl').value;
                    vscode.postMessage({
                        command: 'requestOgpCheckSignal',
                        siteUrl: siteUrl
                    });
                });
            </script>
        </body>
        </html>
        `;
    }

}