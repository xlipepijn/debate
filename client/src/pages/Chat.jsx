import { io } from "socket.io-client";
import { useEffect, useState, useRef } from "react";
import Timer from "../components/Timer";
import logo from "../images/logo.png";
import { FiSend } from "react-icons/fi";
import { IconContext } from "react-icons";
import { getConversation, endConversation } from "../API/Calls";
import Avatar from "../components/Avatar";
import Message from "../components/Message";
import { useHistory } from "react-router-dom";
import ErrorModal from '../components/ErrorModal'
import FeedbackModal from '../components/FeedbackModal'
import Credits from '../components/Credits'
const Chat = ({ match, color1, color2, color3, userId }) => {
  const [socket, setSocket] = useState();
  const [connected, setConnected] = useState(false);
  const [didMount, setDidMount] = useState(false);
  const [messages, setMessages] = useState([]);
  const room = match.params.id;
  const [startTimer, setStartTimer] = useState(false);
  const [newMessage, setNewMessage] = useState();
  const [conversationStopped, setConversationStopped] = useState(false);
  const [challengerJoined, setChallengerJoined] = useState(false);
  const [topic, setTopic] = useState("");
  const [waiting, setWaiting] = useState(true);
  const [colorsOpponent, setColorsOpponnent] = useState({
    color1: "",
    color2: "",
    color3: "",
  });
  const [conversationInitializer, setConversationInitializer] = useState("");
  const[partnerLeft ,setPartnerLeft] = useState(false)
  let history = useHistory();
  const [rating, setRating] = useState(null)
  const [receivedFeedback, setReceivedFeedback] = useState(null)
  const messageRef = useRef(null)

  // Connect to Socket and get Conversation data
  useEffect(() => {
    // const s = io.connect("http://localhost:3001");
    const s = io.connect("https://changemymind-pep.herokuapp.com/");
    setSocket(s);
    getConversation(room)
      .then(
        (res) => (
          setTopic(res[0].topic),
          setColorsOpponnent({
            color1: res[0].joinedUsers[0].color1,
            color2: res[0].joinedUsers[0].color2,
            color3: res[0].joinedUsers[0].color3,
          }),
          setConversationInitializer(res[0].joinedUsers[0].id)
        )
      )
      .catch((err) => console.log(`ERRORRR: ${err} `));

    return () => {
      s.disconnect();
    };
  }, []);

  // Get messages on socket updates
  useEffect(() => {
    if (!didMount) {
      setDidMount(true);
    } else {
      socket.on("connect", () => {
        setConnected(true);
        socket.emit("join-room", room);
      });
      socket.on("receive-message", ({ userId, text }) => {
        setMessages((messages) => [
          ...messages,
          { userId: userId, text: text },
        ]);
        messageRef.current.scrollIntoView(); 
      });
      socket.on("challenger joined", () => {
        setWaiting(false);
        setTimeout(() => setChallengerJoined(true), 2000);
        setStartTimer(true);
      });
      socket.on("disconnect", () => {
        setConnected(false);
        endConversation(room)
      });
      socket.on('partner-left', () => {
        setPartnerLeft(true)
        endConversation(room)
      })
      socket.on("receive-feedback", (opponentRating) => {
        console.log("opponentRating");
        receiveFeedback(opponentRating);
      });
    }
  }, [socket]);

  // Form handler
  const handleSubmitMessage = (e) => {
    e.preventDefault();

    if (newMessage != '') {
      socket.emit("send-message", {
        userId: userId,
        text: newMessage,
      });
    } 

    setNewMessage("");
  };

  // Stop timer handler
  const stopConversation = () => {
    setConversationStopped(true);
  };

  // End conversation button handler
  const endConversationHandler = () => {
    endConversation(room)
      .then(() => history.push("/"))
      .catch((err) => console.log(err));
  };

  const goBackToHome = () => {
    endConversation(room).then(() => history.push("/"));
  }

  const rate = (e) => {
    e.preventDefault();
    socket.emit("rate-opponent", rating);
  };

  const receiveFeedback = (opponentRating) => {
    setReceivedFeedback(opponentRating)
  }
  return (
    <div style={{ marginBottom: "40px" }}>
      {partnerLeft && (
        <ErrorModal
          errorMessage="Your conversation partner has left the conversation. Press the button below to go back to the lobby screen"
          handleButton={goBackToHome}
        />
      )}

      {conversationStopped && (
        <FeedbackModal
          handleButton={goBackToHome}
          setRating={setRating}
          handleSubmit={rate}
          opponentRating={receivedFeedback}
        />
      )}

      {/* Header */}
      <div
        className="header"
        // style={{ marginBottom: "0px", position: "absolute" }}
      >
        <div className="top-profile">
          <div style={{ marginLeft: "5px", marginRight: "10px" }}>
            <Avatar
              size="40px"
              color1={color1}
              color2={color2}
              color3={color3}
            />
          </div>
          <div style={{ marginRight: "130px" }}></div>
        </div>
        <img
          src={logo}
          style={{
            height: "39.67",
            width: "250px",
            marginTop: "20px",
            marginBottom: "20px",
          }}
        />
        <div style={{ width: "0px" }}></div>
      </div>
      <div>
        {/* Chat */}
        <div className="chat-container">
          {/* Chat header */}
          <div className="chat-header">
            {challengerJoined ? (
              <div className="chat-header-left">
                <div style={{ display: "flex" }}>
                  <Avatar
                    size="20px"
                    color1={colorsOpponent.color1}
                    color2={colorsOpponent.color2}
                    color3={colorsOpponent.color3}
                    noTopFix={true}
                  />
                  <p>‎‎‎‎ ‎'s statement:</p>
                </div>
                <h3>{topic}</h3>
              </div>
            ) : (
              <div> </div>
            )}
            <div className="chat-header-right">
              <a
                onClick={endConversationHandler}
                style={{ color: "red", cursor: "pointer", textAlign: "right" }}
              >
                End and leave conversation
              </a>
              <div style={{ display: "flex", justifyContent: "end" }}>
                Time left:
                <Timer
                  timeTillTimeOut={100}
                  startTimer={startTimer}
                  stopTimer={stopConversation}
                />
                sec.
              </div>
            </div>
          </div>
          {/* Chat content */}
          <div className="chat-content-container">
            {!challengerJoined ? (
              <div className="waiting-room-container center">
                <p>Statement:</p>
                <h2>{topic}</h2>
                {waiting ? (
                  <p>Waiting for someone to join... </p>
                ) : (
                  <p>challenger joined!</p>
                )}
              </div>
            ) : (
              <Message
                message={topic}
                myMessage={userId === conversationInitializer}
              />
            )}

            {messages.map((i) => (
              <Message message={i.text} myMessage={i.userId === userId} />
            ))}
            {conversationStopped && <p>CONVERSATION ENDED!</p>}
            <div ref={messageRef}></div>
          </div>
          {/* Chat form */}
          <div className="chat-form-container">
            <form className="chat-form" onSubmit={handleSubmitMessage}>
              <fieldset
                className={challengerJoined ? "chat-form" : "form-disabled"}
                disabled={!challengerJoined && "disabled"}
              >
                <input
                  value={newMessage}
                  onChange={(e) => setNewMessage(e.target.value)}
                  type="text"
                />
                <button
                  className={
                    challengerJoined ? "send-button" : "send-button disabled"
                  }
                >
                  <IconContext.Provider
                    value={{
                      className: challengerJoined
                        ? "send-icon"
                        : "send-icon disabled",
                    }}
                  >
                    <FiSend />
                  </IconContext.Provider>
                </button>
              </fieldset>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Chat;
