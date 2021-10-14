const ErrorModal = ({errorMessage, handleButton}) => {
    return (
        <div>
            <div className='modal-background'>
                <div className='modal'>
                    <h2>Oh no!</h2>
                    <p>{errorMessage}</p>
                    <button onClick={handleButton} className='primary-button'>Go back to lobby</button>
                </div>
            </div>
        </div>
    )
}

export default ErrorModal
