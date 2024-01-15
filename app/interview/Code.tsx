import React from 'react'

const Code = () => {
  return (
    <div className='relative '>
    <div className='absolute top-0 right-0'>
        <select name="" id="" className='w-42'>
            <option value="java" selected>Java</option>
            <option value="c++">C++</option>
            <option value="javascript">JavaScript</option>
            <option value="typescript">TypeScript</option>
            <div className='css'>CSS</div>
            <option value="python">Python</option>
            <option value="rust">Rust</option>
            <option value="go">Go</option>
        </select>
    </div>
    <textarea
    name=""
    id=""
    rows={10}
    placeholder="Input your Code here ..."
    className="p-8 w-full bg-black border-2 text-white"
  ></textarea></div>
  )
}

export default Code