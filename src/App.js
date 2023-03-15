// 1. Вывести список из элементов
// 2. Добавить фильтр по типу продукта (select)
// 3. Добавить фильтр по диапазону цены (2xinput минимальная/максимальн)

import React, {useState, useMemo} from "react";
import "./styles.css";

const items = [
  { label: "Apple", cost: 10, type: "fruit" },
  { label: "Orange", cost: 20, type: "fruit" },
  { label: "Banana", cost: 18, type: "fruit" },
  { label: "Tomato", cost: 15, type: "vegetable" },
  { label: "Cucumber", cost: 8, type: "vegetable" },
  { label: "Watermelon", cost: 5, type: "berry" },
  { label: "Strawberry", cost: 50, type: "berry" },
  { label: "Blackberry", cost: 40, type: "berry" }
];

export default function App() {
  const [productFilter, setProductFilter] = useState("");
  const [minValue, setMinValue] = useState("");
  const [maxValue, setMaxValue] = useState("");

  const filterItems = (productFilter, minValue, maxValue) => {
    return items.filter(item => {
      if (productFilter && item.type !== productFilter) {
        return false;
      }

      if (minValue && item.cost < minValue) {
        return false;
      }

      if (maxValue && item.cost > maxValue) {
        return false;
      }

      return true;
    })
  }

  const memoizedResultForFilterItems = useMemo(() =>
    filterItems(productFilter, minValue, maxValue),
    [productFilter, minValue, maxValue]);

  const itemsElements = memoizedResultForFilterItems.map(item => (
    <li key={item.label}>{item.label}: {item.cost}</li>
  ));

  return (
  <div>
    <p>Min</p>
    <input onChange={(e) => setMinValue(e.target.value)}/>
    <p>Max</p>
    <input onChange={(e) => setMaxValue(e.target.value)}/>

    <br/>
    <br/>

    <button onClick={() => {
      setProductFilter("fruit");
    }}>
      fruits
    </button>
    <button onClick={() => {
      setProductFilter("vegetable");
    }}>
      vegetables
    </button>
    <button onClick={() => {
      setProductFilter("berry");
    }}>
      berries
    </button>
    <button onClick={() => {
      setProductFilter("");
    }}>
      all
    </button>

    <ul>
      {itemsElements}
    </ul>

  </div>);
}
