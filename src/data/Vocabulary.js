import JapaneseVocabs from '@/data/JapaneseVocabs.json'
import JapaneseSigns from '@/data/JapaneseSigns.json'
import GreekVocabs from '@/data/GreekVocabs.json'
import GreekSigns from '@/data/GreekSigns.json'

export default {
  'japanese': {
    'words': JapaneseVocabs,
    'signs': JapaneseSigns,
    'latinAlphabet': 'romaji',
    'foreignAlphabet': 'kana',
    'lang': ['ja-JP', 'ja_JP']
  },
  'greek': {
    'words': GreekVocabs,
    'signs': GreekSigns,
    'latinAlphabet': 'pronunciation',
    'foreignAlphabet': 'euclidean',
    'lang': ['el-GR', 'el_GR']
  }
}
