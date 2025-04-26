import {
  ChatCompletion,
  ChatCompletionMessageParam,
} from 'openai/resources/chat';

export const LLM = {
  model(model: string) {
    return model;
  },
  summarizationPromptHandler(
    filename: string,
    base64String: string,
  ): ChatCompletionMessageParam[] {
    return [
      {
        role: 'user',
        content: [
          {
            type: 'file',
            file: {
              filename: `${filename}`,
              file_data: `data:application/pdf;base64,${base64String}`,
            },
          },
          {
            type: 'text',
            text: `Here is a PDF document.\n\nYour task:\n- Detect the language of the document first.\n- Summarize the document in the same detected language.\n- Write a short summary in a single paragraph (5–7 sentences).\n- Focus on the main idea and the most important key points.\n- Avoid unnecessary details, numbers, or examples unless they are essential.\n- Use clear, formal, and easy-to-understand language.`,
          },
        ],
      },
    ];
  },
  proccessedCompletionHandler(completion: ChatCompletion) {
    return completion.choices[0].message.content;
  },
};
