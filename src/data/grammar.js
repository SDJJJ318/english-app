// 语法练习题。a 是正确选项在 opts 中的下标
export const grammarTopics = [
  { id: 'present', name: '一般现在时', intro: '表示经常、习惯或事实。主语是 he/she/it/单数名词时，动词加 s 或 es。\n例：We make panels. / Our factory makes panels.' },
  { id: 'past', name: '一般过去时', intro: '表示过去发生的事。动词用过去式（规则动词加 ed）。常和 yesterday、last week、ago 连用。\n例：We shipped the goods last week.' },
  { id: 'perfect', name: '现在完成时', intro: 'have/has + 过去分词。表示到现在为止已完成，或从过去持续到现在。常和 already、yet、for、since 连用。\n例：We have received your payment.' },
  { id: 'future', name: '将来时', intro: 'will + 动词原形，或 be going to + 动词原形。\n例：We will send the samples tomorrow.' },
  { id: 'passive', name: '被动语态', intro: 'be + 过去分词，强调动作的承受者。\n例：The goods were shipped yesterday. / The panels are made in China.' },
  { id: 'prep', name: '介词', intro: '时间：at + 时刻，on + 日期/星期，in + 月份/年份/一段时间以后。\n例：at 3 pm, on Monday, in May, in two weeks.' },
  { id: 'article', name: '冠词与可数性', intro: 'a 用在辅音音素前，an 用在元音音素前（看发音不看字母）。information、equipment、advice 不可数，不能加 s，不能用 a。' },
  { id: 'polite', name: '礼貌请求', intro: 'Could you / Would you + 动词原形；Would you mind + 动词ing；I would like to + 动词原形。' },
]

export const grammarQuestions = [
  // 一般现在时
  { id: 'g1', topic: 'present', q: 'Our factory ___ 5,000 panels every day.', opts: ['produce', 'produces', 'producing', 'produced'], a: 1, exp: 'our factory 是单数，表示经常的事用一般现在时，动词加 s。' },
  { id: 'g2', topic: 'present', q: '___ your company export to Europe?', opts: ['Do', 'Does', 'Is', 'Are'], a: 1, exp: 'your company 是第三人称单数，一般现在时疑问句用 Does。' },
  { id: 'g3', topic: 'present', q: 'We ___ accept payment by credit card.', opts: ['doesn\'t', 'don\'t', 'aren\'t', 'not'], a: 1, exp: '主语 we，一般现在时否定用 don\'t + 动词原形。' },
  { id: 'g4', topic: 'present', q: 'The inverter ___ DC into AC.', opts: ['convert', 'converts', 'is convert', 'converting'], a: 1, exp: '表示事实/功能用一般现在时，主语单数加 s。' },
  { id: 'g5', topic: 'present', q: 'How much ___ one container of panels cost?', opts: ['do', 'does', 'is', 'are'], a: 1, exp: '主语 one container of panels 中心词是 container，单数，用 does。' },

  // 一般过去时
  { id: 'g6', topic: 'past', q: 'We ___ your email yesterday.', opts: ['receive', 'received', 'have received', 'will receive'], a: 1, exp: '有 yesterday，用一般过去时。' },
  { id: 'g7', topic: 'past', q: 'The ship ___ Shanghai last Friday.', opts: ['leaves', 'left', 'leaved', 'has left'], a: 1, exp: 'leave 的过去式是不规则的 left。last Friday 表示过去时间。' },
  { id: 'g8', topic: 'past', q: '___ you get the samples last week?', opts: ['Do', 'Did', 'Have', 'Were'], a: 1, exp: '一般过去时疑问句用 Did + 动词原形。' },
  { id: 'g9', topic: 'past', q: 'We ___ any complaints about this model last year.', opts: ['didn\'t get', 'don\'t got', 'didn\'t got', 'not got'], a: 0, exp: 'didn\'t 后面要用动词原形 get。' },
  { id: 'g10', topic: 'past', q: 'The customer ___ the factory two months ago.', opts: ['visit', 'visits', 'visited', 'has visited'], a: 2, exp: 'two months ago 是过去时间，用一般过去时，不能用现在完成时。' },

  // 现在完成时
  { id: 'g11', topic: 'perfect', q: 'We ___ your deposit. Thank you!', opts: ['have received', 'has received', 'receive', 'are receiving'], a: 0, exp: '表示"已经收到"，影响到现在，用现在完成时。主语 we 用 have。' },
  { id: 'g12', topic: 'perfect', q: 'We have made solar panels ___ 2010.', opts: ['for', 'since', 'from', 'in'], a: 1, exp: 'since + 时间点（2010）；for + 一段时间（for 15 years）。' },
  { id: 'g13', topic: 'perfect', q: 'Has the shipment left ___?', opts: ['already', 'yet', 'ago', 'before'], a: 1, exp: 'yet 用在疑问句和否定句末尾；already 一般用在肯定句。' },
  { id: 'g14', topic: 'perfect', q: 'We have worked with this customer ___ ten years.', opts: ['since', 'for', 'during', 'ago'], a: 1, exp: 'for + 一段时间。' },
  { id: 'g15', topic: 'perfect', q: 'She ___ the PI to the client already.', opts: ['have sent', 'has sent', 'has send', 'have send'], a: 1, exp: '主语 she 用 has，后面用过去分词 sent。' },

  // 将来时
  { id: 'g16', topic: 'future', q: 'We ___ the goods next Monday.', opts: ['ship', 'shipped', 'will ship', 'have shipped'], a: 2, exp: 'next Monday 是将来时间，用 will + 动词原形。' },
  { id: 'g17', topic: 'future', q: 'I ___ call you back in ten minutes.', opts: ['will', 'am', 'did', 'have'], a: 0, exp: '临时决定要做的事用 will。in ten minutes 指十分钟后。' },
  { id: 'g18', topic: 'future', q: 'We are going to ___ a new production line.', opts: ['build', 'building', 'built', 'builds'], a: 0, exp: 'be going to 后面接动词原形。' },
  { id: 'g19', topic: 'future', q: 'The price ___ go up next month.', opts: ['is', 'will', 'does', 'has'], a: 1, exp: '预测将来用 will + 动词原形。' },
  { id: 'g20', topic: 'future', q: 'When ___ the container arrive?', opts: ['does', 'will', 'is', 'has'], a: 1, exp: '问将来什么时候到达，用 will。' },

  // 被动语态
  { id: 'g21', topic: 'passive', q: 'The panels ___ in our own factory.', opts: ['make', 'are made', 'are making', 'made'], a: 1, exp: '板是"被"生产的，用被动 be + 过去分词。' },
  { id: 'g22', topic: 'passive', q: 'Your order ___ yesterday.', opts: ['was shipped', 'shipped', 'is shipped', 'has shipping'], a: 0, exp: '订单"被"发出，yesterday 用过去时被动 was + 过去分词。' },
  { id: 'g23', topic: 'passive', q: 'The goods will ___ before shipment.', opts: ['inspect', 'be inspected', 'inspected', 'being inspected'], a: 1, exp: '将来时被动：will be + 过去分词。' },
  { id: 'g24', topic: 'passive', q: 'Two panels ___ during transport.', opts: ['broke', 'were broken', 'was broken', 'are break'], a: 1, exp: 'two panels 是复数，过去时被动用 were + 过去分词。' },
  { id: 'g25', topic: 'passive', q: 'The price ___ in US dollars.', opts: ['quotes', 'is quoted', 'quoting', 'is quote'], a: 1, exp: '价格"被"报出，用 is + 过去分词 quoted。' },

  // 介词
  { id: 'g26', topic: 'prep', q: 'Let\'s have a meeting ___ Monday.', opts: ['in', 'on', 'at', 'for'], a: 1, exp: '星期、具体日期前用 on。' },
  { id: 'g27', topic: 'prep', q: 'I will call you ___ 3 pm.', opts: ['in', 'on', 'at', 'by'], a: 2, exp: '具体时刻前用 at。' },
  { id: 'g28', topic: 'prep', q: 'The goods will be ready ___ two weeks.', opts: ['after', 'in', 'on', 'at'], a: 1, exp: 'in + 一段时间，表示"多久以后"。' },
  { id: 'g29', topic: 'prep', q: 'We will ship the goods ___ May.', opts: ['on', 'at', 'in', 'by'], a: 2, exp: '月份前用 in。' },
  { id: 'g30', topic: 'prep', q: 'Please pay the balance ___ Friday at the latest.', opts: ['until', 'by', 'in', 'at'], a: 1, exp: 'by 表示"在……之前（截止）"；until 表示动作一直持续到某时。' },
  { id: 'g31', topic: 'prep', q: 'The price is 0.11 dollars ___ watt.', opts: ['for', 'per', 'in', 'of'], a: 1, exp: 'per 表示"每"，per watt 每瓦。' },

  // 冠词与可数性
  { id: 'g32', topic: 'article', q: 'We need ___ inverter for this system.', opts: ['a', 'an', 'the', '不填'], a: 1, exp: 'inverter 以元音音素 /ɪ/ 开头，用 an。' },
  { id: 'g33', topic: 'article', q: 'It is ___ useful product.', opts: ['a', 'an', 'the', '不填'], a: 0, exp: 'useful 发音 /ˈjuːsfl/，以辅音 /j/ 开头，用 a，不看字母 u。' },
  { id: 'g34', topic: 'article', q: 'Please send me more ___.', opts: ['informations', 'information', 'an information', 'a information'], a: 1, exp: 'information 不可数，不加 s，不用 a/an。' },
  { id: 'g35', topic: 'article', q: 'It takes ___ hour to get to the port.', opts: ['a', 'an', 'the', '不填'], a: 1, exp: 'hour 的 h 不发音，以元音 /aʊ/ 开头，用 an。' },
  { id: 'g36', topic: 'article', q: 'We bought some new ___ for the factory.', opts: ['equipments', 'equipment', 'an equipment', 'equipmentes'], a: 1, exp: 'equipment 不可数，不加 s。' },

  // 礼貌请求
  { id: 'g37', topic: 'polite', q: 'Could you ___ me the datasheet?', opts: ['send', 'sending', 'to send', 'sent'], a: 0, exp: 'Could you 后接动词原形。' },
  { id: 'g38', topic: 'polite', q: 'Would you mind ___ the price again?', opts: ['check', 'to check', 'checking', 'checked'], a: 2, exp: 'mind 后接动词 ing 形式。' },
  { id: 'g39', topic: 'polite', q: 'I would like ___ an order.', opts: ['place', 'to place', 'placing', 'placed'], a: 1, exp: 'would like to + 动词原形。' },
  { id: 'g40', topic: 'polite', q: 'Thank you for ___ our factory.', opts: ['visit', 'to visit', 'visiting', 'visited'], a: 2, exp: '介词 for 后面接动词 ing 形式。' },
  { id: 'g41', topic: 'polite', q: 'We look forward to ___ from you.', opts: ['hear', 'hearing', 'heard', 'be heard'], a: 1, exp: 'look forward to 中的 to 是介词，后面接动词 ing。' },
]

// 完整句子（填入正确答案后）的中文翻译
const translations = {
  g1: '我们工厂每天生产5000块板。', g2: '你们公司出口到欧洲吗？', g3: '我们不接受信用卡付款。',
  g4: '逆变器把直流电转换成交流电。', g5: '一个集装箱的板多少钱？',
  g6: '我们昨天收到了你的邮件。', g7: '船上周五离开了上海。', g8: '你上周收到样品了吗？',
  g9: '去年我们没有收到任何关于这个型号的投诉。', g10: '客户两个月前参观了工厂。',
  g11: '我们已经收到你的定金了。谢谢！', g12: '我们从2010年起就生产太阳能板。', g13: '货物已经发出了吗？',
  g14: '我们和这个客户合作了十年。', g15: '她已经把PI发给客户了。',
  g16: '我们下周一发货。', g17: '我十分钟后给你回电话。', g18: '我们打算建一条新生产线。',
  g19: '价格下个月会上涨。', g20: '集装箱什么时候到？',
  g21: '这些板是在我们自己的工厂生产的。', g22: '你的订单昨天已经发货了。', g23: '货物发货前会被检验。',
  g24: '运输途中有两块板破损了。', g25: '价格用美元报价。',
  g26: '我们周一开个会吧。', g27: '我下午3点给你打电话。', g28: '货物两周后准备好。',
  g29: '我们五月发货。', g30: '请最迟在周五前付尾款。', g31: '价格是每瓦0.11美元。',
  g32: '这个系统我们需要一台逆变器。', g33: '这是一个有用的产品。', g34: '请发给我更多信息。',
  g35: '到港口需要一个小时。', g36: '我们给工厂买了一些新设备。',
  g37: '你能把规格书发给我吗？', g38: '你介意再核对一下价格吗？', g39: '我想下个订单。',
  g40: '感谢你参观我们的工厂。', g41: '期待你的回复。',
}
for (const q of grammarQuestions) q.zh = translations[q.id]
