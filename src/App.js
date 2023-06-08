import React, { useState, useEffect, useRef } from "react";
import axios from "axios";
import logo from "./logo512.png";


function App() {
  const [question, setQuestion] = useState("");
  const [chatHistory, setChatHistory] = useState([]);
  const [isProcessing, setIsProcessing] = useState(false);
  const chatContainerRef = useRef(null);
  const textareaRef = useRef(null);

  const handleSubmit = (e) => {
    e.preventDefault();

    const userMessage = { role: "user", content: question };
    const updatedChatHistory = [...chatHistory, userMessage];
    setChatHistory(updatedChatHistory);
    setQuestion(""); // Clear the input field

    const requestData = {
      model: "gpt-3.5-turbo",
      messages: updatedChatHistory,
    };

    setIsProcessing(true);

    axios
      .post("https://api.openai.com/v1/chat/completions", requestData, {
        headers: {
          Authorization: "",
          "Content-Type": "application/json",
        },
      })
      .then((response) => {
        const responseData = response.data.choices[0].message.content;
        const botMessage = { role: "assistant", content: responseData };
        const updatedChatHistoryWithResponse = [...updatedChatHistory, botMessage];

        setChatHistory(updatedChatHistoryWithResponse);
        setIsProcessing(false);
      })
      .catch((error) => {
        console.error(error);
        setIsProcessing(false);
      });
  };
  useEffect(() => {
    if (textareaRef.current) {
      const textArea = textareaRef.current;
      const startPosition = Math.floor(textArea.value.length / 2);
  
      textArea.focus();
      setTimeout(() => {
        textArea.setSelectionRange(startPosition, startPosition);
      }, 0);
    }
  }, []);
  
  

  useEffect(() => {
    const metaTag = document.querySelector('meta[name="viewport"]');
    metaTag.content = "width=device-width, initial-scale=1, maximum-scale=1, user-scalable=no";
    chatContainerRef.current.scrollTop = chatContainerRef.current.scrollHeight;
  }, [chatHistory]);

  const styles = {
    container: {
      borderRadius: "5px",
      maxHeight: "100%",
      height: "70vh",
      margin: "0 auto",
      background: "#151414",
      display: "flex",
      flexDirection: "column",
      maxWidth: "950px",
    },
    chatContainer: {
      border: "1px solid #e0e0e0",
      borderRadius: "5px",
      maxHeight: "100%",
      height: "60vh",
      margin: "0px",
      background: "#514f62",
      display: "flex",
      flexDirection: "column",
      overflowY: "scroll",
    },

    logo: {
      width: "55px",
      height: "55px",
    },

    overflow: {
      overflowY: "scroll",
    },
    card: {
      borderRadius: "5px",
      paddingLeft: "20px",
      paddingRight: "20px",
      background: "#282727",
    },
    cardContent: {
      marginBottom: "0",
    },
    inputField: {
      marginBottom: "20px",
    },
    inputText: {
      border: "1px solid #e0e0e0",
      padding: "15px",
      borderRadius: "5px",
      width: "92.5%",
      
      marginTop: "15px",
     // height: "3em",
      touchAction: "manipulation",
      WebkitTapHighlightColor: "transparent",

    },

  

    label: {
      fontWeight: "bold",
      color: "white",
    },
    centerAlign: {
      textAlign: "center",
    },
    button: {
      backgroundColor: "#4caf50",
      color: "white",
      padding: "15px 20px",
      borderRadius: "5px",
      cursor: "pointer",
      width: "100%",
    },
    buttonHover: {
      backgroundColor: "#45a049",
    },
    messageContainer: {
      marginBottom: "1px",
    },
    userMessage: {
      fontWeight: "bold",
      color: "white",
      paddingLeft: "40px",
      paddingRight: "40px",
     backgroundColor: "#62606f",
     paddingBottom: "30px",
     paddingTop: "10px",
     margin: "0px",
     
    },
    userName: {
      fontWeight: "bold",
      color: "lightblue",
     backgroundColor: "#62606f",
     paddingLeft: "20px",
     paddingTop: "10px",
     margin: "0px",
    
    },
    botMessage: {
      fontWeight: "bold",
      color: "#25c925",
      background: "#3f3e54",
      paddingLeft: "40px",
      paddingRight: "40px",
      whiteSpace: "pre-wrap", // Add this line to preserve line breaks
      paddingBottom: "30px",
      paddingTop: "5px",
      margin: "0px",
    },

    botName: {
      fontWeight: "bold",
      color: "lightblue",
      background: "#3f3e54",
      paddingLeft: "20px",
      paddingTop: "10px",
      margin: "0px",
      whiteSpace: "pre-wrap", // Add this line to preserve line breaks

    },

    title: {
      color: "white", // Add this line to preserve line breaks

    },

    
    botMessagePre: {
      backgroundColor: "#282727",
      padding: "10px",
      whiteSpace: "pre-wrap",
      color: "#25c925",
      paddingLeft: "20px",
      margin: "0px",
    },
  };

  return (
    <div className="container" style={styles.container}>
      <div className="card" style={styles.card}>
        <div className="card-content" style={styles.overflow}>
          <header className="center-align" style={styles.centerAlign}>
            <h2 className="font-semibold text-white" style={styles.title}>
            <img src={logo} alt="Logo" style={styles.logo} />
            </h2>
          </header>
          <div
            id="chat-container"
            style={styles.chatContainer}
            ref={chatContainerRef}
          >
     {chatHistory.map((message, index) => (
  <div key={index} style={styles.messageContainer}>
    {message.role === "user" ? (
      <div >
      <p className="user-message" style={styles.userName}>
        User:
      </p>
      <p className="user-message" style={styles.userMessage}>
         {message.content}
      </p>
      </div>
    ) : (
    
      
      <div>
        <p className="bot-message" style={styles.botName}>
          ColinGPT:
        </p>
        <pre className="bot-message" style={styles.botMessage}>
          {message.content}
        </pre>
      </div>

    )}
  </div>
))}

            {isProcessing && (
              <p className="bot-message" style={styles.botMessagePre}>
                ColinGPT is processing your question...
              </p>
            )}
          </div>
         
        </div><br></br>
        <form onSubmit={handleSubmit} className="input-field" style={styles.inputField}>
            <label htmlFor="question" className="text-white" style={styles.label}>
              Question:
            </label>
            <br />
            <textarea
  ref={textareaRef}
  id="question"
  name="question"
  style={{
    ...styles.inputText,
    fontFamily: 'Arial, sans-serif',
    textAlign: 'left',
    width: '100%',
    boxSizing: 'border-box', // Add this line to include padding and border in the width calculation
    fontSize: '16px',
  }}
  className="border border-gray-300 rounded px-2 py-1"
  rows="1"
  value={question}
  onChange={(e) => setQuestion(e.target.value)}
/>




            <br /><br />
           <center>
            <button
              type="submit"
              style={styles.button}
              className="btn bg-green-500 hover:bg-green-600 text-white"
            >
              <span className="text-800 font-bold">Send to GPT</span>
            </button>
            </center> 
          </form>
      </div>
    </div>
  );
}

export default App;
