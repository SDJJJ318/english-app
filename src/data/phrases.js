// 对话短语。group: trade = 外贸, daily = 日常
export const phraseScenes = [
  { id: 'greet', group: 'trade', name: '开场与介绍' },
  { id: 'inquiry', group: 'trade', name: '询盘' },
  { id: 'quote', group: 'trade', name: '报价与砍价' },
  { id: 'order', group: 'trade', name: '下单与付款' },
  { id: 'ship', group: 'trade', name: '生产与发货' },
  { id: 'after', group: 'trade', name: '售后与投诉' },
  { id: 'daily_basic', group: 'daily', name: '打招呼' },
  { id: 'daily_talk', group: 'daily', name: '沟通不畅时' },
  { id: 'daily_life', group: 'daily', name: '吃饭出行' },
  { id: 'daily_feel', group: 'daily', name: '表达感受' },
]

export const phrases = [
  // 开场与介绍
  { en: 'This is Lily from ABC Solar.', zh: '我是ABC光伏的Lily。', scene: 'greet' },
  { en: 'We are a solar panel manufacturer in China.', zh: '我们是中国的太阳能板生产厂家。', scene: 'greet' },
  { en: 'May I know which products you are interested in?', zh: '请问您对哪些产品感兴趣？', scene: 'greet' },
  { en: 'Is this a good time to talk?', zh: '现在方便聊吗？', scene: 'greet' },
  { en: 'I will send you our catalog by email.', zh: '我把产品目录发您邮箱。', scene: 'greet' },
  { en: 'Feel free to contact me on WhatsApp.', zh: '随时在WhatsApp上联系我。', scene: 'greet' },

  // 询盘
  { en: 'What wattage are you looking for?', zh: '您要多少瓦的？', scene: 'inquiry' },
  { en: 'How many panels do you need?', zh: '您需要多少块板？', scene: 'inquiry' },
  { en: 'Which port is closest to you?', zh: '离您最近的港口是哪个？', scene: 'inquiry' },
  { en: 'Is this for a residential or commercial project?', zh: '这是家用项目还是商业项目？', scene: 'inquiry' },
  { en: 'Do you need any certificates for your market?', zh: '您的市场需要什么认证吗？', scene: 'inquiry' },
  { en: 'Do you have these panels in stock?', zh: '这些板有现货吗？', scene: 'inquiry' },
  { en: 'Could you send me the datasheet?', zh: '能发我规格书吗？', scene: 'inquiry' },

  // 报价与砍价
  { en: 'Here is our best price.', zh: '这是我们的最优价格。', scene: 'quote' },
  { en: 'The price is valid for seven days.', zh: '价格七天内有效。', scene: 'quote' },
  { en: 'The price depends on the quantity.', zh: '价格取决于数量。', scene: 'quote' },
  { en: 'Your price is a little high.', zh: '你们价格有点高。', scene: 'quote' },
  { en: 'Can you do better on the price?', zh: '价格还能再优惠吗？', scene: 'quote' },
  { en: 'If you order more, we can give you a discount.', zh: '如果多订，我们可以给折扣。', scene: 'quote' },
  { en: 'This is already our lowest price.', zh: '这已经是我们的最低价了。', scene: 'quote' },
  { en: 'Our quality is better than most suppliers.', zh: '我们质量比大多数供应商好。', scene: 'quote' },

  // 下单与付款
  { en: 'We would like to place an order.', zh: '我们想下单。', scene: 'order' },
  { en: 'I will send you the PI for confirmation.', zh: '我把PI发您确认。', scene: 'order' },
  { en: 'Please pay a thirty percent deposit.', zh: '请支付30%定金。', scene: 'order' },
  { en: 'The balance should be paid before shipment.', zh: '尾款需在发货前付清。', scene: 'order' },
  { en: 'We have received your payment, thank you.', zh: '已收到您的付款，谢谢。', scene: 'order' },
  { en: 'Please send me the bank slip.', zh: '请发我银行水单。', scene: 'order' },

  // 生产与发货
  { en: 'Production will take about twenty days.', zh: '生产大约需要二十天。', scene: 'ship' },
  { en: 'Your goods are ready for shipment.', zh: '您的货已经准备好发了。', scene: 'ship' },
  { en: 'We will book the ship this week.', zh: '我们这周订船。', scene: 'ship' },
  { en: 'Here are the photos of the loading.', zh: '这是装柜照片。', scene: 'ship' },
  { en: 'The ship will arrive in about thirty days.', zh: '船大约三十天到港。', scene: 'ship' },
  { en: 'Here is the tracking number.', zh: '这是货运追踪号。', scene: 'ship' },
  { en: 'I will send you the documents by courier.', zh: '我会快递单据给您。', scene: 'ship' },

  // 售后与投诉
  { en: 'Sorry to hear that.', zh: '听到这个很抱歉。', scene: 'after' },
  { en: 'Could you send us some photos?', zh: '能发几张照片给我们吗？', scene: 'after' },
  { en: 'How many panels are damaged?', zh: '有多少块板损坏了？', scene: 'after' },
  { en: 'We will check it and reply to you soon.', zh: '我们查一下尽快回复您。', scene: 'after' },
  { en: 'This is covered by the warranty.', zh: '这在质保范围内。', scene: 'after' },
  { en: 'We will send replacements in the next shipment.', zh: '我们会在下批货里补发。', scene: 'after' },
  { en: 'Thank you for your patience.', zh: '感谢您的耐心。', scene: 'after' },

  // 日常：打招呼
  { en: 'Nice to meet you.', zh: '很高兴认识你。', scene: 'daily_basic' },
  { en: 'How are you doing?', zh: '你最近怎么样？', scene: 'daily_basic' },
  { en: 'Not bad, thanks. And you?', zh: '还不错，谢谢。你呢？', scene: 'daily_basic' },
  { en: 'Long time no see.', zh: '好久不见。', scene: 'daily_basic' },
  { en: 'Have a nice weekend!', zh: '周末愉快！', scene: 'daily_basic' },
  { en: 'See you tomorrow.', zh: '明天见。', scene: 'daily_basic' },
  { en: 'Take care.', zh: '保重。', scene: 'daily_basic' },

  // 日常：沟通不畅时
  { en: 'Sorry, could you say that again?', zh: '抱歉，能再说一遍吗？', scene: 'daily_talk' },
  { en: 'Could you speak more slowly, please?', zh: '能说慢一点吗？', scene: 'daily_talk' },
  { en: 'What do you mean by that?', zh: '你那是什么意思？', scene: 'daily_talk' },
  { en: 'Let me check and get back to you.', zh: '我查一下再回复你。', scene: 'daily_talk' },
  { en: 'Could you write it down for me?', zh: '能帮我写下来吗？', scene: 'daily_talk' },
  { en: 'I see.', zh: '我明白了。', scene: 'daily_talk' },
  { en: 'No problem.', zh: '没问题。', scene: 'daily_talk' },
  { en: 'Just a moment, please.', zh: '请稍等。', scene: 'daily_talk' },

  // 日常：吃饭出行
  { en: 'Can I see the menu, please?', zh: '能看一下菜单吗？', scene: 'daily_life' },
  { en: 'I would like some water, please.', zh: '请给我一些水。', scene: 'daily_life' },
  { en: 'Can I have the bill, please?', zh: '请结账。', scene: 'daily_life' },
  { en: 'How much is it?', zh: '多少钱？', scene: 'daily_life' },
  { en: 'Where is the restroom?', zh: '洗手间在哪？', scene: 'daily_life' },
  { en: 'How do I get to the airport?', zh: '去机场怎么走？', scene: 'daily_life' },
  { en: 'Please take me to this address.', zh: '请带我去这个地址。', scene: 'daily_life' },

  // 日常：表达感受
  { en: 'That sounds great.', zh: '听起来很好。', scene: 'daily_feel' },
  { en: 'I am not sure.', zh: '我不确定。', scene: 'daily_feel' },
  { en: 'I agree with you.', zh: '我同意你的看法。', scene: 'daily_feel' },
  { en: 'I am afraid I cannot do that.', zh: '恐怕我做不到。', scene: 'daily_feel' },
  { en: 'I really appreciate your help.', zh: '真的很感谢你的帮助。', scene: 'daily_feel' },
  { en: 'Sorry for the late reply.', zh: '抱歉回复晚了。', scene: 'daily_feel' },
]
