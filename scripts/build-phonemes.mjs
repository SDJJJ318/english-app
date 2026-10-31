// 用真人录音生成 48 个音标的发音，输出到 public/phoneme/
// 录音来自维基共享资源（Wikimedia Commons）的国际音标录音，CC BY-SA 许可
// 原始文件放在 scripts/phoneme-src/，用法：node scripts/build-phonemes.mjs（需要 ffmpeg）
import { execFileSync } from 'node:child_process'
import { mkdirSync, rmSync, writeFileSync } from 'node:fs'
import { fileURLToPath } from 'node:url'
import { phonetics } from '../src/data/phonetics.js'
import { audioKey } from '../src/lib/audioKey.js'

// 项目路径里有中文，必须用 fileURLToPath 解码
const src = (name) => fileURLToPath(new URL(`./phoneme-src/${name}.src`, import.meta.url))
const outDir = fileURLToPath(new URL('../public/phoneme/', import.meta.url))
const tmp = '/tmp/phoneme-build'
rmSync(tmp, { recursive: true, force: true })
mkdirSync(tmp, { recursive: true })
mkdirSync(outDir, { recursive: true })

// 每个音标用哪个录音。数组表示两个音连起来（双元音、tr、dr）
const sources = {
  'ɪ': 'Near-close_near-front_unrounded_vowel', 'e': 'Close-mid_front_unrounded_vowel',
  'æ': 'Near-open_front_unrounded_vowel', 'ʌ': 'Open-mid_back_unrounded_vowel',
  'ɒ': 'Open_back_rounded_vowel', 'ʊ': 'Near-close_near-back_rounded_vowel', 'ə': 'Mid-central_vowel',
  'iː': 'Close_front_unrounded_vowel', 'ɑː': 'Open_back_unrounded_vowel', 'ɔː': 'Open-mid_back_rounded_vowel',
  'uː': 'Close_back_rounded_vowel', 'ɜː': 'Open-mid_central_unrounded_vowel',
  'eɪ': ['Close-mid_front_unrounded_vowel', 'Near-close_near-front_unrounded_vowel'],
  'aɪ': ['Open_front_unrounded_vowel', 'Near-close_near-front_unrounded_vowel'],
  'ɔɪ': ['Open-mid_back_rounded_vowel', 'Near-close_near-front_unrounded_vowel'],
  'aʊ': ['Open_front_unrounded_vowel', 'Near-close_near-back_rounded_vowel'],
  'əʊ': ['Mid-central_vowel', 'Near-close_near-back_rounded_vowel'],
  'ɪə': ['Near-close_near-front_unrounded_vowel', 'Mid-central_vowel'],
  'eə': ['Open-mid_front_unrounded_vowel', 'Mid-central_vowel'],
  'ʊə': ['Near-close_near-back_rounded_vowel', 'Mid-central_vowel'],
  'p': 'Voiceless_bilabial_plosive', 'b': 'Voiced_bilabial_plosive',
  't': 'Voiceless_alveolar_plosive', 'd': 'Voiced_alveolar_plosive',
  'k': 'Voiceless_velar_plosive', 'ɡ': 'Voiced_velar_plosive',
  'f': 'Voiceless_labiodental_fricative', 'v': 'Voiced_labiodental_fricative',
  'θ': 'Voiceless_dental_fricative', 'ð': 'Voiced_dental_fricative',
  's': 'Voiceless_alveolar_sibilant', 'z': 'Voiced_alveolar_sibilant',
  'ʃ': 'Voiceless_palato-alveolar_sibilant', 'ʒ': 'Voiced_palato-alveolar_sibilant',
  'h': 'Voiceless_glottal_fricative', 'r': 'Postalveolar_approximant',
  'tʃ': 'Voiceless_palato-alveolar_affricate', 'dʒ': 'Voiced_palato-alveolar_affricate',
  'tr': ['Voiceless_alveolar_plosive', 'Postalveolar_approximant'],
  'dr': ['Voiced_alveolar_plosive', 'Postalveolar_approximant'],
  'ts': 'Voiceless_alveolar_affricate', 'dz': 'Voiced_alveolar_affricate',
  'm': 'Bilabial_nasal', 'n': 'Alveolar_nasal', 'ŋ': 'Velar_nasal',
  'l': 'Alveolar_lateral_approximant', 'w': 'Voiced_labio-velar_approximant', 'j': 'Palatal_approximant',
}

const ff = (args) => execFileSync('ffmpeg', ['-hide_banner', '-loglevel', 'error', '-y', ...args])

// 找出录音里第一段有声音的部分（辅音录音里同一个音会重复几次）
const firstSegment = (file) => {
  // ffmpeg 把检测结果写到 stderr
  const out = execFileSync('sh', ['-c', `ffmpeg -hide_banner -i "${file}" -af silencedetect=noise=-38dB:d=0.12 -f null - 2>&1 || true`]).toString()
  const starts = [...out.matchAll(/silence_start: ([\d.]+)/g)].map(m => +m[1])
  const ends = [...out.matchAll(/silence_end: ([\d.]+)/g)].map(m => +m[1])
  // 录音开头是静音的话，从第一段静音结束处开始
  const begin = starts[0] !== undefined && starts[0] < 0.01 ? (ends[0] ?? 0) : 0
  const next = starts.find(s => s > begin + 0.05)
  return { begin: Math.max(0, begin - 0.03), end: next !== undefined ? next + 0.05 : null }
}

// 截取片段，统一成单声道 44.1kHz wav，去掉首尾杂音并做淡入淡出
const clip = (name, out, part = 1) => {
  const { begin, end } = firstSegment(src(name))
  const args = ['-i', src(name), '-ss', String(begin)]
  if (end !== null) args.push('-to', String(end))
  const dur = end !== null ? end - begin : null
  const keep = dur !== null ? dur * part : null
  const filters = ['aformat=channel_layouts=mono:sample_rates=44100']
  if (keep !== null && part < 1) filters.push(`atrim=0:${keep.toFixed(3)}`)
  filters.push('afade=t=in:d=0.02', 'areverse', 'afade=t=in:d=0.04', 'areverse', 'loudnorm=I=-16:TP=-1.5')
  ff([...args, '-af', filters.join(','), out])
}

const toMp3 = (wav, mp3) => ff(['-i', wav, '-ac', '1', '-ar', '44100', '-b:a', '96k', mp3])

rmSync(outDir, { recursive: true, force: true })
mkdirSync(outDir, { recursive: true })
const index = {}
for (const { s } of phonetics) {
  const source = sources[s]
  if (!source) throw new Error(`音标 ${s} 没有指定录音`)
  const wav = `${tmp}/${audioKey('phoneme:' + s)}.wav`
  if (Array.isArray(source)) {
    // 两个音连读：前一个音保留前 60%，后一个完整，中间交叉淡化让过渡自然
    const a = `${tmp}/a.wav`, b = `${tmp}/b.wav`
    clip(source[0], a, 0.6)
    clip(source[1], b)
    ff(['-i', a, '-i', b, '-filter_complex', 'acrossfade=d=0.08:c1=tri:c2=tri', wav])
  } else {
    clip(source, wav)
  }
  const file = `${audioKey('phoneme:' + s)}.mp3`
  toMp3(wav, outDir + file)
  index[s] = file
}
writeFileSync(new URL('../src/data/phonemeIndex.json', import.meta.url), JSON.stringify(index))
console.log(`已生成 ${Object.keys(index).length} 个音标发音`)
