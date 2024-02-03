import { ref, computed } from 'vue'
import { defineStore } from 'pinia'

export const useKanbanStore = defineStore('kanban', {
  state: () => ({
    tasks: [
      {
        id: 21,
        name: 'Прочитать книгу'
      },
      {
        id: 22,
        name: 'Продумать архитекутру'
      },
      {
        id: 23,
        name: 'Создать переиспользуемый модуль'
      },
      {
        id: 24,
        name: 'Написать антифрауд'
      }
    ],
    tables: [
      {
      id: 1,
      name: 'Todo',
      tasksIds: [21,22]
    },
    {
      id: 2,
      name: 'In progress',
      tasksIds: [23,24]
    },
    {
      id: 3,
      name: 'Done',
      tasksIds: []
    },
  ],
    draggedTaskId: 0,
    fromTableId: 0,
    targetTableId: 0,
  }),
  getters: {

  },
  actions: {
    setDraggedTaskId(taskId){
      this.draggedTaskId = taskId
    },
    setFromTableId(tableId){
      this.fromTableId = tableId
    },
    setTargetTableId(tableId){
      this.targetTableId = tableId
    },
    addTask(newTask){
      this.tasks.push(newTask)
    },
    addTable(newTable){
      this.tables.push(newTable)
    },
    removeTask(taskId){
      this.tasks.filter((task) => task.id !== taskId)
    },
    removeTable(tableId){
      console.log('removeTable tableId',tableId)
      this.tables = this.tables.filter((table) => table.id !== tableId)
    },
    updateTask(updatedTask){
      let finded = this.tasks.find((task) => task.id === updatedTask.id)
      finded = {...finded,...updatedTask}
    },
    updateTable(updatedTable){
      console.log('updatedTable',updatedTable)
      const mapped = this.tables.map((table) => {
        if(table.id === updatedTable.id){
          console.log('table',table)
          return {...table,...updatedTable}
        }
        return table
      })
      this.tables = mapped
    },
    moveTask(targetTableId){
      console.log('this.fromTableId',this.fromTableId)
      console.log('this.targetTableId',targetTableId)
      const currentTable = this.tables.find((table) => table.id === this.fromTableId)
      const targetTable = this.tables.find((table) => table.id === this.targetTableId)
      console.log('currentTable',currentTable.tasksIds)
      // currentTable.tasksIds = currentTable.tasksIds.filter(this.draggedTaskId)
      currentTable.tasksIds.splice(currentTable.tasksIds.indexOf(this.draggedTaskId),1)
      if(targetTable.tasksIds?.length > 0){
        targetTable.tasksIds.splice(-1,0,this.draggedTaskId)
    
      }else {
        targetTable.tasksIds.push(this.draggedTaskId)
      }
    }
  }
})
