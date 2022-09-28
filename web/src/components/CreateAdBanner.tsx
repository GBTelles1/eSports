import { MagnifyingGlassPlus } from 'phosphor-react';
import * as Dialog from '@radix-ui/react-dialog'


export function CreateAdBanner() {
    return (
        <div className='pt-1 bg-nlw-gradient self-stretch rounded-lg mt-8'>
            <div className='bg-[#2A2634] px-8 py-6 flex justify-between item-center'>
                <div>
                    <strong className='text-2xl text-white font-black block'>Haven't you found your duo?</strong>
                    <span className='text-zinc-400'>Post an add to find new players!</span>
                </div>
                <Dialog.Trigger>
                    <button className='py-3 px-4 bg-violet-500 hover:bg-violet-600 text-white rounded flex items-center gap-3'>
                        <MagnifyingGlassPlus size={24}/>
                        Post ad
                    </button>
                </Dialog.Trigger>
            </div>
        </div>
    )
}