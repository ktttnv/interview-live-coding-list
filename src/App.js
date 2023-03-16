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

const ITEM_TYPES = {
  Fruit: "fruit",
  Vegetable: "vegetable",
  Berry: "berry",
}

const ITEM_TYPES_ARRAY = Object.values(ITEM_TYPES);

const isNumber = (value) => {
  return !Number.isNaN(Number(value));
}

export default function App() {
  const [filters, setFilters] = useState({
    type: "",
    minCost: "",
    maxCost: "",
  });

  const itemFilter = useCallback((item) => {
    if (filters.type && item.type !== filters.type) {
      return false;
    }

    if (filters.minCost && isNumber(filters.minCost) && item.cost < filters.minCost) {
      return false;
    }

    if (filters.maxCost && isNumber(filters.maxCost) && item.cost > filters.maxCost) {
      return false;
    }

    return true;
  }, [filters]);

  const itemsFiltered = useMemo(() => {
    return items.filter(itemFilter);
  }, [filters]);

  const handleFilterChange = (key, value) => {
    setFilters((prevState) => ({
      ...prevState,
      [key]: value,
    }));
  }

  return (
    <div>
      <p>Min cost</p>
      <input onChange={(e) => handleFilterChange("minCost", e.target.value)}/>
      {
        !isNumber(filters.minCost) &&
        <span>Input value must be number</span>
      }

      <p>Max cost</p>
      <input onChange={(e) => handleFilterChange("maxCost", e.target.value)}/>
      {
        !isNumber(filters.maxCost) &&
        <span>Input value must be number</span>
      }

      <br/>
      <br/>

      {
        ITEM_TYPES_ARRAY.map(itemType => (
          <button key={itemType} onClick={() => handleFilterChange("type", itemType)}>
            {itemType}
          </button>
        ))
      }

      <button onClick={() => handleFilterChange("type", "")}>
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
