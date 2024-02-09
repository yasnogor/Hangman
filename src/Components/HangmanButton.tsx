interface ButtonProps {
  gameState: number;
  onClick: () => void;
}

const HangmanButton = ({ gameState, onClick }: ButtonProps) => {
  const checkState = () => {
    return gameState === 1
      ? "Unlucky! Try Again?"
      : gameState === 2
      ? "You rock!  Play Again?"
      : "Make a Guess!";
  };

  const getButtonStyle = () => {
    return gameState === 1
      ? "btn btn-danger"
      : gameState === 2
      ? "btn btn-success"
      : "btn btn-primary";
  };

  return (
    <button
      className={getButtonStyle()}
      onClick={onClick}
      style={{ display: gameState === 0 ? "none" : "" }}
    >
      {checkState()}
    </button>
  );
};

export default HangmanButton;
