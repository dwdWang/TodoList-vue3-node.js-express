# Todo List

该项目是一个基于 Node.js + Express 和 Vue 3 构建的 Todo List 应用。
代码并不复杂，非常适合新手来了解，从而成长成全栈开发者。

## 功能描述

### 后端功能
后端实现了以下 RESTful API 接口：

1. **查询所有待办事项**
   - **接口名**: `GET /api/get-todo`
   - **功能**: 从数据库的 `list` 集合中查询并返回所有待办事项
   - **参数**: 无
   - **返回**: 包含所有待办事项的数组

2. **添加新的待办事项**
   - **接口名**: `POST /api/add-todo`
   - **功能**: 向 `list` 集合中添加新的待办事项
   - **参数**:
     ```json
     {
       "value": "string", // 待办事项的具体内容
       "isCompleted": "boolean" // 是否完成，默认为 false
     }
     ```
   - **返回**: 新添加的待办事项对象，包含自动生成的唯一 `id`

3. **更新待办事项状态**
   - **接口名**: `POST /api/update-todo/:id`
   - **功能**: 根据 `id` 更新指定待办事项的完成状态（将 `isCompleted` 值取反）
   - **参数**: `id` (URL 参数)
   - **返回**: 更新后的待办事项对象

4. **删除待办事项**
   - **接口名**: `POST /api/del-todo/:id`
   - **功能**: 根据 `id` 删除指定的待办事项
   - **参数**: `id` (URL 参数)
   - **返回**: 删除操作的结果状态

### 前端功能
1. 添加新的待办事项
2. 标记待办事项为完成/未完成
3. 删除待办事项
4. 统计待办事项完成度
5. 过滤显示（全部/已完成/未完成）

## 技术栈
### 后端
- Node.js + Express
- MongoDB (数据库)
- Mongoose (ODM for MongoDB)
- Async/await syntax
- RESTful API design
- Basic logging

### 前端
- Vue 3
- Responsive design
- Light/dark mode
- Modern and clean UI
- Smooth animations
- Icons and intuitive interactions

## 数据库连接方式
在后端项目中，把 MongoDB 的链接替换成您自己的MongoDB数据库链接即可。
