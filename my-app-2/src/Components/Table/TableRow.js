const formatter = new Intl.NumberFormat('en-US', {
  style: 'currency',
  currency: 'USD',
  minimumFractionDigits: 2,
  maximumFractionDigits: 2,
});

let TableRow = (props) => {
  return (
    <tr>
      <td>{props.data['year']}</td>
      <td>{formatter.format(props.data['savingsEndOfYear'])}</td>
      <td>{formatter.format(props.data['yearlyInterest'])}</td>
      <td>{formatter.format(props.data['totalInterest'])}</td>
      <td>{props.data['totalCapitalInvested']}</td>
    </tr>
  )
}

export default TableRow