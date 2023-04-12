import { useState } from "react";
import Card from "../UI/Card";
import "./Expenses.css";
import ExpensesChart from "./ExpensesChart";
import ExpensesFilter from "./ExpensesFilter";
import ExpensesList from "./ExpensesList";

const Expenses = (props) => {
  const [filteredYear, setFilteredYear] = useState("2019");

  const expenseYearSelectHandler = (selectedYearInExpensesFilter) => {
    console.log(selectedYearInExpensesFilter);
    setFilteredYear(selectedYearInExpensesFilter);
  };

  const filteredArray = props.items.filter(
    (element) => element.date.getFullYear().toString() === filteredYear
  );

  return (
    <div>
      <Card className="expenses">
        <ExpensesFilter // Controlled component
          onYearSelect={expenseYearSelectHandler}
          defaultYear={filteredYear} // 2 way binding
        />
        <ExpensesChart expenses={filteredArray} />

        {/* {filteredArray.length === 0 ? ( // displaying filtered Approach 1
          <p style={{ color: "white", textAlign: "center" }}>
            No expenses found!
          </p>
        ) : (
          filteredArray.map((element) => {
            return (
              <ExpenseItem
                key={element.id}
                title={element.title}
                amount={element.amount}
                date={element.date}
              />
            );
          })
        )} */}

        {/* {filteredArray.length === 0 && ( // displaying filtered Approach 2
          <p style={{ color: "white", textAlign: "center" }}>
            No expenses found!
          </p>
        )}
        {filteredArray.length > 0 &&
          filteredArray.map((element) => {
            return (
              <ExpenseItem
                key={element.id}
                title={element.title}
                amount={element.amount}
                date={element.date}
              />
            );
          })} */}

        <ExpensesList items={filteredArray} />
        {/*displaying filtered Approach 3*/}

        {/* {props.items.map((element) => { // to get all expenses
          return (
            <ExpenseItem
              key={element.id}
              title={element.title}
              amount={element.amount}
              date={element.date}
            />
          );
        })} */}
        {/* <ExpenseItem
          title={props.items[0].title}
          amount={props.items[0].amount}
          date={props.items[0].date}
        />
        <ExpenseItem
          title={props.items[1].title}
          amount={props.items[1].amount}
          date={props.items[1].date}
        />
        <ExpenseItem
          title={props.items[2].title}
          amount={props.items[2].amount}
          date={props.items[2].date}
        />
        <ExpenseItem
          title={props.items[3].title}
          amount={props.items[3].amount}
          date={props.items[3].date}
        /> */}
      </Card>
    </div>
  );
};

export default Expenses;
