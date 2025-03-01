const express = require('express');
const router = express.Router();
const Todo = require('../models/Todo'); // 引入Todo模型

// 1. 查询所有待办事项
// GET /api/get-todo
router.get('/get-todo', async (req, res) => {
    try {
        // 从数据库中查询所有待办事项
        const todos = await Todo.find({});
        // 返回查询结果数组
        res.json(todos);
    } catch (error) {
        console.error("Error fetching todos:", error);
        res.status(500).json({ error: 'Error fetching todos' });
    }
});

// 2. 添加新的待办事项
// POST /api/add-todo
router.post('/add-todo', async (req, res) => {
    try {
        const { value, isCompleted } = req.body;
        // 输入验证：必须提供待办事项的内容
        if (!value) {
            return res.status(400).json({ error: "'value' field is required" });
        }
        // 创建新的Todo对象
        const todo = new Todo({
            value,
            isCompleted: isCompleted || false,
        });
        // 将新对象保存到数据库
        const savedTodo = await todo.save();
        // 返回新添加的待办事项对象
        res.json(savedTodo);
    } catch (error) {
        console.error("Error adding todo:", error);
        res.status(500).json({ error: 'Error adding todo' });
    }
});

// 3. 更新待办事项状态（取反 isCompleted）
// POST /api/update-todo
router.post('/update-todo', async (req, res) => {
    try {
        const { id } = req.body;
        // 输入验证：必须提供id
        if (!id) {
            return res.status(400).json({ error: "'id' field is required" });
        }
        // 查找对应的待办事项
        const todo = await Todo.findById(id);
        if (!todo) {
            return res.status(404).json({ error: 'Todo not found' });
        }
        // 更新状态（取反）
        todo.isCompleted = !todo.isCompleted;
        const updatedTodo = await todo.save();
        // 返回更新后的待办事项对象
        res.json(updatedTodo);
    } catch (error) {
        console.error("Error updating todo:", error);
        res.status(500).json({ error: 'Error updating todo' });
    }
});

// 4. 删除待办事项
// POST /api/del-todo
router.post('/del-todo', async (req, res) => {
    try {
        const { id } = req.body;
        // 输入验证：必须提供id
        if (!id) {
            return res.status(400).json({ error: "'id' field is required" });
        }
        // 根据id删除待办事项
        const result = await Todo.findByIdAndDelete(id);
        if (!result) {
            return res.status(404).json({ error: 'Todo not found' });
        }
        // 返回删除结果状态
        res.json({ message: 'Todo deleted successfully' });
    } catch (error) {
        console.error("Error deleting todo:", error);
        res.status(500).json({ error: 'Error deleting todo' });
    }
});

module.exports = router;
