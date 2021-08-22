import IconButton from '@material-ui/core/IconButton'
import ArrowDropDownIcon from '@material-ui/icons/ArrowDropDown'
import ArrowDropUpIcon from '@material-ui/icons/ArrowDropUp'

export default function PostSection({ children, handleMoveSection, sectionIndex }) {
  return (
    <>
      <div style={{ display: 'inline-block', width: '50px', minHeight: '250px' }}>
        <IconButton onClick={() => handleMoveSection(sectionIndex, 'up')}>
          <ArrowDropUpIcon />
        </IconButton>
        <IconButton onClick={() => handleMoveSection(sectionIndex, 'down')}>
          <ArrowDropDownIcon />
        </IconButton>
      </div>
      <div style={{ display: 'inline-block', verticalAlign: 'top', width: 'calc(100% - 50px)' }}>
        {children}
      </div>
    </>
  )
}
