# https://github.com/isy/miyabi/blob/master/lib/format.rb
# miyabi gem は不要な mechanize にバージョン固定で依存しているため、
# 必要なメソッドだけ切り出して使用します

class String
  def to_kana
    self.tr('ぁ-ん','ァ-ン')
  end

  def to_hira
    self.tr('ァ-ン','ぁ-ん')
  end

  def to_roman
    s = self.to_kana
    translated = []
  
    s.split('').each_with_index do |letter, index|
      pushed = false
      probably_two_letters = kana_roman[:probably_two_letters]
      single_letter = kana_roman[:single_letter]
      two_letters = kana_roman[:two_letters]

      if probably_two_letters.include? letter
        two_letter_part = [letter, s[index+1]].join("")
        if two_letters[two_letter_part]
          translated.push(two_letters[two_letter_part])
          pushed = true
        end
      end

      pushed == false && translated.push(single_letter[letter])
    end

    translated.compact.join()
  end

  private
  def kana_roman
    single_letter = {
      'ア' => 'a',
      'イ' => 'i',
      'ウ' => 'u',
      'エ' => 'e',
      'オ' => 'o',
      'カ' => 'ka',
      'キ' => 'ki',
      'ク' => 'ku',
      'ケ' => 'ke',
      'コ' => 'ko',
      'サ' => 'sa',
      'シ' => 'shi',
      'ス' => 'su',
      'セ' => 'se',
      'ソ' => 'so',
      'タ' => 'ta',
      'チ' => 'chi',
      'ツ' => 'tsu',
      'テ' => 'te',
      'ト' => 'to',
      'ナ' => 'na',
      'ニ' => 'ni',
      'ヌ' => 'nu',
      'ネ' => 'ne',
      'ノ' => 'no',
      'ハ' => 'ha',
      'ヒ' => 'hi',
      'フ' => 'fu',
      'ヘ' => 'he',
      'ホ' => 'ho',
      'マ' => 'ma',
      'ミ' => 'mi',
      'ム' => 'mu',
      'メ' => 'me',
      'モ' => 'mo',
      'ヤ' => 'ya',
      'ユ' => 'yu',
      'ヨ' => 'yo',
      'ラ' => 'ra',
      'リ' => 'ri',
      'ル' => 'ru',
      'レ' => 're',
      'ロ' => 'ro',
      'ワ' => 'wa',
      'ヰ' => 'i',
      'ヱ' => 'e',
      'ヲ' => 'o',
      'ン' => 'n',
      'ガ' => 'ga',
      'ギ' => 'gi',
      'グ' => 'gu',
      'ゲ' => 'ge',
      'ゴ' => 'go',
      'ザ' => 'za',
      'ジ' => 'ji',
      'ズ' => 'zu',
      'ゼ' => 'ze',
      'ゾ' => 'zo',
      'ダ' => 'da',
      'ヂ' => 'ji',
      'ヅ' => 'zu',
      'デ' => 'de',
      'ド' => 'do',
      'バ' => 'ba',
      'ビ' => 'bi',
      'ブ' => 'bu',
      'ベ' => 'be',
      'ボ' => 'bo',
      'パ' => 'pa',
      'ピ' => 'pi',
      'プ' => 'pu',
      'ペ' => 'pe',
      'ポ' => 'po'
    }

    probably_two_letters = ['キ', 'シ', 'チ', 'ヂ', 'ニ', 'ヒ', 'ミ', 'リ', 'ギ', 'ジ', 'ビ', 'ピ', 'ヴ', 'フ']

    two_letters = {
      'キャ' => 'kya',
      'キュ' => 'kyu',
      'キョ' => 'kyo',
      'シャ' => 'sha',
      'シュ' => 'shu',
      'ショ' => 'sho',
      'チャ' => 'cha',
      'チュ' => 'chu',
      'チョ' => 'cho',
      'ヂャ' => 'ja',
      'ヂュ' => 'ju',
      'ヂョ' => 'jo',
      'ニャ' => 'nya',
      'ニュ' => 'nyu',
      'ニョ' => 'nyo',
      'ヒャ' => 'hya',
      'ヒュ' => 'hyu',
      'ヒョ' => 'hyo',
      'ミャ' => 'mya',
      'ミュ' => 'myu',
      'ミョ' => 'myo',
      'リャ' => 'rya',
      'リュ' => 'ryu',
      'リョ' => 'ryo',
      'ギャ' => 'gya',
      'ギュ' => 'gyu',
      'ギョ' => 'gyo',
      'ジャ' => 'ja',
      'ジュ' => 'ju',
      'ジョ' => 'jo',
      'ビャ' => 'bya',
      'ビュ' => 'byu',
      'ビョ' => 'byo',
      'ピャ' => 'pya',
      'ピュ' => 'pyu',
      'ピョ' => 'pyo',
      'ヴァ' => 'va',
      'ヴィ' => 'vi',
      'ヴ' => 'vu',
      'ヴェ' => 've',
      'ヴォ' => 'vo',
      'ファ' => 'fa',
      'フィ' => 'fi',
      'フェ' => 'fe',
      'フォ' => 'fo',
    }
    {
      single_letter: single_letter,
      probably_two_letters: probably_two_letters,
      two_letters: two_letters
    }
  end
end
