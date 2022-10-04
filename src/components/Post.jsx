import { useState } from 'react'

import { format, formatDistanceToNow } from 'date-fns'
import ptBR from 'date-fns/esm/locale/pt-BR'

import { Avatar } from './Avatar'
import { Comment } from './Comment'
import styles from './Post.module.css'



export const Post = ({ author, publishedAt, content }) => {

  const [comments, setComments] = useState([
    'Post muito bacana!',
  ])

  const [newCommentText, setNewCommentText] = useState('')

  
  const publishedAtDateFormatted = format(publishedAt, "d 'de' LLLL 'às' HH:mm'h'", {
    locale: ptBR,
  })

  const publishedDateRelativeToNow = formatDistanceToNow(publishedAt, {
    locale: ptBR,
    // aqui esta addSuffix por que no inglês isso vem depois(aqui no brasil seria addPrefix), mas funciona normalmente
    addSuffix: true
  })

  const handleCreateNewComment = () => {
    
    event.preventDefault()

    setComments([...comments, newCommentText])

    setNewCommentText('')
  }

  const handleNewCommentChange = () => {
    setNewCommentText(event.target.value)
  }

  const deleteComment = (commentToDelete) => {
    const commentsWithoutTheCommentToDelete = comments.filter((el) => 
      el !== commentToDelete
    )

    setComments(commentsWithoutTheCommentToDelete)
  }



  return (
    <article className={styles.post}>
      <header>
        <div className={styles.author}>
          <Avatar src={author.avatarUrl}/>
          <div className={styles.authorInfo}>
            <strong>{author.name}</strong>
            <span>{author.role}</span>
          </div>
        </div>
        
        {/* podemos lidar com datas através do intl do java script mas nesse caso iri utilizar um lib chamada Date-fns para facilitar*/}
        <time title={publishedAtDateFormatted} dateTime={publishedAt.toISOString()} >{publishedDateRelativeToNow}</time>
      </header>

      <div className={styles.content}>
        {content.map(line => {
          if(line.type === 'paragraph') {
            return <p key={line.content}>{line.content}</p>
          } else if (line.type === 'link') {
            return <p key={line.content}><a href='#'>{line.content}</a></p>
          }
        })}
      </div>

      <form onSubmit={handleCreateNewComment} className={styles.commentForm}>
        <strong>Deixe seu feedback</strong>
        <textarea
          value={newCommentText}  
          name='comment'
          placeholder='Deixe um comentário'
          onChange={handleNewCommentChange}
        />
        
        <footer>
          <button type='submit'>Publicar</button>
        </footer>
        
      </form>

      <div className={styles.commentList}>

        {comments.map(comment => {
          return (
            <Comment 
              key={ comment } 
              content={ comment }
              onDeleteComment={deleteComment}
            />
          )
        })}

      </div>

    </article>
  )
}