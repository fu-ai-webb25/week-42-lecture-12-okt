import { ChatOllama } from '@langchain/ollama';

export const llm = new ChatOllama({
    model : 'gemma3:4b',
    temperature : 0,
    topP : 0.5,
    numPredict : 200,
    think : false
});

// export const createLLM = (model, temperature, topP, numPredict, think) => {
//     return new ChatOllama({
//         model,
//         temperature,
//         topP,
//         numPredict,
//         think
//     });
// }   

