interface WordAreaProps {
  word: string;
  style: string;
  additionalText?: string;
  display?: boolean;
}

const WordArea = ({ word, style, additionalText, display }: WordAreaProps) => {
  return (
    <div
      className={style}
      role="alert"
      style={{ display: display ? "none" : "" }}
    >
      {additionalText} {word}
    </div>
  );
};

export default WordArea;
