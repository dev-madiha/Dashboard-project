import React from 'react'
import WeekyCons from '../../components/WeeklyCons/WeeklyCons'

import AvgDuration from '../../components/AvgDuration/AvgDuration'



const Consolations = () => {
  return (
   <div>
       
        <div className="grid my-6 grid-cols-12 gap-6 items-stretch">
          <div className="col-span-8 xl:col-span-6">
            <WeekyCons />{" "}
          </div>
          <div className="col-span-6 xl:col-span-6">
            <AvgDuration />
          </div>
        </div>
      </div>
  )
}

export default Consolations