import { useState, useEffect } from "react";

import CartHeader from "./components/CartHeader";
import ShopList from "./components/ShopList";
import CartInput from "./components/CartInput";
import BoughtList from "./components/BoughtList";
import CartFooter from "./components/CartFooter";
import { use } from "react";

function App() {
  const apiUrl = "http://localhost:3000/shoplist";
  // 서버로부터 API 호출해서 쇼핑 목록 받아오기
  // const [itemList, setItemList] = useState([
  //   { id: 1, name: "무", isBought: false },
  //   { id: 2, name: "배추", isBought: false },
  //   { id: 3, name: "쪽파", isBought: true },
  //   { id: 4, name: "고춧가루", isBought: false },
  // ]);
  const [itemList, setItemList] = useState([]);
  // 산 물건 받아오는 함수
  const [showBought, setShowBought] = useState(false);
  // 페이지 로딩 상태 체크 state
  const [isLoading, setIsLoading] = useState(true);
  // 에러메세지 출력을 위한 state
  const [error, setError] = useState(true);

  // API에서 목록 받아오는 함수
  const fetchItems = async () => {
    try {
      const response = await fetch(apiUrl);
      if (!response.ok) {
        throw new Error("데이터를 받아오지 못했습니다.");
      }
      const data = await response.json();
      // console.log(data);
      setItemList(data);
      setIsLoading(false); // 로딩이 끝낫음을 알림
    } catch (err) {
      // console.error(err);
      setError(err.message);
      setIsLoading(false); // 로딩이 끝남
    }
  };
  useEffect(() => {
    fetchItems();
  }, []); // -> 컨포넌트가 처음 로딩되었을때의 이펙트 발생

  if (isLoading) return <div>로딩 중.....</div>;
  // if (error) return <div>에러: {error}</div>;

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
