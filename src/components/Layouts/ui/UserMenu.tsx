import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
} from '@/components/ui/dropdown-menu';
import { IIcon } from '@/components/IIcon';
import Link from 'next/link';

interface UserMenuProps {
  userLinks: { href: string; title: string }[];
}
const UserMenu: React.FC<UserMenuProps> = ({ userLinks }) => {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger className="">
        <div className="rounded-full bg-gray-800 p-2 cursor-pointer">
          <IIcon icon="fa-solid:user" className="h-6 w-6 text-white" />
        </div>
      </DropdownMenuTrigger>
      <DropdownMenuContent>
        {userLinks.map((link, index) => (
          <DropdownMenuItem key={index}>
            <Link href={link.href}>{link.title}</Link>
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export { UserMenu };
