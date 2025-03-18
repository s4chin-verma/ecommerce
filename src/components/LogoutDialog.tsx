import { ReactNode } from 'react';
import { signOut } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { toast } from 'sonner';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogClose,
} from '@/components/ui/dialog';

export const LogoutDialog = ({ children }: { children: ReactNode }) => {
  const router = useRouter();
  const handleSignOut = async () => {
    try {
      await signOut({ redirect: false });
      router.push('/');
      toast.success('Logged out successfully', {
        description: 'You have been securely logged out of your account.',
      });
    } catch (error) {
      toast.error('Error logging out', {
        description: 'An unexpected error occurred. Please try again',
      });
    }
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        <div onClick={e => e.stopPropagation()}>{children}</div>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle className="text-2xl font-bold">
            Confirm Logout
          </DialogTitle>
          <DialogDescription className="text-gray-500 mt-2">
            Are you sure you want to log out of your account? You will need to
            log in again to access your account.
          </DialogDescription>
        </DialogHeader>
        <DialogFooter className="flex justify-end space-x-2 mt-6">
          <Button
            onClick={handleSignOut}
            className="bg-red-500 hover:bg-red-600 text-white"
          >
            Yes, Log Out
          </Button>
          <DialogClose asChild>
            <Button variant="outline">Cancel</Button>
          </DialogClose>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};
