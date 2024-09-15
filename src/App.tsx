import { ChangeEvent, useState } from 'react'
import './App.css'
import { data } from './data'
import JsonViewer from './Components/JsonViewer';


const getValueByPath = (obj: any, path: string) => {
  try {
    return path.split('.').reduce((acc, part) => {
      const arrayIndexMatch = part.match(/(.+)\[(\d+)\]/);
      if(arrayIndexMatch) {
        const [, key, index] = arrayIndexMatch;
        return acc[key][parseInt(index, 10)];
      }
      return acc[part];
    }, obj);
  } catch (e) {
    return undefined
  }
}

const App = () => {

  const [path, setPath] = useState<string>('')
  const [value, setValue] = useState<string>('undefined')

  const handlePathChange = (e: ChangeEvent<HTMLInputElement>) => {
    const newPath = e.target.value
    setPath(newPath)
    const val = getValueByPath(data, newPath.replace('res.', ''))
    setValue(val !== undefined ? JSON.stringify(val) : 'undefined')
  }

  const handleClickKey = (newPath: string) => {
    setPath(newPath)
    const val = getValueByPath(data, newPath.replace('res.', ''))
    setValue(val !== undefined ? JSON.stringify(val) : 'undefined')
  }

  return(
    <div className='wrapper'>
      <h4>Property</h4>
      <div>
        <input 
          type="text"
          value={path}
          onChange={handlePathChange}
          placeholder='Enter Path'
        />
        <p>{value}</p>
      </div>
      <h4>Response</h4>
      <JsonViewer data={data} onKeyClick={handleClickKey}/>
    </div>
  )
};

export default App
