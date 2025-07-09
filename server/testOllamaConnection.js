const { ChatOllama } = require('@langchain/community/chat_models/ollama');
const { HumanMessage, SystemMessage } = require('@langchain/core/messages');

const model = new ChatOllama({
  baseUrl: 'http://localhost:11434',
  model: 'llama3',
  temperature: 0.2,
});

(async () => {
  try {
    const res = await model.call([
      new SystemMessage("You are a helpful assistant."),
      new HumanMessage("Say hello!"),
    ]);
    console.log(res.content);
  } catch (err) {
    console.error('❌ Connection failed:', err.message);
  }
})();
