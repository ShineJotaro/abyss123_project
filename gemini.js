export default async function handler(req, res) {
  // 1. 只允許 POST 請求
  if (req.method !== 'POST') {
    return res.status(405).json({ 
      error: 'Method not allowed',
      message: '只允許 POST 請求' 
    });
  }

  // 2. 從環境變量獲取 API Key（在 Vercel Dashboard 中配置）
  const API_KEY = process.env.VERCEL_GEMINI_API_KEY;
  
  if (!API_KEY) {
    console.error('GEMINI_API_KEY 環境變量未設置');
    return res.status(500).json({ 
      error: 'Server configuration error',
      message: 'API Key 未配置，請在 Vercel 環境變量中設置 VERCEL_GEMINI_API_KEY' 
    });
  }

  // 3. Gemini API 端點
  const API_URL = "https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash-preview-09-2025:generateContent";

  try {
    // 4. 驗證請求體是否存在
    if (!req.body || Object.keys(req.body).length === 0) {
      return res.status(400).json({ 
        error: 'Bad request',
        message: '請求體不能為空' 
      });
    }

    // 5. 可選：添加請求日誌（生產環境建議移除或使用專業日誌服務）
    console.log('收到 Gemini API 請求:', {
      timestamp: new Date().toISOString(),
      hasContents: !!req.body.contents,
      hasSystemInstruction: !!req.body.systemInstruction
    });

    // 6. 調用 Gemini API
    const response = await fetch(`${API_URL}?key=${API_KEY}`, {
      method: 'POST',
      headers: { 
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(req.body)
    });

    // 7. 處理 API 響應
    const data = await response.json();

    // 8. 如果 Gemini API 返回錯誤
    if (!response.ok) {
      console.error('Gemini API 錯誤:', {
        status: response.status,
        error: data
      });

      return res.status(response.status).json({
        error: 'Gemini API error',
        message: data.error?.message || '未知錯誤',
        details: data
      });
    }

    // 9. 可選：驗證響應格式
    if (!data.candidates || data.candidates.length === 0) {
      console.warn('Gemini API 返回空結果');
      return res.status(200).json({
        candidates: [],
        warning: 'API 未返回任何內容'
      });
    }

    // 10. 成功：返回 Gemini API 的響應
    return res.status(200).json(data);

  } catch (error) {
    // 11. 捕獲所有未預期的錯誤
    console.error('服務器內部錯誤:', error);
    
    return res.status(500).json({ 
      error: 'Internal server error',
      message: '服務器處理請求時發生錯誤',
      details: process.env.NODE_ENV === 'development' ? error.message : undefined
    });
  }
}