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
    editableTaskId: 0,
    isTaskModalOpened: false,
    isTaskEditMode: false,
    taskDetails: null
    // editableTask: null

  }),
  getters: {
    // editableTask: (state) => {
    //   return (taskId) => state.tasks.find((task) => task.id === taskId)
    // }
    editableTask: (state) =>state.tasks.find((task) => task.id === state.editableTaskId),
    taskByTable: (state) => {
      return (tableId) => {
        const table = state.tables.find((table) => table.id === tableId)
        console.log('table',table )
       return  state.tasks.filter((task) => {
        return table.tasksIds.includes(task.id)
      }) 
    }
    }

  },
  actions: {
    switchTaskModalOpened(){
      this.isTaskModalOpened = !this.isTaskModalOpened
    },
    switchTaskEditMode(){
      this.isTaskEditMode = !this.isTaskEditMode
    },
    setEditableTask(taskId){
      this.editableTaskId = taskId
      // this.editableTask = this.tasks.find((task) => task.id === taskId)
    },
    setDraggedTaskId(taskId){
      this.draggedTaskId = taskId
    },
    setFromTableId(tableId){
      this.fromTableId = tableId
    },
    setTargetTableId(tableId){
      this.targetTableId = tableId
    },
    setTaskDetails(task){
      this.taskDetails = task
    },
    clearTaskDetails(){
      this.taskDetails = null
    },
    addTask(newTask){
      const mapped = this.tables.map((table) => {
        if(table.id === this.fromTableId){
          return {...table,tasksIds: [...table.tasksIds,newTask.id]}
        }
        return table
      })
      this.tables = mapped
      this.tasks.push(newTask)
      this.switchTaskModalOpened()
    },
    addTable(newTable){
      this.tables.push(newTable)
    },
    removeTask(taskId){
      this.tasks = this.tasks.filter((task) => task.id !== taskId)
    },
    removeTable(tableId){
      console.log('removeTable tableId',tableId)
      this.tables = this.tables.filter((table) => table.id !== tableId)
    },
    updateTask(updatedTask){
      console.log('updatedTask',updatedTask)
      const mapped = this.tasks.map((task) => {
        if(task.id === updatedTask.id){
          console.log('task',task)
          return {...task,...updatedTask}
        }
        return task
      })
      this.tasks = mapped
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
