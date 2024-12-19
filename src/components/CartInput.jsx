import { useState } from "react";

function CartInput({ onAdd }) {
  const [inputValue, setInputValue] = useState("");

  const handleAdd = () => {
    if (inputValue.trim() !== "") {
      onAdd(inputValue);
      setInputValue("");
    }
  };

  return (
    <section>
      <input
        type="text"
        value={inputValue}
        onChange={(e) => setInputValue(e.target.value)}
        placeholder="물건 이름 입력"
      />
      <button onClick={handleAdd}>추가</button>
    </section>
  );
}

export default CartInput;
