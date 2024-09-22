import './Chart.css'
import ChartBar from './ChartBar';

const Chart = (props) => {
  let dataPointsValues = props.dataPoints.map((item) => item.value)
  let maxValue = Math.max(...dataPointsValues)

  return (
    <div className='chart'>
      {props.dataPoints.map(item => <ChartBar key={item.label} value={item.value} label={item.label} maxValue={maxValue} />)}
    </div>
  )
}

export default Chart;