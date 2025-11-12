import React from 'react'
import AvgDuration from '../../components/AvgDuration/AvgDuration'
import MonthlyTrends from '../../components/MonthlyTrend/MonthlyTrend'
const Overview = () => {
  return (
    <div>
       
        <div className="grid my-6 grid-cols-12 gap-6 items-stretch">
          <div className="col-span-12 xl:col-span-12">
           <MonthlyTrends/>
          </div>
          <div className="col-span-12 xl:col-span-12">
            <AvgDuration />
          </div>
        </div>
      </div>
  )
}

export default Overview