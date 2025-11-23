// Collection metadata
// Each collection can have an about section, sources, and other metadata

export interface CollectionMetadata {
  id: string;
  about?: string;
  sources?: Array<{
    title: string;
    url: string;
    type?: 'archive' | 'book' | 'manuscript' | 'website';
  }>;
  editor?: string;
  notes?: string;
}

export const collectionMetadata: Record<string, CollectionMetadata> = {
  'tagore-letters-from-abroad': {
    id: 'tagore-letters-from-abroad',
    about: `These letters were written to Charles Freer Andrews (C. F. Andrews) by Rabindranath Tagore each week during a long absence from the Asram at Santiniketan. It was during this absence abroad that the ideal of Visvabharati, or an international settlement, at the Asram, took concrete shape. The purely personal part of this series of letters has been omitted as far as was possible without interfering with their literary form and context.`,
    sources: [
      {
        title: 'Letters from Abroad (1920-1921)',
        url: 'https://archive.org/details/in.ernet.dli.2015.97031/mode/2up',
        type: 'archive'
      }
    ],
    editor: 'C. F. Andrews',
    notes: 'Originally published as "Letters to a Friend" by Rabindranath Tagore, correspondence with Charles Freer Andrews during his 1920-1921 tour of America and Europe.'
  },
  'tagore-macmillan-letters': {
    id: 'tagore-macmillan-letters',
    about: `A collection of letters by Rabindranath Tagore spanning from the 1880s to the 1920s, published by Macmillan and Co. in 1921. These letters offer intimate glimpses into Tagore's observations of nature, society, and daily life during his travels and time managing family estates in rural Bengal. The collection showcases Tagore's early literary voice and his keen eye for detail in describing the landscapes, people, and moments that would later inspire his poetry and prose.`,
    sources: [
      {
        title: 'The Letters of Sir Rabindranath Tagore (1921)',
        url: 'https://archive.org/details/in.ernet.dli.2015.170053',
        type: 'archive'
      }
    ],
    notes: 'Published by Macmillan and Co., London, 1921. 176 pages. Digitized by the State Central Library, Hyderabad through the Digital Library of India initiative.'
  },
  'nehru-father-daughter-letters': {
    id: 'nehru-father-daughter-letters',
    about: `A collection of thirty letters written by Jawaharlal Nehru to his daughter Indira Priyadarshini (later Indira Gandhi) in the summer of 1928, when she was ten years old. Written from prison during India's independence movement, these letters cover the story of humanity from prehistoric times through ancient civilizations, offering a father's perspective on world history, science, and culture. The letters reflect Nehru's vision of education and his desire to nurture his daughter's intellectual curiosity about the world.`,
    sources: [
      {
        title: 'Letters From A Father To His Daughter (1945)',
        url: 'https://archive.org/details/in.ernet.dli.2015.531619',
        type: 'archive'
      }
    ],
    notes: 'Originally written in 1928, first published by Allahabad Law Journal Press in 1929, republished by Oxford University Press, London in 1945. Digitized by the Digital Library of India from Amar Singh College, Srinagar. 90 pages.'
  },
  'gandhi-famous-letters': {
    id: 'gandhi-famous-letters',
    about: `A curated collection of significant correspondence by Mahatma Gandhi during pivotal moments of India's independence struggle. These letters span from World War I through the Non-Cooperation Movement, the Salt March, the Round Table Conferences, and the Quit India Movement (1918-1943), addressing British officials, the Indian public, students, and international figures. They reveal Gandhi's evolution of non-violent resistance, his arguments for self-rule (Swaraj), and his principled approach to political and social transformation. The collection includes an introduction by editor R. L. Khipple providing historical context and a biographical sketch of Gandhi. These letters showcase Gandhi's diplomatic acumen, moral clarity, and unwavering commitment to truth and non-violence.`,
    sources: [
      {
        title: 'Famous Letters Of Mahatma Gandhi (1947)',
        url: 'https://archive.org/details/in.ernet.dli.2015.208999',
        type: 'archive'
      }
    ],
    editor: 'R. L. Khipple',
    notes: 'Published by The Indian Printing Works, Lahore in 1947. Digitized from the Rashtrapati Bhavan Library collection. Contains 24 significant letters from Gandhi\'s correspondence during the independence movement (1918-1943).'
  },
  'dostoevsky-letters-reminiscences': {
    id: 'dostoevsky-letters-reminiscences',
    about: `A remarkable collection spanning over three decades (1849-1880) of Fyodor Dostoevsky's life, from a young writer sentenced to death to his final triumph at the Pushkin celebration in Moscow. These 46 letters and reminiscences offer an intimate window into the mind of one of literature's greatest psychological and philosophical novelists. The collection includes his profound death sentence letter, correspondence from European exile discussing The Idiot and The Devils, Anna Grigorevna's memoirs of their struggles, the moving Pushkin celebration letters, and philosophical exchanges with Konstantin Pobiedonoszev about The Brothers Karamazov. Together, they reveal Dostoevsky's creative process, spiritual struggles, and unwavering faith amid poverty, illness, and persecution.`,
    sources: [
      {
        title: 'Dostoevsky: Letters and Reminiscences (1923)',
        url: 'https://archive.org/details/dostoevskyletter00dostuoft/mode/2up',
        type: 'archive'
      }
    ],
    editor: 'Translated by S. S. Koteliansky and J. Middleton Murry',
    notes: 'Published by Chatto & Windus, London, 1923. Includes letters to Apollon Maikov, Anna Grigorevna Dostoevsky, and Konstantin Pobiedonoszev, along with reminiscences by Anna Grigorevna. 46 posts covering the death sentence (1849), European exile (1867-1870), return to Russia (1871-1872), and final years working on The Brothers Karamazov (1879-1880).'
  }
};
