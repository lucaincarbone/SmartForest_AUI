import {SessionsClient} from '@google-cloud/dialogflow';

export class DialogHandler {

    private static _instance: DialogHandler;
    private projectId: string = 'green-home-cico';
    private sessionId = '123456';
    private languageCode: string = 'en';
    // private dialogflow = require('@google-cloud/dialogflow');
    // Instantiates a session client
    private sessionClient;

    private constructor() {
        console.log("Creating a new DialogHandler...")
        this.sessionClient = new SessionsClient();
    }

    public static get Instance() {
        return this._instance || (this._instance = new this());
    }

    private async detectIntent(query: string, contexts: any): Promise<any> {
        // The path to identify the agent that owns the created intent.
        const sessionPath = this.sessionClient.projectAgentSessionPath(
            this.projectId,
            this.sessionId
        );
        // The text query request.
        const request = {
            session: sessionPath,
            queryInput: {
                text: {
                    text: query,
                    languageCode: this.languageCode,
                },
            },
            queryParams: {}
        };
        if (contexts && contexts.length > 0) {
            request.queryParams = {
                contexts: contexts,
            };
        }
        const responses = await this.sessionClient.detectIntent(request);
        return responses[0];
    }

    public async executeQueries(queries: [string]): Promise<Map<string, string>> {
        // Keeping the context across queries lets us simulate an ongoing conversation with the bot
        let context;
        let intentResponse;
        let detectedIntent: string = ""
        let caAnswer: string = ""
        let mapToReturn: Map<string, string> = new Map<string, string>()

        for (const query of queries) {
            try {
                //console.log('From DialogHandler:')
                //console.log(`Sending Query: ${query}`);
                intentResponse = await this.detectIntent(
                    query,
                    context,
                );
                detectedIntent = (intentResponse.queryResult.intent.displayName).toString()
                caAnswer = intentResponse.queryResult.fulfillmentText
                //console.log('Detected intent: ' + detectedIntent);
                //console.log('CA answer: ' + caAnswer);
                // Use the context from this response for next queries
                context = intentResponse.queryResult.outputContexts;
                mapToReturn.set("intent", detectedIntent)
                mapToReturn.set("answer", caAnswer)
            } catch (error) {
                console.error(error);
            }
        }
        return mapToReturn
    }
}
