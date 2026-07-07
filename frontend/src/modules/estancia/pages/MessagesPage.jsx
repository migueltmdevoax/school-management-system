import { useState, useEffect, useRef } from "react";
import { useSelector }                  from "react-redux";
import { useGetMyConversationsQuery, useGetConversationQuery, useSendMessageMutation }
  from "../api/messagesApi";
import SkeletonTable from "../../../components/feedback/SkeletonTable";
import { useToast }  from "../../../features/toast/useToast";

export default function MessagesPage() {
  const { user } = useSelector((s) => s.auth);
  const toast    = useToast();

  const [selectedConv, setSelectedConv] = useState(null);
  const [content, setContent]           = useState("");
  const messagesEndRef                  = useRef(null);

  const { data: convsData, isLoading }   = useGetMyConversationsQuery();
  const { data: convData, refetch }      = useGetConversationQuery(
    { otherUserId: selectedConv?.other_id, studentId: selectedConv?.student_id },
    { skip: !selectedConv, pollingInterval: 5000 }
  );
  const [sendMessage, { isLoading: sending }] = useSendMessageMutation();

  const conversations = convsData?.data || [];
  const messages      = convData?.data  || [];

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const handleSend = async (e) => {
    e.preventDefault();
    if (!content.trim() || !selectedConv) return;
    try {
      await sendMessage({
        toUserId:  selectedConv.other_id,
        studentId: selectedConv.student_id,
        content:   content.trim(),
      }).unwrap();
      setContent("");
      refetch();
    } catch {
      toast.error("Error", "No se pudo enviar el mensaje");
    }
  };

  if (isLoading) return <div className="p-6"><SkeletonTable /></div>;

  return (
    <div className="flex h-[calc(100vh-120px)] gap-4 p-6">
      {/* CONVERSACIONES */}
      <div className="w-72 shrink-0 bg-gray-900 border border-gray-800 rounded-3xl overflow-hidden flex flex-col">
        <div className="p-4 border-b border-gray-800">
          <h2 className="text-white font-bold">💬 Mensajes</h2>
        </div>
        <div className="flex-1 overflow-y-auto">
          {conversations.length === 0 ? (
            <p className="text-gray-500 text-sm text-center p-6">Sin conversaciones</p>
          ) : conversations.map((c) => {
            const otherId = c.from_user_id === user?.id ? c.to_user_id : c.from_user_id;
            const otherEmail = c.from_user_id === user?.id ? c.to_email : c.from_email;
            const isSelected = selectedConv?.other_id === otherId && selectedConv?.student_id === c.student_id;
            return (
              <button key={c.id} onClick={() => setSelectedConv({ other_id: otherId, student_id: c.student_id })}
                className={`w-full text-left p-4 border-b border-gray-800 hover:bg-gray-800 transition ${isSelected ? "bg-gray-800" : ""}`}>
                <p className="text-white font-medium text-sm truncate">{otherEmail}</p>
                {c.student_first && (
                  <p className="text-blue-400 text-xs mt-0.5">👶 {c.student_first} {c.student_last}</p>
                )}
                <p className="text-gray-500 text-xs mt-1 truncate">{c.content}</p>
              </button>
            );
          })}
        </div>
      </div>

      {/* CHAT */}
      <div className="flex-1 bg-gray-900 border border-gray-800 rounded-3xl overflow-hidden flex flex-col">
        {!selectedConv ? (
          <div className="flex-1 flex items-center justify-center text-gray-500">
            <div className="text-center">
              <p className="text-5xl mb-4">💬</p>
              <p className="text-xl font-bold text-white">Selecciona una conversación</p>
            </div>
          </div>
        ) : (
          <>
            <div className="p-4 border-b border-gray-800">
              <p className="text-white font-bold">Conversación</p>
            </div>
            <div className="flex-1 overflow-y-auto p-4 space-y-3">
              {messages.map((m) => {
                const isMine = m.from_user_id === user?.id;
                return (
                  <div key={m.id} className={`flex ${isMine ? "justify-end" : "justify-start"}`}>
                    <div className={`max-w-xs rounded-2xl px-4 py-3 ${isMine ? "bg-blue-600 text-white" : "bg-gray-800 text-white"}`}>
                      <p className="text-sm">{m.content}</p>
                      <p className={`text-xs mt-1 ${isMine ? "text-blue-200" : "text-gray-500"}`}>
                        {new Date(m.created_at).toLocaleTimeString("es-MX", { hour: "2-digit", minute: "2-digit" })}
                      </p>
                    </div>
                  </div>
                );
              })}
              <div ref={messagesEndRef} />
            </div>
            <form onSubmit={handleSend} className="p-4 border-t border-gray-800 flex gap-3">
              <input type="text" value={content} onChange={(e) => setContent(e.target.value)}
                placeholder="Escribe un mensaje..."
                className="flex-1 bg-gray-800 border border-gray-700 rounded-2xl px-4 py-3 text-white outline-none focus:border-blue-500" />
              <button type="submit" disabled={sending || !content.trim()}
                className="px-5 py-3 rounded-2xl bg-blue-600 hover:bg-blue-700 disabled:opacity-50 text-white font-bold">
                {sending ? "..." : "Enviar"}
              </button>
            </form>
          </>
        )}
      </div>
    </div>
  );
}