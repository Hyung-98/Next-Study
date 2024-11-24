import React, { useState } from 'react'
import DatePicker from 'react-datepicker'
import { addDays } from 'date-fns'
import { ko } from 'date-fns/locale'

const AdvancedDatepicker: React.FC = () => {
  const [startDate, setStartDate] = useState<Date | null>(null)
  const [endDate, setEndDate] = useState<Date | null>(null)
  const [selectedDate, setSelectedDate] = useState<Date | null>(null)
  const [selectedDateTime, setSelectedDateTime] = useState<Date | null>(null)

  return (
    <DatePicker
      locale={ko}
      selected={selectedDate}
      onChange={(date: Date | null) => setSelectedDate(date)}
      dateFormat="yyyy-MM-dd"
      placeholderText="날짜를 선택해주세요."
      maxDate={new Date()}
      showYearDropdown
      showMonthDropdown
      dropdownMode="select"
    />
  )
}

export default AdvancedDatepicker
