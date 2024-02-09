import { useState } from "react";

interface HangemanDropdownProps {
  letters: string[];
  gameState: number;
  onSelectItem: (item: string) => void;
}

const HangmanDropdown = ({
  letters,
  gameState,
  onSelectItem,
}: HangemanDropdownProps) => {
  const [selectedIndex, setSelectedIndex] = useState(-1);

  return (
    <div className="dropdown">
      <button
        className="btn btn-secondary dropdown-toggle"
        type="button"
        data-bs-toggle="dropdown"
        aria-expanded="false"
        style={{ display: gameState > 0 ? "none" : "" }}
      >
        Choose a Letter
      </button>
      <ul className="dropdown-menu">
        {letters.map((item, index) => (
          <li key={item}>
            <a
              className="dropdown-item"
              key={item}
              onClick={() => {
                setSelectedIndex(index);
                onSelectItem(item);
              }}
            >
              {item}
            </a>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default HangmanDropdown;
