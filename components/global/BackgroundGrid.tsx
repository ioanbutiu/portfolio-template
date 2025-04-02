'use client'

import { useEffect, useState } from 'react'
import { useWindowSize } from 'usehooks-ts'

const COLUMN_COUNT = 24
const ROW_COUNT = 24

export function BackgroundGrid() {
  const [columnCount, setColumnCount] = useState(0)

  const { width = 0, height = 0 } = useWindowSize()

  // Calculate initial values based on default width or a minimum
  const initialRowHeight = width ? width / COLUMN_COUNT : 20 // fallback to reasonable default
  const initialRowCount = height ? Math.ceil(height / initialRowHeight) + 2 : ROW_COUNT

  const [rowCount, setRowCount] = useState(initialRowCount)
  const [rowHeight, setRowHeight] = useState(initialRowHeight)


  useEffect(() => {
    if (width > 0 && height > 0) {
      const newRowHeight = width / COLUMN_COUNT
      setRowHeight(newRowHeight)
      setRowCount(Math.ceil(height / newRowHeight) + 2)
    }
  }, [width, height])

  // Don't render if dimensions are invalid
  if (width === 0 || height === 0) return null


  return (
    <div className={``}
      style={{
        display: 'grid',
        gridTemplateColumns: `repeat(${COLUMN_COUNT}, 1fr)`,
        gridTemplateRows: `repeat(${rowCount}, 1fr)`,
        gridColumnGap: '0px',
        gridRowGap: '0px',
        height: '100vh',
        width: '100vw',
        backgroundColor: '#fff',
        position: 'fixed',
        top: '0',
        left: '0',
        zIndex: '-999'
      }}
    >
      {Array.from({ length: COLUMN_COUNT }).map((_, index) => {

        return (
          Array.from({ length: rowCount }).map((_, index2) => {


            return (<div key={index2} className="border-r border-[#e2e2e2]" ></div>)

          })
        )

      })}
    </div>
  )
}