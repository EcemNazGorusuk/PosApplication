import React from 'react'

export default function StatisticCard({img,name,subName}) {
  return (
    <div className="card-item statistic-bg p-8 rounded-lg">
    <div className="flex gap-x-4">
      <div className="rounded-full bg-white w-16 h-16 p-3">
        <img src={img} alt="user" className="object-contain " />
      </div>
      <div className="text-white">
        <p className="mb-2 text-lg font-medium text-white">
          {name}
        </p>
        <p className="text-xl font-semibold text-gray-200">{subName}</p>
      </div>
    </div>
  </div>
  )
}
