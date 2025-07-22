import { useRef, useEffect } from 'react'
import styles from './styles.module.scss'
import { LoadingIndicator, ProfileImage } from '@/components/ui'
import { useNavigate } from 'react-router-dom'
import { dateFormatter } from '@/utils'

interface Props {
  posts: BoardItem[]
  hasNextPage: boolean | undefined
  isFetchingNextPage: boolean
  fetchNextPage: () => void
}

export const BoardPostList: React.FC<Props> = ({
  posts,
  hasNextPage,
  isFetchingNextPage,
  fetchNextPage,
}) => {
  const navigate = useNavigate()
  const observerTarget = useRef<HTMLDivElement>(null)

  const handleClick = (id: string) => {
    navigate(`/board/${id}`)
  }

  useEffect(() => {
    const target = observerTarget.current
    const observer = new IntersectionObserver(
      entries => {
        if (entries[0].isIntersecting && hasNextPage) fetchNextPage()
      },
      { threshold: 0.1 }
    )

    if (target) observer.observe(target)

    return () => {
      if (target) observer.unobserve(target)
    }
  }, [fetchNextPage, hasNextPage])

  return (
    <div className={styles.postList}>
      {posts.map(post => (
        <div
          key={post.boardId}
          className={styles.postItem}
          onClick={() => handleClick(post.boardId)}
        >
          {post.isMyPost ? (
            <div className={styles.myPost}>
              <p className={styles.name}>{post.authorNickname}</p>
              <div className={styles.avatarAndBubble}>
                <div className={styles.content}>
                  <div className={styles.bubble}>
                    <h3 className={styles.question}>Q: {post.question}</h3>
                    <div className={styles.meta}>
                      <span className={styles.views}>조회 {post.viewCnt}</span>
                      <span className={styles.date}>
                        {dateFormatter(post.createdAt)}
                      </span>
                    </div>
                  </div>
                </div>
                <div className={styles.author}>
                  <ProfileImage url={post.authorProfileImageUrl} size={45} />
                </div>
              </div>
            </div>
          ) : (
            <div className={styles.otherPost}>
              <p className={styles.name}>{post.authorNickname}</p>
              <div className={styles.avatarAndBubble}>
                <div className={styles.author}>
                  <ProfileImage url={post.authorProfileImageUrl} size={45} />
                </div>
                <div className={styles.content}>
                  <div className={styles.bubble}>
                    <h3 className={styles.question}>Q: {post.question}</h3>
                    <div className={styles.meta}>
                      <span className={styles.views}>조회 {post.viewCnt}</span>
                      <span className={styles.date}>
                        {dateFormatter(post.createdAt)}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      ))}

      {isFetchingNextPage && (
        <div className={styles.loading}>
          <LoadingIndicator size={40} />
        </div>
      )}

      {hasNextPage && (
        <div ref={observerTarget} className={styles.trigger}></div>
      )}
    </div>
  )
}
