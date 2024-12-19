import { useState } from "react";

function CartInput({ addItem }) {
  const [inputValue, setInputValue] = useState("");

  const handleAddItem = () => {
    if (inputValue.trim() === "") return; // 빈 값은 추가하지 않음
    addItem(inputValue); // 부모 컴포넌트로 추가 요청
    setInputValue(""); // 입력값 초기화
  };

  return (
    <section>
      <input
        type="text"
        value={inputValue}
        onChange={(event) => setInputValue(event.target.value)}
        placeholder="새로운 아이템 추가"
      />
      <button onClick={handleAddItem}>추가</button>
    </section>
  );
}

export default CartInput;
