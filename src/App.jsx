import React, { useState } from 'react';
import './App.css';

const App = () => {
  const [component, setComponent] = useState([
    // { id: 0, title: '', content: '', isDone: false }
  ])

  // 제목, 내용을 받을 useState() 선언
  const [title, setTitle] = useState('')
  const [content, setContent] = useState('')

  const titleChangeHandler = (event) => {
    setTitle(event.target.value)
  }

  const contentChangeHandler = (event) => {
    setContent(event.target.value)
  }

  // 추가하기 버튼을 누르면 title, content 정보를 받아옴
  const addButtonHandler = () => {
    const newComponent = {
      id: component.length + 1,
      title,
      content,
      isDone: false
    }
    // 기존의 배열에 추가된 정보를 저장함
    setComponent([...component, newComponent])

    // input 태그는 다시 공란으로 바꾸기
    setTitle('')
    setContent('')
  }

  // TodoList 완료 여부를 isDone true, false 값으로 필터링하기
  const workingTodoList = component.filter((todo) => todo.isDone === false)
  const doneTodosList = component.filter((todo) => todo.isDone === true)

  // 삭제하기 버튼 기능 구현
  const removeListHandler = (id) => {
    const newComponent = component.filter((item) => {
      return item.id !== id
    })
    setComponent(newComponent)
  }

  // 완료 버튼 기능 구현
  // isDone의 값을 true로 변경하여 TodoList Done 리스트에 넣기
  const toggleListHandler = (id) => {
    const newComponent = component.map((item) => {
      if (item.id === id) {
        return {
          ...item,
          isDone: !item.isDone
        }
      } else {
        return item
      }
    })
    setComponent(newComponent)
  }

  return (
    <div className='page'>
      <div className='box'>

        {/* 머릿글 */}
        <div className='header'>
          <span className='left'>My Todo List</span>
          <span className='right'>React</span>
        </div>

        {/* input태그 구현 */}
        <div className='inputBox'>
          제목 : &nbsp;
          <input
            value={title}
            onChange={titleChangeHandler}
          />
          &nbsp;&nbsp;&nbsp;
          내용 :
          &nbsp;
          <input
            className='left'
            value={content}
            onChange={contentChangeHandler}
          />
          <button className='addBtn' onClick={addButtonHandler}>추가하기</button>
        </div>

        {/* 진행중인 Todo List 보여주는 컴포넌트 구현 */}
        <div>
          <br />

          {/* 미완료한 TodoList 보여주기 */}
          <h2>Working 😂</h2>
          <br />
          <div className='content-style'>
            {workingTodoList.length === 0 ? <> 작성한 TodoList가 없습니다...🤔</> :

            workingTodoList.map(function (item) {
                return (
                  <div key={item.id} className='component-stlye'>
                    <h3>{item.title}</h3>
                    <h5>{item.content}</h5>
                    <div className='contentBtn'>
                      <button className='deleteBtn' onClick={() => removeListHandler(item.id)}>삭제하기</button>
                      &nbsp;&nbsp;
                      <button className='doneBtn' onClick={() => toggleListHandler(item.id)}>완료 !!</button>
                    </div>
                  </div>
                )
              } 
            )}
          </div>

          {/* 완료한 TodoList 보여주기 */}
          <h2>Done 🤩</h2>
          <br />
          <div className='content-style'>
            {doneTodosList.length === 0 ? <> 완료한 TodoList가 없습니다...😭</> :

            doneTodosList.map(function (item) {
                return (
                  <div key={item.id} className='component-stlye'>
                    <h3>{item.title}</h3>
                    <h5>{item.content}</h5>
                    <div className='contentBtn'>
                      <button className='deleteBtn' onClick={() => removeListHandler(item.id)}>삭제하기</button>
                      &nbsp;&nbsp;
                      <button className='doneBtn' onClick={() => toggleListHandler(item.id)}>취소 ..</button>
                    </div>
                  </div>
                )
              } 
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
