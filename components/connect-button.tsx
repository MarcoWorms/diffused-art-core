import { useWallet } from '@solana/wallet-adapter-react';
import { useWalletModal } from '@solana/wallet-adapter-react-ui';
import { signOut } from 'next-auth/react';
import cns from 'classnames';
import { WalletIcon } from '@heroicons/react/24/outline';

interface ConnectButtonProps {
  label?: string;
  className?: string;
}

export default function ConnectButton({
  label = 'Connect',
  className = '',
}: ConnectButtonProps) {
  const wallet = useWallet();
  const walletModel = useWalletModal();
  return (
    <button
      aria-label="connect wallet"
      className={cns(
        `w-[180px] rounded-md px-4 min-h-[40px] h-full bg-main-yellow text-black truncate`,
        className,
      )}
      onClick={() => {
        if (wallet.connected) {
          if (confirm('Are you sure you want to disconnect?')) {
            wallet.disconnect();
            signOut({ redirect: false }).catch(e => console.log('e', e));
          }
        } else {
          walletModel.setVisible(true);
        }
      }}
    >
      <span className="text-sm md:text-base">
        {wallet.connected ? (
          <div className="flex flex-col">
            <span>Connected</span>
            <span className="truncate">{wallet.publicKey?.toString()}</span>
          </div>
        ) : (
          label
        )}
      </span>
    </button>
  );
}
