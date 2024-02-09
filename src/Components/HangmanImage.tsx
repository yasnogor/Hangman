interface HangmanImageProps {
  index: number;
}
function HangmanImage({ index }: HangmanImageProps) {
  const checkIndex = () => {
    return index;
  };
  return (
    <img
      className="rounded mx-auto d-block"
      src={`./images/image${checkIndex()}.jpg`}
      alt="Hangman Image"
      title="Hangman Image"
    />
  );
}
export default HangmanImage;
