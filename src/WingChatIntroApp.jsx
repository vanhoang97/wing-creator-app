import { useState } from "react";
import { Textarea } from "./components/ui/textarea";
import { Button } from "./components/ui/button";

export default function WingChatIntroApp() {
  const questions = [
    "Bạn đang làm trong lĩnh vực nào và muốn tạo nội dung cho điều gì?",
    "Bạn kỳ vọng nội dung này giúp bạn đạt được điều gì?",
    "Khách hàng hoặc người xem của bạn là ai?",
    "Bạn muốn nội dung mang phong cách như thế nào?",
    "Bạn muốn mình (GPT) đóng vai trò gì trong quá trình sáng tạo?",
    "Có điều gì bạn KHÔNG muốn thấy trong nội dung không?",
    "Nếu nội dung có yếu tố hài hước, bạn thích kiểu hài như thế nào?",
    "Bạn định đăng nội dung này lên nền tảng nào?"
  ];

  const [messages, setMessages] = useState([
    { type: "bot", text: questions[0] }
  ]);
  const [step, setStep] = useState(0);
  const [input, setInput] = useState("");
  const [answers, setAnswers] = useState([]);
  const [confirming, setConfirming] = useState(false);
  const [confirmed, setConfirmed] = useState(false);
  const [ideas, setIdeas] = useState([]);

  const sendUserMessage = () => {
    if (!input.trim()) return;
    const newAnswers = [...answers, input.trim()];
    setAnswers(newAnswers);

    const newMessages = [
      ...messages,
      { type: "user", text: input.trim() },
    ];

    setInput("");

    if (step < questions.length - 1) {
      newMessages.push({ type: "bot", text: questions[step + 1] });
      setStep(step + 1);
    } else {
      newMessages.push({
        type: "bot",
        text: "Cảm ơn bạn! Mình sẽ tổng hợp lại thông tin nhé..."
      });
      setConfirming(true);
    }

    setMessages(newMessages);
  };

  const handleConfirm = (yes) => {
    if (yes) {
      setConfirmed(true);
      const [field, goal, audience, tone, role, avoid, humor, platform] = answers;
      const generated = Array.from({ length: 5 }, (_, i) =>
        `💡 Ý tưởng ${i + 1}: Một video ${tone} dành cho ${audience} về ${productShort(field)} với twist ${humor}`
      );
      setIdeas(generated);
      setMessages((prev) => [
        ...prev,
        { type: "bot", text: "Tuyệt! Dưới đây là một số ý tưởng đầu tiên mình gợi ý cho bạn:" }
      ]);
    } else {
      setMessages([...messages, { type: "bot", text: "Bạn muốn chỉnh lại thông tin nào? Hãy nhập lại từng ý nhé." }]);
      setStep(0);
      setAnswers([]);
      setConfirming(false);
    }
  };

  const productShort = (text) => {
    return text.length > 20 ? text.slice(0, 20) + "..." : text;
  };

  return (
    <div className="max-w-2xl mx-auto p-6 space-y-4">
      <div className="space-y-2 max-h-[70vh] overflow-y-auto border p-4 rounded bg-white shadow">
        {messages.map((msg, i) => (
          <div key={i} className={`text-sm ${msg.type === "bot" ? "text-left" : "text-right"}`}>
            <div className={`inline-block px-4 py-2 rounded-xl max-w-[75%] ${msg.type === "bot" ? "bg-gray-200 text-gray-800" : "bg-blue-600 text-white"}`}>
              {msg.text}
            </div>
          </div>
        ))}

        {confirming && !confirmed && (
          <div className="mt-4">
            <div className="text-sm text-gray-700 mb-2 font-semibold">🧠 Đây là những gì mình hiểu từ bạn:</div>
            <ul className="text-sm text-gray-600 list-disc ml-5">
              {answers.map((ans, idx) => (
                <li key={idx}><strong>{questions[idx]}</strong> {ans}</li>
              ))}
            </ul>
            <div className="mt-3">📌 Mình hiểu như vậy có đúng không bạn?</div>
            <div className="flex gap-2 mt-2">
              <Button onClick={() => handleConfirm(true)}>Đúng rồi ✅</Button>
              <Button variant="outline" onClick={() => handleConfirm(false)}>Chỉnh lại ✏️</Button>
            </div>
          </div>
        )}

        {confirmed && ideas.length > 0 && (
          <div className="mt-4 space-y-2">
            {ideas.map((idea, idx) => (
              <div key={idx} className="bg-green-100 text-green-800 p-3 rounded text-sm">
                {idea}
              </div>
            ))}
          </div>
        )}
      </div>

      {!confirming && !confirmed && (
        <div className="flex gap-2">
          <Input
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Nhập câu trả lời..."
            className="flex-1"
          />
          <Button onClick={sendUserMessage}>Gửi</Button>
        </div>
      )}
    </div>
  );
}
