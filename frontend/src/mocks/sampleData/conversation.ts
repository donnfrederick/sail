import * as ConversationModels from 'models/conversation'

export const conversation: ConversationModels.Conversation = {
  accepting_requests: true,
  available: true,
  channel_id: '8e85f8e2-ebad-40f2-98be-b88efea45b53',
  chats: [],
  id: 26227,
  status: 'queued',
  statuses: [
    {
      user_id: 1,
      status: 'Ontime'
    },
    {
      user_id: 2,
      status: 'Ontime'
    }
  ],
  start_at: '2018-01-02T00:00:00+09:00',
  end_at: '2018-01-02T00:25:00+09:00',
  created_at: '2018-01-01T00:00:00+09:00',
  updated_at: '2018-01-01T00:00:00+09:00',
  evaluate: [
    {
      user_id: 1,
      evaluate: {
        fun: 1,
        ability: 1,
        time: 1,
        quality: []
      }
    },
    {
      user_id: 2,
      evaluate: {
        fun: 1,
        ability: 1,
        time: 1,
        quality: []
      }
    }
  ],
  memos: [
    {
      user_id: 1,
      memo: 'memo'
    },
    {
      user_id: 2,
      memo: 'memo'
    }
  ],
  reports: [
    {
      user_id: 1,
      report: {
        report_detail: 'report',
        report_reasons: [1, 2]
      }
    },
    {
      user_id: 2,
      report: {
        report_detail: 'report',
        report_reasons: [1, 2]
      }
    }
  ],
  users: [
    {
      absence: 0,
      id: 60331,
      username: 'teacher 29',
      name: '吉野 瑞葵',
      type: 'Teacher',
      sex: 2,
      picture_url: '',
      conversation_level: 5,
      level: 1,
      country: 'ja',
      country_code: 'ja',
      timezone: 'Asia/Tokyo',
      desired_condition: 2,
      evaluate: {
        1: 0,
        2: 0,
        3: 0,
        4: 0
      },
      location: '',
      lateness: 0,
      grade: null,
      highly_reliable: false,
      hobbies: [],
      payment_state: 'hidden',
      purposes: [],
      rated_conversation_level: 0,
      is_blocked: false,
      is_favorite: false,
      conversations: [],
      introduce: 'aho',
      email: ''
    },
    {
      absence: 0,
      id: 60332,
      username: 'student 29',
      name: '宮本 彩',
      type: 'Student',
      sex: 9,
      picture_url: '',
      conversation_level: 3,
      level: 3,
      country: 'TJ',
      country_code: 'TJ',
      timezone: 'Asia/Dushanbe',
      desired_condition: 1,
      evaluate: {
        1: 0,
        2: 0,
        3: 0,
        4: 0
      },
      location: '',
      lateness: 0,
      grade: 'member',
      highly_reliable: false,
      hobbies: [],
      payment_state: 'hidden',
      purposes: [],
      rated_conversation_level: 0,
      is_blocked: false,
      is_favorite: false,
      conversations: [],
      introduce: 'hage',
      email: ''
    }
  ],
  conversation_requests: []
}

export const cancelledConversation: ConversationModels.CancelledConversation = {
  conversation_id: 26227,
  start_at: '2018-01-02T00:00:00+09:00',
  end_at: '2018-01-02T00:25:00+09:00',
  created_at: '2018-01-01T00:00:00+09:00',
  updated_at: '2018-01-01T00:00:00+09:00',
  users: [
    {
      absence: 0,
      id: 60331,
      username: 'teacher 29',
      name: '吉野 瑞葵',
      type: 'Teacher',
      sex: 2,
      picture_url: '',
      level: 1,
      country: 'ja',
      country_code: 'ja',
      timezone: 'Asia/Tokyo',
      desired_condition: 2,
      evaluate: {
        1: 0,
        2: 0,
        3: 0,
        4: 0
      },
      location: '',
      lateness: 0,
      grade: null,
      highly_reliable: false,
      hobbies: [],
      payment_state: 'hidden',
      purposes: [],
      rated_conversation_level: 0,
      conversation_level: 0,
      is_blocked: false,
      is_favorite: false,
      conversations: [],
      introduce: 'cancelled_aho',
      email: ''
    },
    {
      absence: 0,
      id: 60332,
      username: 'student 29',
      name: '宮本 彩',
      type: 'Student',
      sex: 9,
      picture_url: '',
      level: 3,
      country: 'TJ',
      country_code: 'TJ',
      timezone: 'Asia/Dushanbe',
      desired_condition: 1,
      evaluate: {
        1: 0,
        2: 0,
        3: 0,
        4: 0
      },
      location: '',
      lateness: 0,
      grade: 'member',
      highly_reliable: false,
      hobbies: [],
      payment_state: 'hidden',
      purposes: [],
      rated_conversation_level: 0,
      conversation_level: 0,
      is_blocked: false,
      is_favorite: false,
      conversations: [],
      introduce: 'cancelled_hage',
      email: ''
    }
  ]
}

export const requestConversationInConversation: ConversationModels.RequestConversationInConversation = {
  end_at: '2018-01-05T23:59:59+09:00',
  id: 1,
  start_at: '2018-01-02T00:00:00+09:00',
  user: {
    absence: 0,
    id: 60331,
    username: 'teacher 29',
    name: '吉野 瑞葵',
    type: 'Teacher',
    sex: 2,
    picture_url: '',
    conversation_level: 5,
    level: 1,
    country: 'ja',
    country_code: 'ja',
    timezone: 'Asia/Tokyo',
    desired_condition: 2,
    evaluate: {
      1: 0,
      2: 0,
      3: 0,
      4: 0
    },
    location: '',
    lateness: 0,
    grade: null,
    highly_reliable: false,
    hobbies: [],
    payment_state: 'hidden',
    purposes: [],
    rated_conversation_level: 0,
    is_blocked: false,
    is_favorite: false,
    conversations: [],
    introduce: 'hagehage',
    email: ''
  }
}

export const requestConversation = {
  ...requestConversationInConversation,
  conversation
}

export const conversations: ConversationModels.ConversationResponse = {
  data: [conversation],
  meta: {
    start_on: '2018-01-02T00:00:00+09:00',
    end_on: '2018-01-05T23:59:59+09:00'
  }
}

export const requestConversations: ConversationModels.RequestConversationResponse = {
  data: [requestConversation]
}

export const teachersRequestConversations: ConversationModels.Conversation[] = [
  conversation
]

export const calendar: ConversationModels.Calendar = {
  '1': {
    is_enabled: true,
    is_reserved: false
  },
  '2': {
    is_enabled: true,
    is_reserved: false
  },
  '3': {
    is_enabled: true,
    is_reserved: false
  },
  '4': {
    is_enabled: true,
    is_reserved: false
  },
  '5': {
    is_enabled: true,
    is_reserved: false
  },
  '6': {
    is_enabled: true,
    is_reserved: false
  },
  '7': {
    is_enabled: true,
    is_reserved: false
  },
  '8': {
    is_enabled: true,
    is_reserved: false
  },
  '9': {
    is_enabled: true,
    is_reserved: false
  },
  '10': {
    is_enabled: true,
    is_reserved: false
  },
  '11': {
    is_enabled: false,
    is_reserved: true
  },
  '12': {
    is_enabled: false,
    is_reserved: true
  },
  '13': {
    is_enabled: false,
    is_reserved: true
  },
  '14': {
    is_enabled: false,
    is_reserved: true
  },
  '15': {
    is_enabled: false,
    is_reserved: true
  },
  '16': {
    is_enabled: false,
    is_reserved: true
  },
  '17': {
    is_enabled: false,
    is_reserved: true
  },
  '18': {
    is_enabled: false,
    is_reserved: true
  },
  '19': {
    is_enabled: false,
    is_reserved: true
  },
  '20': {
    is_enabled: false,
    is_reserved: true
  },
  '21': {
    is_enabled: false,
    is_reserved: false
  },
  '22': {
    is_enabled: false,
    is_reserved: false
  },
  '23': {
    is_enabled: false,
    is_reserved: false
  },
  '24': {
    is_enabled: false,
    is_reserved: false
  },
  '25': {
    is_enabled: false,
    is_reserved: false
  },
  '26': {
    is_enabled: false,
    is_reserved: false
  },
  '27': {
    is_enabled: false,
    is_reserved: false
  },
  '28': {
    is_enabled: false,
    is_reserved: false
  },
  '29': {
    is_enabled: false,
    is_reserved: false
  },
  '30': {
    is_enabled: false,
    is_reserved: false
  },
  '31': {
    is_enabled: false,
    is_reserved: false
  }
}

export const topics = {
  Traveling: '旅行',
  Reading: '読書',
  Art: '芸術'
}
