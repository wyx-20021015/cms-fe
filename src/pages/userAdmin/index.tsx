/* eslint-disable @typescript-eslint/no-unused-vars */
import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import Stu from '../../shared/stu'

import { Card, Form, message } from 'antd'
import TableShow from '@/components/Table'
import SearchForm from '@/components/searchForm'
import ConfirmModal from '@/components/ConfirmModal'
import ModalForm from '@/components/ModalForm'
import FormValue from '@/shared/FormValue'
import { createStu, deleteStu, searchStu, updateStu } from '../../service/index'

import './index.scss'

function StuAdmin() {
  const nav = useNavigate()

  const [open, setOpen] = useState(false)
  const [confirmLoading, setConfirmLoading] = useState(false)
  const [modalText, setModalText] = useState('Content of the modal')
  const [isEditable, setIsEditable] = useState(false)
  const [searchInfo, setSearchInfo] = useState<FormValue | null>()
  const [currStu, setCurrStu] = useState<Stu | null>(null)
  const [params, setParams] = useState({
    offset: 1,
    limit: 6
  })
  const [total, setTotal] = useState<number | null>()
  const [stuData, setStuData] = useState<Stu[]>([])
  const [option, setOption] = useState<
    'editing' | 'delete' | 'update' | 'detail' | 'create' | null
  >()
  useEffect(() => {
    loadData().catch((e) => console.log(e))
  }, [params, searchInfo])
  const pageChange = (offset: number, limit: number) => {
    setParams({
      limit,
      offset
    })
  }
  const handleCancel = () => {
    setOpen(false)
    setIsEditable(false)
    setOption(null)
    setCurrStu(null)
  }
  const handleOk = async () => {
    let res
    setModalText('操作中,请勿离开...')
    setConfirmLoading(true)
    switch (option) {
      case 'delete':
        res = await deleteStu(currStu?._id)
        setConfirmLoading(false)
        setOpen(false)
        if (res.success === true) {
          await message.success('成功删除')
          await loadData()
        } else await message.error('删除失败')
        break
      case 'update':
        setOption('editing')
        setConfirmLoading(false)
        setOpen(false)
        setTimeout(() => {
          setIsEditable(true)
        }, 50)
        break
      case 'detail':
        nav(`/detail/${currStu?._id ?? 'none'}`)
        break
      case 'editing':
        form.submit()
        break
      case 'create':
        form.submit()
        break
      default:
        break
    }
    // setCurrStu(null)
  }

  const desc = {
    delete: '删除',
    update: '修改',
    detail: '查看',
    create: '新建'
  }

  const [descript, setDescript] = useState<string | null>()

  const openModal = (data: Stu, options: 'delete' | 'update' | 'detail') => {
    setDescript(desc[options])
    setOption(options)
    setCurrStu(data)
  }
  useEffect(() => {
    if (currStu !== null && descript !== null) {
      form.resetFields()
      setModalText(`确认${descript!} ${currStu?.name ?? ''}`)
      setOpen(true)
    }
  }, [currStu, descript])

  const onFinished = async (value: FormValue) => {
    setParams({ ...params, offset: 1 })
    setSearchInfo(value)
  }

  const loadData = async () => {
    const res = await searchStu({ ...params, ...searchInfo })
    setStuData(res.data.data)
    setTotal(res.data.count)
  }

  const subMitEdit = async (name: any, value: any) => {
    let res
    if (option === 'create') {
      res = await createStu({ ...value.values })
      setCurrStu(null)
      form.resetFields()
      if (res.success === true) {
        setConfirmLoading(false)
        setIsEditable(false)
        await message.success('创建成功')
        await loadData()
      } else {
        await message.error('创建失败了')
        setConfirmLoading(false)
      }
    } else {
      res = await updateStu({ ...value.values, _id: currStu?._id })
      setCurrStu(null)
      form.resetFields()
      if (res.success === true) {
        setConfirmLoading(false)
        setIsEditable(false)
        await message.success('更新成功')
        await loadData()
      } else {
        await message.error('更新失败了')
        setConfirmLoading(false)
      }
    }
  }

  const [form] = Form.useForm()

  const newStudent = () => {
    setCurrStu(null)
    setOption('create')
    setIsEditable(true)
    setConfirmLoading(false)
  }

  return (
    <>
      <ConfirmModal
        isOpen={open}
        handleOk={handleOk}
        confirmLoading={confirmLoading}
        handleCancel={handleCancel}
        modalText={modalText}
      />
      <ModalForm
        subMitEdit={subMitEdit}
        handleCancel={handleCancel}
        handleOk={handleOk}
        form={form}
        currStu={currStu}
        option={option}
        isEditable={isEditable}
      />

      <Card className="card">
        <SearchForm newStudent={newStudent} onFinished={onFinished} />
        <TableShow
          stuData={stuData}
          pageChange={pageChange}
          total={total}
          openModal={openModal}
          params={params}
        />
      </Card>
    </>
  )
}
export default StuAdmin
