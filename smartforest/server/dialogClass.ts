import { SessionsClient } from '@google-cloud/dialogflow';
export class DialogHandler {
    private projectId: string = 'green-home-cico';
    private sessionId = '123456';
    private languageCode: string = 'en';
    //private dialogflow = require('@google-cloud/dialogflow');
    // Instantiates a session client
    private sessionClient;

    constructor() {
        this.sessionClient = new SessionsClient();
    }

    private async detectIntent(query: string,contexts:any): Promise<any> {
        console.log(`Sending Query: ${query}`);
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
            queryParams:{}
        };
        if (contexts && contexts.length > 0) {
            request.queryParams = {
                contexts: contexts,
            };
        }
        const responses = await this.sessionClient.detectIntent(request);
        return responses[0];
    }

    public async executeQueries(queries:[string]) {
        // Keeping the context across queries let's us simulate an ongoing conversation with the bot
        let context;
        let intentResponse;
        for (const query of queries) {
          try {
            console.log(`Sending Query: ${query}`);
            intentResponse = await this.detectIntent(
              query,
              context,
            );
            console.log('Detected intent');
            console.log(
              `Fulfillment Text: ${intentResponse.queryResult.fulfillmentText}
              JSON Text: ${JSON.stringify(intentResponse.queryResult)}`
            );
            // Use the context from this response for next queries
            context = intentResponse.queryResult.outputContexts;
          } catch (error) {
            console.log(error);
          }
        }
      }





















}