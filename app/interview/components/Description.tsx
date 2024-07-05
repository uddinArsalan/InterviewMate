import React from "react";
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent } from '@/components/ui/card';

const Description = () => {
  return (
    <Card className="w-full">
    <CardContent className="p-6">
      <Textarea
        placeholder="Input your answer here ..."
        className="min-h-[200px]"
      />
    </CardContent>
  </Card>
  );
};

export default Description;
