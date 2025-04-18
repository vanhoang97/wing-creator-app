// File: src/WingCreatorApp.jsx
import { useState } from "react";
import { Card, CardContent } from "./components/ui/card";
import { Button } from "./components/ui/button";
import { Input } from "./components/ui/input";
import { Textarea } from "./components/ui/textarea";

export default function WingCreatorApp() {
  const [step, setStep] = useState(1);
  const [answers, setAnswers] = useState([]);
  const [currentQ, setCurrentQ] = useState(0);
  const [inputValue, setInputValue] = useState("");
  const [ideas, setIdeas] = useState([]);
  const [script, setScript] = useState("");

  const questions = [
    "1️⃣ Bạn đang làm trong lĩnh vực nào và muốn tạo nội dung cho điều gì?",
    "2️⃣ Bạn kỳ vọng nội dung này giúp bạn đạt được điều gì?",
    "3️⃣ Khách hàng hoặc người xem của bạn là ai?",
    "4️⃣ Bạn muốn nội dung mang phong cách như thế nào?",
    "5️⃣ Bạn muốn mình (GPT) đóng vai trò gì trong quá trình sáng tạo?",
    "6️⃣ Có điều gì bạn KHÔNG muốn thấy trong nội dung không?",
    "7️⃣ Nếu nội dung mang yếu tố hài hước, bạn thích kiểu hài như thế nào?",
    "8️⃣ Bạn định đăng nội dung này lên nền tảng nào?"
  ];

  const handleNext = () => {
    if (!inputValue.trim()) return;
    const updated = [...answers];
    updated[currentQ] = inputValue;
    setAnswers(updated);
    setInputValue("");

    if (currentQ < questions.length - 1) {
      setCurrentQ(currentQ + 1);
    } else {
      generateIdeas(updated);
      setStep(2);
    }
  };

  const generateIdeas = (answers) => {
    const [field, goal, audience, tone, role, avoid, humor, platform] = answers;
    const base = `${field} | ${goal} | ${audience} | ${tone} | ${humor}`;
    const generated = Array.from({ length: 30 }, (_, i) => `${i + 1}. ${tone.toUpperCase()}: ${base}`);
    setIdeas(generated);
  };

  const generateScript = (idea) => {
    const [field, goal, audience, tone, role, avoid, humor, platform] = answers;
    const base = `Bối cảnh: ${field} – khách ${audience} bước vào\n\n3s đầu: Nội dung mở đầu tone ${tone}\nGiữa video: Nhấn mạnh ${goal}\nCuối video: Call to action nhẹ phù hợp với ${platform}`;
    setScript(`🎬 Ý tưởng: ${idea}\n\n${base}`);
    setStep(3);
  };

  return (
    <div className="p-6 space-y-6 max-w-2xl mx-auto">
      {step === 1 && (
        <Card className="bg-gray-50">
          <CardContent className="space-y-4 p-6">
            <h2 className="text-xl font-semibold mb-2">🤝 Trò chuyện cùng WingGPT</h2>
            <div className="space-y-2 max-h-[300px] overflow-y-auto">
              {answers.map((ans, idx) => (
                <div key={idx} className="flex flex-col items-end">
                  <div className="bg-blue-600 text-white px-4 py-2 rounded-xl max-w-[80%] text-sm">
                    {ans}
                  </div>
                  <div className="text-xs text-gray-400 mt-1">Bạn</div>
                  <div className="bg-gray-200 text-gray-800 px-4 py-2 rounded-xl max-w-[80%] mt-2 text-sm self-start">
                    {questions[idx]}
                  </div>
                  <div className="text-xs text-gray-400 ml-1 mb-2">WingGPT</div>
                </div>
              ))}
              {currentQ < questions.length && (
                <div className="bg-gray-200 text-gray-800 px-4 py-2 rounded-xl max-w-[80%] text-sm self-start">
                  {questions[currentQ]}
                </div>
              )}
            </div>
            <div className="flex gap-2">
              <Input
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                placeholder="Nhập câu trả lời của bạn..."
                className="flex-1"
              />
              <Button onClick={handleNext}>Gửi</Button>
            </div>
            <div className="text-sm text-gray-500 text-right">
              Câu {currentQ + 1}/{questions.length}
            </div>
          </CardContent>
        </Card>
      )}

      {step === 2 && (
        <Card>
          <CardContent className="space-y-4 p-6">
            <h2 className="text-xl font-semibold">💡 Chọn một ý tưởng</h2>
            {ideas.map((idea, idx) => (
              <Button
                key={idx}
                variant="outline"
                className="w-full justify-start"
                onClick={() => generateScript(idea)}
              >
                {idea}
              </Button>
            ))}
            <Button variant="ghost" onClick={() => setStep(1)}>🔄 Quay lại phần giới thiệu</Button>
          </CardContent>
        </Card>
      )}

      {step === 3 && (
        <Card>
          <CardContent className="space-y-4 p-6">
            <h2 className="text-xl font-semibold">📜 Kịch bản hoàn chỉnh</h2>
            <Textarea rows={10} value={script} readOnly />
            <Button variant="ghost" onClick={() => setStep(2)}>🔁 Chọn ý tưởng khác</Button>
          </CardContent>
        </Card>
      )}
    </div>
  );
}
