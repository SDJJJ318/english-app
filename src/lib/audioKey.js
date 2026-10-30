// 根据文本生成音频文件名（浏览器和下载脚本共用，保证两边一致）
export const audioKey = (text) => {
  const s = text.trim().toLowerCase()
  let h = 0x811c9dc5
  for (let i = 0; i < s.length; i++) {
    h ^= s.charCodeAt(i)
    h = Math.imul(h, 0x01000193)
  }
  return (h >>> 0).toString(16).padStart(8, '0')
}
