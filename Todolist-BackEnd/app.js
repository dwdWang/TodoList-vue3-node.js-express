const express = require('express');
const mongoose = require('mongoose');
const morgan = require('morgan');
const todoRoutes = require('./routes/todo');
const cors = require('cors');

const app = express();

// 使用 morgan 记录HTTP请求日志
app.use(morgan('dev'));

// 配置允许的域名列表
const allowedOrigins = [
    'http://localhost:3000',
    'https://nlwdueqnxtmi.sealosbja.site',
    'https://luntqxnkxhyx.sealosbja.site',
    'https://lvkpxxalpsfq.sealosbja.site'
];

// 配置 CORS
app.use(cors({
    origin: function (origin, callback) {
        // 允许没有origin的请求（比如移动应用）
        if (!origin) return callback(null, true);
        
        if (allowedOrigins.indexOf(origin) !== -1) {
            callback(null, true);
        } else {
            callback(new Error('Not allowed by CORS'));
        }
    },
    credentials: true,
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization', 'X-Requested-With'],
    exposedHeaders: ['Content-Range', 'X-Content-Range'],
    maxAge: 86400
}));

// 解析 JSON 请求体
app.use(express.json());

// 连接 MongoDB 数据库
mongoose.connect('mongodb://root:6q5pfvnd@homework1-mongodb.ns-l3q0rpfd.svc:27017')
.then(() => console.log('Connected to MongoDB successfully'))
.catch((err) => console.error('Error connecting to MongoDB:', err));

// 挂载 Todo 路由：所有 /api 开头的请求交给todoRoutes处理
app.use('/api', todoRoutes);

// 全局错误处理中间件
app.use((err, req, res, next) => {
    console.error("Unhandled error:", err);
    res.status(500).json({ error: "An unexpected error occurred" });
});

// 启动服务，监听默认端口3000或环境变量指定的端口
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
