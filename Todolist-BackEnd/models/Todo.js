const mongoose = require('mongoose');

// 定义待办事项的Schema，包含具体内容和完成状态
const TodoSchema = new mongoose.Schema({
    // 待办事项的内容
    value: { 
        type: String,
        required: true, // 必须提供
    },
    // 待办事项是否完成
    isCompleted: { 
        type: Boolean,
        default: false, // 默认为false
    },
}, { timestamps: true }); // 自动创建 createdAt 和 updatedAt 字段

// 创建并导出模型
module.exports = mongoose.model('Todo', TodoSchema);
