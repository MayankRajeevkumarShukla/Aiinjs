import openai from "./config/open-ai.js";
import readlineSync from 'readline-sync'
import colors from 'colors'

async function main() {
  try {
   console.log(colors.bold.green('Welcome to the Chatbot Program '))
   console.log(colors.bold.green('You can start chatting with the bot'))
    const chatHistory = [];
   while(true){
    const userInput = readlineSync.question(colors.yellow('You: '))
    try {
         const messages = chatHistory.map(([role,content])=>({role,content}))
         messages.push({role:'user',content:userInput})
          const completion =  await openai.createChatCompletion({
            model:'gpt-3.5-turbo',
            messages:[{
                role:'user',
                content:messages
            }]
          })
         
          const completionText = completion.data.choices[0].message.content

        if(userInput.toLocaleLowerCase() === 'exit'){
            console.log(colors.green('Bot: ') + completionText )
            return;
        }
        console.log(colors.green('Bot: ') + completionText )

        chatHistory.push(['user',userInput])
        chatHistory.push(['assistance',completionText])
    } catch (error) {
         console.error(colors.red('Error:', error.response ? error.response.data : error.message));
    }
   }
  } catch (error) {
    console.error('Error:', error.response ? error.response.data : error.message);
  }
}

main();
