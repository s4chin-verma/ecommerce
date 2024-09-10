'use client';

import { useState, useEffect } from 'react';
import { Input } from '@/components/ui/input';
import { IIcon } from '@/components/IIcon';
import clsx from 'clsx';
import { Search, User } from 'lucide-react';
import { Button } from '@/components/ui/button';

const SearchBar = () => {
  const [showSearch, setShowSearch] = useState(false);
  const [typing, setTyping] = useState(false);

  useEffect(() => {
    let timeout: ReturnType<typeof setTimeout>;
    if (showSearch && !typing) {
      timeout = setTimeout(() => {
        setShowSearch(false);
      }, 3000);
    }
    return () => clearTimeout(timeout);
  }, [showSearch, typing]);

  return (
    <div className="flex gap-3">
      {showSearch ? (
        <div
          className={clsx(
            'relative flex items-center transition-all duration-1000 ease-in-out',
            { 'w-0': !showSearch, 'w-72': showSearch }
          )}
        >
          <Input
            className="rounded-full"
            onChange={() => setTyping(true)}
            onBlur={() => setTyping(false)}
            autoFocus
          />
          <IIcon
            icon="material-symbols:search"
            className="h-7 w-7 absolute right-2 top-2"
          />
        </div>
      ) : (
        <Button
          className="rounded-full bg-gray-800 p-2 cursor-pointer"
          onClick={() => setShowSearch(true)}
        >
          <Search className="h-6 w-6 text-white" />
        </Button>
      )}
    </div>
  );
};

export { SearchBar };
