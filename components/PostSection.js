import TextPostSection from './TextPostSection'

export default function PostSection({ type, content, setPostSections }) {
  switch(type) {
    case 'text':
      return <TextPostSection content={content} />
    default:
      return
  }
}
