import PostSection from './PostSection'
import TextPostSection from './TextPostSection'

export default function PostEditor({ pageAPI, post }) {
  const { handleMoveSection, setPost } = pageAPI

  return (
    <>
      {post.sections.map(({ id, type }, sectionIndex) => {
        return (
          <PostSection key={id} handleMoveSection={handleMoveSection} sectionIndex={sectionIndex}>
            {
              {
                'text': <TextPostSection post={post} setPost={setPost} sectionIndex={sectionIndex} />
              }[type]
            }
          </PostSection>
        )
      })}
    </>
  )
}
