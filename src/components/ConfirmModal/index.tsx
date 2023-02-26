import React from 'react'
import { Modal } from 'antd'
type IProp = {
  isOpen: boolean
  handleOk: () => Promise<void>
  confirmLoading: boolean
  handleCancel: () => void
  modalText: string
}
const ConfirmModal: React.FC<IProp> = (props) => {
  const { isOpen, handleOk, confirmLoading, handleCancel, modalText } = props
  return (
    <Modal
      title="确认操作"
      open={isOpen}
      onOk={handleOk}
      confirmLoading={confirmLoading}
      onCancel={handleCancel}
      cancelText="取消"
      okText="确认"
    >
      <p>{modalText}</p>
    </Modal>
  )
}

export default ConfirmModal
