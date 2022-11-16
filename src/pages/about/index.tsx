import React, { useState, useEffect } from 'react'
import MdViewer from '../../components/MdViewer/MdViewer'
import { fetchMd } from '../../service/index'
import { useLocation } from 'react-router'
function About() {
  const location = useLocation()
  const [resource, setResource] = useState<string>(' ')
  useEffect(() => {
    const path = location.search.split('=')[1].replace('/about', '')
    async function load() {
      const res = await fetchMd(path)
      setResource(res.data)
    }
    load().catch((e) => {
      alert('出错啦QAQ')
    })
  }, [location.search])
  return <MdViewer textContent={resource} />
}

export default About
