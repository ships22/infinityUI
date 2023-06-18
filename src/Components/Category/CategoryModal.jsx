import { useContext, useEffect, useState } from 'react'
import { Modal, Form, Button } from 'react-bootstrap'
import { REMOVE_CATEGORIES } from '../../actionTypes'
import { CategoryContext } from '../../contexts'

function CategoryModal({ show, handleClose, saveCategory, updateCategory }) {
  const { categoryInfo, categoryDispatch } = useContext(CategoryContext)
  const [state, setState] = useState({
    categoryId: '',
    categoryValue: '',
    isLoading: false,
  })

  useEffect(() => {
    if (categoryInfo.selectedCategory) {
      console.log('test cat :', categoryInfo.selectedCategory)
      setState((prvSt) => {
        return {
          ...prvSt,
          categoryId: categoryInfo.selectedCategory.categoryId,
          categoryValue: categoryInfo.selectedCategory.categoryValue,
        }
      })
    }
  }, [categoryInfo, show])

  const onChangeHandler = (e) => {
    setState((prvSt) => {
      return {
        ...prvSt,
        [e.target.name]: e.target.value,
      }
    })
  }

  const onSubmitHandler = (e) => {
    e.preventDefault()
    setState((prevSt) => ({ ...prevSt, isLoading: true }))

    if (categoryInfo.selectedCategory) {
      updateCategory(state)
    } else {
      saveCategory(state)
    }
  }

  const resetState = () => {
    categoryDispatch({ type: REMOVE_CATEGORIES })

    setTimeout(() => {
      setState({
        categoryId: '',
        categoryValue: '',
        isLoading: false,
      })
    }, 5)
  }

  return (
    <Modal show={show} onHide={handleClose} onExit={resetState}>
      <Modal.Header closeButton>
        <Modal.Title>
          {categoryInfo.selectedCategory ? 'Edit category' : 'Add New Category'}
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form onSubmit={onSubmitHandler}>
          <Form.Group className='mb-3' controlId='cat_name'>
            <Form.Label>Category Name</Form.Label>
            <Form.Control
              onChange={onChangeHandler}
              type='text'
              name='categoryValue'
              value={state.categoryValue}
              placeholder='Ex: Ladies'
              disabled={state.isLoading}
            />
          </Form.Group>
          <Button variant='primary' type='submit' disabled={state.isLoading}>
            {state.isLoading ? 'Loading...' : 'Submit'}
          </Button>
        </Form>
      </Modal.Body>
    </Modal>
  )
}

export default CategoryModal
