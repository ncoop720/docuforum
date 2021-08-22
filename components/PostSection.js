import IconButton from '@material-ui/core/IconButton'
import ArrowDropDownIcon from '@material-ui/icons/ArrowDropDown'
import ArrowDropUpIcon from '@material-ui/icons/ArrowDropUp'

export default function PostSection({ children, movePostSection, sectionIndex }) {
  return (
    <>
      <div style={{ display: 'inline-block', width: '50px', minHeight: '250px' }}>
        <IconButton onClick={() => movePostSection(sectionIndex, 'up')}>
          <ArrowDropUpIcon />
        </IconButton>
        <IconButton onClick={() => movePostSection(sectionIndex, 'down')}>
          <ArrowDropDownIcon />
        </IconButton>
      </div>
      <div style={{ display: 'inline-block', verticalAlign: 'top', width: 'calc(100% - 50px)' }}>
        {children}
      </div>
    </>
  )
}
