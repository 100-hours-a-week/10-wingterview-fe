import { useState } from 'react'
import styles from './styles.module.scss'
import {
  Network,
  Database,
  Cpu,
  Code,
  Binary,
  Globe,
  Shield,
  FileCode,
  Palette,
} from 'lucide-react'

interface CategoriesProps {
  onPrev: () => void
  onStart: (category: string) => void
}

const categories = [
  { id: 'network', name: '네트워크', icon: Network },
  { id: 'database', name: '데이터베이스', icon: Database },
  { id: 'os', name: '운영체제', icon: Cpu },
  { id: 'programming', name: '프로그래밍', icon: Code },
  {
    id: 'algorithm',
    name: '자료구조 & 알고리즘',
    icon: Binary,
  },
  { id: 'web', name: '웹/브라우저', icon: Globe },
  { id: 'security', name: '암호화와 보안', icon: Shield },
  { id: 'python', name: 'Python', icon: FileCode },
  { id: 'html', name: 'HTML/CSS', icon: Palette },
]

export const Categories: React.FC<CategoriesProps> = ({ onPrev, onStart }) => {
  const [selectedCategory, setSelectedCategory] = useState<string>('')

  const handleCategorySelect = (categoryId: string) => {
    setSelectedCategory(categoryId)
  }

  const handleStart = () => {
    if (selectedCategory) {
      onStart(selectedCategory)
    }
  }

  return (
    <div className={styles.categorySelection}>
      <div className={styles.categoryGrid}>
        {categories.map(category => {
          const IconComponent = category.icon
          return (
            <div
              key={category.id}
              className={`${styles.categoryCard} ${
                selectedCategory === category.id ? styles.selected : ''
              }`}
              onClick={() => handleCategorySelect(category.id)}
            >
              <div className={styles.categoryIcon}>
                <IconComponent size={24} />
              </div>
              <span className={styles.categoryName}>{category.name}</span>
            </div>
          )
        })}
      </div>

      <div className={styles.actions}>
        <button className={styles.prevButton} onClick={onPrev}>
          <span>이전</span>
        </button>

        <button
          className={`${styles.startButton} ${
            selectedCategory ? styles.active : ''
          }`}
          onClick={handleStart}
          disabled={!selectedCategory}
        >
          <span>퀴즈 시작</span>
        </button>
      </div>
    </div>
  )
}
