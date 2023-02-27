import React, { Fragment, useEffect, useMemo } from 'react';
import IconDiffused from '../icons/icon-diffused';
import TextInput from './form/base/text-input';
import { useRouter } from 'next/router';
import Link from 'next/link';
import ConnectButton from './connect-button';
import {
  MagnifyingGlassIcon,
  PaintBrushIcon,
  QuestionMarkCircleIcon,
} from '@heroicons/react/24/outline';
import { useWallet } from '@solana/wallet-adapter-react';
import { Dialog, Transition } from '@headlessui/react';
import useLocalStorage from '../hooks/useLocalStorage';
import NoSSR from './no-ssr';

export default function Menu() {
  const { pathname, push, query } = useRouter();
  const [modalOpen, setModalOpen] = useLocalStorage(
    'ls-how-it-works-modal',
    true,
  );

  const { connected } = useWallet();

  useEffect(() => {
    if (window) {
      window.scroll({
        top: 0,
        left: 0,
        behavior: 'smooth',
      });
    }
  }, [modalOpen]);

  const navItems = useMemo(() => {
    const items = [
      {
        label: 'Create',
        href: '/create-collection',
        icon: <PaintBrushIcon height={24} />,
        isActive: pathname.startsWith('/create-collection'),
      },
    ];

    return connected ? items : [];
  }, [pathname, connected]);

  const handleSearchTerm = event => {
    if (event.key === 'Enter') {
      push(`/?search=${event.target.value}`);
    }
  };

  return (
    <>
      <NoSSR>
        <Transition.Root show={modalOpen} as={Fragment}>
          <Dialog as="div" className="relative z-50" onClose={() => null}>
            <button />
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0"
              enterTo="opacity-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100"
              leaveTo="opacity-0"
            >
              <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" />
            </Transition.Child>

            <div className="fixed inset-0 z-10 overflow-y-auto">
              <div className="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0">
                <Transition.Child
                  as={Fragment}
                  enter="ease-out duration-300"
                  enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
                  enterTo="opacity-100 translate-y-0 sm:scale-100"
                  leave="ease-in duration-200"
                  leaveFrom="opacity-100 translate-y-0 sm:scale-100"
                  leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
                >
                  <Dialog.Panel className="relative transform overflow-hidden rounded-lg bg-primary px-4 pt-5 pb-4 text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-lg sm:p-6">
                    <div>
                      <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full">
                        <QuestionMarkCircleIcon
                          className="h-12 w-12 text-main-yellow"
                          aria-hidden="true"
                        />
                      </div>
                      <div className="mt-3 text-center sm:mt-5">
                        <Dialog.Title
                          as="h3"
                          className="text-lg font-medium leading-6 text-secondary"
                        >
                          How it works?
                        </Dialog.Title>
                        <div className="flex mt-5">
                          <div className="my-2 space-y-5 text-sm text-white flex flex-col items-center">
                            <span className="text-justify">
                              Every single NFT you mint on Diffused Art{' '}
                              <b>does not exists before you mint it</b>.
                              <br />
                              <br />
                              This effectively means that Diffused Art takes AI
                              generative art to the next level by guaranteeing
                              that your mint is truly unique and generative art
                              in the strictest sense of concept, and not just
                              &quot;generated by AI&quot;.
                              <br />
                              <br />
                              Take this preview, for example, that you get on
                              your wallet after minting:
                            </span>
                            <img
                              alt="Preview"
                              className="rounded-md h-[400px]"
                              src="https://585725967-files.gitbook.io/~/files/v0/b/gitbook-x-prod.appspot.com/o/spaces%2Fu2ZoCvLl7pKuTYsV46dK%2Fuploads%2FPHHSulfYWrbFx4VCxGu2%2Fimage.png?alt=media&token=d528bba0-d1fb-4381-a74e-6f2b6c300420"
                            />
                          </div>
                        </div>

                        <div className="flex mt-5">
                          <div className="my-2 space-y-5 text-sm text-white flex flex-col items-center">
                            <span className="text-justify">
                              This preview is generated so that you can see the
                              prompt used for minting your AI art. During this
                              process, which might take up to 2 minutes,
                              Diffused Art servers use the protocol to mutate
                              your NFT with a unique seed derived from the mint
                              address, and generate the resulting art using all
                              parameters.
                              <br />
                              <br />
                              After the process is done, you can check the final
                              result of your Diffused Art NFT on your wallet,
                              now with immutable metadata and with all the
                              parameters used to generate it engraved inside the
                              attributes of the NFT:
                            </span>
                            <img
                              alt="Revealed"
                              className="rounded-md h-[400px]"
                              src="https://nftstorage.link/ipfs/bafkreifm2lxc2egbytzwwrhxvaxjkamx6afdn4e63tte4f5uhe3quih2oe"
                            />
                          </div>
                        </div>

                        <div className="flex mt-5">
                          <div className="my-2 space-y-5 text-sm text-white flex flex-col items-center">
                            <span className="text-justify">
                              This process of generating the AI art NFT and
                              making it immutable guarantees to users that they
                              are truly buying AI generative art, in which they
                              can check the provenance of the NFT art by running
                              the source AI model with the paramaters at any
                              time and where the uniqueness is guaranteed by the
                              blockchain itself.
                            </span>
                          </div>
                        </div>
                      </div>
                    </div>
                    <button
                      type="button"
                      autoFocus={false}
                      className="mt-3 inline-flex w-full justify-center rounded-md 
                    border border-gray-300 bg-secondary text-primary px-4 py-2 text-base font-medium shadow-sm"
                      onClick={() => {
                        setModalOpen(false);
                      }}
                    >
                      Nice, got it, thanks!
                    </button>
                  </Dialog.Panel>
                </Transition.Child>
              </div>
            </div>
          </Dialog>
        </Transition.Root>
      </NoSSR>

      <div className="flex items-center fixed top-0 z-40 justify-evenly space-x-2 min-h-[50px] h-[50px] md:min-h-[70px] md:h-[70px] w-full px-4 sm:px-8 md:px-12 lg:px-14 xl:px-18 2xl:px-26 mb-4">
        <div className="bg-primary-100 rounded-br-lg rounded-bl-lg w-full px-3 flex justify-between items-center h-full">
          <div className="space-x-5 items-center justify-center flex">
            <Link href="/">
              <IconDiffused className="min-h-[20px] h-[20px] md:min-h-[30px] md:h-[30px]" />
            </Link>

            <TextInput
              placeholder="Search drops here..."
              aria-label="prompt search"
              onKeyDown={handleSearchTerm}
              defaultValue={query.search}
              className="hidden sm:hidden md:hidden lg:inline-block lg:w-[400px] xl:w-[600px] 2xl:w-[800px] transition-all !rounded-lg"
              suffixComponent={<MagnifyingGlassIcon height={24} />}
            />
          </div>

          <div className="flex items-center h-full space-x-5 md:space-x-10 mx-2">
            <div
              className="text-main-yellow cursor-pointer h-full flex items-center justify-end relative space-x-1 text-xs md:text-base"
              onClick={() => setModalOpen(true)}
            >
              <span>
                <QuestionMarkCircleIcon height={26} />
              </span>
              <span className="hidden md:inline-block">How it works?</span>
            </div>
            {navItems.map(item => (
              <Link
                href={item.href}
                key={item.href}
                className={`text-main-yellow h-full flex items-center justify-end relative space-x-1 text-xs md:text-base ${
                  item.isActive
                    ? 'after:absolute after:bottom-0 after:w-full after:h-[1px] after:bg-main-yellow'
                    : ''
                }`}
              >
                <span>{item.icon}</span>
                <span className="hidden md:inline-block">{item.label}</span>
              </Link>
            ))}
          </div>
        </div>

        <ConnectButton />
      </div>
      <div className="w-full px-5 fixed bottom-2 z-50 lg:hidden">
        <TextInput
          placeholder="Search drops here..."
          aria-label="prompt search"
          defaultValue={query.search}
          className="transition-all !bg-secondary-110 !text-white !placeholder-white !rounded-lg"
          onKeyDown={handleSearchTerm}
          suffixComponent={<MagnifyingGlassIcon height={24} />}
        />
      </div>
    </>
  );
}
