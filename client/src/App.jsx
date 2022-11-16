import { useEffect, useState } from 'react'
import axios from "axios"
import 'bootstrap/dist/css/bootstrap.min.css';
import Chart from './Chart';
import Navbar from './Navbar';


function App() {

    const [portfolio, setPortfolio] = useState(null)
    const [isFetching, setIsFetching] = useState(true);

    const fetchData = async () => {
        await axios.get(`http://localhost:3000/user/webportfolio`, {
            withCredentials: true
        }).then(data => {
            setPortfolio(data.data)
            setIsFetching(false);
        }).catch(err => {
            console.log(err);
        })

    }

    useEffect(() => {
        fetchData()
        const comInterval = setInterval(fetchData, 20000)
        return () => clearInterval(comInterval)
    }, [])

    return (
        <div>

            <Navbar />
            <span>
                Current Cash: <br />
                {!isFetching && portfolio.userData.cash} <br />
                Portfolio Value: <br />
                {!isFetching && portfolio.userData.portfolio.toPrecision()} <br />
                Change $: <br />
                {!isFetching && portfolio.userData.change.changeTotal} <br />
                Change %:  <br />
                {!isFetching && portfolio.userData.change.changePercentage}
            </span>


            <table className="table">
                <thead>
                    <tr>
                        <th scope="col"></th>
                        <th scope="col">Ticker</th>
                        <th scope="col">Current Price $</th>
                        <th scope="col">Change $</th>
                        <th scope="col">Change %</th>
                        <th scope="col">Prev Day Close</th>
                        <th scope="col">User Data</th>
                        <th scope="col">Buy Date</th>
                        <th scope="col">Shares</th>
                        <th scope="col">Buy Price $</th>
                        <th scope="col">TotalSpend $ </th>
                        <th scope="col">P/L</th>
                        <th scope="col">Change $</th>
                        <th scope="col">Change %</th>
                    </tr>
                </thead>
                <tbody>
                    {!isFetching && (
                        port.userStocks.map((stock, index) => {
                            return (
                                <tr key={stock.stockticker.toUpperCase()}>
                                    <th scope="row"> {index + 1}</th>
                                    <td> {stock.stockticker.toUpperCase()}</td>
                                    <td> {stock.currentprice}</td>
                                    <td> {stock.change}</td>
                                    <td> {stock.percentChange.toPrecision(3)}</td>
                                    <td> {stock.prevDay}</td>
                                    <td></td>
                                    <td> {stock.buydate.toString().split('T')[0]}</td>
                                    <td> {stock.shares}</td>
                                    <td> {stock.buyprice}</td>
                                    <td> {stock.totalAmountSpend}</td>
                                    <td></td>
                                    <td> {stock.userProfit}</td>
                                    <td> {stock.percent.toPrecision(3)}</td>
                                </tr>
                            )
                        })

                    )}
                </tbody>
            </table>
            <Chart />
        </div>
    );

}

export default App;

