import styles from './DefaultTaskItem.module.css'
import { Clipboard } from 'phosphor-react'
export const DefaultTaskItem = () => {
  return (
    <div className={styles.defaultContainer}>
      <Clipboard size={60} />
      <strong>Você ainda não possui tarefas cadastradas</strong>
      <p>Crie tarefas e organize seus itens a fazer</p>
    </div>
  )
}
