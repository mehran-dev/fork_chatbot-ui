import { Message } from '@/types/chat';
import { OpenAIModel } from '@/types/openai';
import {
  createParser,
  ParsedEvent,
  ReconnectInterval,
} from 'eventsource-parser';
import { OPENAI_API_HOST } from '../app/const';

export class OpenAIError extends Error {
  type: string;
  param: string;
  code: string;

  constructor(message: string, type: string, param: string, code: string) {
    super(message);
    this.name = 'OpenAIError';
    this.type = type;
    this.param = param;
    this.code = code;
  }
}

const mockedFetch = async (url: string, options: any) => {
  const simulatedData = [
    '{"choices":[{"delta":{"content":"ما در حال پاسخ گویی به شما هستیم "}}]}',
    '{"choices":[{"delta":{"content":" ما داریم اینجا زحمت می کشیم "}}]}',
    '{"choices":[{"delta":{"content":"تو داری پاسخ ما رو در یافت می کنی "}}]}',
    '{"choices":[{"delta":{"content":"توجه توجه "}}]}',
    '{"choices":[{"delta":{"content":"این سور سنت استریمینگ است "}}]}',
    '{"choices":[{"delta":{"content":"  که هما تی پی از آن استفاده می کند "}}]}',
    '{"choices":[{"delta":{"content":"در حال اتمام سوخت هستیم "}}]}',
    '{"choices":[{"delta":{"content":"موتور خاموش شد "}}]}',
    '{"choices":[{"delta":{"content":"بانوشتن کلمه دان به انگلیسی چت پایان می یابد "}}]}',
    '{"choices":[{"delta":{"content":"اوووه به خدا حافظی سلام کن "}}]}',
    '{"choices":[{"delta":{"content":"DONE"}}]}',
  ];

  return {
    ok: true,
    // json: async () => ({ answer: 'Mocked assistant response' }), // Adjust the response as needed
    body: new ReadableStream({
      async start(controller) {
        // Simulate streaming data
        for (const chunk of simulatedData) {
          console.log('chunk from mockedFetch', chunk);
          await new Promise((resolve) => {
            setTimeout(() => {
              resolve(1); // Resolve the promise after the timeout
            }, 1500);
          });
          controller.enqueue(new TextEncoder().encode(chunk));
        }
        controller.close();
      },
    }),
  };
};

export const OpenAIStream = async (
  model: OpenAIModel,
  systemPrompt: string,
  key: string,
  messages: Message[],
) => {
  const res = await mockedFetch(`${OPENAI_API_HOST}/v1/chat/completions`, {
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${key ? key : process.env.OPENAI_API_KEY}`,
      ...(process.env.OPENAI_ORGANIZATION && {
        'OpenAI-Organization': process.env.OPENAI_ORGANIZATION,
      }),
    },
    method: 'POST',
    body: JSON.stringify({
      model: model.id,
      messages: [
        {
          role: 'system',
          content: systemPrompt,
        },
        ...messages,
      ],
      max_tokens: 1000,
      temperature: 1,
      stream: true,
    }),
  });

  const encoder = new TextEncoder();
  const decoder = new TextDecoder();
  // console.log('__________ before streaming ', res);

  const stream = new ReadableStream({
    async start(controller) {
      console.log('START is calllllllllllllllllllllllllllllled ', controller);

      const onParse = (event: ParsedEvent | ReconnectInterval) => {
        console.log('ON PARSER event is : ', event);

        if (event.type === 'event') {
          const data = event.data;
          console.log('DATA ----->>>>', data);

          if (data === '[DONE]') {
            controller.close();
            return;
          }

          try {
            const json = JSON.parse(data);
            const text = json.choices[0].delta.content;
            const queue = encoder.encode(text);
            controller.enqueue(queue);
          } catch (e) {
            controller.error(e);
          }
        }
      };

      const parser = createParser(onParse);
      console.log('Parser====++++++++++++++++', parser);

      for await (const chunk of res.body as any) {
        try {
          const jix: any = JSON.parse(decoder.decode(chunk));
          console.log('___________________ jix____________', typeof jix, jix);

          const text = jix.choices[0].delta.content;
          console.log(
            '&&&&&&&&&&&&&&&&&&&&',
            text,
            '&&&&&&&&&&&&&&&&&&&&&&&&&&&&',
          );

          if (text === 'DONE') {
            controller.close();
          }
          const queue = encoder.encode(text);
          controller.enqueue(queue);
        } catch (e) {
          controller.error(e);
        }
      }
    },
  });
  console.log('---return stream ----');

  return stream;
};
