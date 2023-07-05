import { Check, Trash } from 'phosphor-react'

import styles from './Task.module.css'
import { ITask } from '../Tasks/Tasks'

interface TaskProps {
  task: ITask
  onSelect: (taskId: string) => void
  onDelete: (taskId: string) => void
  isCompleted: boolean
}

export const Task = ({ task, onSelect, onDelete, isCompleted }: TaskProps) => {
  function handleSelectedTask() {
    onSelect(task.id)
  }

  function handleDeleteTask() {
    onDelete(task.id)
  }

  return (
    <div className={styles.cardTask}>
      <div className={styles.checked}>
        <button
          onClick={handleSelectedTask}
          className={
            !isCompleted ? styles.normalButton : styles.completedButton
          }
        >
          {isCompleted ? <Check size={15} /> : null}
        </button>
      </div>
      <p
        onClick={handleSelectedTask}
        className={!isCompleted ? styles.normalItem : styles.selectedItem}
      >
        {task.title}
      </p>
      <button className={styles.deleteButton} onClick={handleDeleteTask}>
        <Trash size={18} />
      </button>
    </div>
  )
}
