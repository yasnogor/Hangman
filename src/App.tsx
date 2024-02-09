import { useState, useEffect, useRef } from "react";
import HangmanImage from "./Components/HangmanImage";
import HangmanButton from "./Components/HangmanButton";
import HangmanDropdown from "./Components/HangmanDropdown";
import WordArea from "./Components/WordArea";

function App() {
  const fullAlphabet = [
    "A",
    "B",
    "C",
    "D",
    "E",
    "F",
    "G",
    "H",
    "I",
    "J",
    "K",
    "L",
    "M",
    "N",
    "O",
    "P",
    "Q",
    "R",
    "S",
    "T",
    "U",
    "V",
    "W",
    "X",
    "Y",
    "Z",
  ];
  const [alphabet, setAlphabet] = useState<string[]>(fullAlphabet);
  const [gameState, setGameState] =
    useState(0); /*0 - playing, 1 - lost, 2 - won */
  const wrongGuesses = useRef(0);
  const [imageIndex, setImageIndex] = useState(1);
  const [wordToGuess, setWordToGuess] = useState("");
  const [wordDisplayed, setWordDisplayed] = useState("");
  const [guessedLetters, setGuessedLetters] = useState<string[]>([]);
  const [hideAnswer, setHideAnswer] = useState(true);
  const [guessCount, setGuessCount] = useState(0);
  const [newWord, setNewWord] = useState("");

  const retrieveNewWordToGuess = () => {
    const defaultWords = [
      "Geometry",
      "Algebra",
      "University",
      "Olympics",
      "Beautiful",
      "Architecture",
      "Literature",
    ];
    fetch("https://expressapp120240125114348.azurewebsites.net/words")
      .then((response) => response.json())
      .then((data) => {
        setNewWord(data.word.toUpperCase());
        //console.log(data.word);
        if (guessCount === 0) {
          setWordToGuess(data.word.toUpperCase());
        }
      })
      .catch((err) => {
        setNewWord(
          defaultWords[
            Math.floor(Math.random() * defaultWords.length)
          ].toUpperCase()
        );

        if (guessCount === 0) {
          setWordToGuess(
            defaultWords[
              Math.floor(Math.random() * defaultWords.length)
            ].toUpperCase()
          );
        }
        console.log("Error: " + err.message);
      });
  };
  const resetGame = () => {
    setHideAnswer(true);
    setImageIndex(1);
    setGuessCount(0);
    setGameState(0);
    setGuessedLetters([]);
    setAlphabet(fullAlphabet);
    setWordDisplayed("");
    setWordToGuess(newWord);
    wrongGuesses.current = 0;
  };

  const handleButtonPress = () => {
    resetGame();
  };

  const handleSelectedLetter = (item: string) => {
    setGuessCount(guessCount + 1);
    guessedLetters.push(item);

    const indexOfSelectedLetter = alphabet.indexOf(item);
    alphabet.splice(indexOfSelectedLetter, 1);
    if (hideWord(wordToGuess).includes("*")) {
      if (!wordToGuess.includes(item)) {
        setImageIndex((prev) => prev + 1);
        wrongGuesses.current++;
      }
      if (wrongGuesses.current === 5) {
        setWordDisplayed(wordToGuess.toUpperCase());
        setHideAnswer(false);
        setGameState((prev) => 1);
        setImageIndex((prev) => 8);
      }
    } else {
      setGameState((prev) => 2);
      setImageIndex((prev) => 9);
    }
  };

  const hideWord = (word: string) => {
    const map1 = new Map();
    let i = 0;
    while (i < guessedLetters.length) {
      map1.set(guessedLetters[i], guessedLetters[i]);
      i++;
    }
    const modifiedLetters = word.toUpperCase().split("");

    i = 0;
    while (i < modifiedLetters.length) {
      if (map1.get(modifiedLetters[i]) === modifiedLetters[i]) {
      } else {
        modifiedLetters[i] = "*";
      }
      i++;
    }
    return modifiedLetters.join("");
  };

  useEffect(() => {
    if (gameState === 0) {
      retrieveNewWordToGuess();
    }
    return () => {};
  }, [gameState]);

  return (
    <>
      <br />
      <br />
      <center>
        <h1>Hangman</h1>
      </center>
      <center>
        <HangmanImage index={imageIndex} />
      </center>
      <br />
      <center>
        <table>
          <tbody>
            <tr>
              <td>
                <WordArea
                  word={hideWord(wordToGuess)}
                  style="alert alert-light"
                />
                <table>
                  <tbody>
                    <tr>
                      <td>
                        <WordArea
                          word={wordDisplayed}
                          style="alert alert-info"
                          additionalText="Word: "
                          display={hideAnswer}
                        />
                      </td>
                      <td>
                        <WordArea
                          word={guessedLetters.join()}
                          style="alert alert-success"
                          additionalText="Letters Chosen: "
                        />
                      </td>
                    </tr>
                  </tbody>
                </table>
              </td>
            </tr>
            <tr>
              <td>
                <HangmanDropdown
                  letters={alphabet}
                  gameState={gameState}
                  onSelectItem={handleSelectedLetter}
                />
                <br />
                <center>
                  <HangmanButton
                    onClick={() => handleButtonPress()}
                    gameState={gameState}
                  />
                </center>
              </td>
              <td></td>
            </tr>
          </tbody>
        </table>
      </center>
    </>
  );
}

export default App;
