import React from 'react'
import { Empty } from 'antd'
import './index.scss'

const Notfound: React.FC = () => (
  <div className="not-found">
    <Empty description={false} />
  </div>
)

export default Notfound
