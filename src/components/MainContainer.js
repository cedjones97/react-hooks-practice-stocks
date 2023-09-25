import React, {useState, useEffect } from "react";
import StockContainer from "./StockContainer";
import PortfolioContainer from "./PortfolioContainer";
import SearchBar from "./SearchBar";

function MainContainer() {
  
  const [stocks, setStocks] = useState([])
  const [sort, setSort] = useState('Alphabetically')
  const [filter, setFilter] = useState('Tech')
  const [portfolio, setPortfolio] = useState([])

  
  useEffect(() => {
    fetch('http://localhost:3001/stocks')
    .then(res => res.json())
    .then(setStocks)
  }, [])

  const handleAddStock = (stockToAdd) => {
    const stockInPortfolio = portfolio.find(stock => stock.id === stockToAdd.id);

    if (!stockInPortfolio) {
      setPortfolio([...portfolio, stockToAdd])
    }

  }

  const handleRemoveStock = (stockToRemove) => {
    setPortfolio(portfolio.filter(stock => stock.id !== stockToRemove.id))
  }
  
  const sortedStocks = [...stocks].sort((a, b) => {
    if (sort === 'Alphabetically') {
      return a.name.localeCompare(b.name)
    } else {
      return a.price - b.price
    }
  
  })

  const filteredStocks = sortedStocks.filter(stock => stock.type === filter)

  return (
    <div>
      <SearchBar sort={sort} onChangeSort={setSort} filter={filter} onChangeFilter={setFilter}/>
      <div className="row">
        <div className="col-8">
          <StockContainer stocks={filteredStocks} add={handleAddStock}/>
        </div>
        <div className="col-4">
          <PortfolioContainer stocks={portfolio} remove={handleRemoveStock} />
        </div>
      </div>
    </div>
  );
}

export default MainContainer;
