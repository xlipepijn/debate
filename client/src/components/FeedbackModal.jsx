import {
  BsFillEmojiAngryFill,
  BsFillEmojiFrownFill,
  BsFillEmojiNeutralFill,
  BsFillEmojiSmileFill,
  BsFillEmojiLaughingFill,
} from "react-icons/bs";

import { IconContext } from "react-icons";


const FeedbackModal = ({
  handleSubmit,
  handleButton,
  setRating,
  opponentRating,
}) => {
  return (
    <div>
      <div className="modal-background">
        <div className="modal">
          <h2 style={{marginBottom:'20px'}} >Discussion ended</h2>
          <form onSubmit={handleSubmit} className="feedback-form">
            <p>How would you rate the discussion you just had?</p>
            <IconContext.Provider value={{ className: "emoji" }}>
              <button onClick={() => setRating("Very Bad")}>
                {" "}
                <BsFillEmojiAngryFill />
              </button>
              <button onClick={() => setRating("Bad")}>
                {" "}
                <BsFillEmojiFrownFill />
              </button>
              <button onClick={() => setRating("Ok")}>
                {" "}
                <BsFillEmojiNeutralFill />
              </button>
              <button onClick={() => setRating("Good")}>
                {" "}
                <BsFillEmojiSmileFill />
              </button>
              <button onClick={() => setRating("Very good")}>
                {" "}
                <BsFillEmojiLaughingFill />
              </button>
            </IconContext.Provider>
          </form>

          <div
            style={{
              textAlign: "center",
              marginTop: "20px",
              marginBottom: "20px",
            }}
          >
            <p>Your conversation partner rated the conversation:</p>
            {opponentRating ? (
              <p style={{fontWeight:'700'}}>{opponentRating}</p>
            ) : (
              <p>Waiting on rating...</p>
            )}
          </div>
          <button onClick={handleButton} className="primary-button">
            Go back to lobby
          </button>
        </div>
      </div>
    </div>
  );
};

export default FeedbackModal;
