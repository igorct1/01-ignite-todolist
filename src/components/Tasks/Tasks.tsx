import { v4 as uuidv4 } from 'uuid'
import { DefaultTaskItem } from '../DefaultTaskItem/DefaultTaskItem'
import { Task } from '../Task/Task'
import { useEffect, useState } from 'react'

import styles from './Tasks.module.css'

export interface ITask {
  id: string
  title: string
  isCompleted: boolean
}

export const Tasks = () => {
  const [tasks, setTasks] = useState<ITask[]>([])
  const [newTask, setNewTask] = useState('')
  const completedTasks = tasks.reduce((acc, item) => {
    if (item.isCompleted) {
      acc++
    }
    return acc
  }, 0)

  function handleNewTask({ target }: { target: HTMLInputElement }) {
    setNewTask(target.value)
  }

  function addTaskToLocalStorage(tasks: ITask[]) {
    localStorage.setItem('tasks', JSON.stringify(tasks))
  }

  function removeTaskFromLocalStorage(newListWhenDeleted: ITask[]) {
    localStorage.setItem('tasks', JSON.stringify(newListWhenDeleted))
  }

  function onAddTask() {
    const newTaskList = [
      ...tasks,
      { id: uuidv4(), title: newTask, isCompleted: false },
    ]
    setTasks(newTaskList)

    addTaskToLocalStorage(newTaskList)

    setNewTask('')
  }

  function onSelect(taskId: string) {
    const newTaskList = tasks.map((task) => {
      if (task.id === taskId) {
        task.isCompleted = !task.isCompleted
      }
      return task
    })
    setTasks(newTaskList)

    addTaskToLocalStorage(newTaskList)
  }

  function onDelete(taskId: string) {
    const newTaskList = tasks.filter((task) => task.id !== taskId)
    setTasks(newTaskList)

    removeTaskFromLocalStorage(newTaskList)
  }

  useEffect(() => {
    const tasks = localStorage.getItem('tasks')

    if (tasks) {
      setTasks(JSON.parse(tasks))
    }
  }, [])

  return (
    <div className={styles.tasksContainer}>
      <div className={styles.inputContainer}>
        <input
          type="text"
          placeholder="Adicione uma nova tarefa.."
          value={newTask}
          onChange={handleNewTask}
        />
        {newTask.length > 0 ? (
          <button onClick={onAddTask}>Criar</button>
        ) : (
          <button disabled onClick={onAddTask}>
            Criar
          </button>
        )}
      </div>
      <div className={styles.createdAndCompletedTasks}>
        <header className={styles.createdAndCompletedTasksContainer}>
          <strong className={styles.createdTasks}>
            Tarefas criadas <span>{tasks.length}</span>
          </strong>
          <strong className={styles.completedTasks}>
            Concluídas{' '}
            <span>
              {completedTasks} de {tasks.length}
            </span>
          </strong>
        </header>
      </div>
      <div className={styles.tasksWrapper}>
        {tasks.length ? (
          tasks.map((task) => (
            <Task
              key={task.id}
              task={task}
              onSelect={onSelect}
              onDelete={onDelete}
              isCompleted={task.isCompleted}
            />
          ))
        ) : (
          <DefaultTaskItem />
        )}
      </div>
    </div>
  )
}
