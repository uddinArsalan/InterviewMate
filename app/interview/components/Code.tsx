import React,{useState} from 'react';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent } from '@/components/ui/card';

const Code = () => {
  const [language, setLanguage] = useState('java');
  return (
    <Card className="w-full">
    <CardContent className="p-6">
      <div className="flex justify-end mb-4">
        <Select value={language} onValueChange={setLanguage}>
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="Select Language" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="java">Java</SelectItem>
            <SelectItem value="c++">C++</SelectItem>
            <SelectItem value="javascript">JavaScript</SelectItem>
            <SelectItem value="typescript">TypeScript</SelectItem>
            <SelectItem value="python">Python</SelectItem>
            <SelectItem value="rust">Rust</SelectItem>
            <SelectItem value="go">Go</SelectItem>
          </SelectContent>
        </Select>
      </div>
      <Textarea
        placeholder="Input your code here ..."
        className="min-h-[200px] bg-slate-900 text-white font-mono"
      />
    </CardContent>
  </Card>
  )
}

export default Code