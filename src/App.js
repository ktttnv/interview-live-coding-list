// 1. Вывести список из элементов
// 2. Добавить фильтр по типу продукта (select)
// 3. Добавить фильтр по диапазону цены (2xinput минимальная/максимальная)

import React, {useState, useMemo, useCallback} from "react";
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
  const [filters, setFilters] = useState({
    type: "",
    minCost: "",
    maxCost: "",
  });

  const ITEM_TYPES = ["fruit", "vegetable", "berry"];

  const itemFilter = useCallback((item) => {
    if (filters.type && item.type !== filters.type) {
      return false;
    }

    if (filters.minCost && item.cost < filters.minCost) {
      return false;
    }

    if (filters.maxCost && item.cost > filters.maxCost) {
      return false;
    }

    return true;
  }, [filters]);

  const itemsFiltered = useMemo(() => {
    return items.filter(itemFilter);
  }, [filters]);

  return (
    <div>
      <p>Min</p>
      <input onChange={(e) =>
        setFilters((prevState) => {
          return {...prevState, minCost: e.target.value}
        })
      }/>

      <p>Max</p>
      <input onChange={(e) =>
        setFilters((prevState) => {
          return {...prevState, maxCost: e.target.value}
        })
      }/>

      <br/>
      <br/>

      {
        ITEM_TYPES.map(itemType => (
          <button key={itemType} onClick={() =>
            setFilters((prevState) => {
              return {...prevState, type: itemType}
            })
          }>
            { itemType }
          </button>
        ))
      }

      <button onClick={() =>
        setFilters((prevState) => {
          return {...prevState, type: ""}
        })
      }>
        all
      </button>

      <ul>
        {
          itemsFiltered.map(item => (
            <li key={item.label}>{item.label}: {item.cost}</li>
          ))
        }
      </ul>

    </div>
  );
}
