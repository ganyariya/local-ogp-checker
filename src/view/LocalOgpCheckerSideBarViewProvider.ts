import * as vscode from 'vscode';

export class LocalOgpCheckerSideBarViewProvider implements vscode.WebviewViewProvider {
    private static readonly REQUEST_CHECK_OGP_SIGNAL = 'requestCheckOgpSignal';

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
            if (message.command === LocalOgpCheckerSideBarViewProvider.REQUEST_CHECK_OGP_SIGNAL) {
                const siteUrl = message.siteUrl;
                vscode.window.showInformationMessage(`Check OGP URL: ${siteUrl}`);

                try {
                    const response = await fetch(siteUrl);
                    vscode.window.showInformationMessage(`Response: ${response.status}`);
                    vscode.window.showInformationMessage(`Data: ${await response.text()}`);
                } catch (error) {
                    vscode.window.showErrorMessage(`Error: ${error}`);
                }
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
                        command: "${LocalOgpCheckerSideBarViewProvider.REQUEST_CHECK_OGP_SIGNAL}",
                        siteUrl: siteUrl
                    });
                });
            </script>
        </body>
        </html>
        `;
    }

}