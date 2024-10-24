import React from 'react'
import { useGetAllSemestersQuery } from '../../../redux/features/academicSemesterApi/academicSemesterApi'

const AcademicSemester = () => {
    const {data} = useGetAllSemestersQuery(undefined);
    console.log(data)
  return (
    <div>AcademicSemester</div>
  )
}

export default AcademicSemester