// 预先下载所有内置内容的发音，存到 public/audio/，随 APP 一起发布
// 用法：node scripts/fetch-audio.mjs   （新增内置内容后重新运行一次）
import { mkdirSync, existsSync, writeFileSync, statSync } from 'node:fs'
import { words } from '../src/data/words.js'
import { phrases } from '../src/data/phrases.js'
import { phonetics } from '../src/data/phonetics.js'
import { audioKey } from '../src/lib/audioKey.js'

const dir = new URL('../public/audio/', import.meta.url)
mkdirSync(dir, { recursive: true })

const texts = new Set()
for (const w of words) {
  texts.add(w.say || w.en)
  if (w.ex) texts.add(w.ex)
}
for (const p of phrases) texts.add(p.en)
for (const ph of phonetics) ph.words.forEach(x => texts.add(x))

const fetchMp3 = async (text) => {
  const url = `https://fanyi.baidu.com/gettts?lan=en&spd=3&source=web&text=${encodeURIComponent(text)}`
  const res = await fetch(url)
  const buf = Buffer.from(await res.arrayBuffer())
  if (!res.ok || !(res.headers.get('content-type') || '').includes('audio')) throw new Error(`HTTP ${res.status}`)
  return buf
}

let done = 0, skipped = 0
const failed = []
for (const text of texts) {
  const file = new URL(`${audioKey(text)}.mp3`, dir)
  if (existsSync(file) && statSync(file).size > 0) { skipped++; continue }
  try {
    let buf = await fetchMp3(text)
    // 偶尔返回很短的空白音频，重试一次
    if (buf.length < 2000) buf = await fetchMp3(text)
    writeFileSync(file, buf)
    done++
  } catch (e) {
    failed.push(`${text} (${e.message})`)
  }
}
console.log(`共 ${texts.size} 条：新下载 ${done}，已存在 ${skipped}，失败 ${failed.length}`)
failed.forEach(f => console.log('  失败:', f))

// 生成已有音频的索引，浏览器据此判断某句话有没有预录音频
import { readdirSync } from 'node:fs'
const keys = readdirSync(dir).filter(f => f.endsWith('.mp3')).map(f => f.slice(0, -4)).sort()
writeFileSync(new URL('../src/data/audioIndex.json', import.meta.url), JSON.stringify(keys))
console.log(`音频索引已更新：${keys.length} 条`)
