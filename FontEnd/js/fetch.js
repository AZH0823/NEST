export const apiRequest  = async(route = 'users', method="GET", domain = 'http://localhost:8080') =>{
  try {
    const url = `${domain}/${route}`;
    const response = await fetch(url, { method });

    console.log(response)
    if (!response.ok) {
      // 如果响应状态码不是2xx，抛出错误
      throw new Error(`网络响应错误: ${response.status} ${response.statusText}`);
    }

    // 解析JSON数据
    const data = await response.json();
    return data; // 返回解析后的数据

  } catch (error) {
    // 返回错误对象，包含错误信息
    console.log(`error: `, error)
    return { error: error.message };
  }
}