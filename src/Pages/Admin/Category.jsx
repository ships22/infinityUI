import axios from 'axios'

import { useContext, useEffect, useState } from 'react'
import { Button, Container, Table } from 'react-bootstrap'
import { toast } from 'react-toastify'
import {
  ADD_CATEGORIES,
  LOAD_CATEGORIES,
  UPDATE_CATEGORIES,
} from '../../actionTypes'
import CategoryModal from '../../Components/Category/CategoryModal'
import CategoryTr from '../../Components/Category/CategoryTr'
import { CategoryContext } from '../../contexts'
import { BACKEND_URL } from '../../utils'

import { AuthContext } from '../../contexts'

function Category() {
  const { auth, authDispatch } = useContext(AuthContext)
  console.log('test auth here in admin category :', auth)
  const [showModal, setShowModal] = useState(false)
  const { categoryInfo, categoryDispatch } = useContext(CategoryContext)
  useEffect(() => {
    console.log('tes cat load :', categoryInfo)
  }, [categoryInfo])
  useEffect(() => {
    if (!categoryInfo.isLoaded) {
      axios
        .get(`${BACKEND_URL}/categories`)
        .then((res) => {
          const { status, data } = res

          console.log('tes cat load api:', res)

          if (status) {
            categoryDispatch({
              type: LOAD_CATEGORIES,
              payload: data,
            })

            toast.success('Category loaded')
          } else {
            toast.error('Something wen wrong')
          }
        })
        .catch()
    }
  }, [])

  const handleShowModal = () => {
    setShowModal((prvSt) => !prvSt)
  }

  const saveCategory = (data) => {
    axios
      .post(`${BACKEND_URL}/categories`, data)
      .then((res) => {
        const { status, data } = res
        if (status) {
          categoryDispatch({
            type: ADD_CATEGORIES,
            payload: data,
          })

          toast.success('Category added successfully')
          handleShowModal()
        } else {
          toast.error('Something went wrong')
        }
      })
      .catch((err) => {
        toast.error('Server Error!')
        console.log(err)
      })
  }

  const updateCategory = (data) => {
    console.log('test upd cat :', data)
    axios
      .put(`${BACKEND_URL}/categories`, data)
      .then((res) => {
        const { status, data } = res
        console.log('test upd cat 2:', res)
        if (status) {
          categoryDispatch({
            type: UPDATE_CATEGORIES,
            payload: data,
          })

          toast.success('Successfully updated')
          handleShowModal()
        } else {
          toast.error('Somesthing went wrong')
        }
      })
      .catch((err) => {
        toast.error('Server Error!')
        console.log(err)
      })
  }

  return (
    <Container className='mx-auto'>
      <div className='clearfix my-2'>
        <h1 className='float-start'>Category</h1>
        <Button
          onClick={handleShowModal}
          className='float-end'
          variant='primary'
        >
          Add Category
        </Button>
      </div>

      <hr />

      {categoryInfo.isLoaded ? (
        <Table striped bordered hover>
          <thead>
            <tr>
              <th>Id</th>
              <th>Name</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {categoryInfo.categories.map((cat, index) => (
              <CategoryTr
                handleShowModal={handleShowModal}
                category={cat}
                key={index}
              />
            ))}
          </tbody>
        </Table>
      ) : (
        <div className='text-center my-5'>
          <h4>Loading..............</h4>
        </div>
      )}

      <CategoryModal
        show={showModal}
        handleClose={handleShowModal}
        saveCategory={saveCategory}
        updateCategory={updateCategory}
      />
    </Container>
  )
}

export default Category
