const Message = (props) => {

    return (
        <div className={props.myMessage ? 'chat-bubble my-message' :'chat-bubble'}>
            <p>{props.message}</p>
        </div>
    )
}

export default Message
