// 文件路径: firebase_config.js

// ------------------------------------------------------------------
// 1. Firebase 配置 (来自第一阶段: 注册 Web App 时获取)
// ------------------------------------------------------------------
// **请替换**以下所有占位符 (中文文字)，确保它们匹配您在 Firebase 控制台复制的值。
export const firebaseConfig = {
   
    apiKey: "AIzaSyCD7f8ZnlXZuI_DiBc_M2c9jl44WajJMhw",
    authDomain: "abyss123-project.firebaseapp.com",
    projectId: "abyss123-project",
    storageBucket: "abyss123-project.firebasestorage.app",
    messagingSenderId: "233505718695",
    appId: "1:233505718695:web:1a62ca261f9ebd9beaf682"
  };
 
};

// ------------------------------------------------------------------
// 2. **管理员 UID** (来自第二阶段: Authentication Users 列表)
// ------------------------------------------------------------------
// **请替换**以下占位符为您在 Firebase Users 页面复制的管理员 UID。
export const OWNER_ID = 'aE2amxbjqHSnJ4Htid1VD8vq1493'; 

// ------------------------------------------------------------------
// 3. 应用 ID 和初始 Auth Token (由 Vercel/Canvas 环境自动提供，无需修改)
// ------------------------------------------------------------------
// 请勿修改以下代码块。
const appId = typeof __app_id !== 'undefined' ? __app_id : 'default-app-id';
const firebaseConfigStr = typeof __firebase_config !== 'undefined' ? __firebase_config : '{}';
const initialAuthToken = typeof __initial_auth_token !== 'undefined' ? __initial_auth_token : null;

// 使用环境提供的配置 (如果存在) 覆盖默认配置
if (firebaseConfigStr !== '{}') {
    Object.assign(firebaseConfig, JSON.parse(firebaseConfigStr));
}

export const ENV_APP_ID = appId;
export const INITIAL_AUTH_TOKEN = initialAuthToken;