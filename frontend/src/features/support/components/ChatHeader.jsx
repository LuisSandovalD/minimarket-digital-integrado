export default function ChatHeader({ ticket, isSupport, onChangeStatus }) {
  return (
    <div className="flex items-center justify-between border-b border-white/10 bg-[#111827] px-6 py-4">
      <div>
        <h2 className="font-semibold">{ticket.title}</h2>

        <p className="text-sm text-gray-400">{ticket.status}</p>
      </div>

      {isSupport && (
        <select
          value={ticket.status}
          onChange={(e) => onChangeStatus(e.target.value)}
          className="rounded-lg bg-[#1f2937] p-2 outline-none"
        >
          <option value="OPEN">OPEN</option>

          <option value="IN_PROGRESS">IN_PROGRESS</option>

          <option value="WAITING">WAITING</option>

          <option value="RESOLVED">RESOLVED</option>

          <option value="CLOSED">CLOSED</option>

          <option value="REOPENED">REOPENED</option>
        </select>
      )}
    </div>
  );
}
