# Todo API 测试用例

基础 URL: https://luntqxnkxhyx.sealosbja.site

## 1. 创建待办事项 (Create Todo)

**请求方法**: POST  
**接口路径**: /api/add-todo  

### 成功用例
```bash
curl -X POST https://luntqxnkxhyx.sealosbja.site/api/add-todo -H "Content-Type: application/json" -d "{\"value\": \"完成作业\", \"isCompleted\": false}"
```

**预期响应** (200 OK):
```json
{
  "value": "完成作业",
  "isCompleted": false,
  "_id": "65f16d8e9a5d7b001c123456",
  "createdAt": "2024-03-13T10:30:22.123Z",
  "updatedAt": "2024-03-13T10:30:22.123Z"
}
```

### 失败用例 (缺少必填字段)
```bash
curl -X POST https://luntqxnkxhyx.sealosbja.site/api/add-todo -H "Content-Type: application/json" -d "{}"
```

**预期响应** (400 Bad Request):
```json
{
  "error": "'value' field is required"
}
```

## 2. 获取所有待办事项 (Get All Todos)

**请求方法**: GET  
**接口路径**: /api/get-todo

### 成功用例
```bash
curl https://luntqxnkxhyx.sealosbja.site/api/get-todo
```

**预期响应** (200 OK):
```json
[
  {
    "_id": "65f16d8e9a5d7b001c123456",
    "value": "完成作业",
    "isCompleted": false,
    "createdAt": "2024-03-13T10:30:22.123Z",
    "updatedAt": "2024-03-13T10:30:22.123Z"
  }
]
```

## 3. 更新待办事项 (Update Todo)

**请求方法**: POST  
**接口路径**: /api/update-todo

### 成功用例
```bash
curl -X POST https://luntqxnkxhyx.sealosbja.site/api/update-todo -H "Content-Type: application/json" -d "{\"id\": \"65f16d8e9a5d7b001c123456\"}"
```

**预期响应** (200 OK):
```json
{
  "_id": "65f16d8e9a5d7b001c123456",
  "value": "完成作业",
  "isCompleted": true,
  "createdAt": "2024-03-13T10:30:22.123Z",
  "updatedAt": "2024-03-13T10:31:15.789Z"
}
```

### 失败用例 (ID不存在)
```bash
curl -X POST https://luntqxnkxhyx.sealosbja.site/api/update-todo -H "Content-Type: application/json" -d "{\"id\": \"nonexistentid\"}"
```

**预期响应** (404 Not Found):
```json
{
  "error": "Todo not found"
}
```

## 4. 删除待办事项 (Delete Todo)

**请求方法**: POST  
**接口路径**: /api/del-todo

### 成功用例
```bash
curl -X POST https://luntqxnkxhyx.sealosbja.site/api/del-todo -H "Content-Type: application/json" -d "{\"id\": \"65f16d8e9a5d7b001c123456\"}"
```

**预期响应** (200 OK):
```json
{
  "message": "Todo deleted successfully"
}
```

### 失败用例 (ID不存在)
```bash
curl -X POST https://luntqxnkxhyx.sealosbja.site/api/del-todo -H "Content-Type: application/json" -d "{\"id\": \"nonexistentid\"}"
```

**预期响应** (404 Not Found):
```json
{
  "error": "Todo not found"
}
```
