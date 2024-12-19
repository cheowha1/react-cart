import { useState } from "react";

import CartHeader from "./components/CartHeader";
import ShopList from "./components/ShopList";
import CartInput from "./components/CartInput";
import BoughtList from "./components/BoughtList";
import CartFooter from "./components/CartFooter";

function App() {
  const [itemList, setItemList] = useState([
    { id: 1, name: "무", isBought: false },
    { id: 2, name: "배추", isBought: false },
    { id: 3, name: "쪽파", isBought: true },
    { id: 4, name: "고춧가루", isBought: false },
  ]);
  const [showBought, setShowBought] = useState(false);

  // 구매하지 않은 항목 필터링
  const shopItems = itemList.filter((item) => !item.isBought);
  // 구매한 항목 필터링
  const boughtItems = itemList.filter((item) => item.isBought);

  // 구매 상태 토글
  const toggleBought = (id) => {
    const newItemList = itemList.map((item) =>
      item.id === id ? { ...item, isBought: !item.isBought } : item
    );
    setItemList(newItemList);
  };

  // 항목 삭제
  const deleteItem = (id) => {
    const newItemList = itemList.filter((item) => item.id !== id);
    setItemList(newItemList);
  };

  // 항목 추가
  const addItem = (name) => {
    const newItem = {
      id: itemList.length + 1, // 고유 ID 생성
      name,
      isBought: false, // 기본값: 구매하지 않음
    };
    setItemList([...itemList, newItem]); // 기존 리스트에 새 아이템 추가
  };

  // 구매한 아이템 보이기 상태 변경
  const handleCheckboxChange = () => {
    setShowBought(!showBought);
  };

  return (
    <div>
      <CartHeader />
      <main>
        <section>
          <h2>전체 목록</h2>
          <ul>
            {itemList.map((item) => (
              <li key={item.id}>{item.name}</li>
            ))}
          </ul>
        </section>
        <ShopList
          items={shopItems}
          toggleBought={toggleBought}
          deleteItem={deleteItem}
        />
        <CartInput addItem={addItem} />
        <div>
          <input
            type="checkbox"
            id="show-bought-items"
            checked={showBought}
            onChange={handleCheckboxChange}
          />
          <label htmlFor="show-bought-items">산 물건 보기</label>
        </div>
        {/* 선택적 렌더링 */}
        {showBought && (
          <BoughtList items={boughtItems} toggleBought={toggleBought} />
        )}
      </main>
      <CartFooter />
    </div>
  );
}

export default App;
