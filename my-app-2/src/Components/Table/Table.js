import styles from './Table.module.css'
import TableRow from './TableRow'


let Table = (props) => {
  return (
    <table className={styles.result}>
      <thead>
        <tr>
          <th>Year</th>
          <th>Total Savings</th>
          <th>Interest (Year)</th>
          <th>Total Interest</th>
          <th>Invested Capital</th>
        </tr>
      </thead>
      <tbody>
        { props.yearSplitData.map((item) => <TableRow key={item.year} data={item} />) }
      </tbody>
    </table>
  )
}

export default Table