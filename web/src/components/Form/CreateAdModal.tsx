import { Check, GameController } from 'phosphor-react';
import * as Dialog from '@radix-ui/react-dialog'
import * as Checkbox from '@radix-ui/react-checkbox'
import * as ToggleGroup from '@radix-ui/react-toggle-group'
import { Input } from './input';
import { useEffect, useState, FormEvent } from 'react';
import axios from 'axios';

interface Game {
    id: string;
    title: string;
}

export function CreateAdModal() {
    const [games, setGames] = useState<Game[]>([])
    const [weekDays, setWeekDays] = useState<string[]>([])
    const [useVoiceChannel, setUseVoiceChannel] = useState(false)
    useEffect(() => {
        axios('http://localhost:3333/games').then(response => {
            setGames(response.data)
        })
    }, [])

    async function handleCreateAd(event: FormEvent) {
        event.preventDefault();
        const formData = new FormData(event.target as HTMLFormElement)
        const data = Object.fromEntries(formData)

        if(!data.name){
            return;
        }

        try {
            await axios.post(`http://localhost:3333/games/${data.game}/ads`,{
                name: data.name,
                yearsPlaying: Number(data.yearsPlaying),
                discord: data.discord,
                weekDays: weekDays.map(Number),
                hourStart: data.hourStart,
                hourEnd: data.hourEnd,
                useVoiceChannel: useVoiceChannel  
            })
            alert('Ad created successfully!')
        }catch(err){
            console.log(err)
            alert('Error creating ad')
        }
    }

    return (
        <Dialog.Portal>
            <Dialog.Overlay className="bg-black/60 inset-0 fixed" />
            <Dialog.Content className="fixed bg-[#2A2634] py-8 px-10 text-white top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 rounded-lg w-[480px] shadow-black/25">
                <Dialog.Title className="text-3xl font-black">Post an Ad</Dialog.Title>
                <form onSubmit={handleCreateAd} className="mt-8 flex flex-col gap-4">
                    <div className="flex flex-col gap-2">
                        <label htmlFor="game" className="font-semibold">Which game?</label>
                        <select name="game" id="game" className="bg-zinc-900 py-3 px-4 rounded text-sm placeholder:text-zinc-500" defaultValue="">
                            <option disabled value="">Choose your game</option>

                            {games.map(game => {
                                return (
                                    <option key={game.id} value={game.id}>{game.title}</option>
                                )
                            })}
                        </select>
                    </div>
                    <div className="flex flex-col gap-2">
                        <label htmlFor="name">Your name/nickname</label>
                        <Input name="name" id="name" placeholder="What's your nick?" />
                    </div>
                    <div className="grid grid-cols-2 gap-6">
                        <div className="flex flex-col gap-2">
                            <label htmlFor="yearsPlaying">How many years have you been playing?</label>
                            <Input name="yearsPlaying" id="yearsPlaying" type="number" placeholder='It could be zero too' />
                        </div>
                        <div className="flex flex-col gap-2">
                            <label htmlFor="discord">Wha'ts your discord?</label>
                            <Input name="discord" id="discord" type="text" placeholder='User#0000' />
                        </div>
                    </div>
                    <div className="flex gap-6">
                        <div className="flex flex-col gap-2">
                            <label htmlFor="weekDays">When do you play?</label>
                                <ToggleGroup.Root type="multiple" className="grid grid-cols-4 gap-2" value={weekDays} onValueChange={setWeekDays}>
                                    <ToggleGroup.Item value="0" title="Sunday" className={`w-8 h-8 rounded ${weekDays.includes('0') ? 'bg-violet-500' : 'bg-zinc-900'}`}>S</ToggleGroup.Item>
                                    <ToggleGroup.Item value="1" title="Monday" className={`w-8 h-8 rounded ${weekDays.includes('1') ? 'bg-violet-500' : 'bg-zinc-900'}`}>M</ToggleGroup.Item>
                                    <ToggleGroup.Item value="2" title="Tuesday" className={`w-8 h-8 rounded ${weekDays.includes('2') ? 'bg-violet-500' : 'bg-zinc-900'}`}>T</ToggleGroup.Item>
                                    <ToggleGroup.Item value="3" title="Wednesday" className={`w-8 h-8 rounded ${weekDays.includes('3') ? 'bg-violet-500' : 'bg-zinc-900'}`}>W</ToggleGroup.Item>
                                    <ToggleGroup.Item value="4" title="Thursday" className={`w-8 h-8 rounded ${weekDays.includes('4') ? 'bg-violet-500' : 'bg-zinc-900'}`}>T</ToggleGroup.Item>
                                    <ToggleGroup.Item value="5" title="Friday" className={`w-8 h-8 rounded ${weekDays.includes('5') ? 'bg-violet-500' : 'bg-zinc-900'}`}>F</ToggleGroup.Item>
                                    <ToggleGroup.Item value="6" title="Saturday" className={`w-8 h-8 rounded ${weekDays.includes('6') ? 'bg-violet-500' : 'bg-zinc-900'}`}>S</ToggleGroup.Item>
                                </ToggleGroup.Root>
                        </div>
                        <div className="flex flex-col gap-2 flex-1">
                            <label htmlFor="hourStart">What time of day?</label>
                            <div className="grid grid-cols-2 gap-2">
                                <Input name="hourStart" id="hourStart" type="time" placeholder='From' />
                                <Input name="hourEnd" id="hourEnd" type="time" placeholder='To' />
                            </div>
                        </div>
                    </div>
                    <label className="mt-2 flex items-center gap-2 text-sm">
                        <Checkbox.Root 
                        checked={useVoiceChannel}
                            onCheckedChange={(checked) => {
                                if(checked == true){
                                    setUseVoiceChannel(true)
                                }else{
                                    setUseVoiceChannel(false)
                                }
                            }} 
                            className="w-6 h-6 p-1 rounded bg-zinc-900"
                        >
                            <Checkbox.Indicator>
                                <Check className="w-4 h-4 text-emerald-400" />
                            </Checkbox.Indicator>
                        </Checkbox.Root>
                        Allow voice chat
                    </label>
                    <footer className="mt-4 flex justify-end gap-4">
                        <Dialog.Close type='button' className="bg-zinc-500 px-5 h-12 rounded-md font-semibold hover:bg-zinc-600">Cancel</Dialog.Close>
                        <button className="bg-violet-500 px-5 h-12 rounded-md font-semibold flex items-center gap-3 hover:bg-violet-600" type="submit">
                            <GameController size={24} />
                            Find duo
                        </button>
                    </footer>
                </form>
            </Dialog.Content>
        </Dialog.Portal>
    )
}