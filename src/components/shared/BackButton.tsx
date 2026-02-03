'use client';
import { useRouter } from 'next/navigation';
import { Button } from '../ui/button';
import { MoveLeft } from 'lucide-react';

const BackButton = ({ href, text }: { href: string; text: string }) => {
  const router = useRouter();

  return (
    <Button className='mt-4' type="button" variant="outline" onClick={() => router.push(href)}>
        <MoveLeft className="mr-2 h-4 w-4" />
      {text}
    </Button>
  );
};

export default BackButton;
