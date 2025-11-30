type RunMessage = {
    type: "hint" | "error";
    text: string;
};

type ConsoleProps = {
    messages: RunMessage[];
};

const Console: React.FC<ConsoleProps> = ({ messages }) => {
    return (
        <div className='w-full px-4 sm:px-6 pb-20 overflow-auto bg-[#0d1117]'>
            <div className='mt-4'>
                {messages.length === 0 ? (
                    <div className='text-xs sm:text-sm text-slate-400'>No messages yet. Click Run to populate.</div>
                ) : (
                    <ul className='space-y-2'>
                        {messages.map((m, idx) => (
                            <li key={`${m.type}-${m.text}-${idx}`} className={`rounded-lg border-2 px-3 sm:px-4 py-3 bg-slate-900 border-slate-700 text-xs sm:text-sm font-mono ${m.type === 'error' ? 'text-rose-400' : 'text-emerald-300'}`}>
                                {m.type === 'error' ? '❌ Error: ' : '💡 Hint: '} {m.text}
                            </li>
                        ))}
                    </ul>
                )}
            </div>
        </div>
    )
}

export default Console