// 从"48音标标准发音"视频的音频里切出 48 个音标，输出到 public/phoneme/
// 用法：node scripts/cut-phonemes.mjs <音频或视频文件路径>（需要 ffmpeg）
// 时间点是按音频响度切分、再用视频里指针位置核对得到的（单位：秒）
import { execFileSync } from 'node:child_process'
import { mkdirSync, rmSync, writeFileSync } from 'node:fs'
import { fileURLToPath } from 'node:url'
import { phonetics } from '../src/data/phonetics.js'
import { audioKey } from '../src/lib/audioKey.js'

const source = process.argv[2]
if (!source) {
  console.error('用法: node scripts/cut-phonemes.mjs <音频文件>')
  process.exit(1)
}

// [音标, 开始, 结束]
const cuts = [
  ['ɑː', 3.56, 4.16], ['ɔː', 4.92, 5.60], ['iː', 6.39, 7.00], ['uː', 7.73, 8.39], ['ɜː', 9.07, 9.72],
  ['ʌ', 10.29, 10.68], ['ɒ', 11.32, 11.69], ['ɪ', 12.61, 13.01], ['ʊ', 13.69, 14.12], ['ə', 14.60, 15.03],
  ['e', 15.58, 15.91], ['æ', 16.91, 17.59], ['eɪ', 18.45, 19.09], ['aɪ', 19.89, 20.49], ['ɔɪ', 21.49, 22.11],
  ['ɪə', 23.11, 23.64], ['eə', 24.56, 25.08], ['ʊə', 26.03, 26.54], ['əʊ', 27.24, 27.88], ['aʊ', 28.66, 29.35],
  ['p', 31.68, 31.82], ['t', 32.63, 32.80], ['k', 33.54, 33.75], ['f', 34.52, 34.79], ['θ', 35.41, 36.95],
  ['s', 37.41, 38.56], ['b', 39.12, 39.67], ['d', 40.07, 40.63], ['ɡ', 40.89, 41.45], ['v', 41.86, 42.54],
  ['ð', 43.05, 44.87], ['z', 45.19, 46.37], ['tʃ', 47.05, 47.30], ['ts', 47.94, 48.21], ['m', 48.82, 49.44],
  ['n', 49.86, 50.40], ['ŋ', 50.87, 51.59], ['j', 52.10, 52.61], ['w', 53.11, 53.53], ['l', 54.13, 54.58],
  ['tr', 55.18, 55.34], ['ʒ', 56.09, 56.45], ['r', 57.13, 57.56], ['dz', 58.02, 58.45], ['dʒ', 59.00, 59.54],
  ['dr', 59.92, 60.44], ['ʃ', 60.87, 61.16], ['h', 61.70, 61.88],
]

// 响度检测会漏掉很轻的开头和结尾（比如送气、尾音），前后各多留一点
const PAD_BEFORE = 0.12
const PAD_AFTER = 0.18

const outDir = fileURLToPath(new URL('../public/phoneme/', import.meta.url))
rmSync(outDir, { recursive: true, force: true })
mkdirSync(outDir, { recursive: true })

const symbols = new Set(phonetics.map(p => p.s))
if (cuts.length !== symbols.size || !cuts.every(([s]) => symbols.has(s))) {
  throw new Error('切分表和音标数据不一致')
}

const index = {}
for (const [s, start, end] of cuts) {
  const from = Math.max(0, start - PAD_BEFORE)
  const dur = end + PAD_AFTER - from
  const file = `${audioKey('phoneme:' + s)}.mp3`
  const tmp = `/tmp/phoneme-${file}.wav`
  execFileSync('ffmpeg', ['-hide_banner', '-loglevel', 'error', '-y', '-ss', String(from), '-t', dur.toFixed(3),
    '-i', source, '-ac', '1', '-ar', '44100', '-af', 'afade=t=in:d=0.02,areverse,afade=t=in:d=0.05,areverse', tmp])
  // 统一音量：把峰值调到 -1dB（片段太短，不适合用 loudnorm）
  const log = execFileSync('sh', ['-c', `ffmpeg -hide_banner -i "${tmp}" -af volumedetect -f null - 2>&1 || true`]).toString()
  const peak = Number((log.match(/max_volume: (-?[\d.]+) dB/) || [])[1] ?? 0)
  execFileSync('ffmpeg', ['-hide_banner', '-loglevel', 'error', '-y', '-i', tmp, '-af', `volume=${(-1 - peak).toFixed(1)}dB`,
    '-b:a', '128k', outDir + file])
  rmSync(tmp)
  index[s] = file
}
writeFileSync(new URL('../src/data/phonemeIndex.json', import.meta.url), JSON.stringify(index))
console.log(`已生成 ${Object.keys(index).length} 个音标发音`)
