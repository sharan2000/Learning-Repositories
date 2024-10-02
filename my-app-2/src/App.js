import { useState } from "react";
import Form from "./Components/Form/Form";
import Header from "./Components/Header/Header";
import Table from "./Components/Table/Table";

function App() {
  let [userInput, setUserInput] = useState(null)

  const calculateHandler = (userInput) => {
    setUserInput(userInput)
  };

  let yearlyData = []

  if(userInput) {
    yearlyData = [];

    let currentSavings = +userInput['current-savings']; // feel free to change the shape of this input object!
    const yearlyContribution = +userInput['yearly-contribution']; // as mentioned: feel free to change the shape...
    const expectedReturn = +userInput['expected-return'] / 100;
    const duration = +userInput['duration'];
    let totalInterest = 0
    let totalCapitalInvested = currentSavings

    // The below code calculates yearly results (total savings, interest etc)
    for (let i = 0; i < duration; i++) {
      const yearlyInterest = currentSavings * expectedReturn;
      totalInterest += yearlyInterest
      totalCapitalInvested += yearlyContribution
      currentSavings += yearlyInterest + yearlyContribution;
      yearlyData.push({
        // feel free to change the shape of the data pushed to the array!
        year: i + 1,
        yearlyInterest,
        savingsEndOfYear: currentSavings,
        totalInterest,
        totalCapitalInvested
      });
    }
  }

  return (
    <div>
      <Header />

      <Form submitData={calculateHandler} />

      { yearlyData?.length > 0 ? <Table yearSplitData={yearlyData} /> : <p style={{'text-align': 'center'}}>No investment data available</p> }
    </div>
  );
}

export default App;
