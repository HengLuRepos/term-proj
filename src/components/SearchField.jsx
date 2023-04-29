import { BsSearch } from 'react-icons/bs'
export default function SearchField({name, handleChange, handleSearch, handleEnter}) {
  return(
    <div id="searchGame">
      <input
        type="text" 
        id="search" 
        placeholder="Please enter game title" 
        value={name} 
        onChange={handleChange}
        onKeyDown={handleEnter}
        />
      <button type='button' onClick={handleSearch}>
        <BsSearch size={28}/>
      </button>
    </div>
  )
}