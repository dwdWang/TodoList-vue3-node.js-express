const BASE_URL = 'https://sdtrnhjfbncc.sealosbja.site'//生产环境
//const BASE_URL = 'https://luntqxnkxhyx.sealosbja.site'//测试环境


export interface Todo {
  _id: string
  value: string
  isCompleted: boolean
  createdAt: string
  updatedAt: string
}

export async function fetchTodos(): Promise<Todo[]> {
  const response = await fetch(`${BASE_URL}/api/get-todo`)
  if (!response.ok) throw new Error('Failed to fetch todos')
  return response.json()
}

export async function createTodo(value: string): Promise<Todo> {
  const response = await fetch(`${BASE_URL}/api/add-todo`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ value, isCompleted: false })
  })
  if (!response.ok) throw new Error('Failed to create todo')
  return response.json()
}

export async function toggleTodo(id: string): Promise<Todo> {
  const response = await fetch(`${BASE_URL}/api/update-todo`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ id })
  })
  if (!response.ok) throw new Error('Failed to update todo')
  return response.json()
}

export async function deleteTodo(id: string): Promise<void> {
  const response = await fetch(`${BASE_URL}/api/del-todo`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ id })
  })
  if (!response.ok) throw new Error('Failed to delete todo')
}
