interface DividerProps { text?: string }

const Divider: React.FC<DividerProps> = ({ text }) => {
    if (text) {
        return (
            <div className="flex items-center gap-2 my-6">
                <div className="h-[1px] flex-1 bg-gradient-to-r from-transparent to-gray-300 " />
                <span className="text-xs text-gray-300">{text}</span>
                <div className="h-[1px] flex-1 bg-gradient-to-l from-transparent to-gray-300 " />
            </div>
        )
    }
    return (
        <div className="h-[1px] my-6 bg-gradient-to-r from-transparent via-gray-300 to-transparent" />
    )
}

export default Divider